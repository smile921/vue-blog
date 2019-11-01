# 前端注记

::: danger yarn 使用本地依赖库
Yarn requires prefix file: for local packages.

For relative path:

`yarn add file:./../your-project`

For absolute path

`yarn add file:/dev/your-project`

For your example, dependency in package.json would be declared as follows:

"my-custom-i18n": "file:./../MyProject.Shared/myproject-i18n"`

Since v0.21.0 release, file: prefix is not needed.
:::

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

```json{5}
{
  "timeout": 120000,
  "registry": {
    "search": ["https://registry.bower.io"]
  }
}
```

`.npmrc`

```{1}
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
PUPPETEER_DOWNLOAD_HOST=https://storage.googleapis.com.cnpmjs.org
```

或者执行命令行配置

```bat{1}
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
npm -g config set PUPPETEER_DOWNLOAD_HOST https://storage.googleapis.com.cnpmjs.org
```

## 配置 yarn

`yarn config get registry`

``
`yarn config set registry https://registry.npm.taobao.org`

> # -> yarn config v0.15.0
>
> # -> success Set "registry" to "https://registry.npm.taobao.org".
>
> # -> Done in 0.04s.

或者编辑配置文件

```bash{1}
yarn  config set registry https://registry.npm.taobao.org/
yarn  config set sass_binary_site https://npm.taobao.org/mirrors/node-sass/
yarn  config set phantomjs_cdnurl https://npm.taobao.org/mirrors/phantomjs/
yarn  config set electron_mirror https://npm.taobao.org/mirrors/electron/
yarn  config set disturl https://npm.taobao.org/dist
yarn  config set NVM_NODEJS_ORG_MIRROR http://npm.taobao.org/mirrors/node
yarn  config set NVM_IOJS_ORG_MIRROR http://npm.taobao.org/mirrors/iojs
yarn  config set PHANTOMJS_CDNURL https://npm.taobao.org/dist/phantomjs
yarn  config set ELECTRON_MIRROR http://npm.taobao.org/mirrors/electron/
yarn  config set SASS_BINARY_SITE http://npm.taobao.org/mirrors/node-sass
yarn  config set SQLITE3_BINARY_SITE http://npm.taobao.org/mirrors/sqlite3
yarn  config set PYTHON_MIRROR http://npm.taobao.org/mirrors/python
yarn  config set PUPPETEER_DOWNLOAD_HOST https://storage.googleapis.com.cnpmjs.org
```

```js{4}
// 生成随机数
export const getUUID = function(len) {
  len = len || 6
  len = parseInt(len, 10)
  len = isNaN(len) ? 6 : len
  var seed = '0123456789abcdefghijklmnopqrstubwxyzABCEDFGHIJKLMNOPQRSTUVWXYZ'
  var seedLen = seed.length - 1
  var uuid = ''
  while (len--) {
    uuid += seed[Math.round(Math.random() * seedLen)]
  }
  return uuid
}
// 深拷贝
export const deepClone = function(obj) {
  if (Array.isArray(obj)) {
    return obj.map(deepClone)
  } else if (obj && typeof obj === 'object') {
    var cloned = {}
    var keys = Object.keys(obj)
    for (var i = 0, l = keys.length; i < l; i++) {
      var key = keys[i]
      cloned[key] = deepClone(obj[key])
    }
    return cloned
  } else {
    return obj
  }
}

export const deepcopy = function(source) {
  // debugger
  if (!source) {
    return source
  }
  let sourceCopy = source instanceof Array ? [] : {}
  for (let item in source) {
    sourceCopy[item] =
      typeof source[item] === 'object' ? deepcopy(source[item]) : source[item]
  }
  return sourceCopy
}
```

## github ip 查找

```python
#!/usr/bin/python3

import asyncio
import time
import socket
import sys

import aiohttp

class MyConnector(aiohttp.TCPConnector):
  def __init__(self, ip):
    self.__ip = ip
    super().__init__()

  async def _resolve_host(
    self, host: str, port: int,
    traces: None = None,
  ):
    return [{
      'hostname': host, 'host': self.__ip, 'port': port,
      'family': self._family, 'proto': 0, 'flags': 0,
    }]

async def test_domain(domain, ip, proto):
  if proto == 'http':
    return await test_domain_http(domain, ip)
  elif proto == 'ssh':
    return await test_domain_ssh(domain, ip)
  else:
    raise ValueError('unknown proto', proto)

async def test_domain_ssh(domain, ip):
  st = time.time()
  r, _w = await asyncio.open_connection(ip, 22)
  await r.read(1)
  return time.time() - st

async def test_domain_http(domain, ip):
  url = 'https://github.com/'
  st = time.time()
  async with aiohttp.ClientSession(connector=MyConnector(ip)) as s:
    r = await s.get(url)
    _ = await r.text()

  return time.time() - st

async def producer(q):
  items = await get_items()
  for item in items:
    await q.put(item)

  await q.put(None)

async def printer(q):
  while True:
    try:
      item = await q.get()
    except asyncio.CancelledError:
      break

    if isinstance(item[1], Exception):
      (domain, ip, proto), e = item
      print(f'{domain:21} {ip:15} {proto:4} {e!r}')
    else:
      (domain, ip, proto), t = item
      print(f'{domain:21} {ip:15} {proto:4} {t:6.2f}')

async def worker(q, ret_q):
  while True:
    item = await q.get()
    if item is None:
      await q.put(None)
      break

    try:
      t = await test_domain(*item)
    except Exception as e:
      await ret_q.put((item, e))
    else:
      await ret_q.put((item, t))

async def main():
  q = asyncio.Queue()
  ret_q = asyncio.Queue()

  futures = [worker(q, ret_q) for _ in range(40)]
  producer_fu = asyncio.ensure_future(producer(q))
  printer_fu = asyncio.ensure_future(printer(ret_q))

  await asyncio.wait(futures)
  printer_fu.cancel()
  await producer_fu
  await printer_fu

async def resolve(domain):
  loop = asyncio.get_event_loop()
  addrinfo = await loop.getaddrinfo(
    domain, None,
    family=socket.AF_INET,
    proto=socket.IPPROTO_TCP,
  )
  ips = [x[-1][0] for x in addrinfo]
  return domain, ips

async def get_items():
  domains = [
    "ams-region.github.com",
    "sea-region.github.com",
    "iad-region.github.com",
    "sin-region.github.com",
  ]
  print('Resolving domains...', flush=True, end='')
  futures = [resolve(domain) for domain in domains]
  futures, _ = await asyncio.wait(futures)
  results = [fu.result() for fu in futures]

  items = []
  for domain, ips in results:
    for ip in ips:
      items.append((domain, ip))
  print('done.')

  items += [
    ('(Tokyo)', '52.69.186.44'),
    ('(Sydney)', '52.64.108.95'),
  ]

  if len(sys.argv) == 2:
    proto = sys.argv[1]
    proto = [proto]
  else:
    proto = ['http', 'ssh']
  return [(x[0], x[1], y) for x in items for y in proto]

if __name__ == '__main__':
  import logging
  logging.getLogger().addHandler(logging.NullHandler())

  loop = asyncio.get_event_loop()
  try:
    loop.run_until_complete(main())
  except KeyboardInterrupt:
    pass

```
