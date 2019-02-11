## 下面的 finally 是否会执行

```java
try {
    something();
    return success;
}
catch (Exception e) {
    return failure;
}
finally {
    System.out.println("i don't know if this will get printed out.");
}
```

他一定会执行 finally 代码除了下面的情况

- If you invoke System.exit();
- If the JVM crashes first;
- If the JVM reaches an infinite loop (or some other non-interruptable, non-terminating statement) in the try or catch block;
- If the OS forcibly terminates the JVM process; e.g. `"kill -9 "` on UNIX.
- If the host system dies; e.g. power failure, hardware error, OS panic, etcetera.
- If finally block is going to be executed by daemon thread and all other non daemon threads exit before finally is called.

```java
// this will alway return 12
public static int getMonthsInYear() {
	    try {
	      return 10;
	    }
	    finally {
	      return 12;
	    }
  }

  // no exception throw
  public static int getMonthsInYear() {
    try {
        throw new RuntimeException();
    }
    finally {
        return 12;
    }
}
```

## 使用 java 写一段内存泄漏的代码

Here's a good way to create a true memory leak (objects inaccessible by running code but still stored in memory) in pure Java:

- The application creates a long-running thread (or use a thread pool to leak even faster).
- The thread loads a class via an (optionally custom) ClassLoader.
- The class allocates a large chunk of memory (e.g. new byte[1000000]), stores a strong reference to it in a static field, and then stores a reference to itself in a ThreadLocal. Allocating the extra memory is optional (leaking the Class instance is enough), but it will make the leak work that much faster.
- The thread clears all references to the custom class or the ClassLoader it was loaded from.
- Repeat.
  This works because the ThreadLocal keeps a reference to the object, which keeps a reference to its Class, which in turn keeps a reference to its ClassLoader. The ClassLoader, in turn, keeps a reference to all the Classes it has loaded.

(It was worse in many JVM implementations, especially prior to Java 7, because Classes and ClassLoaders were allocated straight into permgen and were never GC'd at all. However, regardless of how the JVM handles class unloading, a ThreadLocal will still prevent a Class object from being reclaimed.)

A variation on this pattern is why application containers (like Tomcat) can leak memory like a sieve if you frequently redeploy applications that happen to use ThreadLocals in any way. (Since the application container uses Threads as described, and each time you redeploy the application a new ClassLoader is used.)

- Static field holding object reference [esp final field]

```java
class MemorableClass {
    static final ArrayList list = new ArrayList(100);
}
```

- Calling String.intern() on lengthy String

```java
String str=readString(); // read lengthy string any source db,textbox/jsp etc..
// This will place the string in memory pool from which you can't remove
str.intern();
```

- (Unclosed) open streams ( file , network etc... )

```java
try {
    BufferedReader br = new BufferedReader(new FileReader(inputFile));
    ...
    ...
} catch (Exception e) {
    e.printStacktrace();
}
```

- Unclosed connections

```java
try {
    Connection conn = ConnectionFactory.getConnection();
    ...
    ...
} catch (Exception e) {
    e.printStacktrace();
}
```

- Areas that are unreachable from JVM's garbage collector, such as memory allocated through native methods

- In web applications, some objects are stored in application scope until the application is explicitly stopped or removed.

```java
getServletContext().setAttribute("SOME_MAP", map);
```

- Incorrect or inappropriate JVM options, such as the noclassgc option on IBM JDK that prevents unused class garbage collection

## Why is it faster to process a sorted array than an unsorted array?

```java
import java.util.Arrays;
import java.util.Random;

public class Main
{
    public static void main(String[] args)
    {
        // Generate data
        int arraySize = 32768;
        int data[] = new int[arraySize];

        Random rnd = new Random(0);
        for (int c = 0; c < arraySize; ++c)
            data[c] = rnd.nextInt() % 256;

        // !!! With this, the next loop runs faster
        Arrays.sort(data);

        // Test
        long start = System.nanoTime();
        long sum = 0;

        for (int i = 0; i < 100000; ++i)
        {
            // Primary loop
            for (int c = 0; c < arraySize; ++c)
            {
                if (data[c] >= 128)
                    sum += data[c];
            }
        }

        System.out.println((System.nanoTime() - start) / 1000000000.0);
        System.out.println("sum = " + sum);
    }
}
```

以上代码在数组填充时已经加入了分区函数，充分保证填充值的随机性，计算时也是按一半的元素来求和，所以不存在特例情况。而且，计算也完全不涉及到数据的有序性，即数组是否有序理论上对计算不会产生任何作用。在这样的前提下，为什么排序后的数组要比未排序数组运行快 3 倍以上？

- What is going on?
- Why is it faster to process a sorted array than an unsorted array?
- The code is summing up some independent terms, and the order should not matter.

### What is Branch Prediction? 分支预测

Now for the sake of argument, suppose this is back in the 1800s - before long distance or radio communication.

You are the operator of a junction and you hear a train coming. You have no idea which way it is supposed to go. You stop the train to ask the driver which direction they want. And then you set the switch appropriately.

Trains are heavy and have a lot of inertia. So they take forever to start up and slow down.

Is there a better way? You guess which direction the train will go!

If you guessed right, it continues on.
If you guessed wrong, the captain will stop, back up, and yell at you to flip the switch. Then it can restart down the other path.
If you guess right every time, the train will never have to stop.
If you guess wrong too often, the train will spend a lot of time stopping, backing up, and restarting.
大多数应用都具有状态良好的(well-behaved)分支，所以现代化的分支预测器一般具有超过 90%的命中率。但是面对无法预测的分支，且没有识别出可应用的的模式时，分支预测器就无用武之地了。

- 使用分支预测: 是否排序严重影响 performance
- 使用 bithack: 是否排序对 performance 无显著影响

### Pipeline

先简单说明一下 CPU 的 instruction pipeline(指令流水线)，以下简称 pipeline。 Pipieline 假设程序运行时有一连串指令要被运行，将程序运行划分成几个阶段，按照一定的顺序并行处理之，这样便能够加速指令的通过速度。

绝大多数 pipeline 都由时钟频率(clock)控制，在数字电路中，clock 控制逻辑门电路(logical cicuit)和触发器(trigger), 当受到时钟频率触发时，触发器得到新的数值，并且逻辑门需要一段时间来解析出新的数值，而当受到下一个时钟频率触发时触发器又得到新的数值，以此类推。

而借由逻辑门分散成很多小区块，再让触发器链接这些小区块组，使逻辑门输出正确数值的时间延迟得以减少，这样一来就可以减少指令运行所需要的周期。 这对应 Pipeline 中的各个 stages。

一般的 pipeline 有四个执行阶段(execuate stage): 读取指令(Fetch) -> 指令解码(Decode) -> 运行指令(Execute) -> 写回运行结果(Write-back).
