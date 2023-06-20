export default {
  port: 1337,
  dbUri:
    "mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.6.0",
  // NEO4J_URI: "bolt://neo4j_db:7687",
  NEO4J_URI: "bolt://localhost:7687",
  NEO4J_USERNAME: "neo4j",
  NEO4J_PASSWORD: "maslo123",
  AURA_INSTANCENAME: "Instance01",
  saltWorkFactor: 10,
  accessTokenTtl: "15m",
  refreshTokenTtl: "1y",
  accessTokenPrivateKey: ``,
  accessTokenPublicKey: ``,
  refreshTokenPrivateKey: ``,
  refreshTokenPublicKey: ``,
};

//
