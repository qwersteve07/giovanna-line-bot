const path = require("path");

module.exports = [
  {
    target: "node",
    entry: "./linebot/app.js",
    output: {
      filename: "app.js",
      path: path.resolve(__dirname, "dist/linebot"),
    },
  },
  {
    target: "node",
    entry: "./temp/server.js",
    output: {
      filename: "server.js",
      path: path.resolve(__dirname, "dist/backend"),
    },
  },
];
