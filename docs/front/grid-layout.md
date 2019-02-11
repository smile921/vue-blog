# grid layout

## fr 单位

css fr 单位是一个自适应单位，fr 单位被用于在一系列长度值中分配剩余空间，如果多个已指定了多个部分，则剩下的空间根据各自的数字按比例分配。

## use grid container

`display: grid | inline-grid | subgrid`

- grid：定义一个块级的网格容器
- inline-grid：定义一个内联的网格容器
- subgrid：定义一个继承其父级网格容器的行和列的大小的网格容器，它是其父级网格容器的一个子项。

> tips: column, float, clear 和 vertical-align 对网格容器没有效果。

## grid container properties

`grid-template-columns/grid-template-rows`

`grid-template-columns: <track-size> ... | <line-name> <track-size> ...;`
`grid-template-rows: <track-size> ... | <line-name> <track-size> ...;`

- `<track-size>`：定义网格单元的宽高，其单位可以是一个长度(如 px、em、rem、vw、vh)或百分比，也可以是网格中自由空间的份数(单位为 fr)。

- `<line-name>`：定义网格线的名称，它不是必须值。可以一个你选择的任意名字，当没有显示设定时，它的名字以数字表示。

```css
.container {
  width: 500px;
  height: 500px;
  display: grid;
  grid-template-columns: 33% 33% 33%;
  grid-template-rows: 33% 33% 33%;
}
.container div {
  border: 1px solid #000;
}

.container {
  grid-template-rows: [row1-start] 25% [row1-end row2-start] 25% [row2-end];
}
```

- 如果你定义了容器的重复部分，你可以使用 repeat()方法来生成多个相同值
- 特殊单元：frfr 单元允许你将网格容器中的自由空间设置为一个份数：

## grid-template-areas

grid-template-areas 可以配合 grid-area 定义一个显式的网格区域。grid-template-areas 定义网格区域，然后使用 grid-area 调用声明好的网格区域名称来放置对应的网格项目。
用法:

`grid-template-areas: "<grid-area-name> | . | none | ..." "..."`

- `<grid-area-name>`：在 grid-area 中指定的网格区域名字
- `.`：一个句点表示一个空的网格单元
- none：没有网格区域被定义

```css
.item-a {
  grid-area: header;
  background: black;
}
.item-b {
  grid-area: main;
  background: blue;
}
.item-c {
  grid-area: sidebar;
  background: chartreuse;
}
.item-d {
  grid-area: footer;
  background: red;
}

.container {
  width: 500px;
  height: 200px;
  margin-top: 20px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  grid-template-areas:
    'header header . footer'
    'main main . sidebar' 'main main . sidebar';
}
```

## grid-column-gap/grid-row-gap/grid-gap

指定网格线的大小，也可以说是网格子项之间的间距。词法：

`grid-column-gap: <line-size>`
`grid-row-gap: <line-size>`
`<line-size>：长度值`

grid-gap 是 grid-column-gap 和 grid-row-gap 的简称：
`grid-gap: <grid-column-gap> <grid-row-gap>`

## justify-items/align-items

justify-items 让网格子项的内容和列轴对齐（align-items 则相反，是和行轴对齐），这个值对容器里面的所有网格子项都有用，flex 里边没有这个属性。

`justify-items: start | end | center | stretch`

- start：内容和网格区域的左边对齐
- end：内容和网格区域的右边对齐
- center：内容和网格区域的中间对齐
- stretch：填充整个网格区域的宽度（默认值）

`align-items: start | end | center | stretch;`

## justify-content/align-content

justify-content 如果用像 px 非弹性单位定义的话，总网格区域大小有可能小于网格容器，这时候你可以设置网格的对齐方式（垂直于列网格线对齐）。

`justify-content: start | end | center | stretch | space-around | space-between | space-evenly ;`

- start:左对齐
- end：右对齐
- center：居中对齐
- stretch：填充网格容器
- space-around：在每个网格子项中间放置均等的空间，在始末两端只有一半大小
- space-between：两边对齐，在每个网格子项中间放置均等的空间，在始末两端没有空间
- space-evenly：网格间隔相等，包括始末两端

## `grid-auto-columns/grid-auto-rows`

自动生成隐式网格轨道（列和行），当你定位网格项超出网格容器范围时，将自动创建隐式网格轨道。

`grid-auto-columns: <track-size>`
`grid-auto-rows: <track-size>`
`<track-size>`：可以是一个长度，百分比或者是一个网格中自由空间的份数（通过使用 fr 单位）

grid-column-start/grid-column-end/grid-row-start/grid-row-end/grid-column/grid-row
grid-area
给网格子项取一个名字以让它被由 grid-template-areas 属性创建的模板引用。同时，这个属性还可以用来更简短地表示 grid-row-start+ grid-column-start + grid-row-end+ grid-column-end。

justify-self/align-self
让网格子项的内容以列轴对齐（与之相反 align-self 是跟行轴对齐），这个值可以应用在单个网格子项的内容中。

`justify-self: start | end | center | stretch`

让网格子项的内容以行轴对齐（与之相反 justify-self 是跟列轴对齐），这个值可以应用在单个网格子项的内容中。

`align-self: start | end | center | stretch`
