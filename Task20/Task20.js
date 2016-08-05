
var aqiData = {};
var numInputVal;
var maxInputNum = 60;

function renderData(searchStr){
  var liData = apiData;
  var Ul = $("ul");
  var lists= '';
  var c= 0;
  for(var i=0;i<liData.length; i++) {
    var listStr = liData[i];
    if (searchStr!=null&&searchStr.length>0) {
      if (listStr.search(searchStr)>0) {
        listStr = listStr.replace(new RegExp(searchStr, "g"), "<span>"+searchStr+"</span>");
      }
    }
   lists += "<li>"+listStr+"</li>";  
  }
  Ul.empty();
  Ul.append(lists);
}

function btnHandle(clickedBtn) {  
  numInputVal = $.trim($("textarea").val());
  var arrWord = numInputVal.split(/[^0-9a-zA-Z\u4e00-\u9fa5]+/).filter(function(e) {
      if (e != null && e.length > 0) {
          return true;
      } else {
          return false;
      }
  });
  var btnID = $(clickedBtn).attr("id");
  if (btnID == "leftIn") {
    apiData = arrWord.concat(apiData);
  } else if (btnID == "rightIn") {
    apiData = apiData.concat(arrWord);
  } else if (btnID == "leftOut") {
    if (apiData.length>0) {
      apiData.shift();
    } else{
      alert("亲，删得一点都不剩了哦");
      return;
    }
  } else if (btnID == "rightOut") {
    if (apiData.length>0) {
      apiData.pop();
    } else{
      alert("亲，删得一点都不剩了哦");
      return;
    }
  }
  renderData();
}

function searchBtnHandle () {
  var searchStr = $.trim($("#searchStr").val());
  if (searchStr.length>0&&searchStr!=null) {   
    // renderSearchStr(searchStr);
    renderData(searchStr);
  } else{
    alert("请先输入搜索条件");
  }
}

function init() {
  apiData = [];
  //左侧入
  $("#leftIn").click(function(){
    btnHandle(this);
  });

  //右侧入
  $("#rightIn").click(function(){
    btnHandle(this);
  });  

  //左侧出
  $("#leftOut").click(function(){
    btnHandle(this);
  });  

  //右侧出
  $("#rightOut").click(function(){
    btnHandle(this);
  });

  //查询
  $("#search").click(function() {
    searchBtnHandle();
  });
}
init();
