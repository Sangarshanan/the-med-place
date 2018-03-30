# The Med Place
### This installation is guide is only for windows
First of all check if nodejs and npm are installed in your system 
```sh
npm –v
node –v
```
Open your console and navigate into the folder containing the website (cd to the cloned repo)
Run browser sync to run the webpage on localhost
```sh
npm install -g browser-sync
 browser-sync start --server --directory –files
```
[![N|Solid](https://image.ibb.co/dDfH0S/1.png)](https://nodesource.com/products/nsolid)
Initialise npm and install the web3 js on ethereum
```sh
npm init
npm install ethereum/web3.js –save
```
This is the Ethereum compatible JavaScript API which implements the Generic JSON RPC spec. It's available on npm as a node module, for bower and component as an embeddable js and as a meteor.js package.

Run testrpc to create 10 test accounts to play with automatically. These accounts come preloaded with 100 fake ethers.
```sh
testrpc
```
As of version 3.0.2 , testrpc requires at least Node 6.9.1 to run so be sure to update your node before execution

I have used solidity to write a simple smart contract.
Go to the ethereum remix engine (http://remix.ethereum.org) which is an ide for writing smart contracts.
Change the https to http in order to run the ide in web3 provider environment
Now copy paste the experience/med place.sol into the ide to compile and run the contract

[![N|Solid](https://image.ibb.co/n7cKEn/2.png)](https://nodesource.com/products/nsolid)

[![N|Solid](https://preview.ibb.co/czbqLS/3.png)](https://nodesource.com/products/nsolid)

Open the website to undertand the interface and after adding items to the cart in confirm the order and checkout.

[![N|Solid](https://image.ibb.co/bBXmun/4.png)](https://nodesource.com/products/nsolid)

The total amount purchased is transferred to the ethereum blockchain on checkout

[![N|Solid](https://image.ibb.co/gURqLS/5.png)](https://nodesource.com/products/nsolid)

[![N|Solid](https://image.ibb.co/d3dRun/6.png)](https://nodesource.com/products/nsolid)

