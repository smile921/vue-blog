# message queue

# 分布式通讯

## 问题描述：

> 网站(Website)上人工操作产生的数据更新，需要通知到多台对外 Web Service 服务器(Server)上

另外，由于需要和多中不同类型的 Server 通讯，

我们在网站和投放服务器间搭建了一个中间服务（Broker），

作为信息集散。

基本上是这样一个流程:

`Website` --> `Business-layer` --> `Broker` <--> `Server`

参看流程图

## 通讯需求

1. 可靠、时序
1. 各台 Server 间的数据基本保持一致
1. 灾备恢复
1. `Server`对性能要求很高，尽量少占用其计算资源
1. `Website`和`Broker`操作同一个数据库，分别负责写和读

## 备选的实现方案

1. 服务器轮询:

   `Server`鸭梨太大

2. HTTP 推送:

3. Redis 消息队列：

4. 文件搬运

5. 数据库远程同步：数据冗余

6. AMQP/RabbitMQ 等消息队列中间件

## 现在的实现方案

### A. `Website` --> `Broker` : Redis 消息队列

1. `Website`更新数据
1. 将更新的数据以 ID 列表的形式送到 Redis 队列中
1. 通过一个 HTTP 接口通知`Broker`去读取队列
1. `Broker`读取获得更新的 ID 列表，并组装更新数据，通知`BidServer`

##### 容错

1. `Website`宕机：

   因为当前的数据库状态就相当于推送历史的一个快照，因此`Website`在重启时，通知将数据库中的当前信息重发即可

2. `Broker`宕机：

   由于`Broker`作用很关键，因此当`Broker`宕机时，`Website`更新数据将会返回失败。

### B. `Broker` --> `Server` : HTTP 推送

1. 每台 Server 启动时，向 Broker 进行注册，Broker 在接到注册信息以后，记录机器信息，并将该 Server 需要的信息全量发送
2. Broker 为每一台 Server 维持一个推送队列，保证消息推送的时序性
3. 每个推送队列是一个线程，通过 wait,notify 机制进行管理，当没有消息推送的时候，队列 wait；当队列有信息写入的时候，队列被激活
4. Website 上的操作，以增量的方式写入队列，发送给 Server；每天晚上 0 点，改天使用的全量数据会被推送一次

#### 容错：

1. 当 Broker 宕机时，重新启动时，会向所有的 Server 全量推送当前可用数据
2. 当 Server 宕机时，Broker 不能够推送成功，会发送报警消息
3. Server 宕机重启时，可以向 Broker 注册，获取所需数据
