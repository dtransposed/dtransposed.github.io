---
layout: post
comments: true
title: "Learning by Doing - the DeFi Quest (Part 2 out of 2)"
author: "Damian Bogunowicz"
categories: blog
tags: [finance, blockchain, computer, science, money]
excerpt: "The DeFi quest continued."
---

Christmas break is a great time to catch up with the backlog of interesting things to learn and read about. I used some of this time to finish the amazing [DeFi quest](https://runloop-xyz.notion.site/DeFi-Quest-a1ba99ca4f5c48498b8fac91fcb3f5d1) by [Cristian Strat](https://twitter.com/cgst). This is a continuation to the [first part of this series](https://dtransposed.github.io/blog/2021/12/11/DeFi-adventure-1/), where I document my first steps in the world of Decentralized Finance. If you have not read the first write-up, please do. Otherwise, this text will be very confusing and not too useful for you. But once you go through both blog posts, I guarantee that you will have a DeFi knowledge superior to the majority of the folks out there. 

## Adventure IV

This adventure will be more like a short pause from more in-depth topics. I will quickly present some of the best DeFi dashboards out there. A DeFi dashboard is a central place, where you can view your assets, track your crypto wealth, participation in liquidity pools, DEX trades, fees, owned NFTS, etc. Since blockchain transactions are available for everyone to browse, it is possible to aggregate data of an address and serve it to a user. Still, it seems that only a few services have done it right, offering a great user experience and clarity.

<div class="imgcap">
<img src="/assets/15/Zrzut ekranu 2021-12-19 o 18.49.37.png" width="70%"> 
  <div class="thecap">DeFi Pulse(https://defipulse.com) is a site where you can find the latest analytics and rankings of DeFi protocols</div></div>

<div class="imgcap">
<img src="/assets/15/Zrzut ekranu 2021-12-19 o 18.51.38.png" width="70%"> 
  <div class="thecap">Dune Analytics (https://dune.xyz) can be used to query, extract, and visualize vast amounts of data on the blockchain.</div></div>

<div class="imgcap">
<img src="/assets/15/Zrzut ekranu 2021-12-19 o 18.48.36.png" width="70%"> 
  <div class="thecap">Zerion dashboard (https://app.zerion.io/) showing the address owned by Vitalik Buterin...</div></div>

<div class="imgcap">
<img src="/assets/15/Zrzut ekranu 2021-12-19 o 18.44.36.png" width="70%"> 
  <div class="thecap">...same address, but now we are using (my favourite) Zapper dashboard (https://zapper.fi).</div></div>



## Adventure V

This adventure is about dipping our toes into lending and borrowing on DeFi platforms. We will switch from Arbitrum to another popular Layer-2 protocol called [Polygon](https://polygon.technology/). On a high level, it is very similar to Arbitrum, but obviously, the devil is in the detail. While the Abitrum chain is directly secured by the Ethereum base layer, Polygon is secured by its PoS consensus mechanism and therefore "issues" its own token - MATIC. Polygon trumps Arbitrum when it comes to withdrawal time. While it can take a week to transfer your tokens from Arbitrum back to the Ethereum chain, withdrawals on Polygon take just three hours.

<div class="imgcap">
<img src="/assets/15/Zrzut ekranu 2021-12-15 o 17.00.36.png" width="70%"> 
  <div class="thecap">Polygon Token Swap service - easiest way to obtain MATIC in 2022.</div></div>

<div class="imgcap">
<img src="/assets/15/Zrzut ekranu 2021-12-14 o 11.10.33.png" width="70%"> 
  <div class="thecap">Faucets are interesting, but the "drops" are not useful anymore.</div></div>

To operate on the Polygon chain you need a MATIC token to pay gas fees. Nowadays, it is not straightforward to obtain MATIC. There exist several ["MATIC faucets"](https://macncheese.finance/matic-polygon-mainnet-faucet.php) - services, that infrequently give out for free tiny amounts (like water drips) of MATIC, so that a user can start paying fees on Polygon without deliberately buying any MATIC in advance. The Polygon fees have increased so currently the "drops" from the faucet are too tiny to cover even a single transaction (previously, a faucet would give you enough MATIC for about a dozen transactions). After trying some alternative ways to quickly and cheaply obtain some MATIC, I can conclude that the best way is to use a [brand new Polygon Token Swap service](https://blog.polygon.technology/polygon-token-swap-your-one-stop-shop-to-swap/). Simple, quick, and supports a plethora of tokens!  

Now, having some MATIC tokens to cover our gas fees, we jump right in into lending and borrowing on the DeFi platform - Aave. We can use the example of Aave, to study DeFi lending platforms in more depth.

### QnA: Lending/Borrowing on Aave

I think it is safe to say that borrowing and lending money has been the cornerstone of the financial system, dating back to the origins of currencies and trade. Nowadays, most of us are also involved in lending (when we put our money in the savings account) or borrowing (taking a loan to pay off the house or paying the university tuition). Arguably the party which benefits the most is the banks. You can rarely hear somebody being happy with the interest rates on their savings account (which sometimes can be even negative) or with the conditions of their loan. But you can often hear that working in a bank is a good career path if one optimizes for a high salary and attractive bonuses. So DeFi offers the possibility to lend and borrow crypto without a middle man while ensuring trust between parties (using the blockchain and the logic of a smart contract).

<div class="imgcap">
<img src="/assets/15/Zrzut ekranu 2021-12-15 o 17.10.32.png" width="90%"> 
  <div class="thecap">Aave's dashboard shows the current lending and borrowing data.</div></div>

[Aave](https://aave.com/), which means a ghost in Finnish, is a popular protocol to earn interest on deposits and borrow assets. I currently have about $50 worth of USDT (also known as Tether), which I would like to lend to somebody else to profit from the interest. A simple strategy to maximize my returns would be to deposit the asset which has the highest Annual Percentage Yield (APY). It is so convenient that USDT, at the current point, offers the highest APY on the Polygon chain of 8.51%. Additionally, Aave encourages users to use their service on the Polygon so they pay incentive fees in wrapped MATIC cryptocurrency. Why wrapped MATIC and not a standard one? Still not sure, my best guess is it may be easier for smart contracts to work with wrapped coins for some reason.

So depositing my $50 USDT should pay me:

- APY of 8.51% in the original cryptocurrency: $4.26 worth of USDT
- ...plus APR of 4.08% of my deposit in the wMATIC cryptocurrency: $2.04 worth of WMATIC (around 1 WMATIC)

Getting about $6 out of $50 sounds fabulous, but there is a catch. The yield on deposit and the Aave reward are dynamic. This abnormally high APY on USDT will probably very soon go down. So I guess if one wants to optimize for the highest possible yield, a good idea is to ignore daily fluctuations in APY, keep track of the monthly averages, and actively manage your portfolio.

<div class="imgcap">
<img src="/assets/15/Zrzut ekranu 2021-12-16 o 18.31.43.png" width="70%"> 
  <div class="thecap">APR fluctuations of of USDT.</div></div>

#### Q: What is the difference between APY and APR

**Answer**: Simply put, APR does not take into account compounded interest, while APY does. Imagine you deposit $1000 in a bank that pays 10% interest per year. The bank also agrees to pay the dividend on the monthly basis, which is automatically reinvested (similarly to an accumulating ETF). 

Your APR will be simply 10%. But your APY will be higher, because of the compound interest. 

- In the first month the bank is going to pay you $$1000 \times \frac{10\%}{12} = 8.33$$. So now you have $1008.33.
- In the second month, the bank is going to pay you $$1008.33 \times \frac{10\%}{12} = 8.40$$. So now you have $1017.73.

... and this will go on until the end of the year. So while APR is 10%, your APY will be higher. At the end of the year, you will end up having APY at 10.47% (because you will end up with $1104.71, not $1100 as APR would suggest).

#### Q: What influences the APY of a token?

**Answer**: While monitoring the APY values on Aave for several weeks, I have noticed two interesting things. 

Firstly, on average, the APY of the coin is inversely proportional to its volatility. Borrowing a volatile asset, especially one which has been, on average,  appreciating (like BTC or ETH), is very risky.  Would you want to borrow a rapidly appreciating asset only to pay it back at a much higher price? This is why there is much more demand for borrowing stable coins such as USDT and USDC, which is reflected in the fairly high yield. 

Secondly, on average, the APY of USDT is much higher (on the Polygon chain) than other stablecoins, such as DAI or USDC. It is interesting, why is the difference so substantial?

A deposit in USDT, contrary to other stablecoins, cannot be simultaneously used as collateral. This has been explained in [Aave's documentation](https://docs.aave.com/risk/asset-risk/risks-per-asset#usdt): 

> Tether is centralized, fully controlled by Tether Limited, which is in turn controlled by BitFinex. The procedure to redeem the underlying asset in exchange for USDT is also unclear.
>
> There are [multiple legal investigations](https://en.wikipedia.org/wiki/Bitfinex) on these two companies regarding USDT. Specifically, there has been an accusation of illegally manipulating the price of Bitcoin using non-backed USDT, as well as legal claims on the usage of the collateralized funds by both Tether Limited and BitFinex. This brings USDT's trust risk factor down to D+ disqualifying it as collateral.

Since Tether cannot be used as collateral and carries significant counterparty risk, fewer people are willing to deposit it. At the same time, USDT is the first stablecoin in operation (since 2014) and remains one of the most used coins with nearly 20 million transactions. We have simultaneously low supply and fairly high demand and that justifies high APY.

Side note number one: I wonder what happens if one takes a loan in a currency that suddenly goes belly up (remember the recent [infamous rug-pulled on SQUID coin](https://www.washingtonpost.com/world/2021/11/02/squid-game-crypto-rug-pull/))? Since borrowing is quite similar to shorting an asset, this would probably mean free money I guess.

Side note number two: for an abnormal yield of 1000% check out the yield optimizer platform [Beefy.Finance](https://www.beefy.finance/).

#### Q: Is depositing my money to a smart contract safe?

**Answer**: In theory, yes. Assuming that the platform and smart contracts are free of bugs (naturally, there are some risks involved such as a possible flaw in the smart contracts being found and exploited, or breaking the stable coin pegging mechanism, e.g. [possible future scenario in the case of USDT](https://news.coincu.com/22286-usdt-is-said-to-be-a-scam-that-can-crash-the-cryptocurrency-market/)), there should be no risk for the creditor that somebody will get away with the money. This is because the loans are overcollateralized, i.e the borrowers must deposit another asset as collateral before they can take out a loan and the value of the collateral is higher than the loan itself. So to get a loan of $100, you need to deposit collateral of $150. As result, there's no need for credit checks, and thus both lenders and borrowers remain anonymous. From an investor's point of view, this is great.

If the value of the loan goes up significantly or the value of the collateral falls, the borrower risks their collateral getting liquidated (sold off at a discount) to ensure the funds in the protocol remain safe. From the debtor point of view, over-collateralization may a bit confusing - since you have substantial collateral on your hand, why would you take the loan in the first place? We will get to that.

#### Q: Why are the interest rates so high?

**Answer**: Because people are willing to borrow funds from those platforms at even higher interest rates. The interest rate is determined by market forces (supply/demand for loans), rather than a central authority, and is constantly changing. Now, who on Earth would borrow at those rates, while they could get a much better deal at the bank?

##### Reason number 1.

> Taking a loan against an appreciating asset is better than selling it.

If today you have 4 BTC, each worth $30,000, and decide to buy a $30,000 car, you will have to sell 1 BTC - ending up with a car and 3 BTC. Tomorrow, when the price of BTC goes to $36,000, you will own a car and $108,000 in BTC.

However, if you are confident that tomorrow 1 BTC would indeed be worth $36,000, you might take a loan with an interest rate of 10%. You deposit 1BTC, get your $30,000 and buy a car. On the next day, you use one BTC (worth $36,000) to pay back your $33,000 loan (principal plus the amount of interest) and end up with a car and $111,000 in BTC. As long as your bet is right and the asset appreciates sufficiently (as big-cap cryptos historically did), taking the loan is better than selling. 

##### Reason number 2.

> If you sell crypto you have to pay capital gains but if you get a loan, there are no taxes because there's no gain.

If you want to buy a house, you would probably not sell your crypto to finance it. You'd rather borrow fiat money (e.g. on https://nexo.io/) against your crypto to buy the house. Not selling means not paying capital gains. This is a strategy well-known to many affluent people ([source](https://www.forbes.com/sites/johnhyatt/2021/11/11/how-americas-richest-people-larry-ellison-elon-musk-can-access-billions-without-selling-their-stock/?sh=39b5d96523d4)):

> When [Elon Musk] wants cash, he can simply borrow money by putting up—or pledging—some of his Tesla shares as collateral for lines of credit, instead of selling shares and paying capital gains taxes. These pledged shares serve as an evergreen credit facility, giving Musk access to cash when he needs it. 

To summarise, seemingly large interest rates on DeFi platforms are pretty benign, given the benefits: fast access to cash, historical crypto bull-run, and capital gains tax avoidance. While I am sure that the majority of debtors are arbitrage traders, it is also a useful tool for retail borrowers or even companies. For almost a year [citizens and businesses of the Swiss canton of Zug could pay taxes using Bitcoin](https://thepaypers.com/cryptocurrencies/citizens-of-the-swiss-canton-of-zug-can-now-pay-taxes-using-bitcoin--1247385). I am dying to find out what kind of tax optimization strategies have been born out of this!



## Adventure V

We are almost done with our Quest. This last adventure consists of three smaller parts, where I would quickly explain three concepts: DAI stablecoin, Compound platform, and alternatives for Uniswap.

### DAI SideQuest

DAI is another popular stable coin - representation of the US dollar value in the crypto world. What makes DAI unique is how truly decentralized this token is. Many popular stable coins like USDC or USDT are tied to some form of external governance. As I mentioned in my last post, USDC is controlled by the Centre consortium, which, if required, could [call a blacklist function on an address, essentially freezing all USDC coins on it](https://www.coindesk.com/markets/2020/07/08/circle-confirms-freezing-100k-in-usdc-at-law-enforcements-request/). Some speculate that USDT, as explained before, has significant potential for crypto-disaster in the future, partially due to the lack of trust towards Tether Limited.

DAI, on the other hand, is fully decentralized. It is quite remarkable, given that it is not backed by the US dollar but other cryptocurrencies. While one can obtain DAI in a standard way (swaps on DEX), the fundamental way to "procure" the stablecoin is through the MakerDAO - a Decentralized Autonomous Organization (DAO), which allows the users to borrow (mint) DAI against their crypto.

To mint DAI one has to deposit collateral (e.g. in ETH or WBTC) with MakerDAO. Once the collateral has been deposited in the Maker, a certain amount of DAI is minted and sent to the user. While there is a minimum required (over-)collateralization ratio (150%), the users are often happy to deposit more collateral than required. Why should the users do it? Well, the incentive comes from the previously explained principle: **Taking a loan against an appreciating asset is better than selling it**. To get some paper dollars, you'd rather take a loan against your BTC than sell your BTC. And loan in a stable currency may be desirable for many reasons, especially interacting with the TradFi.

The stability of the DAI is purely market-based. DAI maintains its target price and low volatility by modifying the incentives for borrowing and holding DAI:

- If the price of DAI in the secondary marker falls below $1, the users will buy DAI in the secondary market and pay back their debt in MarkerDAO. The returned DAI is then burned, so the supply of DAI decreases, and the price of DAI goes up.

- If the price of DAI in the secondary market increases above $1, the users will mint DAI in MarkerDAO and sell it on the secondary market. This would increase the overall supply of DAI, and the price of DAI goes down.

### Compound SideQuest

[Compound](https://compound.finance) is a borrowing platform very similar to Aave. However, Compound currently has less significance in the DeFi space than its younger sibling. This is due to its slower pace of innovation and business expansion, as well as several events, which have undermined the platform's credibility. Not so long ago, because of manipulated information supplied by an oracle (apparently, the platform was using a single oracle to fetch the pricing data, not the most fault-tolerant design), many users ($100 million worth of assets) [have been unexpectedly liquidated](https://cryptheory.org/oracle-exploit-sees-100-million-liquidated-on-compound). Not to mention another blunder, when due to the unfortunate update some users started to [receive millions of dollars in COMP tokens](https://www.cnbc.com/2021/10/03/162-million-up-for-grabs-after-bug-in-defi-protocol-compound-.html).

Since it's all on a blockchain, you may directly take a look at the accidental transfer of $30 million worth of comp tokens [to some address](https://etherscan.io/tx/0xf4bfef1655f2092cf062c008153a5be66069b2b1fedcacbf4037c1f3cc8a9f45).

<div class="imgcap">
<img src="/assets/15/Zrzut ekranu 2021-12-24 o 19.18.44.png" width="70%"> 
  <div class="thecap">Compound's faulty interface to the price oracle fits into a single tweet.</div></div>

### UniSwap SideQuest

While UniSwap is certainly the most popular DEX (more than a quarter of all swaps are done on UniSwap), there are many competitors out there. While the platforms are fundamentally very similar, it's the differences that make them unique and preferred by various types of users.

- **1inch** is a DEX aggregator, so if you want to do a swap, it looks at all the available popular DEXes to give you the best possible price.
- **Balancer** is an AMM protocol that expands the usage of liquidity pools. It allows for setting up multi-asset pools with up to eight tokens in one pool. This is essentially creating your own, custom index fund. Anyone can now create their self-balancing (through the arbitrage activities of other traders) index fund or invest in someone else’s. I find this idea very interesting, will spend more time soon looking into the Balancer platform.
- **Curve Finance** is an AMM as well, focused on exchanging for stablecoins. It tries to make swapping stablecoins as functional as possible -  traders get extremely low slippage, and liquidity providers enjoy little-to-no impermanent loss.



## Summary

This concludes my DeFi Adventure. I have to say, that now, having spent several weeks learning the basics of the DeFi, I am extremely curious about the details and nuances of the invention. I am frequently mesmerized by the ingenuity and "zero-to-one" thinking of some of the creators in this space. Finally, I also have to admit that the whole idea of being independent of the legacy financial system is very appealing for me. However, the DeFi world still has teething troubles, so it is wise to tread carefully. I do not remember where I heard this quote, but it seems like a fitting, humorous conclusion of this series:

> When a user steals from a bank - it is called a crime.
>
> When a bank steals from a user- it is called finance.
>
> When a user steals from a user - it is called DeFi.









