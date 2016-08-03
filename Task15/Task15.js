
/**
 * getData方法
 * 读取id为source的列表，获取其中城市名字及城市对应的空气质量
 * 返回一个数组，格式见函数中示例
 */
function getData() {
        var ulVar = document.getElementById("source");
        var data = [];
        for (var i = 0; i < ulVar.childElementCount; i++) {
            var liVar = ulVar.children[i];
            var strCity = liVar.innerHTML.split("空气质量：")[0];
            var num = Number(liVar.children[0].innerHTML);
            data.push([strCity, num]);
        }
  

//         var ulVar = $('#source');
//         alert(ulVar);
//         var data = [];
//         for (var i = 0; i < ulVar.childElementCount; i++) {
//             var liVar = ulVar.children[i];
//             var strCity = liVar.innerHTML.split("空气质量：")[0];
//             var num = Number(liVar.children[0].innerHTML);
//             data.push([strCity, num]);
//         }
  
 
    
        return data;

}

/**
 * sortAqiData
 * 按空气质量对data进行从小到大的排序
 * 返回一个排序后的数组
 */
function sortAqiData(data) {
      data.sort(sortMethod);
      return data;
}
//给排序函数添加一个排序的依据
function sortMethod(a, b) {
    return b[1] - a[1];
}

/**
 * render
 * 将排好序的城市及空气质量指数，输出显示到id位resort的列表中
 * 格式见ul中的注释的部分
 */
function render(data) {
  var apiData = data;
  var oUl = $('#resort');
  var str= '';
  var c= 0;
  for(var i=0;i<apiData.length; i++) {
      str += '<li>' + '第' + (++c) + '名：' + apiData[i][0] + ' ' + apiData[i][1] + '</li>';
  }
  oUl.append(str);
}

function btnHandle() {
  var aqiData = getData();
  aqiData = sortAqiData(aqiData);
  render(aqiData);
}


function init() {
  $("#sort-btn").on('click', function(){
    btnHandle();
  });
  // 在这下面给sort-btn绑定一个点击事件，点击时触发btnHandle函数
}

init();