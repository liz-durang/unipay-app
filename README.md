# UniPay App

<a name="readme-top"></a>

<div align="center">
  <a href="https://github.com/liz-durang/unipay-app">
    <img src="https://github.com/liz-durang/unipay-app/blob/main/logo-unipay-app.png">
  </a>

<br/>
<br/>
<p align="center">
  <a href="https://dorahacks.io/hackathon/aleph25/detail">Aleph Hackathon || March 21 - 23 2025</a>
</p>
</div>

<br />
<!-- ABOUT THE PROJECT -->

# About The Project

Financing Platform for University Students | Small payments for small adults


<p align="right">(<a href="#readme-top">back to top</a>)</p>

# Problem

The current financing system is inefficient, exclusive, and bureaucratic, limiting young students' access to financial support


# Solution

**UniPay App** is a decentralized platform that automates scholarship distribution and provides scalable microloans tied to academic performance, removing banking intermediaries to ensure transparency, accessibility, and efficiency.


<!-- Quickstart-->

## Quickstart

To get started follow the steps below:


1. Generate keypairs 

```
stellar keys generate --global unipay-app --network testnet --fund
```

2. Compile the contract and generate the `.wasm` file.

```
cd unipay-app
stellar contract build
```

3. Deploy the contract on the Testnet and obtain the Contract ID.

```
stellar contract deploy \
    --wasm target/wasm32-unknown-unknown/release/hello_world.wasm \
    --source alice \
    --network testnet \
    --alias hello_world
```

4. On a third terminal, start your Frontend app:

```
yarn start
```

Visit your app on: `http://localhost:3000`. You can interact with your smart contract using the `Debug Contracts` page. You can tweak the app config in `packages/nextjs/scaffold.config.ts`.

Run smart contract test with `yarn hardhat:test`

# Built With

Supported by:

* [Rust](https://www.rust-lang.org/es/learn/get-started)
* [ViteJs](https://vite.dev/guide/)
* [Stellar](https://developers.stellar.org/)


# Team

-Gerardo Pedrizco ([@gerapedrizco](https://x.com/gerapedrizco): Business Developer | Economist and Co-Founder of @Cripto_UNAM
<br />
-Liz Durán  ([@liz_durang](https://x.com/liz_durang): Product Engineer & Blockchain Developer | Promoter of emerging tech education
<br />
-Bruno Miranda ([@ArcusX_one](https://x.com/ArcusX_one): Computer Science Engineer
<br />


