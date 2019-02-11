# [学习笔记](https://frere921.netlify.com)

[![Netlify Status](https://api.netlify.com/api/v1/badges/da9e32b0-c72e-4219-9c0a-62aab5c6ae51/deploy-status)](https://app.netlify.com/sites/frere921/deploys)

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
