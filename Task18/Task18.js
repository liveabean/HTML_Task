
var aqiData = {};
var numInputVal ;

function btnHandle(clickedBtn) {
  var btnID = $(clickedBtn).attr("id");

  if (btnID == "leftIn") {
    $("ul").prepend('<li id='+numInputVal+'>'+numInputVal+'</li>');
    //给新增的list增加点击删除事件
    delBtnHandle(numInputVal);

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

function checkInputValue() {
  numInputVal = $.trim($("#aqi-num-input").val());
  //检验是否为正整数
  if((numInputVal<=0) || !(/^\d+$/.test(numInputVal))){      
    alert(numInputVal +"，请输入一个正整数");
    return false;
  }
  if (numInputVal>1000000000) {
    alert(numInputVal +"数值太大，请尽量小于1000000000");
    return false;
  };
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

function init() {
  $("#leftIn").click(function(){
    if (checkInputValue()==true) {
     btnHandle(this);
    };
  });  
  $("#rightIn").click(function(){
    if (checkInputValue()) {
      btnHandle(this);
    };
  });  
  $("#leftOut").click(function(){
    btnHandle(this);
  });  
  $("#rightOut").click(function(){
    btnHandle(this);
  });
}
init();
