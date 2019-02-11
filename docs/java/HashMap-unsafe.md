# Java HashMap 非线程安全

HashMap 的实现里没有锁的机制，因此它是线程不安全的

- 多个线程同时操作一个 hashmap 就可能出现不安全的情况
- HashMap 扩容的时候，会发生转移，可能会不安全甚至严重是出现死循环
- 构造 entry<K,V>单链表时，也会出现不安全的情况。
  ConcurrentHashMap 是线程安全的

## ref

[ JAVA HASHMAP 的死循环 ](https://coolshell.cn/articles/9606.html)
[ HASH COLLISION DOS 问题 ](https://coolshell.cn/articles/6424.html)

## note

> 一定要谨记 volatile 关键字在 Java 代码中仅仅保证这个变量是可见的：它不保证原子性。在那些非原子且可由多个线程访问的易变操作中，一定不能够依赖于 volatile 的同步机制。相反，要使用 java.util.concurrent 包的同步语句、锁类和原子类。它们在设计上能够保证程序是线程安全的。

```java
// Jetty 7.1.0,
// org.eclipse.jetty.io.nio,
// SelectorManager.java, line 105
// 在一个易变（volatile）域上不获取锁的情况下执行非原子操作

private volatile int _set;
......
public void register(SocketChannel channel, Object att)
{
   int s=_set++;
   ......
}
......
public void addChange(Object point)
{
   synchronized (_changes)
   {
      ......
   }
}
```

> 在 Java 语言中，我们使用了同步语句来获取互斥锁，这可以保护多线程系统的共享资源访问。然而，易变域的同步中会有一个漏洞，它可能破坏互斥。解决的方法是一定要将同步的域声明为 private final 这能够保证锁对象保持不变，并且保证了互斥（mutex）

```java
// Tomcat 的错误

96: public void addInstanceListener(InstanceListener listener) {
97:
98:    synchronized (listeners) {
99:       InstanceListener results[] =
100:        new InstanceListener[listeners.length + 1];
101:      for (int i = 0; i < listeners.length; i++)
102:          results[i] = listeners[i];
103:      results[listeners.length] = listener;
104:      listeners = results;
105:   }
106:
107:}

```

> 一个实现 java.util.concurrent.locks.Lock 接口的锁控制着多个线程是如何访问一个共享资源的。这些锁不需要使用语句结构，所以它们比同步方法或语句更灵活。然而，这种灵活性可能导致编码错误，因为不使用语句的锁是不会自动释放的。如果一个 Lock.lock() 调用没有在同一个实例上执行相应的 unlock() 调用，其结果就可能造成一个锁泄漏。

```java
// 分析一个锁泄漏
private final Lock lock = new ReentrantLock();
 
public void lockLeak() {
   lock.lock();
   try {
      // access the shared resource
      accessResource();
      lock.unlock();
   } catch (Exception e) {}
 
public void accessResource() throws InterruptedException {...}
```

```java
// 总是将 unlock 调用置于 finally 语句中
private final Lock lock = new ReentrantLock();

public void lockLeak() {
   lock.lock();
   try {
      // access the shared resource
      accessResource();
   } catch (Exception e) {}
   finally {
      lock.unlock();
   }

public void accessResource() throws InterruptedException {...}
```
