# 存储包含循环引用的JSON

设计一个JSON序列化与反序列化工具，能够保证JSON数据中循环引用的数据格式不被破坏.

## 测试用例

1. case1:

```javascript
// 原始数据
const data = {
    name: 'case1',
    data: data
}
```
