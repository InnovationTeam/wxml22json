// 测试用的wxml代码
var wxml = "<view class='section'>\
<view class='section__title'>flex-direction: row</view>\
<view class='flex-wrp' style='flex-direction:row;'>\
  <view class='flex-item bc_green'>1</view>\
  <view class='flex-item bc_red'>2</view>\
  <view class='flex-item bc_blue'>3</view>\
</view>\
</view>"

var wxml22json = require("./wxml22json");
var wxml2json = wxml22json.wxml2json;
var json2wxml = wxml22json.json2wxml;
var move = wxml22json.move;


let json = wxml2json(wxml);
let new_wxml = json2wxml(json);

let from_id = json["children"][2];
let to_id = json["children"][4];
console.log("from_id " + from_id + '\n' + "to_id " + to_id + '\n');

let t = move(from_id, to_id, json);
console.log(t[1]);