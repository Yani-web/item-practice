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



function displayCitations() {
    var quotes = document.getElementsByTagName("blockquote");
    for ( var i=0; i<quotes.length; i++) {
        if(!quotes[i].getAttribute("cite")) continue;
        var url = quotes[i].getAttribute("cite");   //调用cite的内容 从而连接到a的url中
        var quoteChildren = quotes[i].getElementsByTagName('*');     //调用blockquote元素中所有的节点 目的把目标元素插入最后一个节点（定位）
        if (quoteChildren.length < 1) continue;
        var elem = quoteChildren[quoteChildren.length - 1]; //查出最后一个节点
        var link = document.createElement("a");
        var link_text = document.createTextNode("source");
        link.appendChild(link_text);
        link.setAttribute("href", url);
        var superscript = document.createElement("sup");
        superscript.appendChild(link);
        elem.appendChild(superscript);

    }
}

addLoadEvent(displayAbbreviations);
addLoadEvent(displayCitations);
