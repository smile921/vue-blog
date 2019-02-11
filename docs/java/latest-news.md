# 一些前沿的技术，权当拓宽视野吧

## GraalVM 神什么

> GraalVM is a universal virtual machine for running applications written in JavaScript, Python 3, Ruby, R, JVM-based languages like Java, Scala, Kotlin, and LLVM-based languages such as C and C++.

> GraalVM removes the isolation between programming languages and enables interoperability in a shared runtime. It can run either standalone or in the context of OpenJDK, Node.js, Oracle Database, or MySQL.

简单来说 Graalvm 是一个为了跑各种应用的全面的虚拟机，他可以运行用 JavaScript, Python 3, Ruby, R, 像基于 JVM 的语言如 Java, Scala, Kotlin, 和 基于 LLVM 的语言 比如 C and C++ 等写的应用。 Graalvm 去掉了不同语言之间的独立，使他们共享一个运行时。

Graalvm，也就是 Openjdk 的一个插件，有了 Graal 之后，就能够将 Lisp，Haskell 等 fp 语言运行在 JVM 上，并且可以通过 aot，jlink 等技术，将其打包成 size 很小的可执行文件，并发布出去

## JDK 11 的一个 实验性的 GC 叫 ZGC

> The Z Garbage Collector, also known as ZGC, is a scalable low-latency garbage collector.

据说 ZGC 比 G1 还要好，ZGC 的原理待了解. 目标是把 GC 停顿时间控制在 10ms 以内。
ZGC 所采用的算法就是 Azul Systems 很多年前提出的 Pauseless GC,而实现上它介乎早期 Azul VM 的 Pauseless GC 与后来 Zing VM 的 C4 之间。

- Pause times do not exceed 10ms
- Pause times do not increase with the heap or live-set size
- Handle heaps ranging from a few hundred megabytes to multi terabytes in size

At a glance, ZGC is:

- Concurrent
- Region-based
- Compacting
- NUMA-aware
- Using colored pointers
- Using load barriers

At its core, ZGC is a concurrent garbage collector, meaning all heavy lifting work is done while Java threads continue to execute. This greatly limits the impact garbage collection will have on your application's response time.

> 与标记对象的传统算法相比，ZGC 在指针上做标记，在访问指针时加入 Load Barrier（读屏障），比如当对象正被 GC 移动，指针上的颜色就会不对，这个屏障就会先把指针更新为有效地址再返回，也就是，永远只有单个对象读取时有概率被减速，而不存在为了保持应用与 GC 一致而粗暴整体的 Stop The World。

[听 R 大论 JDK11 的 ZGC](https://juejin.im/entry/5b86a276f265da435c4402d4)
[A FIRST LOOK INTO ZGC](https://dinfuehr.github.io/blog/a-first-look-into-zgc/)
[AZul 的《The Pauseless GC Algorithm》论文](https://www.usenix.org/legacy/events/vee05/full_papers/p46-click.pdf)

## [Quasar](http://docs.paralleluniverse.co/quasar/)

[parallel universe](http://www.paralleluniverse.co/)
Quasar is a library that provides high-performance lightweight threads, Go-like channels, Erlang-like actors, and other asynchronous programming tools for Java and Kotlin.

> CSP(Communicating Sequential Processes)模型

Quasar 是一个提供了高性能的轻量线程的库。这个库提供了像 GO 协程 Goroutine 的通道 channel 模型，像 Erlang 的 actor 模型的并发解决方案的 java 工具和 Kotlin 工具。

A good introduction to Quasar can be found in the blog post Erlang (and Go) in Clojure (and Java), Lightweight Threads, Channels and Actors for the JVM.

### Actor 模型

在 Actor 模型中，主角是 Actor，类似一种 worker，Actor 彼此之间直接发送消息，不需要经过什么中介，消息是异步发送和处理的

1. 所有 Actor 状态是 Actor 本地的，外部无法访问。
2. Actor 必须只有通过消息传递进行通信。
3. 一个 Actor 可以响应消息:推出新 Actor,改变其内部状态,或将消息发送到一个或多个其他参与者。
4. Actor 可能会堵塞自己,但 Actor 不应该堵塞它运行的线程。

### Channel 模型

Channel 模型中，worker 之间不直接彼此联系，而是通过不同 channel 进行消息发布和侦听。消息的发送者和接收者之间通过 Channel 松耦合，发送者不知道自己消息被哪个接收者消费了，接收者也不知道是哪个发送者发送的消息。
Go 语言的 CSP 模型是由协程 Goroutine 与通道 Channel 实现：

- Go 协程 goroutine: 是一种轻量线程，它不是操作系统的线程，而是将一个操作系统线程分段使用，通过调度器实现协作式调度。是一种绿色线程，微线程，它与 Coroutine 协程也有区别，能够在发现堵塞后启动新的微线程。
- 通道 channel: 类似 Unix 的 Pipe，用于协程之间通讯和同步。协程之间虽然解耦，但是它们和 Channel 有着耦合

Actor 之间直接通讯，而 CSP 是通过 Channel 通讯，在耦合度上两者是有区别的，后者更加松耦合。
同时，它们都是描述独立的流程通过消息传递进行通信。主要的区别在于：在 CSP 消息交换是同步的(即两个流程的执行"接触点"的，在此他们交换消息)，而 Actor 模型是完全解耦的，可以在任意的时间将消息发送给任何未经证实的接受者。由于 Actor 享有更大的相互独立,因为他可以根据自己的状态选择处理哪个传入消息。自主性更大些。

在 Go 语言中为了不堵塞流程，程序员必须检查不同的传入消息，以便预见确保正确的顺序。CSP 好处是 Channel 不需要缓冲消息，而 Actor 理论上需要一个无限大小的邮箱作为消息缓冲。

## [Comsat](http://docs.paralleluniverse.co/comsat)

Comsat integrates standard Java web-related APIs with Quasar fibers and actors. It provides fiber-aware implementations of servlets, JAX-RS REST services, HTTP clients and JDBC. With Comsat, you can write web applications that are scalable and performant while, at the same time, are simple to code and maintain. You will enjoy the scalability of asynchronous services with no need to change your simple sequential code.

### Web Actors

Comsat does provide one new API that you may choose to use: Web Actors. Web actors let you define a Quasar actor that receives and responds to HTTP requests and web socket messages. The Web Actors API is rather minimal, and is intended to do one job and do it well: simplify two-way communication between your server and the client.

Web Actors are Quasar actors that receive and respond to messages from web clients. Web actors support HTTP, WebSocket and SSE (Server-Sent Events) messages and are a convenient, efficient, and natural method to implement backends for interactive web applications.

Web Actors are deployed on a web server. Currently they can be deployed as a Netty handler, as an Undertow handler as well as in any JavaEE 7 servlet container.

## [Quasar](http://docs.paralleluniverse.co/quasar/)

Quasar is an open source JVM library that greatly simplifies the creation of highly concurrent software. Quasar adds true lightweight threads — fibers — to the JVM. Those fibers are just like regular threads, only they add very little scheduling overhead, and allow you to run hundreds-of-thousands or even millions of lightweight threads on a single JVM instance. On top of those fibers, Quasar provides Go-like channels, and Erlang-like actors, complete with supervisor hierarchies, selective receive and more.

### Fibers

Quasar’s chief contribution is that of the lightweight thread, called fiber in Quasar.
Fibers provide functionality similar to threads, and a similar API, but they’re not managed by the OS. They are lightweight in terms of RAM (an idle fiber occupies ~400 bytes of RAM) and put a far lesser burden on the CPU when task-switching. You can have millions of fibers in an application. If you are familiar with Go, fibers are like goroutines. Fibers in Quasar are scheduled by one or more ForkJoinPools.

Fibers are not meant to replace threads in all circumstances. A fiber should be used when its body (the code it executes) blocks very often waiting on other fibers (e.g. waiting for messages sent by other fibers on a channel, or waiting for the value of a dataflow-variable). For long-running computations that rarely block, traditional threads are preferable. Fortunately, as we shall see, fibers and threads interoperate very well.

Fibers are especially useful for replacing callback-ridden asynchronous code. They allow you to enjoy the scalability and performance benefits of asynchronous code while keeping the simple to use and understand threaded model.

### channels

Channels are queues used to pass messages between strands (remember, strands are a general name for threads and fibers). If you are familiar with Go, Quasar channels are like Go channels.

A channel is an interface that extends two other interfaces: SendPort, which defines the methods used to send messages to a channel, and ReceivePort, which defines the methods used to receive messages from a channel.

Channels are normally created by calling any of the newChannel static methods of the Channels class. The newChannel methods create a channel with a specified set of properties.

### Quasar’s Actor System

To use the terms we’ve learned so far, an actor is a strand that owns a single channel with some added lifecycle management and error handling. But this reductionist view of actors does them little justice. Actors are fundamental building blocks that are combined to build a fault-tolerant application. If you are familiar with Erlang, Quasar actors are just like Erlang processes.

An actor is a self-contained execution unit with well-defined inputs and outputs. Actors communicate with other actors (as well as regular program threads and fibers) by passing messages.

> Note: Actors may write to and read from channels other than their own mailbox. In fact, actors can do whatever regular fibers can.

Creating Actors
All actors extends the Actor class. The constructor takes the actor’s name (which does not have to be unique, and may even be null), and its mailbox settings (of type MailboxConfig).

MailboxConfig defines the mailbox size (the number of messages that can wait in the mailbox channel), with -1 specifying an unbounded mailbox, and an overflow policy. The overflow policy works the same as for plain channels, except that the THROW policy doesn’t cause an exception to be thrown in the sender if the mailbox capacity is exceeded, but rather throws an exception into the receiving actor (the exception will be thrown when the actor next blocks on a receive).

An actor is required to implement the doRun method. This method is the actor body, and is run when the actor is spawned.

It is preferable to subclass BasicActor rather than Actor; BasicActor provides the ability to perform selective receives (more on that later).

## [SpaceBase](http://docs.paralleluniverse.co/spacebase/)

SpaceBase is an in-memory spatial and geo-spatial database. It allows updating and querying millions of entities in real-time. Speciﬁcally designed for applications that require performing spatial operations with very low latencies or at very high rates.

### What is SpaceBase?

SpaceBase is a server-side, in-memory, high-performance, dynamic, concurrent and distributable spatial data-store. It stores 2D and 3D spatial objects and allows you to update and query them at high rates and concurrently from many threads and many servers. SpaceBase not only allows for fast and concurrent updates and queries, but supports atomic multi-object transactions, and, most importantly, can be used as a basis for parallelizing your entire application.

### Is SpaceBase For You?

SpaceBase was specifically designed for real-time or near real-time applications (requiring low latency), modifying many spatial objects at a high rate (a high write-ratio). SpaceBase is an excellent fit for interactive systems, where updates are done on many threads and/or servers, in response to concurrent network requests. SpaceBase is especially suited for:

- Online MMO games and virtual worlds. Spatial queries can be used for streaming and culling for each user. SpaceBase’s join-queries are great for broad-phase collision-detection.
- Military simulation and C4I systems.
- Highly dynamic location-based services. If your LBS only occasionally queries mostly static-objects, to inform users of nearby restaurants for example, there might be other solutions that are a better fit for your needs. SpaceBase does not particularly excel at storing a high-volume of static objects.

## [Galaxy](http://docs.paralleluniverse.co/galaxy/)

Galaxy is distributed in-memory data grid that horizontally scales Quasar’s actors across a cluster. Galaxy uses cache-coherence protocols across the network, and ensures that virtually all data queries and transactions are served with no need for IO.
