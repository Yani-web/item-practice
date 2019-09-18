 function showPic(whichpic) {
            var source = whichpic.getAttribute("href");                    //调用<a>的图片路径属性href的内容
            var placeholder = document.getElementById("placeholder");     //调用占位图元素<img>。注意：查找img元素而非img的src属性。因为修改属性的前提是调用元素。只能通过元素修改属性，不能直接属性交换。
            placeholder.setAttribute("src",source);                       //将占位图的图片路径src的内容，替换成a的href的内容
            var title_text = whichpic.getAttribute("title");                 //调用<a>的title的内容
            var description = document.getElementById("description");      //查找和调用id为description的元素p
            description.firstChild.nodeValue = title_text;               //将title的内容赋值到id为description的第一个子节点，也就是p的文本节点中。
       }


