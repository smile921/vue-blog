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

::: danger STOP
Danger zone, do not proceed
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
