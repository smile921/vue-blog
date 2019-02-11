# A Collection of Blogs

::: tip

**常用镜像网站**

- [阿里巴巴开源镜像站](https://opsx.alibaba.com/)
- [清华大学开源软件镜像站](https://mirrors.tuna.tsinghua.edu.cn/)
- [中国科学技术大学开源软件镜像](http://mirrors.ustc.edu.cn/)

:::

::: tip

### 常用命令

**Ubuntu**

    sed -i 's/archive.ubuntu.com/mirrors.ustc.edu.cn/g' /etc/apt/sources.list
    sed -i 's/security.ubuntu.com/mirrors.ustc.edu.cn/g' /etc/apt/sources.list

**Debian**

    sed -i 's/deb.debian.org/mirrors.ustc.edu.cn/g' /etc/apt/sources.list
    sed -i 's/security.debian.org/mirrors.ustc.edu.cn/g' /etc/apt/sources.list

**alpine**

    echo 'http://dl-cdn.alpinelinux.org/alpine/edge/community' | tee -a /etc/apk/repositories
    sed -i 's/dl-cdn.alpinelinux.org/mirrors.ustc.edu.cn/g' /etc/apk/repositories

:::

::: danger `git proxy 速切`

```
git config --global http.proxy 'http://127.0.0.1:1080'

git config --global https.proxy 'http://127.0.0.1:1080'

git config --global --unset http.proxy

git config --global --unset https.proxy
```

:::

::: warning `ffmpeg webm2mp4`

> 使用 ffmpeg 转 mp4 到 webm 是非常简单的一种转换。如果您知道源视频的分辨率，例如是 1280x720 的，想把它转换成高清视频（720P），您可以用下面的脚本。

```
ffmpeg -i input.mp4 -s 1280x720 -vpre libvpx-720p -b 3900k -pass 1 \
-an -f webm -y output.webm
```

:::

::: tip `youtube converter online`
https://www.clipconverter.cc/
:::

```js{4}
export default {
  data() {
    return {
      msg: 'Highlighted!'
    }
  }
}
```

::: tip 视频下载命令行工具

- [youtube-dl](https://github.com/rg3/youtube-dl)
- [youtube-dl 支持列表](https://github.com/rg3/youtube-dl/blob/master/docs/supportedsites.md)

- [you-get](https://github.com/soimort/you-get)
- [you-get 支持的网站列表](https://you-get.org/#supported-sites)
  :::
