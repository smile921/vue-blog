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
