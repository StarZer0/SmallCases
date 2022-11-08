# Source Map 原理

## Source Map 格式

> 可以在当前目录执行`npx webpack --config webpack.dev.conf.js`查看示例生成的 map 文件

```javascript
const sourceMap = {
  // source map的版本
  version: 3,
  // 转换后的文件名
  file: "main.dcea6b.js",
  // 记录位置信息的字符串
  mappings: ";;;;;;;;;;;;;;AAAO,SAASA,GAAG,CAACC,CAAC...",
  // 转换前的文件，可能存在多个文件合并
  sources: [
    "webpack:///./src/add.js",
    "webpack:///./src/multiplication.js",
    "webpack:///webpack/bootstrap",
    "webpack:///webpack/runtime/define property getters",
    "webpack:///webpack/runtime/hasOwnProperty shorthand",
    "webpack:///webpack/runtime/make namespace object",
    "webpack:///./src/main.js",
  ],
  // 转换前的源码
  sourcesContent: [
    "export function add(x, y) {\r\n  return x + y;\r\n}\r\n",
    "export function multiplication(x, y) {\r\n  return x * y;\r\n}\r\n",
    "...",
  ],
  // 转换前的所有变量名和属性名
  names: ["add", "x", "y", "multiplication", "console", "log"],
  // 转换前的文件所在目录，如果与转换前的文件在同一个目录，该项为空
  sourceRoot: "",
};
```

### mappings 属性

mappings 主要用于记录代码的位置信息, 主要从以下三个方面分析:

- 分号(";"): 分号主要用于标识行信息, 当前第几个分号即代表源码第几行的结尾，分号前面的内容即源码中该行的位置信息.
- 逗号(","): 逗号分隔的内容表示转换后源码的一个位置信息
- 位置信息: 每个位置信息用 VLQ 编码表示, 代表该位置对应的转换前的源码位置, 每个位置使用五位, 表示五个字段.
  > VLQ 编码是变长的，每一位可以由多个字符构成
  - 第一位: 该位置属于**转换后**的代码中列的位置
  - 第二位: 该位置属于 sources 属性中哪一个文件
  - 第三位: 该位置属于**转换前**代码的第几行
  - 第四位: 该位置属于**转换前**代码的第几列
  - 第五位(非必须): 该位置属于 names 属性中第几个变量
