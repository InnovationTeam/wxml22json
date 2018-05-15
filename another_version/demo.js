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
