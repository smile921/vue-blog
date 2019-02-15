# 获取源码和 Java doc

::: tip 获取源码

- Maven 姿势

  - `mvn dependency:sources`
  - `mvn dependency:resolve -Dclassifier=javadoc`
  - `mvn dependency:sources -DincludeArtifactIds=guava`

- Gradle 姿势
  - `gradle cleanEclipse eclipse`
  - `gradle cleanIdea idea`

:::

::: warning 常用链接

- [https://search.maven.org](https://search.maven.org)
- [https://bintray.com/bintray/jcenter](https://bintray.com/bintray/jcenter)
  :::

::: danger JDK 下载

- [Red Hat provides OpenJDK](https://developers.redhat.com/products/openjdk/download/)
- [Azul Systems provides Zulu which is a certified build of OpenJDK for Windows / MacOS / Linux.](https://www.azul.com/downloads/zulu/)
  :::

# 一些常去看看地方

- [java 技术驿站](http://cmsblogs.com/)
- [互联网 Java 工程师进阶知识完全扫盲](https://github.com/doocs/advanced-java)
  > 一点小建议：学习本系列知识之前，如果你完全没接触过 MQ、ES、Redis、Dubbo、Hystrix 等，那么我建议你可以先在网上搜一下每一块知识的快速入门，跟着入门 Demo 玩一下，然后再开始每一块知识的学习，这样效果更好噢
- [【Java 学习+面试指南】 一份涵盖大部分 Java 程序员所需要掌握的核心知识](https://github.com/Snailclimb/JavaGuide)
  >
