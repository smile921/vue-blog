function defineReactive(data, key, val) {
  Object.defineProperty(data, key, {
    enumerable: true,
    configurable: true,
    get: function() {
      console.log('getter is called')
      return val
    },
    set: function(newVal) {
      val = newVal
      console.log('setter is called')
    }
  })
}

function observe(data) {
  Object.keys(data).forEach(ele => {
    defineReactive(data, ele, data[ele])
  })
}

let per = {
  key: 'sdfhjas',
  key2: 'sdaf'
}

observe(per)
/**
 * 1. -7 按位取反 // 6
 * 2. [1,2,3,4,10].map(parseInt) // 1 NaN NaN NaN 4
 * 3. typeof typeof Symbol(123) // string
 * 4. 下面的代码执行结果时？
 *   function mixArgs(first, second = 'b') {
 *   console.log(first === arguments[0])
 *   console.log(second === arguments[1])
 *   first = 'a'
 *   second = 'd'
 *   console.log(first === arguments[0])
 *   console.log(second === arguments[1])
 * }
 *  mixArgs('x')
 * // true false false false
 *  5. 下列程序输出结果
 *  var add = function(m) {
 *    var temp =  function(n){
 *      return add(m + n)
 *    }
 *    temp.toString =  function(){
 *       return m.toString(2)
 *    }
 *    return temp
 * }
 *
 *  console.info(add(3) (4) (5) )
 * // 1100
 *
 *  6. 列举一些你熟悉的HTTP请求头和响应头各最少6 个，并说说他们的作用
 * // Content-Type：POST请求里用来表示的内容类型
 * // Cookie：浏览器用这个属性向服务器发送Cookie
 * // Referer：表明产生请求的网页来自于哪个URL
 * // Accept：指浏览器或其他客户端可以接受的MIME
 * // User-Agent：是客户浏览器的名称，代表浏览器身份
 * // Host：对应网址URL中的Web名称和端口号
 *
 * // Cache-Control
 * // Connection：keep-alive
 * // Content-Type
 * // Access-Control-Allow-Origin
 * // Access-Control-Allow-Method
 * // Expires Server Content-length
 *  7. http2 与 http1.1 的区别
 * // 消息头压缩， 二进制传输， 多路复用， 服务器推送
 *  8. ES6 的新特性有哪些
 * // 箭头函数， let const ， spread 展开， promise ， 函数默认参数，
 * // 解构赋值， 生成器函数， 字符串模板， 类， 对象属性简写，模块化
 *  9. 将 100 个li 加入到body 中 1秒后倒排这些节点
 */
// https://github.com/STRML/strml.net
function methodThree() {
  var app = document.getElementById('app')
  for (var i = 0; i < 100; i++) {
    var li = document.createElement('li')
    var content = document.createTextNode(i)
    li.appendChild(content)
    app.appendChild(li)
  }
  setTimeout(function() {
    // var list = document.getElementsByTagName('li')
    var first = app.firstChild
    var last = app.lastChild
    var pre = last.previousSibling
    while (pre != first) {
      app.removeChild(pre)
      app.appendChild(pre)
      pre = last.previousSibling
    }
  }, 5 * 1000)
}
function methodTwo() {
  var app = document.getElementById('app')
  for (var i = 0; i < 100; i++) {
    var li = document.createElement('li')
    var content = document.createTextNode(i)
    li.appendChild(content)
    app.appendChild(li)
  }
  setTimeout(function() {
    var list = document.getElementsByTagName('li')
    var lst = Array.from(list)
    lst.reverse()
    app.innerHTML = ''
    for (var i = 0; i < lst.length; i++) {
      app.appendChild(lst[i])
    }
  }, 5 * 1000)
}
