# spring transcation in details

## 什么是事务？

事务是逻辑上的一组操作，要么都执行，要么都不执行。

> 事务的特性 ACID 是事务正确执行的四个基本要素。
> 原子性 Atomicity 事务最小的执行单位，不允许分割，事务的原子性确保动作要么全部完成，要么完全不起作用。
> 一致性 Consistency 执行事务前后，数据保持一致。
> 隔离性 Isolation 并发访问数据库时，一个事务不被其他事务所干扰，各个并发事务之间数据库是独立的。
> 持久性 Durability 一个事务被提交以后，它对数据库中的数据的改变是持久的，即使是数据库发生故障也不应该对其有任何影响。

## Spring 事务管理接口

- PlatformTransactionManager
- TransactionDefinition
- TransactionStatus

所谓 事务管理，就是按照给定的事务规则执行提交或者回滚操作

Spring 并不直接管理事务，而是提供了多种事务管理器 ，他们将事务管理的职责委托给 Hibernate 或者 JTA 等持久化机制所提供的相关平台框架的事务来实现

```java

  Public interface PlatformTransactionManager()...{
    // Return a currently active transaction or create a new one,
    // according to the specified propagation behavior
    //（根据指定的传播行为，返回当前活动的事务或创建一个新事务。）
    TransactionStatus getTransaction(TransactionDefinition definition) throws TransactionException;
    // Commit the given transaction, with regard to its status（使用事务目前的状态提交事务）
    Void commit(TransactionStatus status) throws TransactionException;
    // Perform a rollback of the given transaction（对执行的事务进行回滚）
    Void rollback(TransactionStatus status) throws TransactionException;

  }

```

常见的 TansactionManager 实现类

- DataSourceTransactionManager -> jdbc 或者 Mabatis 使用
- HibernateTransactionManager -> Hibernate 使用
- JpaTransactionManager -> Jpa
- JtaTransactionManager -> Jta

TransactionDefinition 接口中定义了 5 个方法以及一些表示事务属性的常量比如隔离级别、传播行为等等的常量。

```java

public interface TransactionDefinition {
    // 返回事务的传播行为
    int getPropagationBehavior();
    // 返回事务的隔离级别，事务管理器根据它来控制另外一个事务可以看到本事务内的哪些数据
    int getIsolationLevel();
    // 返回事务必须在多少秒内完成
    //返回事务的名字
    String getName()；
    int getTimeout();
    // 返回是否优化为只读事务。
    boolean isReadOnly();
}

```

事务的属性包括

- 隔离级别
- 传播行为
- 回滚规则
- 是否只读
- 事务超时

TransactionStatus 接口用来记录事务的状态 该接口定义了一组方法,用来获取或判断事务的相应状态信息.

```java

public interface TransactionStatus{
    boolean isNewTransaction(); // 是否是新的事物
    boolean hasSavepoint(); // 是否有恢复点
    void setRollbackOnly();  // 设置为只回滚
    boolean isRollbackOnly(); // 是否为只回滚
    boolean isCompleted; // 是否已完成
}

```

## Ref

[可能是最漂亮的 Spring 事务详解](https://juejin.im/post/5b00c52ef265da0b95276091)
