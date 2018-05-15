## 使用方法（demo.js）
```
//导入wxml和标准json互转的库
var wxml2json = require("wxml2json").wxml2json;
var json2wxml = require('wxml2json').json2wxml;
var nanoid = require('nanoid');
var methods = require('./methods');

// 测试用的wxml代码
var wxml = "<view class='section'>\
<view class='section__title'>flex-direction: row</view>\
<view class='flex-wrp' style='flex-direction:row;'>\
  <view class='flex-item bc_green'>1</view>\
  <view class='flex-item bc_red'>2</view>\
  <view class='flex-item bc_blue'>3</view>\
</view>\
</view>"

//标准json
var origin_json = wxml2json(wxml);
// console.log(JSON.stringify(origin_json,null,4));

//新格式的json
var new_json = methods.generate_json(origin_json);
// console.log(JSON.stringify(new_json,null,4));

//恢复成标准的json
var rec_json = methods.recover_json(new_json);
// console.log(JSON.stringify(rec_json,null,4));

//恢复为wxml代码
var rec_wxml = json2wxml(rec_json);
console.log(rec_wxml);

// 将id为f_id的组件移动到id为t_id的组件下
var f_id = new_json["children"][2];
var t_id = new_json["children"][4];
console.log("f_id " + f_id + '\n' + "t_id " + t_id + '\n');
//拖拽某个组件，先执行移除id操作
methods.remove(f_id, new_json);
// console.log(JSON.stringify(new_json,null,4));
//再执行插入id操作
methods.insert(f_id, t_id, new_json);
//输出结果
// console.log(JSON.stringify(new_json,null,4));

//恢复成标准的json
var rec_json = methods.recover_json(new_json);
// console.log(JSON.stringify(rec_json,null,4));

//恢复为wxml代码
var rec_wxml = json2wxml(rec_json);
console.log(rec_wxml);

```

## 接口API（methods.js）
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