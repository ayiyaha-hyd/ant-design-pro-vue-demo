module.exports = {
  presets: ["@vue/cli-plugin-babel/preset"],
  plugins: [
    // import 按需加载
    [
      "import",
      { libraryName: "ant-design-vue", libraryDirectory: "es", style: true },
    ],
  ],
};
