import { Agent } from 'https'

/** 等待 time 秒之后再执行 */
function sleep(time) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      return resolve(true)
    }, time * 1000)
  })
}

/**Promise.all 需要等到所有的 promise 的状态都变成 fulfilled 之后才 resolve, 但只要有一个 promise 失败即返回失败的结果。 */

function argsTest(fisrt, second = 'b') {
  console.log(fisrt === arguments[0])
  console.log(second === arguments[1])

  fisrt = 'a'
  second = 'b'

  console.log(fisrt === arguments[0])
  console.log(second === arguments[1])
}

argsTest('x')
// true false false false
argsTest('x', 'ss')
// true true false false

// 按位取反的运算规则这么奇怪并不是JavaScript独有的，而是所有的计算机语言都是这样的。
// 这样做的主要原因是为了为了统一减法和加法，在计算机中，减法会变成加一个负数，而负数会以补码的形式存储。
// 而这样主要是因为补码和数字的十进制数有这么转换关系，负数：补码(x) = -x - 1，正数：补码(x) = x
//
// 因为补码是针对负数存在的，那么只要数据类型有无符号数，就没有这样的烦恼了，比如C语言有无符号整型，就能对无符号整型直接按位取反。
//
// 如果没有无符号类型，而且也只是想要按位取反，而不是附带补码的按位取反，需要另外的方法。
// 让全1的数据和当前数据做按位抑或就行了。比如，你有一个32位的数据a，需要对它做按位取反，那么这样就行了：0xFFFF ^ a

// var a = 0x8321;
// console.log(a.toString(2));
// console.log((0xFFFF ^ a).toString(2));

// //1000001100100001
// //111110011011110   => 左边最高位是0，被隐藏了。
// [1,2,3,4,10].map(parseInt)
// parseInt  // parseInt(string, radix)  radix =0 以10为底 如果省略该参数或其值为 0，则数字将以 10 为基础来解析。如果它以 “0x” 或 “0X” 开头，将以 16 为基数。
// //
// //           如果该参数小于 2 或者大于 36，则 parseInt() 将返回 NaN。
// map       // array.map(function(currentValue,index,arr), thisValue)
// [parseInt(1,0),parseInt(2,1),parseInt(3,2),parseInt(4,3),parseInt(10,4)]
// [1,NaN,NaN,NaN,4]

var add = function(m) {
  var temp = function(n) {
    debugger
    return add(m + n)
  }
  temp.toString = function() {
    debugger
    return m.toString(2)
  }
  return temp
}

// console.info(add(3) (4) (5))
// add(3) 11 => 3 的二进制表示
// add(4) 100 => 4的二进制
// add(5) 101 => 5的二进制
// add(3) (4) (5)
// -> m=3 ,n
// -> m=3 , n= 4
// -> m=7, n= 5
// -> temp = function(5){
//   return add(7+5)
// }
// temp = add(12)
// temp.toString
//  12的二进制

// {
//   add(3+n)
//   Number(3).toString(2)
// }
//
// add(4) 100
// add(5) 101
//

// m= 3
// temp = func(n) {
//   return add(3 + n)
// }
// temp.toString = m.toString(2)

// temp(4)
// m= 3,
// n= 4
// temp = func (n) {
//   return add(7+n)
// }
// temp.toString 7.toString(2)
// m=7 n= 4

// add(12)
// m=12  n=5
// 12
// temp(5)
// m=3 n=5
// 12
// 11
var n
var add = function(m) {
  var temp = function(n) {
    return add(m + n)
  }
  temp.toString = function() {
    return m.toString(2)
  }
  return temp
}

// http request

// User-Agent
// Referer
// Accept:
// authorization:
// Origin
// Host
// Access-Control-Request-Method:
// Content-Type
// Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,* ;q=0.8,application/signed-exchange;v=b3
// Accept-Encoding: gzip, deflate, br
// Accept-Language: zh-CN,zh;q=0.9,en;q=0.8
// Cache-Control: no-cache
// Connection: keep-alive
// Cookie:

// response

// Connection: close
// Content-Encoding: gzip
// Content-Type: text/html;
// Access-Control-Allow-Origin: *

// 1、采用二进制格式传输数据，而非http1.1文本格式，二进制格式在协议的解析和优化扩展上带来了跟多的优势和可能

// 2、对消息头采用Hpack进行压缩传输，能够节省消息头占用的网络流量，http1.1每次请求，都会携带大量冗余的头信息，浪费了很多宽带资源。

// 3、异步连接多路复用

// 4、Server Push，服务器端能够更快的把资源推送到客户端。

// 5、保持与HTTP 1.1语义的向后兼容性也是该版本的一个关键。

// Es6 新特性
// 1. let const
// 2. 箭头函数
// 3. spread 操作符
// 4. 字符串模板 ${}
// 5. 对象结构 const { aa, bb, cc } = Obj 解构赋值语法
// 6. 异步编程串行化，避免了回调地狱 promise
// 7. 对象属性简写
// 8. 函数参数默认值
// 9.  yield
// The yield keyword is used to pause and resume a generator function.
// yield这个关键字是用来暂停和恢复一个遍历器函数（的运行）的。

window.onload = function() {
  var ul = document.getElementById('test')
  for (var i = 0; i < 100; i++) {
    var li = document.createElement('li')
    var content = document.createTextNode(i)
    li.appendChild(content)
    ul.appendChild(li)
  }
  //  document.write(ul.firstChild);
  setTimeout(function() {
    var temp = ul.removeChild(ul.lastChild)
    //ul.appendChild(temp);
    ul.insertBefore(temp, ul.firstChild)
    for (var j = 0; j < 99; j++) {
      var temp2 = ul.removeChild(ul.lastChild)
      ul.insertBefore(temp2, ul.childNodes[j + 2])
    }
  }, 5000)
}

// [].shift()
// [].unshift()
// [].pop()
// [].push()
// [].peek()

// 数字格式化
function parseNum(num) {
  if (!num) return ''
  return num.replace(/(\d)(?=(\d{3})+\.)/g, '$1,')
  // return num.replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
}

function formatNumber(num) {
  if (!num) return ''
  let [int, float] = num.split('.')
  let intArr = int.split('')
  let result = []
  let i = 0
  while (intArr.length) {
    if (i !== 0 && i % 3 === 0) {
      result.unshift(intArr.pop() + ',')
    } else {
      result.unshift(intArr.pop())
    }
    i++
  }

  return result.join('') + '.' + (float ? float : '')
}

/**大整数相加 */
function bigIntAdd(str1, str2) {
  let result = []
  let ary1 = str1.split('')
  let ary2 = str2.split('')
  let flag = false //是否进位
  while (ary1.length || ary2.length) {
    let result_c = sigle_pos_add(ary1.pop(), ary2.pop())
    if (flag) {
      result_c = result_c + 1
    }
    result.unshift(result_c % 10) // 两数加之后 的个位数 添加到 数组头部

    if (result_c >= 10) {
      // 有进位
      flag = true
    } else {
      flag = false
    }
  }
  return result.join('')
}

/** 两个个位数相加 */
function sigle_pos_add(str1_c, str2_c) {
  let l = (r = 0)
  if (str1_c) {
    l = Number(str1_c)
  }
  if (str2_c) {
    r = Number(str2_c)
  }
  return l + r
}

Function.prototype.bind = function(thisArgs) {
  var fn = this
  var restArguments = Array.prototype.slice.call(arguments, 1)
  return function() {
    debugger
    var pp = Array.prototype.slice.call(arguments)
    var ss = restArguments.concat(pp)
    return fn.apply(thisArgs, ss)
  }
}

// [].concat()
// call和apply是可以相互替换的，这仅仅是取决于你传递参数使用数组方便还是逗号分隔的参数列表方便。
//
//
// call和apply很容易混淆掉，有时候会忘掉apply是使用数组还是列表，那么有一个简单的记住办法那就是apply的a和array的a是一致的，这样就记住了吧？
//
//
// bind稍微不同，因为它返回的是一个函数，可以在任何你想要执行的时候执行，而前面两个函数都是立马执行的。因此总体来说bind的灵活性会比call和apply更好，适用的场景更多

//
window.onload = function() {
  var app = document.getElementById('app')
  for (var i = 0; i < 100; i++) {
    var li = document.createElement('li')
    var content = document.createTextNode(i)
    li.appendChild(content)
    apply.appendChild(li)
  }
  //  document.write(ul.firstChild);
  setTimeout(function() {
    var liNodes = app.getElementsByTagName('li')
    var newlis = liNodes.reverse()
    app.removeChild()
    for (var i = 0; i < newlis.length; i++) {
      app.appendChild(newlis[i])
    }
  }, 5000)
}
