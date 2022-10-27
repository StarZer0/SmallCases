const isObject = val => Object.prototype.toString.call(val) === '[object Object]';

// 生成循环引用的key值
function generateCircularKey(n) {
  return `~_[Circular ${n}]`
}

// 生成默认缓存值
function normalizeCircular(key = '', quote = false) {
  return {
    key: key, // 循环引用对象key
    quote: quote // 是否被循环引用
  }
}

exports.stringify = function stringify(obj) {
  if (!isObject(obj)) return ''

  // 缓存对象引用，并判断是否被循环引用
  let id = 0;
  const circularMap = new Map();
  // 默认根对象是被循环引用的，便于解析
  circularMap.set(obj, normalizeCircular(generateCircularKey(id++), true))

  // 递归遍历对象属性
  function recursion(obj) {
    Object.keys(obj).forEach(key => {
      const val = obj[key];

      if (isObject(val)) {
        if (circularMap.has(val)) {
          const circular = circularMap.get(val);
          // 如果发现是循环引用，添加key并标识引用
          if (!circular.quote) {
            circular.key = generateCircularKey(id++)
            circular.quote = true;
          }
          // 替换被引用的值为指定key
          obj[key] = circular.key
        } else {
          // 将当前对象缓存
          circularMap.set(val, normalizeCircular())
          recursion(val)
        }
      }
    })
  }
  recursion(obj)

  // 遍历缓存列表，将所有循环引用的对象添加到输出结果中
  const JSONData = {}
  circularMap.forEach((value, key) => {
    if (value.quote) {
      JSONData[value.key] = key
    }
  })

  return JSON.stringify(JSONData)
}

exports.parse = function parse(jsonStr) {
  const circularJSON = JSON.parse(jsonStr)

  const rootCircularKey = generateCircularKey(0);
  
  let stack = [rootCircularKey];
  function recursion(obj) {
    Object.keys(obj).forEach(key => {
      const val = obj[key];

      if (typeof val === 'string' && circularJSON[val]) {
        if (stack.includes(val)) {
          obj[key] = circularJSON[val];
        } else {
          stack.push(val);
          const cJSON = recursion(circularJSON[val])
          circularJSON[val] = cJSON;
          obj[key] = cJSON
        }
      } else if (isObject(val)) {
        recursion(obj);
      }
    })
    
    return obj;
  }

  return recursion(circularJSON[rootCircularKey])
}