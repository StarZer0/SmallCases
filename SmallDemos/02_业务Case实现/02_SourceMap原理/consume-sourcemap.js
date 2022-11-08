const fs = require("fs/promises");
const path = require("path");
const { SourceMapConsumer, SourceNode } = require("source-map");

const resolvePath = (filePath) => path.resolve(__dirname, filePath);

(async () => {
  // 读取sourceMap内容
  const sourceMap = await fs.readFile(resolvePath("dist/main.js.map"), "utf-8");
  const bundledFile = await fs.readFile(resolvePath("dist/main.js"), "utf-8");

  const consumer = await new SourceMapConsumer(sourceMap);
  const node = SourceNode.fromStringWithSourceMap(bundledFile, consumer);

  node.walk((code, loc) => {
    console.log(`WALK: \n\t${code}\n\t${JSON.stringify(loc)}`);
  });
})();
