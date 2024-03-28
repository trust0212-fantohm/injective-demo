const {
  MsgDeposit,
  MsgBroadcasterWithPk,
  getEthereumAddress,
} = require("@injectivelabs/sdk-ts");
const { BigNumberInBase } = require("@injectivelabs/utils");
const { Network } = require("@injectivelabs/networks");

const privateKey = "0x864906394e90b6c53b03276794f565d35344d2f65e0e3fc74184bdafa3ada265";
const injectiveAddress = "inj1xyfrl7wrsczv7ah5tvvpcwnp3vlc3n9terc9d6";

async function main() {
  const amount = {
    denom: "inj",
    amount: new BigNumberInBase(1).toWei(),
  };

  const ethereumAddress = getEthereumAddress(injectiveAddress);
  console.log('ethereum address: ', ethereumAddress);
  
  const subaccountIndex = 0;
  const suffix = "0".repeat(23) + subaccountIndex;
  const subaccountId = ethereumAddress + suffix;

  const msg = MsgDeposit.fromJSON({
    amount,
    subaccountId,
    injectiveAddress,
  });

  const txHash = await new MsgBroadcasterWithPk({
    privateKey,
    network: Network.Testnet,
  }).broadcast({
    msgs: msg,
  });

  console.log(txHash);
}

main();