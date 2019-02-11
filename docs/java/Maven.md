# 配置

### 编码问题

```xml
    <properties>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
        <sourceEncoding>UTF-8</sourceEncoding>
        <compileSource>1.6</compileSource>
    </properties>
```

### scope:provided

编译时需要，但是部署时环境已有的变量

如 servlet-api

```xml
        <dependency>
            <groupId>javax.servlet</groupId>
            <artifactId>servlet-api</artifactId>
            <version>2.5</version>
            <scope>provided</scope>
        </dependency>
```

### exclude

有的间接依赖的 jar 包因为各种原因不能下载，而我们正好用不上

```xml
        <dependency>
            <groupId>org.slf4j</groupId>
            <artifactId>slf4j-api</artifactId>
            <version>1.5.11</version>
            <scope>compile</scope>
            <exclusions>
                <exclusion>
                    <artifactId>slf4j-api</artifactId>
                    <groupId>org.slf4j</groupId>
                </exclusion>
            </exclusions>
        </dependency>
```

### maven.test.skip

在打包或者 install 时可以暂时忽略测试

`mvn install -Dmaven.test.skip=true`

### 多配置

TBC

# Eclipse 的 Maven 支持

1. 搜索 repo

   演示

1. 源码和 JavaDoc

   Maven 库都有源码和 JavaDoc，所以非常方便阅读代码

1. M2E 的版本不兼容问题

   Eclipse3.7 升级后, maven 插件 M2E 进行了不兼容的升级，需要重新 configure maven nature

1. Eclipse 自动关联 maven 工程

   Eclipse 如果发现 workspace 中包含已有的 maven 依赖库，则会自动设置为工程间依赖

1. Eclipse 和 Tomcat 部署

# Maven Repo

```xml

<!-- 公司内的repo cache -->
        <repository>
            <id>Local</id>
            <url>http://192.168.1.88:8080/artifactory/repo/</url>
        </repository>

<!-- 官方repo -->
        <repository>
            <id>central</id>
            <url>http://repo1.maven.org/maven2/</url>
        </repository>

<!-- jboss的repo，里面有些官方repo没有的最新的库 -->
        <repository>
            <id>JBoss public</id>
            <url>http://repository.jboss.org/nexus/content/groups/public/</url>
        </repository>

```

问题：

1. 公司的 repo 在外网无法访问

# Maven 插件

1. apt
