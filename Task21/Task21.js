
var apiHobbyData = {};
var inputHobbys;
var maxInputNum = 60;
var tag1Data = {};
var tag2Data = {};


function renderData(){
  var liData = apiHobbyData;
  var Ul = $("#hobbyUl");
  var lists= '';
  var c= 0;
  for(var i=0;i<liData.length; i++) {
    var listStr = liData[i];
    lists += "<li>"+listStr+"</li>";  
  }
  $("textarea").val("");
  Ul.empty();
  Ul.append(lists);
}

function btnHandle(clickedBtn) {  
  inputHobbys = $.trim($("textarea").val());
  var arrWord = inputHobbys.split(/[^0-9a-zA-Z\u4e00-\u9fa5]+/).filter(function(e) {
      if (e != null && e.length > 0) {
          return true;
      } else {
          return false;
      }
  });
  apiHobbyData = apiHobbyData.concat(arrWord);
  apiHobbyData = apiHobbyData.unique1();
  if (apiHobbyData.length>10) {
    apiHobbyData.shift();
  }
  renderData();
}

function rendertag1Data () {
  $("#tag1Ul").find("li").remove();
  var lists = "";
  for (var i = 0; i < tag1Data.length; i++) {
    lists += "<li data="+tag1Data[i]+">"+tag1Data[i]+"</li>";
  }
  $("#clearTag1").before(lists);
  var tag1Lists = $("#tag1Ul").find("li");
  tag1Lists.click(function(event) {
    var deleteData = $(this).html().split("删除",2)[1];
    $.each(tag1Data, function(index, val) {
      if (deleteData==val){
        tag1Data.splice(index,1);
        return ;
      }
    });
    rendertag1Data();
  });
  tag1Lists.mouseover(function(event) {
    var text = $(this).html();
    $(this).html("删除"+text);
  });
  tag1Lists.mouseout(function(event) {
    var text = $(this).attr("data");
    $(this).html(text);
  });
}

function rendertag2Data () {
  $("#tag2Ul").find("li").remove();
  var lists = "";
  for (var i = 0; i < tag2Data.length; i++) {
    lists += "<li data="+tag2Data[i]+">"+tag2Data[i]+"</li>";
  }
  $("#clearTag2").before(lists);
  var tag2Lists = $("#tag2Ul").find("li");
  tag2Lists.click(function(event) {
    var deleteData = $(this).html().split("删除",2)[1];
    $.each(tag2Data, function(index, val) {
      if (deleteData==val){
        tag2Data.splice(index,2);
        return ;
      }
    });
    rendertag2Data();
  });
  tag2Lists.mouseover(function(event) {
    var text = $(this).html();
    $(this).html("删除"+text);
  });
  tag2Lists.mouseout(function(event) {
    var text = $(this).attr("data");
    $(this).html(text);
  });
}


function tag1Handle(event){
  var value = event.target.value;
  var isMatch = (value.match(/,|[ ]|，/)!=null)||(event.keyCode===13);
  if (isMatch){
    var subValue = event.keyCode===13? value:value.substring(0,value.length-1);
    //判断是否已经重复
    var isExist = -1;
    $.each(tag1Data, function(index, val) {
      if (val == subValue) {
        alert(val + "已经有重复数据");
        isExist = 1;
      }
    });
    $("#tag1").val("");
    if (isExist==1) {
      return;
    }    
    if (subValue.length>0) {
      tag1Data.push(subValue);
      if (tag1Data.length>10) {
        tag1Data.shift();
      }
      rendertag1Data();
    }
  }
}

function tag2Handle(event){
  var value = event.target.value;
  var isMatch = (value.match(/,|[ ]|，/)!=null)||(event.keyCode===13);
  if (isMatch){
    var subValue = event.keyCode===13? value:value.substring(0,value.length-1);
    //判断是否已经重复
    var isExist = -1;
    $.each(tag2Data, function(index, val) {
      if (val == subValue) {
        alert(val + "已经有重复数据");
        isExist = 1;
      }
    });
    $("#tag2").val("");
    if (isExist==1) {
      return;
    }
    if (subValue.length>0) {
      tag2Data.push(subValue);
      if (tag2Data.length>10) {
        tag2Data.shift();
      }
      rendertag2Data();
    }
  }
}

function init() {
  apiHobbyData = [];
  tag1Data = [];
  tag2Data = [];
  //确认兴趣爱好
  $("#confirm").click(function(){
    btnHandle(this);
  });
  $("#tag1").keyup(function(event) {
    tag1Handle(event);
  });
  $("#tag2").keyup(function(event) {
    tag2Handle(event);
  });
}
init();

//去重
Array.prototype.unique1 = function(){
 var res = [this[0]];
 for(var i = 1; i < this.length; i++){
  var repeat = false;
  for(var j = 0; j < res.length; j++){
   if(this[i] == res[j]){
    repeat = true;
    break;
   }
  }
  if(!repeat){
   res.push(this[i]);
  }
 }
 return res;
};