//目录 *以下所有不需要参数的函数都要先加载addLoadEvent 
//1. addLoadEvent    //同时加载多个js
//2. insertAfter 
//3. displayAbbreviations 缩略词一览表
//4. stripeTable  表格奇偶行样式
//5. styleElementSiblings



//1. addLoadEvent    //同时加载多个js
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
addLoadEvent(firstFunction);
addLoadEvent(secondFunction);

//2. insertAfter （使用时替换newElement, targetElement）
function insertAfter (newElement, targetElement) {
    var parent = targetElement.parentNode;
    if (parent.lastChild == targetElement) {
        parent.appendChild(newElement);
    } else {
        parent.insertBefore(newElement, targetElement.nextSibling);
    }
}

//3.  displayAbbreviations 缩略词一览表
function displayAbbreviations() {
    if(!document.getElementsByTagName || !document.createElement|| !document.createTextNode) return false;

var abbreviations = document.getElementsByTagName("abbr"); //调所有的abbr元素从而建表
if (abbreviations.length < 1) return false;         //检查abbr是否存在
var defs = new Array();                //数组是用来储存内容的良好媒介，用来存储abbr元素的title的内容和文本

for (var i=0; i < abbreviations.length; i++) {     //历遍abbr元素
    var current_abbr = abbreviations[i];
    if (current_abbr.childNodes.length <1) continue; //确保browser就算不理咧abbr也不会出问题
    var definition = current_abbr.getAttribute("title");
    var key = current_abbr.lastChild.nodeValue;
    defs[key]= definition;
}

var dlist = document.createElement("dl");     //创建列表 用来放置缩写文本

for (key in defs) {     //历遍定义
    var definition = defs[key];        //创建dtitle
    var dtitle = document.createElement("dt");
    var dtitle_text = document.createTextNode(key);
    dtitle.appendChild(dtitle_text);
    var ddesc = document.createElement("dd");     //创建dd
    var ddesc_text = document.createTextNode(definition);
    ddesc.appendChild(ddesc_text);     
    dlist.appendChild(dtitle);      //追加到定义列表
    dlist.appendChild(ddesc);
}
if (dlist.childNodes.length < 1) return false;     //当dl元素没有节点时，退出

var header = document.createElement("h2");     //创建h2 设置标题
var header_text = document.createTextNode("Abbreviations");
header.appendChild(header_text);

document.body.appendChild(header);
document.body.appendChild(dlist); //追加标题和列表到body
}

addLoadEvent(displayAbbreviations);


// 4. stripeTable  表格奇偶行样式
function stripeTable() {
    if (!document.getElementsByTagName) return false;
    var tables = document.getElementsByTagName("table");
    var odd, rows;
    for (var i=0; i<tables.length; i++) {
        odd = false;
        rows = tables[i].getElementsByTagName("tr");
        for (var j=0; j<rows.length; j++) {
            if (odd == true) {
                rows[j].style.backgroundColor = "#ffc";
                odd = false;
            } else {
                odd = true;
            }
        }
    }
}
addLoadEvent(stripeTable);


// 5. styleElementSiblings 给标签添加class内容以供css文档直接修改。setattribute也可以增加，但标签无法用在css文件
function styleElementSiblings(tag,theclass) {
    if (!document.getElementsByTagName) return false;
    var elems = document.getElementsByTagName(tag);
    var elem;
    for (var i=0; i<elems.length; i++) {
        elem = getNextElement(elems[i].nextSibling);
        addClass(elem,theclass);
    }
}

addLoadEvent(function() {
    styleElementSiblings("h1","intro");   //eg class=“intro”插入到h1中 以便修改h1的格式
})