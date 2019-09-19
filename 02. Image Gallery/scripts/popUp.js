function popUp(winURL) {
    window.open(winURL, "popup", "width=320, height=480");
}

window.onload = function() {  //当页面加载完之后加载popup
    if (!document.getElementsByClassName) return false;   //如果browser不支持getElementsByClassName则离开，不运用该JavaScript语句，即弹出新自定义页面。
    var lnks = document.getElementsByClassName("popup");  //找到class为popup的所有元素全放入一个数组里
    for (var i=0; i<lnks.length; i++) {                  //经历数组所有的元素
        if (lnks[i].getAttribute("class") == "popup") {  //找到class为popup
            lnks[i].onclick = function() {
                popUp(this.getAttribute("href"));
                return false;
            }
        }
    }
}


function addLoadEvent(func) {
    var oldonload = window.onload;
    if (typeof window.onload != 'function') {
         window.onload =func;
    } else {
         window.onload = function() {
              oldonload();
              func();
         } 
    }
}
addLoadEvent(prepareGallery);