# MongoDB

MongoDB是一个基于文档的分布式数据库，专为现代应用开发而设计。作为最流行的NoSQL数据库之一，MongoDB以其灵活性、可扩展性和性能而闻名。

## MongoDB的优势

- **文档模型**：灵活的JSON-like文档模型适合半结构化数据
- **横向扩展**：内置分片功能支持水平扩展
- **高可用性**：复制集提供自动故障转移和数据冗余
- **强大的查询**：支持丰富的查询语言和索引
- **开发效率**：直接映射到代码中的对象，减少转换层

## 核心概念

### 文档(Document)

MongoDB中的基本数据单元，类似于关系数据库中的行，但更加灵活：

```json
{
   "_id": ObjectId("5f8d0e1b9c0b5a1d9c9b5a1d"),
   "name": "张三",
   "age": 28,
   "address": {
      "city": "北京",
      "postcode": "100000"
   },
   "hobbies": ["篮球", "编程", "旅行"]
}
```

### 集合(Collection)

文档的集合，类似于关系数据库中的表。集合是动态的，没有固定的模式。

### 数据库(Database)

集合的容器，一个MongoDB实例可以有多个数据库。

## 基本操作

### 创建和插入

```javascript
// 插入单个文档
db.users.insertOne({
    name: "蔡徐坤",
    skills: ["唱", "跳", "rap", "篮球"],
    experience: 2.5
})

// 插入多个文档
db.users.insertMany([
    { name: "李四", age: 30 },
    { name: "王五", age: 25 }
])
```

### 查询

```javascript
// 基本查询
db.users.find({ age: { $gt: 25 } })

// 投影
db.users.find({ }, { name: 1, skills: 1, _id: 0 })

// 排序
db.users.find().sort({ age: -1 })

// 聚合
db.orders.aggregate([
   { $match: { status: "completed" } },
   { $group: { _id: "$customer", total: { $sum: "$amount" } } }
])
```

### 更新

```javascript
// 更新单个文档
db.users.updateOne(
   { name: "蔡徐坤" },
   { $set: { "skills.4": "制作音乐" } }
)

// 更新多个文档
db.users.updateMany(
   { age: { $lt: 30 } },
   { $inc: { age: 1 } }
)
```

### 删除

```javascript
// 删除单个文档
db.users.deleteOne({ name: "李四" })

// 删除多个文档
db.users.deleteMany({ age: { $lt: 25 } })
```

## 高级特性

### 索引

```javascript
// 创建单字段索引
db.users.createIndex({ name: 1 })

// 创建复合索引
db.users.createIndex({ age: -1, name: 1 })

// 创建地理空间索引
db.places.createIndex({ location: "2dsphere" })
```

### 事务

MongoDB 4.0+支持多文档ACID事务：

```javascript
// 启动会话和事务
const session = db.getMongo().startSession()
session.startTransaction()

try {
   const usersCollection = session.getDatabase("mydb").users
   const ordersCollection = session.getDatabase("mydb").orders
   
   usersCollection.updateOne({ _id: userId }, { $inc: { balance: -100 } })
   ordersCollection.insertOne({ userId: userId, product: "MongoDB课程", price: 100 })
   
   session.commitTransaction()
} catch (error) {
   session.abortTransaction()
} finally {
   session.endSession()
}
```

## 最佳实践

1. **合理设计文档结构**：根据访问模式设计文档
2. **恰当使用索引**：分析查询模式，创建必要的索引
3. **数据建模**：决定何时嵌入文档，何时使用引用
4. **分片策略**：选择合适的分片键实现均衡扩展
5. **监控和优化**：使用MongoDB Compass和性能分析工具

## 学习资源

- [MongoDB官方文档](https://docs.mongodb.com/)
- [MongoDB大学](https://university.mongodb.com/)
- [MongoDB社区](https://www.mongodb.com/community)

MongoDB是处理半结构化数据和需要快速迭代开发的ikun后端开发者的绝佳选择，掌握MongoDB将使你在处理大规模数据和构建现代应用方面更加得心应手。
