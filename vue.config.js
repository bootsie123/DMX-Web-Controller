process.env.VUE_APP_VERSION = require("./package.json").version;

module.exports = {
  outputDir: "./dist",
  pages: {
    index: {
      entry: "./src/main.js",
      title: "DMX Web Controller"
    }
  },
  css: {
    loaderOptions: {
      scss: {
        prependData: "@import '@/assets/main.scss';"
      }
    }
  }
};
