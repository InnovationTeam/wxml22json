## 使用API
```
var wxml22json = require("./wxml22json");

//wxml转新格式json
var wxml2json = wxml22json.wxml2json;
let json = wxml2json(wxml);//返回json

//新格式json转wxml
var json2wxml = wxml22json.json2wxml;
let wxml = json2wxml(json);//返回wxml

//移动组件
var move = wxml22json.move;
let t = move(from_id, to_id, json);
返回t[0]为移动后的json，t[1]为移动后的wxml代码
```

## 所有函数的注释请见（methods.js）

## 另一个版本的实现为children里放的是直接子组件和非直接子组件
### 递归处理情况比较复杂，有参考价值，详情可见another_version