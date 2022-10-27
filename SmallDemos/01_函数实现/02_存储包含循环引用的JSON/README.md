# 存储包含循环引用的 JSON

设计一个 JSON 序列化与反序列化工具，能够保证 JSON 数据中循环引用的数据格式不被破坏.

## 测试用例

1. case1:

```javascript
// 原始数据
const root = {
  name: "root",
};
root.value = root;
```

期望:

- 序列化不报错
- 反序列化后的值和序列化之前一致

```javascript
const { stringify, parse } = require("JSON");
isEqual(parse(stringify(root)), root);
```
