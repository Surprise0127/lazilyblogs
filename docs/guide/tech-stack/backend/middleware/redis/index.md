# Redis

Redis(Remote Dictionary Server)是一个开源的、基于内存的高性能键值对数据库，支持丰富的数据结构和功能。由于其卓越的性能和灵活性，Redis在Web应用、缓存系统、消息队列等场景中得到了广泛应用。

## Redis的特点

- **高性能**：基于内存操作，读写速度极快
- **数据结构丰富**：支持字符串、哈希、列表、集合、有序集合等
- **原子性操作**：所有操作都是原子性的，支持事务
- **持久化**：支持RDB和AOF两种持久化方式
- **主从复制**：支持主从复制和集群模式
- **高可用性**：通过Redis Sentinel和Redis Cluster提供高可用性
- **Lua脚本**：支持Lua脚本扩展功能

## 核心数据结构

### 字符串(String)

最基本的数据类型，可以存储字符串、整数或浮点数：

```bash
# 设置值
SET name "蔡徐坤"

# 获取值
GET name

# 设置过期时间（10秒）
SETEX session:123 10 "active"

# 原子性递增
INCR counter
```

### 哈希(Hash)

存储字段-值对的映射表，适合存储对象：

```bash
# 设置多个字段值
HMSET user:1 username "ikun" age 25 skills "唱,跳,rap,篮球"

# 获取所有字段和值
HGETALL user:1

# 获取特定字段
HGET user:1 username

# 增加数字字段的值
HINCRBY user:1 age 1
```

### 列表(List)

有序的字符串列表，支持从两端推入或弹出元素：

```bash
# 从左侧添加元素
LPUSH tasks "task1"
LPUSH tasks "task2"

# 从右侧添加元素
RPUSH tasks "task3"

# 获取列表范围
LRANGE tasks 0 -1

# 弹出左侧元素
LPOP tasks
```

### 集合(Set)

无序的字符串集合，元素不重复：

```bash
# 添加元素
SADD skills "唱" "跳" "rap" "篮球"

# 获取所有元素
SMEMBERS skills

# 判断元素是否存在
SISMEMBER skills "唱"

# 获取两个集合的交集
SINTER skills1 skills2
```

### 有序集合(Sorted Set)

类似集合，但每个元素关联一个分数，可按分数排序：

```bash
# 添加元素和分数
ZADD leaderboard 100 "player1"
ZADD leaderboard 200 "player2"
ZADD leaderboard 150 "player3"

# 获取排名范围（按分数降序）
ZREVRANGE leaderboard 0 2 WITHSCORES

# 获取分数范围的元素
ZRANGEBYSCORE leaderboard 100 200
```

## 高级特性

### 发布/订阅(Pub/Sub)

Redis提供发布/订阅功能，用于消息通知：

```bash
# 订阅频道（在一个客户端）
SUBSCRIBE news

# 发布消息（在另一个客户端）
PUBLISH news "Hello ikun fans!"
```

### 事务

Redis事务允许执行一组命令，要么全部执行，要么全部不执行：

```bash
# 开始事务
MULTI

# 添加命令到事务队列
SET user:1:balance 100
DECRBY user:1:balance 20
INCRBY user:2:balance 20

# 执行事务
EXEC

# 取消事务
DISCARD
```

### 过期和淘汰策略

Redis可以为键设置过期时间，并支持多种内存淘汰策略：

```bash
# 设置过期时间
EXPIRE key 60  # 60秒后过期

# 查看剩余过期时间
TTL key
```

常见淘汰策略：
- **noeviction**：内存满时拒绝写入操作
- **allkeys-lru**：移除最近最少使用的键
- **volatile-lru**：移除设置了过期时间的、最近最少使用的键
- **allkeys-random**：随机移除键
- **volatile-random**：随机移除设置了过期时间的键
- **volatile-ttl**：移除即将过期的键

### 持久化

Redis支持两种持久化方式：

**RDB（Redis Database）**：
- 按指定时间间隔生成数据快照
- 配置示例：`save 900 1`（900秒内有1个键被修改则触发保存）

**AOF（Append Only File）**：
- 记录所有写操作到日志文件
- 配置示例：`appendonly yes`

## Redis应用场景

### 缓存

最常见的应用场景，减轻数据库负载：

```java
// 伪代码示例
String cacheKey = "user:" + userId;
String userData = redis.get(cacheKey);

if (userData == null) {
    // 缓存未命中，从数据库获取
    userData = database.getUserById(userId);
    // 存入缓存，设置过期时间
    redis.setex(cacheKey, 3600, userData);
}

return userData;
```

### 会话存储

存储用户会话信息，支持分布式系统：

```java
// 存储会话
String sessionId = generateSessionId();
redis.hmset("session:" + sessionId,
           "userId", user.getId(),
           "username", user.getUsername(),
           "loginTime", System.currentTimeMillis());
redis.expire("session:" + sessionId, 1800);  // 30分钟过期

// 获取会话
Map<String, String> sessionData = redis.hgetAll("session:" + sessionId);
```

### 消息队列

利用List或Pub/Sub实现简单的消息队列：

```java
// 生产者
redis.lpush("queue:tasks", taskJson);

// 消费者
String task = redis.brpop(0, "queue:tasks");  // 阻塞直到有消息
processTask(task);
```

### 排行榜

使用Sorted Set实现排行榜：

```java
// 更新分数
redis.zadd("leaderboard", score, userId);

// 获取前十名
List<String> topTen = redis.zrevrange("leaderboard", 0, 9);

// 获取用户排名
long rank = redis.zrevrank("leaderboard", userId) + 1;
```

### 计数器

使用String类型的原子递增操作实现计数器：

```java
// 递增计数
long viewCount = redis.incr("page:views:" + pageId);

// 获取每日访问量
String today = new SimpleDateFormat("yyyy-MM-dd").format(new Date());
long dailyViews = redis.incr("daily:views:" + today);
```

## 性能优化

1. **使用合适的数据结构**：根据使用场景选择最适合的数据结构
2. **避免大键值**：拆分大对象，减少网络传输和内存占用
3. **合理使用批处理命令**：使用MGET、MSET等批量操作减少网络往返
4. **设置合理的过期时间**：避免缓存穿透和雪崩
5. **使用连接池**：重用连接，减少连接建立的开销
6. **监控Redis指标**：使用INFO命令监控内存使用、命令执行等指标

## 分布式架构

### 主从复制

主从复制用于数据备份和读写分离：

```text
# 在从节点配置
replicaof 192.168.1.100 6379
```

### Redis Sentinel

Sentinel提供高可用性，监控主从节点，自动故障转移：

```text
# sentinel.conf
sentinel monitor mymaster 192.168.1.100 6379 2
sentinel down-after-milliseconds mymaster 5000
sentinel failover-timeout mymaster 60000
```

### Redis Cluster

Redis Cluster提供数据分片和高可用性：

```text
# redis.conf
cluster-enabled yes
cluster-config-file nodes.conf
cluster-node-timeout 5000
```

## 学习资源

- [Redis官方文档](https://redis.io/documentation)
- [Redis命令参考](https://redis.io/commands)
- [Redis设计与实现](http://redisbook.com/)

Redis是ikun后端开发者必须掌握的技能之一，深入学习Redis将帮助你构建高性能、可扩展的应用系统。
