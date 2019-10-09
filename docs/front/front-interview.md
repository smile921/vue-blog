# 前端基础问答

## 一、HTML 常见题目

1.  Doctype 作用？严格模式与混杂模式如何区分？它们有何意义？

2.  HTML5 为什么只需要写？

3.  行内元素有哪些？块级元素有哪些？空(void)元素有那些？

4.  页面导入样式时，使用 link 和@import 有什么区别？
    - link 属于 XHTML 标签，除了加载 CSS 外，还能用于定义 RSS, 定义 rel 连接属性等作用；而@import 是 CSS 提供的，只能用于加载 CSS;
    - 页面被加载的时，link 会同时被加载，而@import 引用的 CSS 会等到页面被加载完再加载;
    - import 是 CSS2.1 提出的，只在 IE5 以上才能被识别，而 link 是 XHTML 标签，无兼容问题;
5.  介绍一下你对浏览器内核的理解？

6.  常见的浏览器内核有哪些？

7.  html5 有哪些新特性、移除了那些元素？如何处理 HTML5 新标签的浏览器兼容问题？

8.  如何区分 HTML 和 HTML5？

9.  DOCTYPE 声明变化：


    >  HTML4中需要指明是HTML的哪个版本，HTML5不需要，只使用<!DOCTYPE html>即可。

2.  新增的元素和废除的元素

> 新增元素：heade、footer、nav（表示页面中导航部分）、article、  video 、 audio、hidden 属性

> 去除元素：frame（只是有 iframe）

9.  简述一下你对 HTML 语义化的理解？

10. HTML5 的离线储存怎么使用，工作原理能不能解释一下？

## 二、CSS 类的题目

1.  介绍一下标准的 CSS 的盒子模型？与低版本 IE 的盒子模型有什么不同的？

- CSS 盒子模型：由四个属性组成的外边距(margin)、内边距(padding)、边界(border)、内容区(width 和 height);

- 标准的 CSS 盒子模型和低端 IE CSS 盒子模型不同：宽高不一样

标准的 css 盒子模型宽高就是内容区宽高；

低端 IE css 盒子模型宽高 内边距﹢边界﹢内容区；

2. CSS 选择符有哪些？哪些属性可以继承？
1. id 选择器（ # myid）
1. 类选择器（.myclassname）
1. 标签选择器（div, h1, p）
1. 相邻选择器（h1 + p）
1. 子选择器（ul > li）
1. 后代选择器（li a）
1. 通配符选择器（ \* ）
1. 属性选择器（a[rel = "external"]）
1. 伪类选择器（a:hover, li:nth-child）

- 可继承的样式： font-size font-family color, UL LI DL DD DT;
- 不可继承的样式：border padding margin width height ;

3. CSS 优先级算法如何计算？

1. 行内样式优先级 specificity 值为 1,0,0,0 高于外部定义


    　　如  `<div style="height:50px; width:50px;">Div</div>  //行内样式 `

    　　外部定义指经由 `<link>` 或 `<style>` 标签定义的规则

    2. 按CSS代码中出现的顺序决定，后者CSS样式居上；（近水楼台 先得月）

    3. !important声明specificity值优先级最高

    4. 由继续而得到的样式没有specificity的计算，它低于一切其他规则（比如全局选择符*定义规则

4.  CSS3 新增伪类有那些？

- `p:last-of-type` 选择其父元素的最后的一个 P 元素

  - `p:last-child` 选择其父元素的最后子元素(一定是 P 才行)
  - `p:first-of-type` 选择其父元素的首个 P 元素
  - `p:first-child` 选择其父元素的首个 p 元素(一定是 p 才行)
  - `p:only-child`　　　　选择其父元素的只有一个元素(而且这个元素只能是 p 元素，不能有其他元素)
  - `p:only-of-type`　　　选择其父元素的只有一个 p 元素(不能有第二个 P 元素，其他元素可以有)

  _选第 N 个_

  - `p:nth-child(n)` 　　选择其父元素的第 N 个 刚好是 p 的元素
  - `p:nth-last-child(n)` ..............................................从最后一个子元素开始计数
  - `p:nth-of-type(n)`　 选择其父元素的 n 个元素
  - `p:nth-last-of-type(n)` ........................从最后一个子元素开始计数

5.  如何居中 div？如何居中一个浮动元素？如何让绝对定位的 div 居中？

6.  display 有哪些值？说明他们的作用。

`display： none | inline | block | list-item | inline-block | table | inline-table | table-caption | table-cell | table-row | table-row-group | table-column | table-column-group | table-footer-group | table-header-group | run-in | box | inline-box | flexbox | inline-flexbox | flex | inline-flex`
默认值：inline

    * `none：` 隐藏对象。与visibility属性的hidden值不同，其不为被隐藏的对象保留其物理空间
    * `inline：` 指定对象为内联元素。
    * `block：` 指定对象为块元素。
    * `list-item：` 指定对象为列表项目。
    * `inline-block：` 指定对象为内联块元素。（CSS2）
    * `table：` 指定对象作为块元素级的表格。类同于html标签 `<table>（CSS2）`
    * `inline-table：` 指定对象作为内联元素级的表格。类同于html标签 `<table>`

7.  position 的值 relative 和 absolute 定位原点是？

- absolute：生成绝对定位的元素，定位原点是离自己这一级元素最近的一级 position 设置为 absolute 或者 relative 的父元素的左上角为原点的。
- fixed （老 IE 不支持）：生成绝对定位的元素，相对于浏览器窗口进行定位。
- relative：生成相对定位的元素，定位原点是元素本身所在位置。
- static：默认值。没有定位，元素出现在正常的流中（忽略 top, bottom, left, right z-index 声明）。
- inherit：规定从父元素继承 position 属性的值。

8.  CSS3 有哪些新特性？

9.  请解释一下 CSS3 的 Flexbox(弹性盒布局模型),以及适用场景？

10. 用纯 CSS 创建一个三角形的原理是什么？
    边框设置透明，需要显示的设置 solid 加上颜色，块级元素即可

## 三、JavaScript 类的题目

1.  JavaScript 中 this 是如何工作的

2.  请解释原型继承 的原理。

3.  什么是闭包 (closure)，如何使用它，为什么要使用它？

4.  .call 和 .apply 的区别是什么？

5.  请指出 JavaScript 宿主对象 (host objects) 和原生对象 (native objects) 的区别？

6.  请指出以下代码的区别：function Person(){}、var person = Person()、var person = new Person()？

函数 Person ， undefined， person 对象

7.  请解释变量声明提升 (hoisting)。

    javascript 的变量声明具有 hoisting 机制，JavaScript 引擎在执行的时候，会把所有变量的声明都提升到当前作用域的最前面。

8.  什么是 `“use strict”;` ? 使用它的好处和坏处分别是什么？

`"use strict"`： "严格模式"是一种在 JavaScript 代码运行时自动实行更严格解析和错误处理的方法。这种模式使得 Javascript 在更严格的条件下运行

9.  什么是事件循环 `(event loop)` ？
    http://www.ruanyifeng.com/blog/2014/10/event-loop.html

- （1） 所有同步任务都在主线程上执行，形成一个执行栈（execution context stack）。
- （2）主线程之外，还存在一个"任务队列"（task queue）。只要异步任务有了运行结果，就在"任务队列"之中放置一个事件。
- （3）一旦"执行栈"中的所有同步任务执行完毕，系统就会读取"任务队列"，看看里面有哪些事件。那些对应的异步任务，于是结束等待状态，进入执行栈，开始执行。
- （4）主线程不断重复上面的第三步

主线程从"任务队列"中读取事件，这个过程是循环不断的，所以整个的这种运行机制又称为 Event Loop（事件循环）

JS 的代码执行是基于一种事件循环的机制，之所以称作事件循环，MDN 给出的解释为因为它经常被用于类似如下的方式来实现

```java
while (queue.waitForMessage()) {
  queue.processNextMessage();
}
```

如果当前没有任何消息 `queue.waitForMessage` 会等待同步消息到达

我们可以把它当成一种程序结构的模型，处理的方案
JS 是单线程执行的，而基于事件循环模型，形成了基本没有阻塞（除了 alert 或同步 XHR 等操作）的状态

JavaScript 引擎是基于事件驱动单线程运行的,浏览器无论在什么时候都只且只有一个线程在运行 JavaScript 程序，等待着任务队列中任务的到来，然后加以处理

10. 请解释同步 (synchronous) 和异步 (asynchronous) 函数的区别。

同步方法调用一旦开始，调用者必须等到方法调用返回后，才能继续后续的行为。
异步方法调用更像一个消息传递，一旦开始，方法调用就会立即返回，调用者就可以继续后续的操作。而，异步方法通常会在另外一个线程中，“真实”地执行着。整个过程，不会阻碍调用者的工作

同步就是整个处理过程顺序执行，当各个过程都执行完毕，并返回结果。是一种线性执行的方式，执行的流程不能跨越。一般用于流程性比较强的程序，比如用户登录，需要对用户验证完成后才能登录系统。

异步则是只是发送了调用的指令，调用者无需等待被调用的方法完全执行完毕；而是继续执行下面的流程。是一种并行处理的方式，不必等待一个程序执行完，可以执行其它的任务，比如页面数据加载过程，不需要等所有数据获取后再显示页面。

他们的区别就在于一个需要等待，一个不需要等待，在部分情况下，我们的项目开发中都会优先选择不需要等待的异步交互方式，比如日志记录就可以使用异步方式进行保存
