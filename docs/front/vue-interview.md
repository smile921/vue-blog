# VUE 面试

- vue 的理解

- vue 的双向数据绑定的原理

- vue 怎么样实现数组绑定

- settimeout 的机制
  主线程从任务队列中读取事件，这个过程是循环不断的，所以整个的这种运行机制又称为 Event Loop。JavaScript 通过事件循环和浏览器各线程协调共同实现异步。同步可以保证顺序一致，但是容易导致阻塞；异步可以解决阻塞问题，但是会改变顺序性。
- 遇到过兼容性的问题吗，要如何处理

```js
// js阻止默认事件
document.onclick = function(e) {
  var e = e || window.event
  if (e.preventDefault) {
    e.preventDefault() //W3C标准
  } else {
    e.returnValue = 'false' //IE..
  }
}

// js阻止事件传播，这里使用click事件为例
document.onclick = function(e) {
  var e = e || window.event
  if (e.stopPropagation) {
    e.stopPropagation() //W3C标准
  } else {
    e.cancelBubble = true //IE....
  }
}
```

- http 状态码 301 302 的区别，304 是啥

  - `301 redirect: 301 代表永久性转移(Permanently Moved)`
  - `302 redirect: 302 代表暂时性转移(Temporarily Moved )`
  - `304状态码或许不应该认为是一种错误，而是对客户端有缓存情况下服务端的一种响应。`

- js 的继承的实现方法

* call()方法方式

```
call方法是Function类中的方法
call方法的第一个参数的值赋值给类(即方法)中出现的this
call方法的第二个参数开始依次赋值给类(即方法)所接受的参数
```

- 继承的第三种方式：apply()方法方式
  ``
  apply 方法接受 2 个参数，
  A、第一个参数与 call 方法的第一个参数一样，即赋值给类(即方法)中出现的 this
  B、第二个参数为数组类型，这个数组中的每个元素依次赋值给类(即方法)所接受的参数

```
 - 原型链方式，即子类通过prototype将所有在父类中通过prototype追加的属性和方法都追加到Child，从而实现了继承

* es6有了解吗，请简单说一下promise机制，异步的承诺机制，顺势说一下解决回调地狱的问题

* MVVM实现原理

* vue生命周期

* vue跨组件通信实现

* vue的props和slot的使用，区别

* vue diff算法

* vue-router不能解决情况和边界情况

* Promise
```

Promise 是异步编程的一种解决方案，比传统的解决方案——回调函数和事件——更合理和更强大。它由社区最早提出和实现，ES6 将其写进了语言标准，统一了用法，原生提供了 Promise 对象。

所谓 Promise，简单说就是一个容器，里面保存着某个未来才会结束的事件（通常是一个异步操作）的结果。从语法上说，Promise 是一个对象，从它可以获取异步操作的消息。Promise 提供统一的 API，各种异步操作都可以用同样的方法进行处理。

有了 Promise 对象，就可以将异步操作以同步操作的流程表达出来，避免了层层嵌套的回调函数。此外，Promise 对象提供统一的接口，使得控制异步操作更加容易。

Promise 也有一些缺点。首先，无法取消 Promise，一旦新建它就会立即执行，无法中途取消。其次，如果不设置回调函数，Promise 内部抛出的错误，不会反应到外部。第三，当处于 pending 状态时，无法得知目前进展到哪一个阶段（刚刚开始还是即将完成）。

```

1. 、vue双向数据绑定？
```

vue 数据双向绑定是通过 数据劫持 结合 发布者-订阅者 模式的方式来实现的。
利用数据监听器 Observer 其实也就是 Object.defineProperty() 并通过该方法 劫持各个属性的 setter，getter，在数据变动时发布消息给订阅者 watcher 来触发相应的监听回调。

具体步骤：
第一步：需要 observe 的数据对象进行递归遍历，包括子属性对象的属性，都加上 setter 和 getter 这样的话，给这个对象的某个值赋值，就会触发 setter，那么就能监听到了数据变化

第二步：compile 解析模板指令，将模板中的变量替换成数据，然后初始化渲染页面视图，并将每个指令对应的节点绑定更新函数，添加监听数据的订阅者，一旦数据有变动，收到通知，更新视图

第三步：Watcher 订阅者是 Observer 和 Compile 之间通信的桥梁，主要做的事情是:
1、在自身实例化时往属性订阅器(dep)里面添加自己
2、自身必须有一个 update()方法
3、待属性变动 dep.notice()通知时，能调用自身的 update()方法，并触发 Compile 中绑定的回调，则功成身退。

第四步：MVVM 作为数据绑定的入口，整合 Observer、Compile 和 Watcher 三者，通过 Observer 来监听自己的 model 数据变化，通过 Compile 来解析编译模板指令，最终利用 Watcher 搭起 Observer 和 Compile 之间的通信桥梁，达到数据变化 -> 视图更新；视图交互变化(input) -> 数据 model 变更的双向绑定效果。

引用了：https://www.cnblogs.com/sichaoyun/p/8406194.html 中的回答

```
2. 、解释一下vuex？

```

vuex 是用来做状态管理的，具有五个常用属性 state, getter, actions, mutations, modules。state 是数据源，类似 vue 中的 data，我们可以通过两种方式来获取它，mapStates, mapGerters。并且获取 state 必须放到 computed 中这样能保证 state 发生改变的时候该组件中用到 state 的地方都发生变化。

```

3. 、使用vue遇到的问题？

```

1、通过 js 修改 data 中的对象数据页面并没有重新渲染，因为 vue 并没有对 object 类型对象进行深层监听，所以使用 this.\$set()方法来修改 object 类型的对象。
2、打包发布路径问题：打包的基础路径设置一定要和服务器上的相同，否则打包好后放服务器会访问不到资源。是在 config/index.js 中设置 build 对象里设置 assetsPublicPath：'/路径/'。
3、发版缓存问题，由于发版是全量发版，所以如果用户浏览器有缓存的话，就会访问不到旧资源，导致无法正常查看，那么可以设置不允许 index.html 缓存，这样就能保证每次用户访问的都是正确的。做法是在 vue 发布项目根目录建立 manifest 文件夹里面建一个 cache.manifest 文件， 里面内容如下
CACHE MANIFEST
#version 1.0 #直接缓存的文件
CACHE:

#需要实时在线的文件
NETWORK:
../index.html #替代方案
HTML 页面中设置 meta 熟悉

```
4. 、路由跳转回退，滚动到浏览器上次访问位址。
```

使用 vue2 中的 keep-alive 缓存组件 在 app.vue 中如下写法：
<keep-alive>
<router-view v-if='$route.meta.keepAlive'></router-view>
</keep-alive>
<router-view v-if='!$route.meta.keepAlive'></router-view>

router/index 文件下
{
path: '/user',
name: 'User',
component: userComp,
meta: {
isUseCache: false,// 结合下面 activated 钩子函数中的判断来确定是否去刷新数据
keepAlive: true
}
}
设置了 keepAlive 缓存的组件的钩子函数：
第一次进入： beforeRouterEnter -> created -> activated -> ... -> deactivated
第二次进入： beforeRouterEnter -> activated -> ... -> deactivated
只有第一次进入的时候，有 created 钩子，那么所有的判断可以在 activated 中写，
这里判断是否需要重新获取数据，isUseCache 默认是 false，第一次进入的时候加载数据，然后在离开这个页面的时候，设置为 true 再次进入这个页面就可以使用缓存。
userlist 页面这么写
activated() {  
 if(!this.\$route.meta.isUseCache) {
this.list = []
this.loadData()
}
}
userDetail 页面这样写
beforeRouteLeave(to, from, next) {
if(to.name == 'User') {
to.meta.isUseCache = true
}
next()
}

```

4. 、vue父子组件之间传值?

```

父组件向子组件传值可以通过 props 来实现:
父组件在引用子组件的时候，可以添加自定义属性如：
<child-temp :data-name='cName' :data-sex='cSex'></child-temp>
子组件接收：
props: ['cName', 'cSex']
或者用：
this.$attrs('data-name'), this.$attrs('data-sex')
子组件向父组件传值可以通过 emit 来实现:
子组件中使用：
this.$emit('changeName', params)
父组件接收：
<child-temp @changeName='change'></child-temp>
methods: {
  change(params) {
    this.name = params.name
  }
}
或者
mounted() {
  this.$on('changeName', function(params) {
this.name = params.name
})
}

```

5. 、vue-router传参和接收参数？
```

vue-router 传参方式有两种
首先在路由里面配置路由
{
path: '/user',
name: 'user',
component: User
}
跳转的时候可以这样：
this.$router.push({
  path: '/user',
  query: {
    id: '001',
    name: 'lsj'
  }
})
接收参数：this.$route.query.id，this.$route.query.name
this.$router.push({
name: 'user',
params: {
id: '001',
name: 'lsj'
}
})
接收参数：this.$route.params.id, this.$route.params.name

上面的传参形式也可以直接使用
<router-link :to='{name: "user", params: {id: "001", name: "lsj"}}'></router-link>
<router-link :to='{path: "/user", query: {id: "001", name: "lsj"}}'></router-link>

```

6. 、vue-router的嵌套路由是怎么实现的？
```

答：是通过 children 实现的方式如下：
{
path: '/home',
name: 'home',
component: HomePage,
children: [
{ path: '/home/login', name: 'login', component: Login},
{ path: '/home/reg', name: 'reg', component: Reg}
]
}

```
7. 、导航钩子有哪些？
```

beforeRouteEnter、afterEnter、beforeRouterUpdate、beforeRouteLeave

参数： to, from, next
to（去的那个路由）、from（离开的路由）、next（一定要用这个函数才能去到下一个路由，如果不用就拦截）最常用就这几种

```


8. 、请详细说下你对vue生命周期的理解？
```

答：总共分为 8 个阶段创建前/后，载入前/后，更新前/后，销毁前/后。

创建前/后： 在 beforeCreated 阶段，vue 实例的挂载元素$el和数据对象data都为undefined，还未初始化。在created阶段，vue实例的数据对象data有了，$el 还没有。

载入前/后：在 beforeMount 阶段，vue 实例的\$el 和 data 都初始化了，但还是挂载之前为虚拟的 dom 节点，data.message 还未替换。在 mounted 阶段，vue 实例挂载完成，data.message 成功渲染。

更新前/后：当 data 变化时，会触发 beforeUpdate 和 updated 方法。

销毁前/后：在执行 destroy 方法后，对 data 的改变不会再触发周期函数，说明此时 vue 实例已经解除了事件监听以及和 dom 的绑定，但是 dom 结构依然存在

```


9. 、vue事件绑定的几种情况

```

可以看 vue 官网关于修饰符的介绍
https://cn.vuejs.org/v2/guide/events.html?#%E4%BA%8B%E4%BB%B6%E4%BF%AE%E9%A5%B0%E7%AC%A6

<!-- 阻止事件冒泡 -->

<a @click.stop='doSomething'></a>

<!-- form提交不重新渲染页面 -->
<form @submit.prevent='doSomething'></form>

<!-- 修饰符的串联使用 -->

<a @click.stop.prevent='doSomething'></a>

<!-- 添加事件监听器时使用事件捕获模式 -->
<div @click.capture='doSomething'></div>

<!-- 只在当前元素上触发事件，【而不是子元素】 -->
<div @click.self='doSomething'></div>
```
10. 、vue 获取dom元素，获取当前点击元素的父元素
```
可以通过 this.$refs 来直接获取需要获取的元素，效果类似于dom结构上的id
下面是具体使用方法：
<li class="sidebar-list"  v-for="(item, index) in meunList"  @click="setPageMenu(index)" ref="menuItem">
    <router-link class="sidebar-a" :to="{ path: item.listLink }" >{{item.listTitle}}</router-link>
</li>

setPageMenu(index) {
//这个是获取当前 menuItem 值，用 index 来区分当前元素是 v-for 产生的数组中的第几个数
let getMenuText = this.\$refs.menuItem[index].innerText;
}

<div @click.self='doSomething($event)'></div>
methods: {
  doSomething(event) {
    const ClictEl = event.target // 是你当前点击的元素
    const El = event.currentTarget // 是你绑定事件的元素
    const ParentEl = event.currentTarget.parentNode // 当前元素的父元素
    const pName = ParentEl.getAttribute('pName')
  }
}
```
