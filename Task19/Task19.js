
var aqiData = {};
var numInputVal ;


function orderHandle(){
  var 
  $("li").each(function(index, element){
  var existNum = $(element).html();
  if (numInputVal==existNum){
    alert(numInputVal +"这个数字已经存在");
    isExist = false;
    return ;
  };
  })
}

function btnHandle(clickedBtn) {
  var btnID = $(clickedBtn).attr("id");
  if (btnID == "leftIn") {
    $("ul").prepend('<li id='+numInputVal+'>'+numInputVal+'</li>');
    //给新增的list增加点击删除事件
    delBtnHandle(numInputVal);
    
    var test = parseInt(numInputVal) +1;
    $("#aqi-num-input").val(test);
  } else if (btnID == "rightIn") {
    $("ul").append('<li id='+numInputVal+'>'+numInputVal+'</li>');
    //给新增的list增加点击删除事件
    delBtnHandle(numInputVal);

  } else if (btnID == "leftOut") {
    if($("ul").find("li").length){
      $("li").filter(":first").remove();
    } else{
      alert("亲，删的一点都不剩了哦");
    }
  } else if (btnID == "rightOut") {
    if($("ul").find("li").length){
       $("li").filter(":last").remove();
    } else{
      alert("亲，删的一点都不剩了哦");
    }
  }
} 

function delBtnHandle(numInputVal) {
  var numStr = numInputVal.toString()
  var liVar = $("#"+numStr);
  liVar.click(function delList () {
    liVar.remove();
  });
}

//检查输入值是否满足要求
function checkInputValue() {
  var 
  numInputVal = $.trim($("#aqi-num-input").val());
  //检验是否为正整数
  if((numInputVal<=0) || !(/^\d+$/.test(numInputVal))||(numInputVal>100)){
    alert(numInputVal +"，不是一个10-100正整数");
    return false;
  }
  //使用each检验是否重复输入
  var isExist=true;
  $("li").each(function(index, element){
    var existNum = $(element).html();
    if (numInputVal==existNum){
      alert(numInputVal +"这个数字已经存在");
      isExist = false;
      return ;
    };
  })
  return isExist;
}

//判断小方块的总元素数量
function checkListNum(){

}
 
function init() {
  //左侧入
  $("#leftIn").click(function(){
    //判断小方块个数
    if ($("ul").find("li").length<60) {
      if (checkInputValue()==true) {
        btnHandle(this);
      };
    } else{
      alert("亲，队列元素数量最多为60个哦")
    }
  });

  //右侧入
  $("#rightIn").click(function(){
    //判断小方块个数
    if ($("ul").find("li").length<60) {
      if (checkInputValue()) {
        btnHandle(this);
      };    
    } else{
      alert("亲，队列元素数量最多为60个哦")
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
