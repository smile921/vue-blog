# A Collection of Blogs

::: tip
This is a tip
:::

::: warning
This is a warning
:::

::: danger
人主之患在莫之应，故曰：一手独拍，虽疾无声.

> 君主的忧患在于没有人响应，所以说：“一只手单独拍打，虽然很急迫却没有声音.
> :::

::: danger explainshell
https://www.explainshell.com 在线解释 shell 命令的网站
https://pagedraw.io 一个原型设计工具可以生成 jsx 代码
https://github.com/processing/p5.js 想学
:::

```sql{4}
-- mysql 创建用户及其权限分配
-- 查看用户及其权限
SELECT HOST,	USER,	PASSWORD,	t.*
FROM	mysql.USER t;

-- 创建用户
CREATE USER team_oa IDENTIFIED BY 'oa_team_sys';
-- 分配权限
GRANT ALL PRIVILEGES ON team_oa.* TO 'team_oa' @'%' IDENTIFIED BY 'oa_team_sys' WITH GRANT OPTION;

-- 刷新mysql用户权限
FLUSH PRIVILEGES;

-- 收回已分配权限

-- REVOKE ALL PRIVILEGES ON *.* FROM team_oa;
-- REVOKE GRANT OPTION ON *.* FROM team_oa;

#重新载入赋权表
FLUSH PRIVILEGES;
```

::: tip 内容聚合

- https://sciurls.com/
- https://techurls.com/
- https://devurls.com/
- https://catonmat.net/online-text-tools
  :::
