# Jvm 参数如何配置

如果 Dockerfile 里预留了`JVM_OPTS`环境变量，可以在`values.yaml`中通过`JVM_OPTS`来配置。当然也可以在 Dockerfile 中写配置

**提醒：** 改了内存，别忘了改`values.yaml`中的 resource 配置。如果堆内存准备给 2G，那么建议 resource 里的 request 给 2.5G，limit 给 4G。`values.yaml`中的 limit 最好是 request 的 2-4 倍。

## JDK 8

小于 8G 内存时，默认参数就是经过专业团队测试的适应大多数场景的参数，无需调整。加上内存和 GC 日志参数即可，**大多数应用用这个配置已经足够了**，如：

```
-Xms2g -Xmx2g -verbose:gc -XX:+PrintGCDetails -XX:+PrintGCDateStamps -XX:+PrintGCTimeStamps
```

如果使用 CMS 垃圾回收器，希望尽早回收垃圾对象，比如希望 old 使用率达到 75%就出发垃圾回收，它的默认值是 80%，等于 CMSTriggerRatio

```
-XX:+UseConcMarkSweepGC -XX:CMSInitiatingOccupancyFraction=75 -XX:+UseCMSInitiatingOccupancyOnly
```

JVM 启动时,虽然为 JVM 指定了内存大小,但是这些内存操作系统并没有真正的分配给 JVM,而是等 JVM 访问这些内存的时候才分配。如果希望系统立即分配内存可以加如下配置。

```
-XX:+AlwaysPreTouch
```

## JDK 7

能用 8 就不要用 7 了。JDK7 中还有 permsize 要手工配置。它是用来存放 class 信息的。8 以后已经不需要配置了。对于 jar 包使用较多的应用，需要增大 permsize，如下

```
-XX:PermSize=256m -XX:MaxPermSize=512m
```

内存分配比例一般情况下**不需要调整**，NewRatio 表示 young/old，默认是 2，SurvivorRatio 表示 eden/survivor，默认是 8，注意，survivor 一般有两个，也就是说 eden 占 young 的 8/10。如果要调整，用如下参数

```
 -XX:NewRatio=2 -XX:SurvivorRatio=6
```

# 容器特别篇

JVM 垃圾回收的内存数是根据 cpu 核数推断的，而运行在容器中的 JVM 看到的是所有核。比如，宿主机有 64 核，允许容器使用 2 核，此时如果不指定线程数的话，JVM 会启动 64 个线程来做垃圾回收。最终导致垃圾回收缓慢甚至失败。所以，如果应用运行在容器中时最好指定下垃圾回收的线程数。

以下两个参数最好等于 CPU 核数（之所以设置两个，是因为不指定 gc 算法时，JVM 是根据及其情况自动选择的，按上面的写法会选择 ParallelGC）

```
 -XX:ConcGCThreads=threads
           Sets the number of threads used for concurrent GC. The default value depends on the number of CPUs available to the JVM.
 -XX:ParallelGCThreads=threads
           Sets the number of threads used for parallel garbage collection in the young and old generations. The default value depends on
           the number of CPUs available to the JVM.
```

综上所述，假设应用需要 2G 内存，CPU 最大使用 2 核，那么建议的 JVM 配置如下

```
-Xms2g -Xmx2g -verbose:gc -XX:+PrintGCDetails -XX:+PrintGCDateStamps -XX:+PrintGCTimeStamps -XX:ParallelGCThreads=2 -XX:ConcGCThreads=2
```

## 如何确定自己的应用能使用多少内存

### JDK8

去掉 `-Xms2g -Xmx2g`参数，增加`-XX:+UnlockExperimentalVMOptions -XX:+UseCGroupMemoryLimitForHeap`。然后修改`values.yaml`中的 limit 为 16G，request 为 4G。给应用与实际场景类似的压力，然后监控看 JVM 的堆内存使用情况。然后根据监测结果来计算堆大小和非堆内存的大小。

下面说说为什么这样做。

`-XX:+UnlockExperimentalVMOptions -XX:+UseCGroupMemoryLimitForHeap`意思是让 JVM 根据 Docker 容器的限制自动配置堆大小。JVM 会设置 MaxHeapSize 为 limit/4。所以只要修改 limit 值为 16，那么 JVM 的堆最大值就会被设置为 4G。对于大多数应用 4G 的堆已经足够了，如果发现不够，可以加大 limit 继续测试。 request 也设置为 limit/4 可以保证容器能申请足够的的内存给 JVM。

# 资料

在线 gc 分析工具 http://gceasy.io
