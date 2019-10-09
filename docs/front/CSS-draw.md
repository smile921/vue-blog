# 用 CSS 画简单图形

::: danger CSS 画三角形
要点使用 CSS 的 border 来控制，宽高设置为 0 。
一个简单的例子如下：
:::

<style>
div.squire-four {
  width: 0;
  height: 0; 
  border: solid 90px;
  border-color: green red blue yellow;
}
</style>
<div class="squire-four"></div>

```html
<style>
  div.squire-four {
    width: 0;
    height: 0;
    border: solid 90px;
    border-color: green red blue yellow;
  }
</style>
<div class="squire-four"></div>
```

- 画一个简单的三角形

<style>
div.squire-one {
  width: 0;
  height: 0; 
  border: solid 90px;
  border-color: green transparent transparent transparent;
}
</style>
<div class="squire-one"></div>

代码：

```html
<style>
  div.squire-one {
    width: 0;
    height: 0;
    border: solid 90px;
    border-color: green transparent transparent transparent;
  }
</style>
<div class="squire-one"></div>
```

::: warning 画箭头
要点用白色三角形覆盖另一个三角形上去
:::

<style>
div.arrow-one {
  margin: 0;
  padding: 0;
  position: relative;
  width: 0;
  height: 0; 
  border: solid 90px;
  border-color: black transparent transparent transparent;
}
div.arrow-one:after {
  margin: 0;
  padding: 0;
  position: absolute;
  content: "";
  width: 0px;
  height: 0px; 
  top:-90px;
  left: -90px;
  border: solid 90px;
  border-color: white transparent transparent transparent;
}
</style>

<div class="arrow-one"></div> 
 
```html

<style>
div.arrow-one { 
  position: relative;
  width: 0;
  height: 0; 
  border: solid 90px;
  border-color: black transparent transparent transparent;
}
div.arrow-one:after { 
  position: absolute;
  content: "";
  width: 0px;
  height: 0px; 
  top:-90px;
  left: -90px;
  border: solid 90px;
  border-color: white transparent transparent transparent;
}
</style>

<div class="arrow-one"></div>
```

<style>
div.arrow-one1 {
  margin: 0;
  padding: 0;
  position: relative;
  width: 0;
  height: 0; 
  border: solid 98px;
  border-color: red transparent transparent transparent;
}
div.arrow-one1:after {
  margin: 0;
  padding: 0;
  position: absolute;
  content: "";
  width: 0px;
  height: 0px; 
  top:-98px;
  left: -90px;
  border: solid 90px;
  border-color: white transparent transparent transparent;
}
</style>

<div class="arrow-one1"></div> 
::: danger 画直角三角形
两个三角形一起拼叠
:::

<style>
div.squire-two {
  width: 0;
  height: 0; 
  border: solid 90px;
  border-color: green red transparent transparent;
}
</style>
<div class="squire-two"></div>

```html
<style>
  div.squire-two {
    width: 0;
    height: 0;
    border: solid 90px;
    border-color: green red transparent transparent;
  }
</style>
<div class="squire-two"></div>
```

把如上两个三角形设置颜色一样就是一个右上直角三角形
