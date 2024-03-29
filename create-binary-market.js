const {
  MsgInstantBinaryOptionsMarketLaunch,
  MsgBroadcasterWithPk,
  OracleTypeMap,
} = require("@injectivelabs/sdk-ts");
const { privateKey, user, admin } = require("./config");
const { Network } = require("@injectivelabs/networks");

async function main() {
  const now = Math.floor(Date.now() / 1000);
  try {
    const msg = new MsgInstantBinaryOptionsMarketLaunch({
      market: {
        admin: admin,
        expirationTimestamp: now + 60,
        makerFeeRate: "0.0005",
        minPriceTickSize: "0.01",
        minQuantityTickSize: "0.01",
        oracleProvider: "Frontrunner",
        oracleScaleFactor: 6,
        oracleSymbol: "ARB/USDT",
        oracleType: OracleTypeMap.Provider,
        quoteDenom: "peggy0x87aB3B4C8661e07D6372361211B96ed4Dc36B1B5", // Test USDT
        settlementTimestamp: now + 3600,
        takerFeeRate: "0.0010",
        ticker: "ARB/USDT",
      },
      proposer: admin,
    });

    console.log('time: ', now)

    const txHash = await new MsgBroadcasterWithPk({
      privateKey: privateKey,
      network: Network.Testnet,
    }).broadcast({
      msgs: msg,
    });

    console.log("hash: ", txHash);
  } catch (err) {
    console.log("err: ", err);
  }
}

main();
