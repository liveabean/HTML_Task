
var aqiData = {};
var numInputVal;
var maxInputNum = 60;

function bubbleSort(arr) {
  newarr = arr.slice();
  if (newarr.length <= 2) return newarr;
  for (var i = 0; i < newarr.length - 1; i++) {
    for (var j = 0; j < newarr.length - i - 1; j++) {
      if (newarr[j] > newarr[j + 1]) {
        newarr[j] = [newarr[j + 1], newarr[j + 1] = newarr[j]][0];
      }
    }
  }
  return newarr;
}

function orderHandle(){
  if (apiData.length<10) {
    alert("输入10个数据以上才能排序哦");
  } else{
    var orderData = bubbleSort(apiData);
    renderData(orderData);  
  } 
}

function renderData(data){
  var liData = data;
  var Ul = $("ul");
  var str= '';
  var c= 0;
  for(var i=0;i<liData.length; i++) {
    var listHeight = parseInt(liData[i])*2;
    var marginTop = 200 - listHeight;
    str += '<li style="height:'+listHeight+'px;margin-top:'+marginTop+'px" id='+liData[i]+'></li>';
  }
  Ul.empty();
  Ul.append(str);
  //给每个按钮添加删除事件
  $('li').click(function(event) {
    delListHandle(this);
  });
}

function btnHandle(clickedBtn) {  
  var btnID = $(clickedBtn).attr("id");
  if (btnID == "leftIn") {
    apiData.unshift(numInputVal);
  } else if (btnID == "rightIn") {
    apiData.push(numInputVal);
  } else if (btnID == "leftOut") {
    if (apiData.length>0) {
      apiData.shift();
    } else{
      alert("亲，删得一点都不剩了哦");
    }
  } else if (btnID == "rightOut") {
    if (apiData.length>0) {
      apiData.pop();
    } else{
      alert("亲，删得一点都不剩了哦");
    }

  }
  renderData(apiData);
}

function delListHandle(clickedList) {
  var deleteData = $(clickedList).attr("id");
  for(var index in apiData){
    if (deleteData==apiData[index]){
      apiData.splice(index,1);
    }
  }
  renderData(apiData);
}

//检查输入值是否满足要求
//inputValue：输入值
//existValues：数值数组，用于判断是否重复
//maxNum:最大的个数限制
function checkInputValue(inputValue,existValues,maxNum) {
  var checkResult ={
    "code":-1, //-1表示没有经过检查或检查不全面
    "msg":""
  };
  
  //1.检验是否为正整数
  if((inputValue<=0) || !(/^\d+$/.test(inputValue))||(inputValue>100)){ 
    checkResult.msg = inputValue +"，不是一个10-100正整数";
    checkResult.code = 400;
    return checkResult;
  }
  //2.判断输入值是否超过maxNum
  if (existValues.length>=maxNum) {
    checkResult.msg = "亲，不得超过"+maxNum+"个哦(⊙o⊙)";
    checkResult.code = 400;
    return checkResult;
  }
  //3.使用for循环检验是否重复输入
  for(var index in existValues){
    var existValue = existValues[index];
    if (inputValue==existValue){
      checkResult.msg = inputValue +"这个数字已经存在";
      checkResult.code = 400;
      return checkResult;
    }
  }
  //判断是否符合该方法的检验
  checkResult.msg = inputValue + "符合要求";
  checkResult.code = 200;
  return checkResult;
}

//判断小方块的总元素数量
function checkListNum(){

}
 
function init() {
  apiData =  [11, 22, 44, 100, 99, 88, 66, 55, 33, 77,];
  renderData(apiData);
  //左侧入
  $("#leftIn").click(function(){
    numInputVal = $.trim($("#aqi-num-input").val());
    var checkResult = checkInputValue(numInputVal,apiData,maxInputNum);
    if (checkResult.code==200) {
      btnHandle(this);
    } else{
      alert(checkResult.msg);
    }
  });

  //右侧入
  $("#rightIn").click(function(){
    numInputVal = $.trim($("#aqi-num-input").val());
    var checkResult = checkInputValue(numInputVal,apiData,maxInputNum);
    if (checkResult.code==200) {
      btnHandle(this);
    } else{
      alert(checkResult.msg);
    }
  });  

  //左侧出
  $("#leftOut").click(function(){
    btnHandle(this);
  });  

  //右侧出
  $("#rightOut").click(function(){
    btnHandle(this);
  });

  //点击了排序按钮
  $("#order").click(function(){
    orderHandle();
  });
}
init();
