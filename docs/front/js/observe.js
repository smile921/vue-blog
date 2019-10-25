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
 * 1. -7 按位取反
 * 2. [1,2,3,4,10].map(parseInt)
 * 3. typeof typeof Symbol(123)
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
 *
 *  6. 列举一些你熟悉的HTTP请求头和响应头各最少6 个，并说说他们的作用
 *  7. http2 与 http1.1 的区别
 *  8. ES6 的新特性有哪些
 *
 *  9. 将 100 个li 加入到body 中 1秒后倒排这些节点
 */
// https://github.com/STRML/strml.net
