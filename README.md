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

## 所有函数的说明（methods.js）
```
// 输入组件id和新格式的json，从父组件children移除组件id
module.exports.remove = function remove(id, json)

//输入组件id，info数组，将子组件id从父组件children移除
function findParent_json_and_remove(id, father_id, info)

//输入组件id以及它的父组件id，将组件id插入到父组件children
module.exports.insert = function insert(id, father_id, json)

//输入组件id、父组件id，info数组，将子子组件id加入父组件children
function findParent_json_and_insert(id,father_id, info)

//输入原始标准json，输出新格式json
function generate_json(origin_json)

//为上者生成过程所调用方法,输入为新格式的json，父组件id，子组件id,还有标准格式json
function identify_json(id_json, father_id, child_id, data)

//输入新格式json，输出标准格式json
function recover_json(new_json)

//为上者生成过程中所调用方法，输入为新格式json，寻找子组件的id，
//还有已经添加的子组件child_maps，防止重复添加(由于根存的不是所有子组件的id)
function findChild_json_and_insert(new_json, id, child_maps)
```

## 另一个版本的实现为children里放的是直接子组件和非直接子组件
### 递归处理情况比较复杂，有参考价值，详情可见another_version