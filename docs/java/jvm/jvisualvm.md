## jvisualvm jvm 监控

为了监控服务器和服务器中 JAVA 进程，我们需要开启 JMX，可以在 JAVA 进程启动的时候，添加如下几个参数：

```
JMX_OPTS="-Dcom.sun.management.jmxremote.port=7969
-Dcom.sun.management.jmxremote -Dcom.sun.management.jmxremote.authenticate=false
-Dcom.sun.management.jmxremote.ssl=false -Djava.rmi.server.hostname=xx.xx.xx.xx"

## 启动
nohup java ${JMX_OPTS} -jar xxxxx.jar

```

## 开启 JMX 监控

```shell
-Dcom.sun.management.jmxremote
-Dcom.sun.management.jmxremote.port=12345
-Dcom.sun.management.jmxremote.rmi.port=12345
-Dcom.sun.management.jmxremote.ssl=false
-Dcom.sun.management.jmxremote.authenticate=false
-Djava.rmi.server.hostname=139.196.107.149
```

- Djava.rmi.server.hostname 填写 JAVA 进程所在服务器的 IP 地址，

- -Dcom.sun.management.jmxremote.port=7969 是指定 JMX 监控端口的，这里是 7969。

重新启动进程后，打开本地的(我用的是 Window10)jvisualvm，添加 JMX 配置。配置成功后，可以点击线程那个 tab，因为我们要做线程 dump，观察线程的执行情况。
