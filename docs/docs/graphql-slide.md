# 聊聊 GraphQL

> GraphQL 是一种协议也是一种查询语言，一个数据聚合器，一个抽象层。GraphQL 是一个用于 API 的查询语言，是一个使用基于类型系统来执行查询的服务端运行时（类型系统由你的数据定义）。GraphQL 并没有和任何特定数据库或者存储引擎绑定，而是依靠你现有的代码和数据支撑。

> 一个 GraphQL 服务是通过定义类型和类型上的字段来创建的，然后给每个类型上的每个字段提供解析函数

## Pros & Corns

### Pros

- 数据冗余和请求冗余 (overfetching & underfetching)

* overfetching 按需请求查询字段，不需要的不返回
* underfetching 同一个查询，查询参数不一样 Graphql 可以做到一次请求搞定

- 灵活而强类型的 schema
  - 显式地为每一个域定义类型
- 接口校验 (validation)
- 接口变动，维护与文档
  - 只有一个 endpoint
  - 接口文档自描述，调用方调整相应参数即可
- 开发效率

### Corns

- 迁移成本
- API 经常变动
- 牺牲 Performance
- 缺乏动态类型
- 简单问题复杂化
- 缓存能解决很多问题

## 一些新概念

- Schema
  首先是 Schema，在 GraphQL 中 Schema 是一个很重要的概念，Schema 定义了 GraphQL API 的类型系统，它完整的描述了前端（或者客户端）可以从服务端获取的所有数据内容，前端或者客户端的 GraphQL 查询请求将根据 Schema 进行校验和执行，客户端可以通过“自省”（introspection）获取关于 schema 的信息。schema 存放于 GraphQL API 服务器。
- Field
  Field 是客户端可以从服务端获取的某个内容，比如某个字段，或者某个对象等，GraphQL 查询语言本质上就是从对象中选择 field，所有的 GraphQL 操作必须指明到最底层的 field，并且返回值为标量，以确保响应结果的结构明白无误，所谓标量（scalar），也就是基本数据类型，比如 String、int 等。如果你尝试返回一个不是标量的 field，schema 校验将会抛出错误。你必须添加嵌套的内部 field 直至所有的 field 都返回标量，这一点很重要，需要牢牢记住。
- Connection
  还记得 GraphQL 的标志吗？它是一个图，由顶点和边构成，所谓 Connection，就是可以关联查询，GraphQL 就是通过 Connection 来实现只需要一次请求就可以获取全部需要的数据的功能的，客户端可以通过 Connection 来进行关联查询，比如在查找一篇文章的信息的时候，除了文章的标题、作者、文字内容、图片内容、阅读数等信息外，可以通过 Connection 查询该文章下面的评论信息，而在评论中，可以通过 Connection 根据评论人的 id 来获取用户的信息，这就是 Connection 的威力
- Edge
  Edge 是 GraphQL 中的边，它表示 Node 之间的 Connection，当你查询一个 connection 时，你通过 edge 到达 node。每个 edgesfield 都有一个 nodefield 和一个 cursorfield。cursor 是用来分页的。
- Node
  Node 是一个对象，它就是我们获取数据的节点，比如用户信息的对象就是一个节点，或者一篇文章的信息就是一个节点，如果正在查询的 Node 不是标量的话，那么我们需要指定 Node 中的 Field 直到返回的是标量类型为止。

## Example Query

```graphql
{
  search(first: 10, query: "java", type: REPOSITORY) {
    nodes {
      __typename
    }
    pageInfo {
      startCursor
    }
  }
  viewer {
    login
    email
    name
    avatarUrl
    company
    createdAt
    watching(first: 4) {
      totalDiskUsage
      pageInfo {
        startCursor
      }
      totalCount
      nodes {
        description
        id
      }
    }
    issues(first: 6) {
      pageInfo {
        startCursor
      }
    }
    location
    updatedAt
    repositories(first: 8) {
      pageInfo {
        startCursor
      }
    }
  }
}
```

## 参考

- [How To GraphQL -- The Fullstack Tutorial for GraphQL](https://www.howtographql.com/)
- [GraphQL.js 入门](http://graphql.cn/graphql-js/)
- [graphql java](https://www.graphql-java.com/documentation/)
- [GitHub GraphQL Explorer](https://developer.github.com/v4/explorer/)
- [GitHub V4 API https://api.github.com/graphql](https://api.github.com/graphql)
- [overview of GitHub v4](https://developer.github.com/v4/)
- [apollographql](https://www.apollographql.com/)
- [why use graphql good and bad reasons](https://honest.engineering/posts/why-use-graphql-good-and-bad-reasons)
