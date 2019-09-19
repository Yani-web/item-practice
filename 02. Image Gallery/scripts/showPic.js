 function showPic(whichpic) {   //目的是直接在html中显示image，而不需要弹出新窗口
            var source = whichpic.getAttribute("href");                    //调用<a>的图片路径属性href的内容
            var placeholder = document.getElementById("placeholder");     //调用占位图元素<img>。注意：查找img元素而非img的src属性。因为修改属性的前提是调用元素。只能通过元素修改属性，不能直接属性交换。
            placeholder.setAttribute("src",source);                       //将占位图的图片路径src的内容，替换成a的href的内容
            var title_text = whichpic.getAttribute("title");                 //调用<a>的title的内容
            var description = document.getElementById("description");      //查找和调用id为description的元素p
            description.firstChild.nodeValue = title_text;               //将title的内容赋值到id为description的第一个子节点，也就是p的文本节点中。
       }

       //1.js实现：不转入新窗口的图片墙和根据图片而变化的文字，一个html实现多个html的变化

       
       function addLoadEvent(func) { //这是addloadevent代码清单。目的是命令页面加载之后同时加载多个function （默认一次加载一个function）
          var oldonload = window.onload;
          if (typeof window.onload != 'function') { //如果在这个处理函数上还没有绑定任何函数，就添加新函数
               window.onload =func;
          } else {   //如果这个处理函数上已经绑定了一些函数，就把新函数追加到现有函数的末尾。
               window.onload = function() {
                    oldonload();
                    func();
               } 
          }
      }
      addLoadEvent(prepareGallery); //在addloadevent中添加需要加载的函数。如果有第二个，则直接在下一行添加addLoadEvent(secondfunction);
       //2.命令网页加载之后加载function


       function prepareGallery() { //目的是分离html里面的事件处理函数，把onclick事件绑定在id为imagegallery的元素内的链接a元素中
           if (!document.getElementsByTagName) return false;    //检查browser是否是否可以使用js的getElementsByTagName
           if (!document.getElementById)  return false;         //检查browser是否可以使用js的getElementById
           if (!document.getElementById("imagegallery"))  return false;   //检查browser是否可以调用id为imagegallery的元素
           var gallery = document.getElementById("imagegallery"); //调用id为imagegallery的元素，结果为ul
           var links = gallery.getElementsByTagName("a");        //调用ul的下级元素<a>留作备用
 
           for (var i=0; i < links.length; i++) {       //历遍所有的<a>
                links[i].onclick = function() {          //在所有的a中设置onclick事件处理函数
                     showPic(this);     //把事件处理函数onclick与图片路径联系起来
                     return false;
                }
           }
      }
      //3.事件处理函数，连接js与html从而实现功能；将onclick事件处理函数从html文本中分离。

     

