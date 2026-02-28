(function () {
  "use strict";

  function toNumber(value) {
    var parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : null;
  }

  function toTimestampMillis(value) {
    if (value === null || value === undefined || value === "") {
      return null;
    }
    if (typeof value === "number") {
      return Number.isFinite(value) ? value : null;
    }
    var parsed = Date.parse(String(value));
    return Number.isFinite(parsed) ? parsed : null;
  }

  function haversineKm(aLat, aLon, bLat, bLon) {
    var radius = 6371;
    var dLat = ((bLat - aLat) * Math.PI) / 180;
    var dLon = ((bLon - aLon) * Math.PI) / 180;
    var lat1 = (aLat * Math.PI) / 180;
    var lat2 = (bLat * Math.PI) / 180;
    var sinLat = Math.sin(dLat / 2);
    var sinLon = Math.sin(dLon / 2);
    var a = sinLat * sinLat + Math.cos(lat1) * Math.cos(lat2) * sinLon * sinLon;
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return radius * c;
  }

  function formatTime(seconds) {
    if (!Number.isFinite(seconds)) {
      return "-";
    }
    var total = Math.max(0, Math.floor(seconds));
    var h = Math.floor(total / 3600);
    var m = Math.floor((total % 3600) / 60);
    var s = total % 60;
    var hh = String(h).padStart(2, "0");
    var mm = String(m).padStart(2, "0");
    var ss = String(s).padStart(2, "0");
    return hh + ":" + mm + ":" + ss;
  }

  function paceFromSpeedKmh(speedKmh) {
    if (!Number.isFinite(speedKmh) || speedKmh <= 0) {
      return null;
    }
    return 60 / speedKmh;
  }

  function formatPaceMinKm(paceMinKm) {
    if (!Number.isFinite(paceMinKm) || paceMinKm <= 0) {
      return "-";
    }
    var totalSeconds = Math.round(paceMinKm * 60);
    var minutes = Math.floor(totalSeconds / 60);
    var seconds = totalSeconds % 60;
    return String(minutes) + ":" + String(seconds).padStart(2, "0") + " /km";
  }

  function smoothSeries(values, windowSize) {
    var out = [];
    var half = Math.max(1, Math.floor(windowSize / 2));
    var i;

    for (i = 0; i < values.length; i += 1) {
      var sum = 0;
      var count = 0;
      var j;
      for (j = Math.max(0, i - half); j <= Math.min(values.length - 1, i + half); j += 1) {
        if (Number.isFinite(values[j])) {
          sum += values[j];
          count += 1;
        }
      }
      out.push(count > 0 ? sum / count : null);
    }
    return out;
  }

  function nearestIndexByLatLon(points, lat, lon) {
    var bestIdx = 0;
    var bestErr = Infinity;
    var i;
    for (i = 0; i < points.length; i += 1) {
      var p = points[i];
      var err = haversineKm(lat, lon, p.lat, p.lon);
      if (err < bestErr) {
        bestErr = err;
        bestIdx = i;
      }
    }
    return bestIdx;
  }

  function normalizePoints(rawPoints) {
    var cleaned = [];
    var i;

    for (i = 0; i < rawPoints.length; i += 1) {
      var raw = rawPoints[i] || {};
      var lat = toNumber(raw.lat);
      var lon = toNumber(raw.lon);
      if (lat === null || lon === null) {
        continue;
      }

      cleaned.push({
        lat: lat,
        lon: lon,
        timestamp_ms: toTimestampMillis(raw.timestamp_ms || raw.timestamp || raw.time),
        distance_km: toNumber(raw.distance_km),
        speed_kmh: toNumber(raw.speed_kmh),
        hr_bpm: toNumber(raw.hr_bpm),
        alt_m: toNumber(raw.alt_m || raw.altitude_m || raw.altitude)
      });
    }

    if (cleaned.length < 2) {
      throw new Error("Not enough valid track points.");
    }

    var withTime = cleaned.filter(function (p) {
      return p.timestamp_ms !== null;
    }).length;

    if (withTime > cleaned.length * 0.7) {
      cleaned.sort(function (a, b) {
        return (a.timestamp_ms || 0) - (b.timestamp_ms || 0);
      });
    }

    var normalized = [];
    var t0 = cleaned[0].timestamp_ms;
    var elapsed = 0;
    var cumulativeDistance = cleaned[0].distance_km !== null ? Math.max(0, cleaned[0].distance_km) : 0;

    for (i = 0; i < cleaned.length; i += 1) {
      var current = cleaned[i];
      var distance = cumulativeDistance;
      var speed = current.speed_kmh;
      var timeS = elapsed;

      if (i > 0) {
        var prev = cleaned[i - 1];
        var geoDelta = haversineKm(prev.lat, prev.lon, current.lat, current.lon);
        var prevNorm = normalized[i - 1];

        if (current.distance_km !== null && current.distance_km >= prevNorm.distance_km) {
          distance = current.distance_km;
        } else {
          distance = prevNorm.distance_km + geoDelta;
        }

        if (
          current.timestamp_ms !== null &&
          prev.timestamp_ms !== null &&
          current.timestamp_ms >= prev.timestamp_ms &&
          t0 !== null
        ) {
          timeS = (current.timestamp_ms - t0) / 1000;
        } else {
          var speedGuess = speed;
          if (!Number.isFinite(speedGuess) || speedGuess <= 0) {
            speedGuess = Number.isFinite(prevNorm.speed_kmh) && prevNorm.speed_kmh > 0 ? prevNorm.speed_kmh : 8;
          }
          var syntheticDeltaT = (distance - prevNorm.distance_km) / Math.max(speedGuess, 1) * 3600;
          timeS = prevNorm.time_s + syntheticDeltaT;
        }

        if (!Number.isFinite(speed) || speed <= 0) {
          var dt = timeS - prevNorm.time_s;
          if (dt > 0) {
            speed = (distance - prevNorm.distance_km) / dt * 3600;
          }
        }
      }

      if (!Number.isFinite(speed) || speed <= 0) {
        speed = i > 0 ? normalized[i - 1].speed_kmh : 8;
      }

      normalized.push({
        lat: current.lat,
        lon: current.lon,
        distance_km: distance,
        speed_kmh: speed,
        hr_bpm: Number.isFinite(current.hr_bpm) ? current.hr_bpm : null,
        alt_m: Number.isFinite(current.alt_m) ? current.alt_m : null,
        time_s: timeS
      });

      cumulativeDistance = distance;
      elapsed = timeS;
    }

    if (normalized.length > 1 && !Number.isFinite(normalized[0].speed_kmh)) {
      normalized[0].speed_kmh = normalized[1].speed_kmh;
    }

    return normalized;
  }

  function generateDemoPoints() {
    var waypoints = [
      { lat: 43.7384, lon: 7.4246, km: 0 },
      { lat: 43.7349, lon: 7.4188, km: 2 },
      { lat: 43.7398, lon: 7.4085, km: 4 },
      { lat: 43.7462, lon: 7.4016, km: 8 },
      { lat: 43.7601, lon: 7.4142, km: 12 },
      { lat: 43.7765, lon: 7.4420, km: 16 },
      { lat: 43.7601, lon: 7.4142, km: 20 },
      { lat: 43.7462, lon: 7.4016, km: 23 },
      { lat: 43.7398, lon: 7.4085, km: 26 },
      { lat: 43.7384, lon: 7.4246, km: 29 }
    ];

    function sectionSpeed(distanceKm) {
      if (distanceKm < 4) {
        return 9.2;
      }
      if (distanceKm < 8) {
        return 7.6;
      }
      if (distanceKm < 16) {
        return 6.2;
      }
      if (distanceKm < 23) {
        return 9.8;
      }
      return 11.2;
    }

    function sectionHr(distanceKm) {
      if (distanceKm < 4) {
        return 164;
      }
      if (distanceKm < 8) {
        return 156;
      }
      if (distanceKm < 16) {
        return 166;
      }
      if (distanceKm < 23) {
        return 159;
      }
      return 168;
    }

    function sectionAlt(distanceKm) {
      if (distanceKm <= 16) {
        return 5 + (distanceKm / 16) * 1075;
      }
      return 1080 - ((distanceKm - 16) / 13) * 1065;
    }

    var points = [];
    var timeS = 0;
    var i;
    for (i = 0; i < waypoints.length - 1; i += 1) {
      var start = waypoints[i];
      var end = waypoints[i + 1];
      var segmentKm = end.km - start.km;
      var samples = Math.max(8, Math.round(segmentKm * 8));
      var j;
      for (j = 0; j < samples; j += 1) {
        var t = j / samples;
        var curve = Math.sin(t * Math.PI) * 0.0025 * (i % 2 === 0 ? 1 : -1);
        var lat = start.lat + (end.lat - start.lat) * t + curve * 0.25;
        var lon = start.lon + (end.lon - start.lon) * t + curve;
        var distance = start.km + segmentKm * t;
        var speed = sectionSpeed(distance) + Math.sin(distance * 1.2) * 0.5;
        var hr = sectionHr(distance) + Math.sin(distance * 1.7) * 3;

        if (points.length > 0) {
          var prev = points[points.length - 1];
          var deltaKm = Math.max(0, distance - prev.distance_km);
          timeS += (deltaKm / Math.max(speed, 1)) * 3600;
        }

        points.push({
          lat: lat,
          lon: lon,
          distance_km: distance,
          speed_kmh: speed,
          hr_bpm: hr,
          alt_m: sectionAlt(distance),
          time_s: timeS
        });
      }
    }

    points.push({
      lat: waypoints[waypoints.length - 1].lat,
      lon: waypoints[waypoints.length - 1].lon,
      distance_km: waypoints[waypoints.length - 1].km,
      speed_kmh: 11.0,
      hr_bpm: 170,
      alt_m: sectionAlt(waypoints[waypoints.length - 1].km),
      time_s: timeS + 25
    });

    return points;
  }

  function parseJsonTrack(content) {
    var parsed = JSON.parse(content);
    if (Array.isArray(parsed)) {
      return normalizePoints(parsed);
    }
    if (parsed && Array.isArray(parsed.points)) {
      return normalizePoints(parsed.points);
    }
    throw new Error("JSON file must be an array of points or an object with a 'points' array.");
  }

  function parseJsonPayload(parsed) {
    if (Array.isArray(parsed)) {
      return normalizePoints(parsed);
    }
    if (parsed && Array.isArray(parsed.points)) {
      return normalizePoints(parsed.points);
    }
    throw new Error("JSON payload must be an array of points or an object with a 'points' array.");
  }

  function firstNodeText(parent, tagName) {
    var nodes = parent.getElementsByTagName(tagName);
    if (nodes.length > 0) {
      return nodes[0].textContent;
    }
    var nsNodes = parent.getElementsByTagNameNS("*", tagName);
    if (nsNodes.length > 0) {
      return nsNodes[0].textContent;
    }
    return null;
  }

  function parseHrFromTrackpoint(trackpoint) {
    var hrDirect = firstNodeText(trackpoint, "hr");
    if (hrDirect !== null) {
      return toNumber(hrDirect);
    }

    var hrContainer = trackpoint.getElementsByTagName("HeartRateBpm");
    if (hrContainer.length > 0) {
      var value = hrContainer[0].getElementsByTagName("Value");
      if (value.length > 0) {
        return toNumber(value[0].textContent);
      }
    }

    return null;
  }

  function normalizeSpeed(rawSpeed) {
    var speed = toNumber(rawSpeed);
    if (speed === null) {
      return null;
    }

    // Garmin extensions often store speed in m/s.
    if (speed > 0 && speed < 7) {
      return speed * 3.6;
    }
    return speed;
  }

  function parseGpxTrack(content) {
    var xml = new DOMParser().parseFromString(content, "text/xml");
    if (xml.querySelector("parsererror")) {
      throw new Error("Invalid GPX file.");
    }

    var trkpts = xml.getElementsByTagName("trkpt");
    var points = [];
    var i;
    for (i = 0; i < trkpts.length; i += 1) {
      var trkpt = trkpts[i];
      var lat = toNumber(trkpt.getAttribute("lat"));
      var lon = toNumber(trkpt.getAttribute("lon"));
      if (lat === null || lon === null) {
        continue;
      }

      points.push({
        lat: lat,
        lon: lon,
        timestamp: firstNodeText(trkpt, "time"),
        hr_bpm: parseHrFromTrackpoint(trkpt),
        alt_m: toNumber(firstNodeText(trkpt, "ele")),
        speed_kmh: normalizeSpeed(firstNodeText(trkpt, "speed"))
      });
    }

    return normalizePoints(points);
  }

  function parseTcxTrack(content) {
    var xml = new DOMParser().parseFromString(content, "text/xml");
    if (xml.querySelector("parsererror")) {
      throw new Error("Invalid TCX file.");
    }

    var trackpoints = xml.getElementsByTagName("Trackpoint");
    var points = [];
    var i;
    for (i = 0; i < trackpoints.length; i += 1) {
      var tp = trackpoints[i];
      var lat = toNumber(firstNodeText(tp, "LatitudeDegrees"));
      var lon = toNumber(firstNodeText(tp, "LongitudeDegrees"));
      if (lat === null || lon === null) {
        continue;
      }

      var distanceMeters = toNumber(firstNodeText(tp, "DistanceMeters"));
      points.push({
        lat: lat,
        lon: lon,
        timestamp: firstNodeText(tp, "Time"),
        distance_km: distanceMeters !== null ? distanceMeters / 1000 : null,
        hr_bpm: parseHrFromTrackpoint(tp),
        alt_m: toNumber(firstNodeText(tp, "AltitudeMeters")),
        speed_kmh: normalizeSpeed(firstNodeText(tp, "Speed"))
      });
    }

    return normalizePoints(points);
  }

  function parseUploadedTrack(fileName, content) {
    var lower = fileName.toLowerCase();
    if (lower.endsWith(".json")) {
      return parseJsonTrack(content);
    }
    if (lower.endsWith(".gpx")) {
      return parseGpxTrack(content);
    }
    if (lower.endsWith(".tcx")) {
      return parseTcxTrack(content);
    }
    throw new Error("Unsupported file type. Use .gpx, .tcx, or .json");
  }

  function initWidget(root) {
    var mapEl = root.querySelector(".monaco-widget-map");
    var dataChartEl = root.querySelector(".monaco-widget-timeseries");

    var readoutDistance = root.querySelector("[data-field='distance']");
    var readoutSpeed = root.querySelector("[data-field='speed']");
    var readoutHr = root.querySelector("[data-field='hr']");
    var readoutTime = root.querySelector("[data-field='time']");
    var defaultSourceUrl = root.getAttribute("data-source-url");

    if (!window.L || !window.Plotly || !mapEl || !dataChartEl) {
      return;
    }

    var map = window.L.map(mapEl, { scrollWheelZoom: false });
    window.L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 18,
      attribution: "&copy; OpenStreetMap contributors"
    }).addTo(map);

    var baseRoute = null;
    var marker = null;
    var points = [];
    var paceForReadout = [];
    var hrForReadout = [];

    function setReadout(point, pointIndex) {
      if (!point || !Number.isFinite(pointIndex)) {
        readoutDistance.textContent = "-";
        readoutSpeed.textContent = "-";
        readoutHr.textContent = "-";
        readoutTime.textContent = "-";
        return;
      }

      readoutDistance.textContent = point.distance_km.toFixed(2) + " km";
      var paceValue = Number.isFinite(paceForReadout[pointIndex])
        ? paceForReadout[pointIndex]
        : paceFromSpeedKmh(point.speed_kmh);
      readoutSpeed.textContent = formatPaceMinKm(paceValue);
      var hrValue = Number.isFinite(hrForReadout[pointIndex]) ? hrForReadout[pointIndex] : point.hr_bpm;
      readoutHr.textContent = Number.isFinite(hrValue) ? Math.round(hrValue) + " bpm" : "-";
      readoutTime.textContent = formatTime(point.time_s);
    }

    function moveCursorOnChart(distanceKm) {
      if (!dataChartEl.data || !dataChartEl.data.length) {
        return;
      }
      window.Plotly.relayout(dataChartEl, {
        "shapes[0].x0": distanceKm,
        "shapes[0].x1": distanceKm
      });
    }

    function focusByIndex(index) {
      if (!points.length) {
        return;
      }
      var safeIdx = Math.max(0, Math.min(points.length - 1, index));
      var point = points[safeIdx];

      if (!marker) {
        marker = window.L.circleMarker([point.lat, point.lon], {
          radius: 7,
          color: "#111827",
          fillColor: "#f59e0b",
          fillOpacity: 0.95,
          weight: 2
        }).addTo(map);
      } else {
        marker.setLatLng([point.lat, point.lon]);
      }

      setReadout(point, safeIdx);
      moveCursorOnChart(point.distance_km);
    }

    function drawChart() {
      window.Plotly.purge(dataChartEl);

      var distances = points.map(function (p) {
        return p.distance_km;
      });
      var paceRaw = points.map(function (p) {
        var pace = paceFromSpeedKmh(p.speed_kmh);
        if (!Number.isFinite(pace) || pace < 2.5 || pace > 20) {
          return null;
        }
        return pace;
      });
      var pace = smoothSeries(paceRaw, 21);
      paceForReadout = pace;

      var hrRaw = points.map(function (p) {
        if (!Number.isFinite(p.hr_bpm) || p.hr_bpm < 70 || p.hr_bpm > 210) {
          return null;
        }
        return p.hr_bpm;
      });
      var heartRate = smoothSeries(hrRaw, 11);
      hrForReadout = heartRate;

      var elevation = points.map(function (p) {
        return Number.isFinite(p.alt_m) ? p.alt_m : null;
      });

      var elevationSmoothed = smoothSeries(elevation, 9);
      var hasElevation = elevation.some(function (v) {
        return Number.isFinite(v);
      });

      var paceLabel = pace.map(function (v) {
        return formatPaceMinKm(v);
      });

      var traces = [
        {
          x: distances,
          y: pace,
          mode: "lines",
          name: "Speed (min/km)",
          yaxis: "y",
          customdata: paceLabel,
          hovertemplate: "Speed %{customdata}<extra></extra>",
          line: { color: "#2563eb", width: 2.2 }
        },
        {
          x: distances,
          y: heartRate,
          mode: "lines",
          name: "Heart rate (bpm)",
          yaxis: "y2",
          hovertemplate: "HR %{y:.0f} bpm<extra></extra>",
          line: { color: "#dc2626", width: 1.9 }
        }
      ];

      if (hasElevation) {
        traces.push({
          x: distances,
          y: elevationSmoothed,
          mode: "lines",
          name: "Elevation (m)",
          xaxis: "x2",
          yaxis: "y3",
          hovertemplate: "Elevation %{y:.0f} m<extra></extra>",
          line: { color: "#16a34a", width: 1.6 },
          fill: "tozeroy",
          fillcolor: "rgba(22, 163, 74, 0.18)"
        });
      }

      var layout = {
        margin: { l: 56, r: 56, t: 24, b: 42 },
        legend: { orientation: "h", x: 0.5, xanchor: "center", y: 1.15 },
        font: { family: "Helvetica, Arial, sans-serif", size: 12, color: "#334155" },
        paper_bgcolor: "#ffffff",
        plot_bgcolor: "#ffffff",
        hovermode: "closest",
        hoversubplots: "axis",
        hoverlabel: { bgcolor: "#ffffff", bordercolor: "#cbd5e1", font: { size: 12, color: "#0f172a" } },
        xaxis: {
          domain: [0, 1],
          anchor: "y",
          showticklabels: false,
          matches: "x2",
          hoverformat: ".2f",
          unifiedhovertitle: { text: "" },
          gridcolor: "#f1f5f9",
          zeroline: false
        },
        yaxis: {
          domain: [0.4, 1],
          title: "Speed (min/km)",
          autorange: true,
          titlefont: { size: 12, color: "#334155" },
          tickfont: { size: 11, color: "#475569" },
          gridcolor: "#eef2f7",
          zeroline: false
        },
        yaxis2: {
          title: "HR",
          overlaying: "y",
          side: "right",
          titlefont: { size: 12, color: "#334155" },
          tickfont: { size: 11, color: "#475569" }
        },
        xaxis2: {
          domain: [0, 1],
          anchor: "y3",
          title: "Distance (km)",
          hoverformat: ".2f",
          unifiedhovertitle: { text: "" },
          titlefont: { size: 12, color: "#334155" },
          tickfont: { size: 11, color: "#475569" },
          gridcolor: "#f1f5f9",
          zeroline: false
        },
        yaxis3: {
          domain: [0, 0.34],
          title: "Elevation (m)",
          rangemode: "tozero",
          titlefont: { size: 12, color: "#334155" },
          tickfont: { size: 11, color: "#475569" },
          gridcolor: "#eef2f7",
          zeroline: false
        },
        shapes: [
          {
            type: "line",
            x0: distances[0],
            x1: distances[0],
            y0: 0,
            y1: 1,
            yref: "paper",
            line: { color: "#111827", width: 1, dash: "dot" }
          }
        ]
      };

      window.Plotly.newPlot(dataChartEl, traces, layout, {
        displayModeBar: false,
        responsive: true
      });

      dataChartEl.on("plotly_hover", function (evt) {
        if (!evt || !evt.points || !evt.points.length) {
          return;
        }
        focusByIndex(evt.points[0].pointIndex);
      });

      dataChartEl.on("plotly_click", function (evt) {
        if (!evt || !evt.points || !evt.points.length) {
          return;
        }
        focusByIndex(evt.points[0].pointIndex);
      });
    }

    function renderTrack(newPoints) {
      points = newPoints;

      if (baseRoute) {
        map.removeLayer(baseRoute);
      }

      var latLngs = points.map(function (p) {
        return [p.lat, p.lon];
      });

      baseRoute = window.L.polyline(latLngs, {
        color: "#2563eb",
        weight: 4,
        opacity: 0.8
      }).addTo(map);

      map.fitBounds(baseRoute.getBounds(), { padding: [18, 18] });
      drawChart();
      focusByIndex(0);
    }

    map.on("click", function (evt) {
      if (!points.length) {
        return;
      }
      var idx = nearestIndexByLatLon(points, evt.latlng.lat, evt.latlng.lng);
      focusByIndex(idx);
    });

    function renderDemoFallback() {
      renderTrack(generateDemoPoints());
    }

    if (!defaultSourceUrl) {
      renderDemoFallback();
      return;
    }

    fetch(defaultSourceUrl, { cache: "no-store" })
      .then(function (response) {
        if (!response.ok) {
          throw new Error("HTTP " + response.status);
        }
        return response.json();
      })
      .then(function (payload) {
        var parsed = parseJsonPayload(payload);
        renderTrack(parsed);
      })
      .catch(function () {
        renderDemoFallback();
      });
  }

  function boot() {
    var widgets = document.querySelectorAll("[data-monaco-run-widget='true']");
    var i;
    for (i = 0; i < widgets.length; i += 1) {
      initWidget(widgets[i]);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
