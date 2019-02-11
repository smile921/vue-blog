# Java 内存效率

[这篇文章](http://www.ibm.com/developerworks/java/library/j-codetoheap/index.html)里详细的介绍了 JVM 中各种数据类型/集合对内存的使用情况。

**总的来说:**

1. JVM 是非常浪费内存的；

1. 并且和 CPU 资源不同，这种浪费，并不能通过 JVM 自动优化（CPU 优化有 JIT，内联等技术）

1. 只能通过小心的使用以及切换到高内存效率的库来实现。

### JVM 内存浪费在哪里

下图是 32 位机器中 JVM 进程的内存地址分布(4G)

![JVM内存分布](./../img/figure1.gif)

#### 1. Object

没错，Object 是 JVM 中一切内存浪费的根源

![一个Object的内存分配](./../img/figure2.gif)

上图是 32 位 JVM 中一个 Integer 对象的内存占用情况，这个对象共占用 128bit 内存，其中只有 32bit 是真正的 int 数据. 其他的部分：

1. Class pointer: 指向对象对应的类信息(Class Info)的指针，也就是我们平时用的 obj.getClass()
1. Flags: 各种标志位，包括对象的 hashcode，对象是否为数组等信息
1. Lock: 对象对应的锁，用于 synchronized

这三类信息是**每一个**对象都要存储的，但却不都是真正有用的数据。

结论：Integer 对象，内存的使用效率是 1/4

#### 2. 数组

数组比普通的对象多一个 size 字段，如图：

![一个数组对象的内存分配](./../img/figure3.gif)

int[]数组的存储使用率是 1/5，注意这是 size==1 的情况。如果有更多的数据，int[]数组的内存使用率会提高。

但是`Integer[]`数组不会

#### 3. String

String 的存储大致如下：

```java
class String {
    int count;
    int offset;
    char[] value;
}
```

内存分布如下图：

![一个String对象的内存分配](./../img/figure4.gif)

#### 4. 集合

#### 5. 集合的空余空间

#### 6. 自动可变长

## 解决方案：

### 优化小集合

1. 初始化时指定合理的 size
1. 减少对象的层次

### 使用高性能的集合/库

##### 1. `int[]` < `Integer[]` < `ArrayList<Integer>` < `Set<Integer>` < `Map<Integer, Integer>`

##### 2. [Trove](http://trove.starlight-systems.com/)

各种原始类型数据的集合：TIntList, TIntIntMap 等，接口和 java.util 里的集合差不多，但是更高效，并且节省大量内存

##### 3. [Javolution](http://javolution.org/)

> Javolution real-time goals are simple: To make your application faster and more time predictable!

一个高性能的实时计算库，实时版的 `util / lang / text / io / xml`

##### 4. Guava

### 减少抽象的层次

### 注意不必要的浪费

1. ConcurrentCollection
