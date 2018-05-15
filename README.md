## How to use（demo.js）
```
//导入wxml和标准json互转的库
var wxml2json = require("./wxml2json").wxml2json;
var json2wxml = require('./wxml2json').json2wxml;
var nanoid = require('nanoid');

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
console.log(JSON.stringify(origin_json,null,4));

//新格式的json
var new_json = generate_json(origin_json);
console.log(JSON.stringify(new_json,null,4));

//恢复成标准的json
var rec_json = recover_json(new_json);
console.log(JSON.stringify(rec_json,null,4));

//恢复为wxml代码
var rec_wxml = json2wxml(rec_json);
console.log(rec_wxml);

```

## 接口API（methods.js）
```
// 输入组件id和新格式的json，从父组件children移除组件id及子子组件id
function remove(id, json)

//输入组件id，它的子组件id，info数组，将子子组件id从父组件children移除
function findParent_json_and_remove(id, children_id, father_id, info)

//输入组件id以及它的父组件id，将组件和它的子子组件id插入到父组件children
function insert(id, father_id, json)

//输入组件id和它的子组件id、父组件id，info数组，将子子组件id加入父组件children
function findParent_json_and_insert(id,children_id,father_id, info)

//输入原始标准json，输出新格式json
function generate_json(origin_json)

//为上者生成过程所调用方法,输入为新格式的json，父组件id，子组件id,还有标准格式json
function identify_json(id_json, father_id, child_id, data)

//输入新格式json，输出标准格式json
function recover_json(new_json)

//为上者生成过程中所调用方法，输入为新格式json，寻找子组件的id，
//还有已经添加的子组件child_maps，防止重复添加(由于父组件存的不是直接子组件的id)
function findChild_json_and_insert(new_json, id, child_maps)
```