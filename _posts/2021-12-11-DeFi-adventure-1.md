---
layout: post
comments: true
title: "Learning by Doing - the DeFi Quest (Part 1 out of 2)"
author: "Damian Bogunowicz"
categories: blog
tags: [finance, blockchain, computer, science, money]
excerpt: "I find Decentralised Finance (DeFi) truly fascinating because it promises to solve so many problems of the modern financial world. It gives hope, that the future will be much less dystopian than we think. The goal of this series of blog posts is to document my first, applied steps in the world of DeFi."
---



I find Decentralised Finance (DeFi) truly fascinating because **it promises to solve so many problems of the modern financial world. It gives hope, that the future will be much less dystopian than we think**. Recent years (decades) have shown that we have a problem with harnessing the complexity of the ever-expanding, ever-global financial system. We have efficiency problems related to:

- Capital markets (Citadel, Robin Hood scandal, naked-shorts, toxic debts, and other types of harmful financial engineering)
- Global financial system (most of the world living on borrowed money, with the possible intention of devaluating the debt over time and thus the risk of (hyper)inflation) 
- The fragility of the paper tiger (every hiccup in the financial system spreads like a butterfly effect throughout the world due to deep globalization - see the financial crisis of 2007-08 or current Covid crisis). 

By no means am I an authority on those topics, but I believe that anybody who tries to accumulate some wealth, pays their taxes, and interacts with the financial institutions, does feel to some extend, anxious about the future.

The goal of this blog post (one out of two) **is to document my baby steps into the world of DeFi**. I had the pleasure to talk to [Cristian Strat](https://twitter.com/cgst) who has compiled this cool, [hands-on tutorial on how to get familiar with DeFi by doing](https://runloop-xyz.notion.site/DeFi-Quest-a1ba99ca4f5c48498b8fac91fcb3f5d1). My first steps into DeFi will quite closely follow his "DeFi Quest" syllabus. Think about this blog post as a solution to his tutorial questions. I hope that, as Cristian mentions in the intro to the "Quest", **by the end of the lecture, you will have sampled more DeFi than the majority of people out there.** 

I will follow his structure, where every unit of the quest is described as a "chapter" or an "adventure". I will break this write-up into two parts, each part covering three adventures.



## Adventure I

Adventure number one covers the absolute basics of the Decentralised Finance (DeFi) toolbox. The goal of this lesson is to set up the wallet, understand how to use it, and obtain your first ETH.

I already had my [MetaMask](https://metamask.io) ready. I can recommend using it as your everyday wallet. It is super easy and fun to use. It is also open-sourced (so there is full transparency if you are concerned about your safety) and it stores your private keys locally. This is the major advantage of the wallet versus using Coinbase/Binance - **the private key does not sit on the company's remote server, it is you who owns it**. Still, once you have some serious amounts of cryptos in your "hot" wallet, I strongly encourage you to get cold storage. 



<div class="imgcap">
<img src="/assets/14/264825740_445525920520415_7705011477133892162_n.jpg" width="30%"> 
  <div class="thecap">The total fee for buying ETH for 100 dollars is almost 6%. This is a lot.</div></div>


Nowadays transferring fiat money to your wallet is as easy as pie. You can connect your credit card or just directly wire the money to your account. I already had some coins in my wallet, so I am skipping this step. However, if you decide to set up your first fiat-to-ETH transaction, you will probably get quite disappointed. While I am writing this post, buying 100 euros worth of ETH using MetaMask requires paying a fee of almost 6 euros. Some portion of that goes to MetaMask and their payment service provider Transak (actually this part of the fee gets super big when you want to deposit more money), but some portion covers the so-called **"gas fee"**. This is essentially the transaction fee, which is being paid to sustain the Ethereum blockchain. Also, the average processing time looks very bad: 13.4 hours. But I am pretty confident that much of that downtime is coming from the payment service provider and not the blockchain itself.

Lastly, I think it is important to debunk one important myth: **blockchain transactions are not anonymous**. One can generate a practically unlimited number of addresses (like bank accounts), but any activity of your address is stored on the chain and free for all to review. To investigate the past activity on the blockchain, you can either set up a blockchain node on your machine and pull the information directly or simply use a website like [Etherscan](https://etherscan.io/), where you can explore the content in your browser.

#### About those gas fees...

Ethereum fees are the major problem of the network. You can see that the fee is [pretty volatile and relatively high](https://ethereumprice.org/gas/). I find this [short article](https://legacy.ethgasstation.info/blog/ethereum-transaction-how-long) being very useful to understand gas fees in more detail.

Those are some fundamental set of rules to keep in mind when thinking about the economics of gas fees. <em>Ceteris paribus</em>:

- If the price of ETH increases, the average gas price decreases and vice versa. 
- If the demand for settlement on Ethereum increases, so does the average price and vice versa.
- If you want your transaction to be processed quickly, you will have to pay a larger fee.
- The more complicated interaction with the blockchain, the more expensive the fee. I have not empirically tested it, but it makes sense that simply moving ETH between addresses should be cheaper than executing a complex, smart contract.

The long-awaited [upgrade of the Ethereum network](https://ethereum.org/en/eth2/) to Ethereum 2.0 should **radically change the dynamics around the gas fees**. The main goal of the upgrade is to increase the transaction throughput by up to four degrees of magnitude. This would force gas fees to drop in the short term. However, I am really curious whether this will satisfy the increasing demand for Ethereum protocol in the long run.

Until Ethereum 2.0 arrives, we have two choices. We either suck it up and pay up (I think a good rule of thumb is to execute transactions when the demand is low, which is around late morning in Europe), or we take advantage of the so-called Layer-2 networks...

#### Layer-2 Networks

Because of the inherent challenge of blockchain technology ([the Blockchain Trilemma](https://academy.shrimpy.io/post/what-is-the-blockchain-trilemma)), **it is very difficult to ensure the high transactional throughput of the base blockchains** (also known as Layer-1 networks). They have a hard time scaling with the increasing interest and number of users. Bitcoin and Ethereum are roughly three to four orders of magnitude slower (defined by transactions per second) than Visa, and it is a major challenge to close that gap.

While one can try to improve scaling capabilities on the Layer-1 level by rethinking the fundamental mechanisms governing the blockchain (for example by improving their consensus algorithm from Proof-of-Work to Proof-of-Stake or introducing [blockchain sharding](https://www.bitcoinsuisse.com/fundamentals/what-is-sharding)), many players see a business opportunity in maintaining and developing a secondary framework (Layer-2), where blockchain transactions and processes can take place independently of the main chain. Layer-2 protocols take care of a big chunk of transactional burden and only sporadically report back to the main blockchain. So in the nutshell, **Layer-2 refers to a secondary framework or protocol that is built on top of an existing blockchain system**. The main goal of these protocols is to solve the transaction speed and scaling difficulties that are being faced by the major cryptocurrency networks. For example, Solana should be an order of magnitude faster than Visa when it comes to transactions per second!



## Adventure 2

Adventure number two is about selling one cryptocurrency for the other (swapping). I will be using a very popular decentralized finance protocol, UniSwap. The protocol facilitates automated transactions between cryptocurrency tokens on the Ethereum chain. Think about it as a blockchain version of a currency exchange booth, which you can find at the airport. However, at the airport, when one wants to exchange a dollar for euro, the currency exchange service needs to physically hold some euros in a vault, so that they can give it to you for dollars. In the Decentralised Exchange (DEX) there is no centralized agent, which could hold those soon-to-be-exchanged euros. **So how is the liquidity (having enough assets in the "vault" to trade with the customer) supplied in the decentralized finance protocol?**

### Liquidity Pools

The answer is, through liquidity pools! Liquidity pools are the main idea behind the success of decentralized exchanges like UniSwap. In the traditional exchange market, the buyers and sellers are connected through an "order book". It is a system that matches bids and asks. The transaction occurs when the buyer is willing to pay more than the seller's price. However, in DeFi, we do not have a centralized agent who is keeping the books (and also making money from sustaining the trading infrastructure). Instead, **we store the tradable assets in pools (similar to physical vaults), which the individual people can interact with**. A liquidity pool is funds thrown together in a big digital pile! 

For simplicity, let's assume that our exchange only allows us to trade ETH for USDC (token representation of US dollar, more details coming soon). Pools are governed by a certain piece of logic called Automated Market Maker (AMM). It is an agent, which tries to enforce market equilibrium conditions in the pool by making sure that the ratio between a pair of currencies (e.g. ETH vs USDC) remains constant. As a result, <em>ceteris paribus</em>em, when ETH becomes suddenly very hot and demand for it goes up, it will also get more scarce and thus expensive. On the other hand, if there is a massive [FUD](https://en.wikipedia.org/wiki/Fear,_uncertainty,_and_doubt) and the supply of ETH increases, AMM will automatically lower its price against the price of USDC. Naturally, a big DEX like Uniswap or PancakeSwap uses numerous liquidity pools, where a huge number of crypto pairs are stored. 

To supply liquidity pools with cryptos, the subset of crypto users (a.k.a liquidity providers, anyone can become one) are encouraged to deposit their crypto pairs with the expectation of generating some profit. **The income for liquidity providers comes from small fees, which the user has to pay when swapping the crypto**. Frequent inefficiencies of DEXes, which are fairly understandable given how new DeFi is, allow for pocketing some gains. One strategy would be to provide huge volumes of liquidity to earn passive income from trading fees. Another idea would be crypto arbitrage - a strategy in which investors buy a cryptocurrency on one exchange and then quickly sell it on another exchange for a higher price.

I found [this paper](https://web.stanford.edu/~guillean/papers/uniswap_analysis.pdf) very insightful when it comes to understanding the mechanisms behind UniSwap (and similar DEXes, most of them are simply a fork of UniSwap).

#### USDC

I will be trading ETH for USDC. USDC is a token, which price is pegged to the price of the US dollar - similar to how back in the days the price of a currency was pegged to the number of gold reserves of a country. **USDC was created to be a useful form of digital money that wouldn’t see a dramatic value swing in the middle of a transaction**. USDC falls into the group of cryptocurrencies called "stable coins". The value of those coins is derived from some underlying external asset. In the case of USDC, its value is assured by the managing consortium called Centre. They claim, that the coin is backed by a dollar held in reserve, or by other "approved investments". This is pretty much what makes a stable coin different from cryptocurrencies like Bitcoin or Ethereum. 

One interesting point is, **once you become a crypto millionaire, how to cash out those big amounts of USDC** for the ["dry powder"](https://www.investopedia.com/terms/d/drypowder.asp) USD? I found testimonies of some Reddit users and it seems that channeling the money out of the DeFi into Traditional Finance (TradFi) channel is a [very](https://www.reddit.com/r/BitcoinBeginners/comments/ok9cyd/serious_us_how_would_one_cash_out_10_million/) non-trivial [problem](https://www.reddit.com/r/fatFIRE/comments/lz2kzs/how_to_sell_bitcoin_in_the_usa/gq1zrfj/?context=3). 

I have decided to obtain some USDC through swapping ETH on UniSwap, but you could directly buy USDC at a platform such as Coinbase for fiat money. Hmm...actually, scratch that, **I will not swap anything for now - I will do that later on in my adventures**. Now, I'd rather take a look at the swapping fees.

##### Swapping Fee vs the Amount One Desires to Swap 

The first interesting observation is that the swapping fees scale exponentially for relatively small amounts. However, after a threshold of amount swapped is reached, the relationship becomes linear with the amount crypto swapped. Still, **the exchange rate is not constant**, but it increases over time either linearly or exponentially. In other words, **for swapping little crypto, you pay a little. But for swapping a just bit more crypto, your fee gets bigger**. Why is that so? Once we start buying huge volumes of crypto and **threaten to exhaust the liquidity pool, the system should rapidly charge us much, much higher prices**. The AMM desperately wants the market conditions to bounce back to the equilibrium point - and those higher prices shall quickly incentivize liquidity suppliers to put more assets into a pool and thus satisfying our "whale" appetite. The beauty of supply and demand.

<div class="imgcap">
<img src="/assets/14/test.png" width="50%"> 
  <div class="thecap">Note the log scale on the x-axis.</div></div>




##### Can You Exhaust A Liquidity Pool?

This is an interesting question, to which I could not find a definite answer online. If you decide to swap 10 to the power of 13 dollars worth of ETH for USDC, UniSwap will charge you an appropriate fee. As far as the exhausting the pool goes, all I found were some purely theoretical scenarios:

- Either the liquidity pool will deny the transaction (because it is physically impossible to give you those USDC)...
- ...or your transaction will be put on hold/executed in small tranches, while the snappy arbitrageurs quickly realize the somebody is making USDC super scarce and they can buy it cheaper on e.g. Coinbase, and then quickly sell it to you.

I wonder what you happen... Maybe I get to find out in the feature, haha.

<div class="imgcap">
<img src="/assets/14/image-20211212094842011.png" width="50%"> 
  <div class="thecap">These problems are the good ones to have...</div></div>










## Adventure III

Even though this Adventure is numbered as the third, it follows "Chapter IV" from Cristian's Quest. I will return to "Chapter III" later, I promise it will make logical sense. 

So this adventure is abandoning direct operation on the Layer-1 network. We are going to use the Layer-2 network to swap some crypto and also start providing liquidity to a pool. Layer-2 protocols help to overcome the two biggest pitfalls of operating on Ethereum Layer-1:

- The gas fees tend to be ridiculously high.
- On average, a transaction can take up to 5 minutes. It can take even longer if you are not willing to pay the default gas price; if you are stingy, you may need to wait half an hour or so.

For this challenge I will be using Abitrum, a Layer-2 cryptocurrency platform, that makes smart contracts scalable and fast. I will try to, once again, swap some crypto, but this time to provide liquidity on UniSwap. 

While reading about Arbitrum, I have learned that it is using a protocol called Chainlink. It is not directly relevant to our adventure, but I found this concept super interesting, so let's inspect it in more detail.

### So what is the Chainlink network?

When we want to trade our ETH for a new, sweet pixel art NFT, the exchange happens through the execution of the smart contract. A smart contract is essentially a code, which only gets executed if some conditions are met. In the case of purchasing an NFT, the agreement is: we pay the price - somebody sends the token minted on the blockchain to our address. However, vanilla smart contracts do not communicate with the outside world. You would not be able to, e.g. purchase a (mirror) token which tracks the performance of stock (like mTSLA or mGOOGL), because how would the contract know, what is the current price per share? It does not have any feedback about the changing conditions of the outside world.

This is where Chainlink comes to play. It is a decentralized oracle network, build on Ethereum, with the ambition to become secure, sophisticated, and scalable. **But you may ask what is an oracle network**? It is essentially the missing piece of the puzzle, which supplies the smart contracts with live, real-world data. People can execute dynamic smart contracts by using the oracle as a bridge of information. Most oracle networks work with multiple data providers and require tokens to be staked to prevent fraudulent data into the blockchain. This technology enables us to execute options on decentralized exchanges (because we have access to the price of the underlying asset), build decentralized insurance businesses (since the smart contract knows the current weather conditions, it can pay a farmer when the temperature gets radically low in the given year) and so on.



So the first step is to use the bridge to transfer the money from Layer-1 (Ethereum) to Layer-2 (Arbitrum). Interestingly, transferring the money from Layer-1 to Arbitrum may take up to 10 minutes. But what's even more interesting - the reverse operation can take up to a week! Also, the fee was pretty high, so I have decided to operate early in the morning GMT when the traffic is low. The gas fee for the bridge transfer of 0.02 ETH was around $20 - still pretty rough I must say. 

<div class="imgcap">
<img src="/assets/14/10hours.png" width="100%"> 
  <div class="thecap">Yikes! In the crypto world, this is a lifetime!</div></div>


However, moving the crypto within Layer-2 should be [relatively cheap](https://l2fees.info/). This is why those networks are created in the first place right? I have to admit, that the price of swapping some ETH for USDC  on the Arbitrum network cost me only 4 dollars. This is much cheaper than the analogous operation directly on Layer-1. After I have swapped the crypto, I have noticed that my swapping transaction consists of several small ones, which involve various other coins like DAI or Wrapped ETH. This is known as **routing**. Probably my swapped tokens couldn't be swapped directly (for some reason), but UniSwap found a route to swap anyway through other token pairs.

Now I have a crypto pair in my wallet: ETH and USDC. **I can become a liquidity provider on Uniswap and hopefully earn some fees!** The user interface for liquidity providers is quite transparent and friendly. To put some assets into the pool, we need to go through the following steps:

- Specify the pair. I chose ETH and USDC.

- Specify the fee tier. When adding liquidity to the pool, you can select different fee tiers: 0.05%, 0.3%, and 1%. If you choose fee tier 1%, you get 1% of every swap someone makes if they interact with your crypto pair in the pool. However, if your crypto pair is not very rare, people will not be willing to pay that much. For popular (low risk/volatility) pairs, it is relatively easy to keep liquidity, so it is better to settle for a lower, 0.05% fee tier. I chose something in between: 0.3%.

- Specify the price bounds. Price bounds are essentially the degree of the concentration of your liquidity. I think that the following analogy to roulette is quite helpful:

  - Broad price bounds are like covering all the roulette numbers with small bets.

  - Narrow price bounds are like covering a few roulette numbers with big bets.

    Thus, the smaller the range you cover, the bigger the gain if the pairs are trading in the chosen price range. If you are willing to monitor and frequently update the parameters of your bets, it makes sense to pay attention to this parameter and tune it. However, if you do not want to spend too much time babysitting liquidity positions, you are probably better off setting quite a broad price.

- Finally, you specify how much crypto you want to put into the pool.

And that's it! You can start your planning [decentralized F.I.R.E](https://cointelegraph.com/magazine/2021/06/29/retire-early-with-crypto-playing-with-fire)!

<div class="imgcap">
<img src="/assets/14/image-20211212105306599.png" width="60%"> 
  <div class="thecap">My tiny liquidity pool has generated a fee of $0.01 over 24 hours. The road to financial independence is long, but as Einstein said: "Compound interest is the most powerful force in the universe!"</div></div>



