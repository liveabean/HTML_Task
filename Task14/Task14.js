var aqiData = [
  ["北京", 90],
  ["上海", 50],
  ["福州", 10],
  ["广州", 50],
  ["成都", 90],
  ["西安", 100]
];
(function () {
  /*
  在注释下方编写代码
  遍历读取aqiData中各个城市的数据
  将空气质量指数大于60的城市显示到aqi-list的列表中
  */
  // 给排序函数添加一个排序的依据
  function sortMethod(a, b) {
    return b[1] - a[1];
  }
  aqiData.sort(sortMethod);
  var ulVar = document.getElementById('aqi-list');
  var c = 0;
  for (var i = 0; i < aqiData.length; ++i) {
    var liVar = document.createElement("li");
    if (aqiData[i][1] >= 60) {
      liVar.innerHTML = '第' + (++c) + '名：' + aqiData[i][0] + ' ' + aqiData[i][1];
      ulVar.appendChild(liVar);
    }
  }
})();