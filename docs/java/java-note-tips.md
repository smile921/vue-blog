# 记录一下 java 开发的点子

## java 工程获取源码和 java doc

- Maven 姿势

  - `mvn dependency:sources`
  - `mvn dependency:resolve -Dclassifier=javadoc`
  - `mvn dependency:sources -DincludeArtifactIds=guava`
    获取源码，获取 javadoc，获取指定坐标的源码

  当使用 idea 插件式也可以 `mvn idea:idea -DdownloadSources=true -DdownloadJavadocs=true`
  当使用 eclipse 插件时可以 `mvn eclipse:eclipse -DdownloadSources=true -DdownloadJavadocs=true`
  或者

  ```xml
  <plugin>
    <groupId>org.apache.maven.plugins</groupId>
    <artifactId>maven-eclipse-plugin</artifactId>
    <configuration>
      <downloadSources>true</downloadSources>
      <downloadJavadocs>true</downloadJavadocs>
    </configuration>
  </plugin>
  ```

[maven soruce plugin 文档](https://maven.apache.org/plugins/maven-dependency-plugin/sources-mojo.html)

- Gradle 姿势

  - `gradle cleanEclipse eclipse`
  - `gradle cleanIdea idea`

  - eclipse 配置

  ```gradle
  apply plugin: 'java'
  apply plugin: 'eclipse'

  eclipse {
      classpath {
          downloadJavadoc = true
          downloadSources = true
      }
  }
  ```

  - IntelliJ 配置

  ```gradle
  apply plugin: 'java'
  apply plugin: 'idea'

  idea {
      module {
          downloadJavadoc = true
          downloadSources = true
      }
  }
  ```

## 替换已有 jar 包的某个类

- maven 姿势 使用 abtrun

```xml
<plugin>
    <groupId>org.apache.maven.plugins</groupId>
    <artifactId>maven-antrun-plugin</artifactId>
    <version>1.6</version>
    <executions>
      <execution>
        <id>repack</id>
        <phase>compile</phase>
        <goals>
          <goal>run</goal>
        </goals>
        <configuration>
          <target>
            <!-- note that here we reference previously declared dependency -->
            <unzip src="${org.apache:common-util:jar}" dest="${project.build.directory}/tmp"/>
            <!-- now do what you need to any of unpacked files under target/tmp/ -->
            <zip basedir="${project.build.directory}/tmp" destfile="${project.build.directory}/common-util-modified.jar"/>
            <!-- now the modified jar is available  -->
          </target>
        </configuration>
      </execution>
    </executions>
  </plugin>
```

[ref maven-replace-a-file-in-a-jar](https://stackoverflow.com/questions/6307191/maven-replace-a-file-in-a-jar/7085511#7085511)
`jar uf jar-file input-file(s)`
`jar uf TicTacToe.jar -C images new.gif` -C change directory
`jar uf TicTacToe.jar images/new.gif`

- [Gradle 姿势](https://stackoverflow.com/questions/27946825/gradle-replace-class-file-into-modifying-the-manifest)

```gradle
task patchedJar(type: Zip, dependsOn: jar) {
    extension 'jar'
    from(zipTree(jar.archivePath)) {
        exclude '**/MyClass.class'
    }
    from("patches/dir") {
        include 'com/foo/package/MyClass.class'
    }
}
```

## hsdis (HotSpot Disassembler)

hsdis 的安装只要把下载到，或者编绎好的 so 文件放到对应的 Java 安装路径下即可
`eg hsdis-amd64.so 放到 /usr/lib/jvm/java-7-oracle/jre/lib/amd64/`
可以用下面这个命令来查看是否安装成功。

`java -XX:+UnlockDiagnosticVMOptions -XX:+PrintAssembly -version`
如果输出有：
`Java HotSpot(TM) 64-Bit Server VM warning: PrintAssembly is enabled`
则安装成功。
