# 开发环境配置建议

## 基本要求 按照 nodejs 和 yarn 工具，代码编辑器 vscode 可选(用着顺手就行)

- [2019-01-15 环境工具依赖](http://10.88.2.201:8888/files/Tools/morden%20front%20end)
- 按照 nodejs 和 yarn 工具，把工具的 bin 目录加入系统的 path 环境变量中

安装完之后确保下面的命令行提示：

> C:\Users\xxx>node -v
>
> v10.15.0
>
> C:\Users\xxx>yarn -v
>
> 1.13.0
>
> C:\Users\xxx>yarn -V
>
> yarn install v1.13.0

## 设置环境变量：(国内有墙，加速依赖下载的)

- For Windows
- 在登录用户的根目录创建下面两个配置文件
  `.bowerrc`

```json
{
  "timeout": 120000,
  "registry": {
    "search": ["https://registry.bower.io"]
  }
}
```

`.npmrc`

```
registry=https://registry.npm.taobao.org/
sass_binary_site=https://npm.taobao.org/mirrors/node-sass/
phantomjs_cdnurl=https://npm.taobao.org/mirrors/phantomjs/
electron_mirror=https://npm.taobao.org/mirrors/electron/
disturl=https://npm.taobao.org/dist
NVM_NODEJS_ORG_MIRROR=http://npm.taobao.org/mirrors/node
NVM_IOJS_ORG_MIRROR=http://npm.taobao.org/mirrors/iojs
PHANTOMJS_CDNURL=https://npm.taobao.org/dist/phantomjs
ELECTRON_MIRROR=http://npm.taobao.org/mirrors/electron/
SASS_BINARY_SITE=http://npm.taobao.org/mirrors/node-sass
SQLITE3_BINARY_SITE=http://npm.taobao.org/mirrors/sqlite3
PYTHON_MIRROR=http://npm.taobao.org/mirrors/python
```

或者执行命令行配置

```bat
npm -g config set registry https://registry.npm.taobao.org/
npm -g config set sass_binary_site https://npm.taobao.org/mirrors/node-sass/
npm -g config set phantomjs_cdnurl https://npm.taobao.org/mirrors/phantomjs/
npm -g config set electron_mirror https://npm.taobao.org/mirrors/electron/
npm -g config set disturl https://npm.taobao.org/dist
npm -g config set NVM_NODEJS_ORG_MIRROR http://npm.taobao.org/mirrors/node
npm -g config set NVM_IOJS_ORG_MIRROR http://npm.taobao.org/mirrors/iojs
npm -g config set PHANTOMJS_CDNURL https://npm.taobao.org/dist/phantomjs
npm -g config set ELECTRON_MIRROR http://npm.taobao.org/mirrors/electron/
npm -g config set SASS_BINARY_SITE http://npm.taobao.org/mirrors/node-sass
npm -g config set SQLITE3_BINARY_SITE http://npm.taobao.org/mirrors/sqlite3
npm -g config set PYTHON_MIRROR http://npm.taobao.org/mirrors/python
```

## 配置 yarn

`yarn config get registry`
`yarn config set registry https://registry.npm.taobao.org`

> # -> yarn config v0.15.0
>
> # -> success Set "registry" to "https://registry.npm.taobao.org".
>
> # -> Done in 0.04s.
>
> 或者编辑配置文件

```bash
yarn global   config set registry https://registry.npm.taobao.org/
yarn global   config set sass_binary_site https://npm.taobao.org/mirrors/node-sass/
yarn global   config set phantomjs_cdnurl https://npm.taobao.org/mirrors/phantomjs/
yarn global   config set electron_mirror https://npm.taobao.org/mirrors/electron/
yarn global   config set disturl https://npm.taobao.org/dist
yarn global   config set NVM_NODEJS_ORG_MIRROR http://npm.taobao.org/mirrors/node
yarn global   config set NVM_IOJS_ORG_MIRROR http://npm.taobao.org/mirrors/iojs
yarn global   config set PHANTOMJS_CDNURL https://npm.taobao.org/dist/phantomjs
yarn global   config set ELECTRON_MIRROR http://npm.taobao.org/mirrors/electron/
yarn global   config set SASS_BINARY_SITE http://npm.taobao.org/mirrors/node-sass
yarn global   config set SQLITE3_BINARY_SITE http://npm.taobao.org/mirrors/sqlite3
yarn global   config set PYTHON_MIRROR http://npm.taobao.org/mirrors/python
```
