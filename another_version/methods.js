var nanoid = require('nanoid');
// 输入组件id和新格式的json，从父组件children移除组件id及子子组件id
module.exports.remove = function remove(id, json){
    let children_id = json["info"][id].children;
    let father_id = json["info"][id].fatherID;
    findParent_json_and_remove(id, children_id, father_id, json["info"]);
}

//输入组件id，它的子组件id，info数组，将子子组件id从父组件children移除
function findParent_json_and_remove(id, children_id, father_id, info){
    if(father_id === 'root')
        return;
    let temp_ids = new Array();
    console.log(father_id);
    for(let i=0;i<info[father_id].children.length;i++){
        var flag =new Boolean();
        flag=false;
        if(info[father_id].children[i] !== id){
            flag=false;
            for(let k=0;k<children_id.length;k++){
                if(info[father_id].children[i] === children_id[k]){
                    flag = true;
                    break;
                }
            }
            if(flag === false)
                temp_ids.push(info[father_id].children[i]);
        }
    }
    info[father_id].children = temp_ids;
    findParent_json_and_remove(id, children_id, info[father_id].fatherID, info);
}

//输入组件id以及它的父组件id，将组件和它的子子组件id插入到父组件children
module.exports.insert = function insert(id, father_id, json){
    let children_id = json["info"][id].children;
    json["info"][id].fatherID = father_id;
    findParent_json_and_insert(id,children_id,father_id,json["info"]);
}

//输入组件id和它的子组件id、父组件id，info数组，将子子组件id加入父组件children
function findParent_json_and_insert(id,children_id,father_id, info){
    if(father_id === 'root')
        return;
    if(info[father_id].children.indexOf(id) === -1){
        info[father_id].children.push(id);
        console.log(children_id);
    for(let j=0;j<children_id.length;j++){
        if(info[father_id].children.indexOf(children_id[j]) === -1)
            info[father_id].children.push(children_id[j]);
        }
    }
    if(father_id !== 'root')
        findParent_json_and_insert(id,children_id,info[father_id].fatherID,info);
}

//输入原始标准json，输出新格式json
module.exports.generate_json = function generate_json(origin_json){
  var id_json = {};
  var root_id = 'root';
  for(var i=0; i<origin_json.children.length; i++) 
  { 
  if(!id_json.hasOwnProperty("children"))
      id_json["children"] = new Array();
  id_json["children"].push(nanoid(10)); 
  }
  id_json["info"] = {};
  for(var i=0; i<origin_json.children.length; i++) 
  { 
    let t = identify_json(id_json, root_id, id_json["children"][i], origin_json.children[i]);
    id_json["children"] = id_json["children"].concat(t[0]);
    id_json["info"][t[1].id] = t[1]; 
  }  
  return id_json;
}

//为上者生成过程所调用方法,输入为新格式的json，父组件id，子组件id,还有标准格式json
function identify_json(id_json, father_id, child_id, data){
  var temp = {};
  temp["id"] = child_id;
  temp["tagName"] = data["tag"];
  temp["children"] = new Array();
  // 文本text没有childrem
  if(data.hasOwnProperty("children")){
  for(var i=0; i<data.children.length; i++) 
    { 
        if(!temp.hasOwnProperty("children"))
            temp["children"] = new Array();
      temp["children"].push(nanoid(10)); 
    }
  }
  temp["fatherID"] = father_id;
  temp["cfgData"] = {};
  for(var k in data["attr"]){
      if(data["attr"][k] === "true")
         data["attr"][k] = true;
      if(data["attr"][k] === "false")
         data["attr"][k] = false;
      temp["cfgData"][k] = data["attr"][k];
  }
  temp["type"] = data["type"];
  if(temp["type"] === "text"){
      temp["cfgData"]["text"] = data["text"];
  }
    // 文本text没有childrem
  if(data.hasOwnProperty("children")){
    for(var i=0; i<data.children.length; i++) 
    {   
        let t =  identify_json(id_json, temp["id"], temp["children"][i], data.children[i]);
        temp["children"] = temp["children"].concat(t[0]);
        id_json["info"][t[1].id] = t[1];
    }  
 }
  var ids_temp = new Array();
  ids_temp.push(temp["children"]);
  ids_temp.push(temp);
  return ids_temp;
}

//输入新格式json，输出标准格式json
module.exports.recover_json = function recover_json(new_json){
    let origin_json = {};
    origin_json["type"] = 'root';
    origin_json["children"] = new Array();
    let child_ids =  new_json["children"];
    let child_maps = new Array();
    for(let i=0;i<child_ids.length;i++){
        child_maps[child_ids[i]]=0;
    }
    for(let i=0;i<child_ids.length;i++){
        if(child_maps[child_ids[i]] === 0)
            origin_json["children"].push(findChild_json_and_insert(new_json, child_ids[i], child_maps));
    }
    return origin_json;
}

//为上者生成过程中所调用方法，输入为新格式json，寻找子组件的id，
//还有已经添加的子组件child_maps，防止重复添加(由于父组件存的不是直接子组件的id)
function findChild_json_and_insert(new_json, id, child_maps){
    if(child_maps[id] ===0)
        child_maps[id] = 1;
    let temp ={};
    temp["id"] = id;
    temp["type"] = new_json["info"][id]["type"];
    if(temp["type"] !== 'text'){
        temp["tag"] = new_json["info"][id]["tagName"];
        temp["attr"] = new_json["info"][id]["cfgData"];
        temp["attr"]["id"] = id;
        let child_ids = new_json["info"][id]["children"];
        temp["children"] = new Array();
        for(let i=0;i<child_ids.length;i++){
            if(child_maps[child_ids[i]] === 0)
                 temp["children"].push(findChild_json_and_insert(new_json, child_ids[i], child_maps));
        }
    }
    else{
        temp["text"] = new_json["info"][id]["cfgData"]["text"];
    }
    return temp;
}
