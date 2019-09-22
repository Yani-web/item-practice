function prepareSlideshow() {
    if (!document.getElementsByTagName) return false;
    if (!document.getElementById) return false;
    if (!document.getElementById("linklist")) return false;
//确保元素存在 js自建占位图
    var slideshow = document.createElement("div");
    slideshow.setAttribute("id","slideshow");
    var preview = document.createElement("img");
    preview.setAttribute("src","images/1.jpg");
    preview.setAttribute("alt","this is an image designed by WLOP");
    preview.setAttribute("id", "preview");
    slideshow.appendChild(preview);
    var list = document.getElementById("linklist");
    insertAfter(slideshow, list);
//为图片设置css
    var preview = document.getElementById("preview");
    preview.style.position="absolute";
//调用ol中所有的a
    var list = document.getElementById("linklist");
    var links = list.getElementsByTagName("a");
    links[0].onmouseover = function() {
        moveElement("preview", 0, 0, 5);
    }
    links[1].onmouseover = function() {
        moveElement("preview", -600, 0, 5);
    }
    links[2].onmouseover = function() {
        moveElement("preview", -1200, 0, 5);
    }
    links[3].onmouseover = function() {
        moveElement("preview", -1800, 0, 5);
    } 

   
}

function insertAfter (newElement, targetElement) {
    var parent = targetElement.parentNode;
    if (parent.lastChild == targetElement) {
        parent.appendChild(newElement);
    } else {
        parent.insertBefore(newElement, targetElement.nextSibling);
    }
}


function moveElement(elementID, final_x, final_y, interval) {  //final_x, final_y为元素的left和top的最终px
    if (!document.getElementById) return false;
    if (!document.getElementById(elementID)) return false;
    var elem = document.getElementById(elementID);
    if (elem.movement) { //清除行为延迟
        clearTimeout(elem.movement);
    }
    if (!elem.style.left) {
        elem.style.left="0px";
    }
    if (!elem.style.top) {
        elem.style.top="0px";
    }
    var xpos = parseInt(elem.style.left); //把top和left的具体数值提取出来
    var ypos = parseInt(elem.style.top);
    var dist = 0;
    if (xpos == final_x && ypos == final_y) {      //当top和left的px到了实际位置 那么停止；如果没到就++
        return true; 
      }
    if (xpos < final_x) {
        dist = Math.ceil((final_x - xpos)/10);
        xpos = xpos + dist;
    }
    if (xpos > final_x) {
        dist = Math.ceil((xpos - final_x)/10);
        xpos = xpos - dist;
    }
    if (ypos < final_y) {
        dist = Math.ceil((final_y - ypos)/10);
        ypos = ypos + dist;
    }
    if (ypos > final_y) {
        dist = Math.ceil((ypos - final_y)/10);
        ypos = ypos - dist;
        }

    elem.style.left = xpos + "px";
    elem.style.top = ypos + "px";
    var repeat = "moveElement('"+elementID+"', "+final_x+", "+final_y+", "+interval+")";
    elem.movement = setTimeout(repeat, interval);
}


function addLoadEvent(func) {
    var oldload = window.onload;
    if (typeof window.onload != 'function') {
        window.onload = func;
    } else {
        window.onload = function() {
            oldload();
            func();
        }
    }
} 
addLoadEvent(prepareSlideshow);
addLoadEvent(moveElement);

