const { IndexerGrpcDerivativesApi, IndexerGrpcOracleApi  } = require("@injectivelabs/sdk-ts");
const { getNetworkEndpoints, Network } = require("@injectivelabs/networks");

async function main() {
  const endpoints = getNetworkEndpoints(Network.Testnet);
  const indexerGrpcAuctionApi = new IndexerGrpcDerivativesApi(endpoints.indexer);
  const indexerGrpcOracleApi = new IndexerGrpcOracleApi(endpoints.indexer);

  const round = 1;

  const markets = await indexerGrpcAuctionApi.fetchBinaryOptionsMarkets()
  const oracles = await indexerGrpcOracleApi.fetchOracleList();

  console.log('count: ', markets.length);
  console.log('markets: ', markets);
}

main()