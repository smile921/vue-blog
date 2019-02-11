# Monad all you need to know

## What is a monad? [ref in haskell ](https://stackoverflow.com/questions/44965/what-is-a-monad)

In Haskell-terms a monad is a parameterized type which is an instance of the Monad type class, which defines `>>=` along with a few other operators. In layman's terms, a monad is just a type for which the `>>=` operation is defined.

In itself `>>=` is just a cumbersome way of chaining functions, but with the presence of the do-notation which hides the "plumbing", the monadic operations turns out to be a very nice and useful abstraction, useful many places in the language, and useful for creating your own mini-languages in the language.

## Why are monads hard?

For many Haskell-learners, monads are an obstacle they hit like a brick wall. It's not that monads themselves are complex, but that the implementation relies on many other advanced Haskell features like parameterized types, type classes, and so on. The problem is that Haskell I/O is based on monads, and I/O is probably one of the first things you want to understand when learning a new language - after all, it's not much fun to create programs which don't produce any output. I have no immediate solution for this chicken-and-egg problem, except treating I/O like "magic happens here" until you have enough experience with other parts of language. Sorry.

## in

- 软件最基本的数据，就是各种值（value）。
- 处理值的一系列操作，可以封装成函数。输入一个值，会得到另一个值。上图的"(+3)"就是一个函数，对输入的值加上 3，再输出。
  - 函数很像漏斗，上面进入一个值，下面出来一个值。
  - 函数可以连接起来使用，一个函数接着另一个函数。
  - 函数还可以依次处理数据集合的每个成员。
- 说完了函数，再来看第二个概念：数据类型（type）。

  - 数据类型就是对值的一种封装，不仅包括值本身，还包括相关的属性和方法。上图就是 2 的封装，从此 2 就不是一个单纯的值，而是一种数据类型的实例，只能在数据类型的场景（context）中使用。
  - 2 变成数据类型以后，原来的函数就不能用了。因为"(+3)"这个函数是处理值的（简称"值函数"），而不是处理数据类型的。
  - 我们需要重新定义一种运算。它接受"值函数"和数据类型的实例作为输入参数，使用"值函数"处理后，再输出数据类型的另一个实例。上图的 fmap 就代表了这种运算。
  - fmap 的内部，实际上是这样：打开封装的数据类型，取出值，用值函数处理以后，再封装回数据类型。

- 一个有趣的问题来了。如果我们把函数也封装成数据类型，会怎样？
- 上图就是把函数"(+3)"封装成一种数据类型。
- 这时，就需要再定义一种新的运算。它不是值与值的运算，也不是值与数据类型的运算，而是数据类型与数据类型的运算。
- 上图中，两个数据类型进行运算。首先，取出它们各自的值，一个是函数，一个是数值；然后，使用函数处理数值；最后，将函数的返回结果再封装进数据类型。
- 函数可以返回值，当然也可以返回数据类型。
- 我们需要的是这样一种函数：它的输入和输出都是数据类型。
- 这样做的好处是什么？

- 因为数据类型是带有运算方法的，如果每一步返回的都是数据类型的实例，我们就可以把它们连接起来。
- 来看一个实例，系统的 I/O 提供了用户的输入。
- getLine 函数可以将用户的输入处理成一个字符串类型（STR）的实例。
- readfile 函数接受 STR 实例当作文件名，返回一个文件类型的实例。
- putStrLn 函数将文件内容输出。
- 所有这些运算连起来，就叫做 Monad。

- **简单说，Monad 就是一种设计模式，表示将一个运算过程，通过函数拆解成互相连接的多个步骤。你只要提供下一步运算所需的函数，整个运算就会自动进行下去。**

## reference

[Functors, Applicatives, And Monads In Pictures](http://adit.io/posts/2013-04-17-functors,_applicatives,_and_monads_in_pictures.html)
[图解 Monad ](http://www.ruanyifeng.com/blog/2015/07/monad.html)
[monad-in-plain-english-for-the-oop-programmer-with-no-fp-background](https://stackoverflow.com/questions/2704652/monad-in-plain-english-for-the-oop-programmer-with-no-fp-background)
[三种实用 Monad](http://blog.forec.cn/2017/03/02/translation-adit-tum/)
