---
home: true
heroImage: /img/ember-tomaster0.png
actionText: 手札 →
actionLink: /
features:
  - title: |
    details: 能攻心则反侧自消，从古知兵非好战。不审势即严宽皆误，后来治蜀要深思。
  - title: |
    details: 蝴蝶过山门，轻舟过重山。一别两款，各生欢喜。解冤释结，更莫相憎。
  - title: |
    details: 少年经不得顺境，中年经不得闲境，晚年经不得逆境。
footer: MIT Licensed | Copyright © 2019-present Smile921
---

# 学习笔记

::: danger `git proxy 速切`

```
git config --global http.proxy 'http://127.0.0.1:1080'

git config --global https.proxy 'http://127.0.0.1:1080'

git config --global --unset http.proxy

git config --global --unset https.proxy
```

:::

## 获取源码和 Java doc

::: warning 获取源码

- Maven 姿势

  - `mvn dependency:sources`
  - `mvn dependency:resolve -Dclassifier=javadoc`
  - `mvn dependency:sources -DincludeArtifactIds=guava`

- Gradle 姿势
  - `gradle cleanEclipse eclipse`
  - `gradle cleanIdea idea`

:::

## 杨绛老先生的一句话

> 杨绛老先生的一句话：“我们曾如此渴望命运的波澜，到最后才发现：人生最曼妙的风景，竟是内心的淡定与从容……我们曾如此期盼外界的认可，到最后才知道：世界是自己的，与他人毫无关系！”。生活就是这样，无所谓别人，自己就可以把自己的小天地过的很精彩。有一种当淡定是编译运行你写好的代码时出现错误后耐心解决错误的认真，而不是抱怨；有一种淡定是看着别人在自己面前炫耀某种技术，自己礼貌的笑笑而不拆穿；我个人觉得那些觉得自己已经厉害的发紫的人，大多都是实际上不咋的的人

## Couplet -- 诸葛亮

_能攻心则反侧自消，从古知兵非好战。不审势即严宽皆误，后来治蜀要深思。_

> 能采取攻心办法服人的，会使那些疑虑不安、怀有二心的对立面自然消除，自古以来深知用兵之道的人并不喜欢用战争解决问题；不能审时度势的人，其处理政事无论宽或严都要出差错，后代治理蜀地的人应该深思

## Poem

_蝴蝶过山门，轻舟过重山。一别两款，各生欢喜。解冤释结，更莫相憎。_

> 秋光更比春光好，蜂蝶纷纷不到门

> 轻舟已过万重山

> 这一次离别之后两个人都得到解脱，两个人都各自心生欢喜。

> 好多人好些事，搁在心里久了，就成了经年累月，成了你精心打扮过之后的样子，只会让你心里越来越重，可是在某一刻，当这个人再重新出现的时候，你会发现好像他真实的样子在你心里已经相去经年了，那大概就是人生释然的时刻吧

## 曾国藩

> **少年经不得顺境，中年经不得闲境，晚年经不得逆境。**

> 少年人要心忙，忙则慑浮气。老年人要心闲，闲则乐余年。
> -- 陈继儒 《小窗幽记》

## 岳王坟

> **岂恨藏弓早，终知借剑难**

> 国耻犹未雪，身危亦自甘。
> 九原人不返，万壑气长寒。
> 岂恨藏弓早，终知借剑难。
> 吾生非壮士，于此发冲冠。

## [The Architecture of Open Source Applications](http://www.aosabook.org/en/index.html)

有空好好拜读一下

## Java 资料收集

<!-- * [面试相关资料](docs/note/awesome-interview.md) -->

- Spring Transaction

<!-- [Spring Transcation](docs/note/java/spring-transaction.md) -->

- spring bean

  <!-- [Spring bean](docs/note/java/spring-bean.md) -->

- Java 知识地图
  <!-- ![](./docs/note/java/img/knowleagemap.jpg) -->

## [我是怎么练英语的](https://dsdshcym.github.io/blog/2017/09/24/how-do-i-practice-my-english/)

> 英语和编程语言的共性可能就在于两者都是实用性非常强的工具，都是用来交流用的，学习这样的工具时，最有效的方法可能就是「尽量多地去使用」了。对编程语言来说，相比英语来说少了听、说两个方面，只要多读、多写就可以了，而对于英语来说，则要从「听说读写」四个方面同时出发，多听、多说、多读、多写。

## 使用 Vulhub 一键搭建漏洞测试靶场 [vulhub](https://github.com/vulhub/vulhub)

[使用 Vulhub 一键搭建漏洞测试靶场](https://vulhub.org)

> Vulhub 是一个面向大众的开源漏洞靶场，无需 docker 知识，简单执行两条命令即可编译、运行一个完整的漏洞靶场镜像。旨在让漏洞复现变得更加简单，让安全研究者更加专注于漏洞原理本身。

## 更多集合

> [full collections](https://lucid-pasteur-eae010.netlify.com/docs/notes.html)
