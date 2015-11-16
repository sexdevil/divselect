# divselect
新浪移动端divselect 原生实现 

调用方式：
require(['divselect.js'], function (divselect) {
   
   divselect(
           document.getElementById("horo"),  //传入select元素
           {outterClass:'divselect_outter'}  //外层div的class 自定义宽度高度行高等属性，position务必为relative
     )
   
});