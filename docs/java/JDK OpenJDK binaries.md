# OpenJDK binaries and archives

## Oracle (java.net)

- [JDK 11](http://jdk.java.net/11/)
- [JDK 10](http://jdk.java.net/10/)
- ...

## Red Hat provides OpenJDK

[Red Hat provides OpenJDK](https://developers.redhat.com/products/openjdk/download/)
Archive links are also provided

## Azul Systems provides Zulu

[Azul Systems provides Zulu which is a certified build of OpenJDK for Windows / MacOS / Linux.](https://www.azul.com/downloads/zulu/)

https://www.azul.com/products/zulu-and-zulu-enterprise/download-openjdk-10-for-windows/

## AdoptOpenJDK provides prebuilt OpenJDK

[AdoptOpenJDK provides prebuilt OpenJDK binaries for Linux, MacOS, and Windows. It's useful for testing your application before GA release.](https://adoptopenjdk.net/)

## ref

- [ Hacker News OpenJDK now available for Windows ](https://news.ycombinator.com/item?id=13235849)
- [Where can I get OpenJDK binaries and archives?](https://qiita.com/ykubota/items/379a6aefac745f902881)

## GC

> 调节 GC 配置主要是调节 应用的最大停顿时间和应用的吞吐量。

- Garbage-First (G1) collector
- The maximum number of GC threads is limited by heap size and available CPU resources
- Initial heap size of 1/64 of physical memory
- Maximum heap size of 1/4 of physical memory
- Tiered compiler, using both C1 and C2

JEP 318: Epsilon: A No-Op Garbage Collector
JDK 上对这个特性的描述是：开发一个处理内存分配但不实现任何实际内存回收机制的 GC，一旦可用堆内存用完，JVM 就会退出。

### 到 JDK10 为止，Java 启动器能以三种方式运行

- 启动一个 class 文件
- 启动一个 JAR 中的 main 方法类
- 启动一个模块中的 main 方法类

- JDK11 再加一个，即第四种方式：启动一个源文件申明的类。
