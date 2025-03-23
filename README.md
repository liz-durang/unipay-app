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


<!-- Demo -->
## Demo

Check out our working prototype! Below are some screenshots of the app in action:
<div align="center">
  <a href="https://www.loom.com/share/ddf44c254dea48af8ea18500959e93f8">
    <img src="https://www.loom.com/share/ddf44c254dea48af8ea18500959e93f8" alt="Video Link">
  </a>
</div>

<p align="right">(<a href="#readme-top">back to top</a>)</p>

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
    --wasm target/wasm32-unknown-unknown/release/unipay_app.wasm \
    --source unipay-app \
    --network testnet \
    --alias unipay_app
```

4. Realize unit tests. Example:

```
stellar contract invoke \
--network testnet \
--source unipay-app \
--id <contract_id> \
-- initialize \
--admin <user_id> \
--token <token_id>
```

```
stellar contract invoke \
--network testnet \
--source unipay-app \
--id <contract_id> \
-- get_admin 
```

5. On a third terminal, start your Frontend app:

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

# Social Media

Stay connected and follow us on social media for updates:

- [X](https://x.com/unipay_app)
- [Linktr.ee](https://linktr.ee/unipay_app)


<p align="right">(<a href="#readme-top">back to top</a>)</p>

# Team

-Gerardo Pedrizco ([@gerapedrizco](https://x.com/gerapedrizco): Business Developer | Economist and Co-Founder of @Cripto_UNAM
<br />
-Liz Durán  ([@liz_durang](https://x.com/liz_durang): Product Engineer & Blockchain Developer | Promoter of emerging tech education
<br />
-Bruno Miranda ([@ArcusX_one](https://x.com/ArcusX_one): Computer Science Engineer
<br />


