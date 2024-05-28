import path from "path";

export default {
  mode: "production",
  entry: "./server.js",
  output: {
    path: path.join(process.cwd(), "dist"),
    publicPath: "/",
    filename: "final.js",
  },
  target: "node",
};
