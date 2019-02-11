## [asciinema [as-kee-nuh-muh] ](https://asciinema.org/)

> Record and share your terminal sessions, the right way.

asciinema [as-kee-nuh-muh] is a free and open source solution for recording terminal sessions and sharing them on the web

## [FZF is a general-purpose command-line fuzzy finder.](https://github.com/junegunn/fzf)

It's an interactive Unix filter for command-line that can be used with any list; files, command history, processes, hostnames, bookmarks, git commits, etc.

## Pros

- Portable, no dependencies
- Blazingly fast
- The most comprehensive feature set
- Flexible layout
- Batteries included
  - Vim/Neovim plugin, key bindings and fuzzy auto-completion

## Usage

fzf will launch interactive finder, read the list from STDIN, and write the
selected item to STDOUT.

```sh
find * -type f | fzf > selected
```

Without STDIN pipe, fzf will use find command to fetch the list of
files excluding hidden ones. (You can override the default command with
`FZF_DEFAULT_COMMAND`)

```sh
vim $(fzf)
```

#### Using the finder

- `CTRL-J` / `CTRL-K` (or `CTRL-N` / `CTRL-P`) to move cursor up and down
- `Enter` key to select the item, `CTRL-C` / `CTRL-G` / `ESC` to exit
- On multi-select mode (`-m`), `TAB` and `Shift-TAB` to mark multiple items
- Emacs style key bindings
- Mouse: scroll, click, double-click; shift-click and shift-scroll on
  multi-select mode

#### Layout

fzf by default starts in fullscreen mode, but you can make it start below the
cursor with `--height` option.

```sh
vim $(fzf --height 40%)
```

Also check out `--reverse` and `--layout` options if you prefer
"top-down" layout instead of the default "bottom-up" layout.

```sh
vim $(fzf --height 40% --reverse)
```

You can add these options to `$FZF_DEFAULT_OPTS` so that they're applied by
default. For example,

```sh
export FZF_DEFAULT_OPTS='--height 40% --layout=reverse --border'
```

#### Search syntax

Unless otherwise specified, fzf starts in "extended-search mode" where you can
type in multiple search terms delimited by spaces. e.g. `^music .mp3$ sbtrkt !fire`

| Token     | Match type                 | Description                          |
| --------- | -------------------------- | ------------------------------------ |
| `sbtrkt`  | fuzzy-match                | Items that match `sbtrkt`            |
| `'wild`   | exact-match (quoted)       | Items that include `wild`            |
| `^music`  | prefix-exact-match         | Items that start with `music`        |
| `.mp3$`   | suffix-exact-match         | Items that end with `.mp3`           |
| `!fire`   | inverse-exact-match        | Items that do not include `fire`     |
| `!^music` | inverse-prefix-exact-match | Items that do not start with `music` |
| `!.mp3$`  | inverse-suffix-exact-match | Items that do not end with `.mp3`    |

If you don't prefer fuzzy matching and do not wish to "quote" every word,
start fzf with `-e` or `--exact` option. Note that when `--exact` is set,
`'`-prefix "unquotes" the term.

A single bar character term acts as an OR operator. For example, the following
query matches entries that start with `core` and end with either `go`, `rb`,
or `py`.

```
^core go$ | rb$ | py$
```

#### Environment variables

- `FZF_DEFAULT_COMMAND`
  - Default command to use when input is tty
  - e.g. `export FZF_DEFAULT_COMMAND='fd --type f'`
- `FZF_DEFAULT_OPTS`
  - Default options
  - e.g. `export FZF_DEFAULT_OPTS="--layout=reverse --inline-info"`

#### Options

See the man page (`man fzf`) for the full list of options.

## Examples

Many useful examples can be found on [the wiki
page](https://github.com/junegunn/fzf/wiki/examples). Feel free to add your
own as well.

## Lilypond 一个开源的乐谱生成软件。

[hacklily 在线写谱并演奏](https://www.hacklily.org) 可以导出乐谱也可以直接生产文件并保持到 GitHub。
A web-based sheet music editor and publishing platform. https://www.hacklily.org

## 数据可视化

[pinterest](https://www.pinterest.com/)
[visualcapitalist](http://www.visualcapitalist.com/)

Visual Capitalist is a digital media brand that uses data, art, and storytelling to make complex issues more digestible for millions of investors around the world.
Our focus is on creating context around the global economy, business trends, technology, and investing.

[information is beautiful net](https://informationisbeautiful.net/)
Data, information, knowledge: we distil it into beautiful, useful graphics & diagrams.

Founded by David McCandless, author of two bestselling infographics books, Information is Beautiful is dedicated to helping you make clearer, more informed decisions about the world. All our visualizations are based on facts & data: constantly updated, revised & revisioned.

[http://sarapiccolomini.com](http://sarapiccolomini.com)

[The Visual Miscellaneum](#)
The Visual Miscellaneum is a unique, groundbreaking look at the modern information age, helping readers make sense of the countless statistics and random facts that constantly bombard us. Using cutting edge graphs, charts, and illustrations, David McCandless creatively visualizes the world's surprising relationships and compelling data, covering everything from the most pleasu...

## 什么是 Alpha，什么是 Beta?

Alpha:投资组合的超额收益，表现管理者的能力；Beta:市场风险，最初主要指股票市场的系统性风险或收益。换句话说，跑赢大盘的就叫 Alpha，跟着大盘起伏就叫 Beta。

什么是 α 收益：一揽子可以自定义低估、同质化并且有波动的股票，不断买入更便宜的，卖出更贵的，从而获得的收益。例如：几个跟着沪深 300 的 ETF，你发现手中持有的沪深 300ETF 溢价 2%了，而市场上同时存在一个折价 1%的 ETF，那么就卖出溢价高的沪深 300ETF，去买折价的，这样虽然始终持有沪深 300ETF，但获得了超越沪深 300 指数本身的收益，就是 α 收益。解释一下同质化：明显所有的沪深 300ETF 是同质化的，也可以认为最小市值 20 个股票是同质化的，所有银行股是同质化的，分级 A 是同质化的。下文中有解释自定义低估。

什么是 β 收益：基本面本身上涨是 β 收益。例如，自定义最小市值的 10 个股票为一个指数，这些最小市值从 5 亿涨到 20 亿，这就是 β 收益。自定义最低股价 10 个为一个指数，从牛市的 5 元跌到 2 元，那么 β 收益就是负的

## 一个网站，有些很有意思的东西

[ www.bloomberg.com graphics/](https://www.bloomberg.com/graphics/2015-paul-ford-what-is-code/)

有很多地方值得去好好探究一下

## [每月介绍一个分子](http://www.chm.bris.ac.uk/motm/motm.htm)
