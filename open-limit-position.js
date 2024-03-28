const {
  MsgBroadcasterWithPk,
  OracleTypeMap,
  MsgCreateBinaryOptionsMarketOrder,
  OrderTypeMap,
  getSubaccountId,
  derivativeMarginFromChainMargin,
  MsgCreateBinaryOptionsLimitOrder,
} = require("@injectivelabs/sdk-ts");

const { privateKey, user, admin } = require("./config");
const { Network } = require("@injectivelabs/networks");

async function main() {
  try {
    const msg = new MsgCreateBinaryOptionsLimitOrder({
      marketId:
        "0xddd038d16922db1671a998285e387f016ad302a6643732fcac93dc42ac927e39",
      feeRecipient: user,
      injectiveAddress: user,
      margin: derivativeMarginFromChainMargin({
        value: 40,
        quoteDecimals: 0
      }),
      price: "40",
      quantity: 1,
      subaccountId: getSubaccountId(user),
      orderType: OrderTypeMap.BUY,
    });

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