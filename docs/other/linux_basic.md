# linux 基础命令

#### 常用指令

- ls 显示文件或目录
- -l 列出文件详细信息 l(list)
- -a 列出当前目录下所有文件及目录，包括隐藏的 a(all)
- mkdir 创建目录
- -p 创建目录，若无父目录，则创建 p(parent)
- cd 切换目录
- touch 创建空文件
- echo 创建带有内容的文件
- cat 查看文件内容
- cp 拷贝
- mv 移动或重命名
- rm 删除文件
- -r 递归删除，可删除子目录及文件
- -f 强制删除
- find 在文件系统中搜索某个文件
- wc 统计文本中行数、字数、字符数
- grep 在文本文件中查找某个字符
- rmdir 删除空目录
- tree 树形结构显示目录，需要安装 tree 包
- pwd 显示当前目录
- ln 创建链接文件
- more、less 分页显示文本文件内容
- head、tail 显示文件头、尾内容
- ctrl+c 终止命令

#### 系统管理命令

- stat 显示指定文件的详细信息，比 ls 更详细
- who 显示在线登陆用户
- whoami 显示当前操作用户
- hostname 显示主机名
- uname 显示系统信息
- top 动态显示当前耗费资源最多的进程信息
- ps 显示瞬间进程状态 ps -aux
- du 查看目录大小 du -h /home 带有单位显示目录信息
- df 查看磁盘大小 df -h 带有单位显示磁盘信息
- ifconfig 查看网络情况
- ping 测试网络连通
- netstat 显示网络状态信息
- man 命令不会用了，找男人 如：man ls
- clear 清屏
- alias 重命名 如：alias showmeit="ps -aux" ，另外解除使用 unaliax showmeit
- kill 杀死进程，可以先用 ps 或 top 命令查看进程的 id，然后再用 kill 命令杀死进程

#### 打包压缩相关命令

tar: 打包压缩

- -c 归档文件
- -x 压缩文件
- -z gzip 压缩文件
- -j bzip2 压缩文件
- -v 显示压缩或解压缩过程 v(view)
- -f 使用档名
  例：
- `tar -cvf /home/abc.tar /home/abc` 只打包，不压缩
- `tar -zcvf /home/abc.tar.gz /home/abc` 打包，并用 gzip 压缩
- `tar -jcvf /home/abc.tar.bz2 /home/abc` 打包，并用 bzip2 压缩
  当然，如果想解压缩，就直接替换上面的命令 `tar -cvf / tar -zcvf / tar -jcvf` 中的“c”换成“x”就可以了

#### 关机/重启机器

- shutdown
- -r 关机重启
- -h 关机不重启
- now 立刻关机
- halt 关机
- reboot 重启

#### vim 使用

- ：q 退出
- ：q! 强制退出
- ：wq 保存并退出

### 参考资料

- [Linux 基础概要](https://legacy.gitbook.com/book/abcfy2/linux_basic/details)
- [Linux 基础](http://linuxtools-rst.readthedocs.io/zh_CN/latest/base/index.html)
- [Linux 命令大全](http://man.linuxde.net/)
- `https://thief.one/2017/08/08/1/`
