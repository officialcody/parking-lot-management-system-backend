import path from "path";

export default {
  mode: "production",
  entry: "./index.js",
  resolve: {
    fallback: {
      aws4: false,
      "mongodb-client-encryption": false,
      snappy: false,
      "gcp-metadata": false,
      "@aws-sdk/credential-providers": false,
      "@mongodb-js/zstd": false,
      kerberos: false,
    },
  },
  externals: {
    express: "express",
  },
  output: {
    path: path.join(process.cwd(), "dist"),
    publicPath: "/",
    filename: "final.js",
  },
  target: "node",
};
