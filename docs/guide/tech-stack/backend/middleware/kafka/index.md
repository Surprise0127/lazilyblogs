# Kafka

Apache Kafka是一个分布式流处理平台，用于构建实时数据管道和流式应用程序。它具有高吞吐量、可靠性和可扩展性，被广泛应用于日志收集、消息系统、活动跟踪、流处理等场景。

## Kafka的核心特性

- **高吞吐量**：能够处理海量数据，支持每秒数百万条消息
- **持久性**：消息持久化到磁盘，提供数据持久性保证
- **分布式**：支持数据分区和复制，实现高可用和水平扩展
- **流处理**：不仅是消息系统，还提供了强大的流处理能力
- **生态系统**：丰富的连接器和客户端库，集成各种数据源和目标

## 核心概念

### 消息(Message)

Kafka中的基本数据单元，包含键(key)、值(value)、时间戳和可选的头信息。

### 主题(Topic)

消息的逻辑分类，类似于数据库中的表。主题可以分为多个分区。

### 分区(Partition)

主题的物理分区，每个分区是一个有序、不可变的消息序列。分区实现了数据的并行处理和系统的水平扩展。

### 副本(Replica)

分区的复制，提高数据可靠性。每个分区有一个领导者副本(Leader)和多个追随者副本(Follower)。

### 生产者(Producer)

向Kafka主题发送消息的应用程序。

### 消费者(Consumer)

从Kafka主题订阅和处理消息的应用程序。

### 消费者组(Consumer Group)

一组消费者，共同消费一个或多个主题的消息。每个分区在一个消费者组中只能被一个消费者消费。

### 偏移量(Offset)

消费者在分区中的位置标识，表示消费者已经消费到分区中的哪个位置。

### 代理(Broker)

Kafka集群中的服务器，负责存储和处理消息。

### ZooKeeper

用于协调和管理Kafka集群（注：Kafka正在逐步移除对ZooKeeper的依赖，转向内部的KRaft模式）。

## 基本架构

Kafka的基本架构如下：

```
生产者 --> Broker集群 --> 消费者
           |
        ZooKeeper
```

每个Broker包含多个主题分区，每个分区可以有多个副本分布在不同的Broker上。

## 生产者(Producer)

### 基本使用

Java客户端示例：

```java
Properties props = new Properties();
props.put("bootstrap.servers", "localhost:9092");
props.put("key.serializer", "org.apache.kafka.common.serialization.StringSerializer");
props.put("value.serializer", "org.apache.kafka.common.serialization.StringSerializer");

Producer<String, String> producer = new KafkaProducer<>(props);

// 同步发送
ProducerRecord<String, String> record = 
    new ProducerRecord<>("my-topic", "key", "Hello, Kafka!");
try {
    RecordMetadata metadata = producer.send(record).get();
    System.out.println("Message sent to partition " + metadata.partition() + 
                       " with offset " + metadata.offset());
} catch (Exception e) {
    e.printStackTrace();
}

// 异步发送
producer.send(record, (metadata, exception) -> {
    if (exception != null) {
        exception.printStackTrace();
    } else {
        System.out.println("Message sent to partition " + metadata.partition() + 
                           " with offset " + metadata.offset());
    }
});

producer.close();
```

### 生产者配置

重要的生产者配置：

- **acks**：消息发送确认级别（0、1、all）
- **retries**：发送失败时的重试次数
- **batch.size**：批量发送消息的大小
- **linger.ms**：发送消息前等待的时间，增加批量发送机会
- **buffer.memory**：生产者缓冲区大小
- **compression.type**：消息压缩类型（none、gzip、snappy、lz4、zstd）
- **max.in.flight.requests.per.connection**：单个连接上未确认请求的最大数量

### 分区策略

消息的分区分配策略：

1. **轮询(Round Robin)**：默认策略，均匀分配消息到分区
2. **基于键的散列(Key-based Hashing)**：相同键的消息分配到相同分区
3. **自定义分区器**：实现Partitioner接口的自定义策略

```java
// 使用自定义分区器
props.put("partitioner.class", "com.example.CustomPartitioner");

// 自定义分区器实现
public class CustomPartitioner implements Partitioner {
    @Override
    public int partition(String topic, Object key, byte[] keyBytes, 
                        Object value, byte[] valueBytes, Cluster cluster) {
        // 自定义分区逻辑
        if (key == null) {
            return 0;  // 默认分区
        }
        // 基于键的自定义分区逻辑
        return Math.abs(key.hashCode() % cluster.partitionCountForTopic(topic));
    }
    
    @Override
    public void close() {}
    
    @Override
    public void configure(Map<String, ?> configs) {}
}
```

## 消费者(Consumer)

### 基本使用

Java客户端示例：

```java
Properties props = new Properties();
props.put("bootstrap.servers", "localhost:9092");
props.put("group.id", "my-group");
props.put("key.deserializer", "org.apache.kafka.common.serialization.StringDeserializer");
props.put("value.deserializer", "org.apache.kafka.common.serialization.StringDeserializer");
props.put("auto.offset.reset", "earliest");
props.put("enable.auto.commit", "true");
props.put("auto.commit.interval.ms", "1000");

Consumer<String, String> consumer = new KafkaConsumer<>(props);
consumer.subscribe(Arrays.asList("my-topic"));

try {
    while (true) {
        ConsumerRecords<String, String> records = consumer.poll(Duration.ofMillis(100));
        for (ConsumerRecord<String, String> record : records) {
            System.out.printf("partition = %d, offset = %d, key = %s, value = %s%n",
                record.partition(), record.offset(), record.key(), record.value());
        }
    }
} finally {
    consumer.close();
}
```

### 手动提交偏移量

```java
props.put("enable.auto.commit", "false");
Consumer<String, String> consumer = new KafkaConsumer<>(props);
consumer.subscribe(Arrays.asList("my-topic"));

try {
    while (true) {
        ConsumerRecords<String, String> records = consumer.poll(Duration.ofMillis(100));
        for (ConsumerRecord<String, String> record : records) {
            // 处理消息
            System.out.printf("partition = %d, offset = %d, key = %s, value = %s%n",
                record.partition(), record.offset(), record.key(), record.value());
        }
        // 同步提交偏移量
        consumer.commitSync();
        
        // 或者异步提交
        // consumer.commitAsync((offsets, exception) -> {
        //     if (exception != null) {
        //         System.err.println("Commit failed for offsets: " + offsets);
        //         exception.printStackTrace();
        //     }
        // });
    }
} finally {
    consumer.close();
}
```

### 指定分区消费

```java
TopicPartition partition0 = new TopicPartition("my-topic", 0);
TopicPartition partition1 = new TopicPartition("my-topic", 1);
consumer.assign(Arrays.asList(partition0, partition1));

// 从指定位置开始消费
consumer.seek(partition0, 10);  // 从分区0的偏移量10开始消费
```

### 消费者配置

重要的消费者配置：

- **group.id**：消费者组ID
- **auto.offset.reset**：当没有初始偏移量或当前偏移量不存在时的行为（earliest、latest、none）
- **enable.auto.commit**：是否自动提交偏移量
- **auto.commit.interval.ms**：自动提交偏移量的频率
- **max.poll.records**：单次调用poll()返回的最大记录数
- **session.timeout.ms**：消费者组协调器认为消费者失败前的等待时间
- **heartbeat.interval.ms**：心跳间隔时间

## 主题和分区管理

### 创建主题

```bash
# 使用命令行创建主题
kafka-topics.sh --create --bootstrap-server localhost:9092 \
                --replication-factor 3 --partitions 5 --topic my-topic

# 使用Java API创建主题
AdminClient admin = AdminClient.create(props);
NewTopic newTopic = new NewTopic("my-topic", 5, (short) 3);
admin.createTopics(Collections.singleton(newTopic));
```

### 查看主题信息

```bash
# 查看所有主题
kafka-topics.sh --list --bootstrap-server localhost:9092

# 查看主题详情
kafka-topics.sh --describe --bootstrap-server localhost:9092 --topic my-topic
```

### 修改分区数量

```bash
# 增加分区数量
kafka-topics.sh --alter --bootstrap-server localhost:9092 \
                --topic my-topic --partitions 10
```

### 删除主题

```bash
# 删除主题
kafka-topics.sh --delete --bootstrap-server localhost:9092 --topic my-topic
```

## 消费者组管理

```bash
# 查看消费者组列表
kafka-consumer-groups.sh --bootstrap-server localhost:9092 --list

# 查看消费者组详情
kafka-consumer-groups.sh --bootstrap-server localhost:9092 \
                        --describe --group my-group

# 重置消费者组偏移量
kafka-consumer-groups.sh --bootstrap-server localhost:9092 \
                        --group my-group --reset-offsets \
                        --to-earliest --topic my-topic --execute
```

## Kafka Stream

Kafka Streams是Kafka提供的流处理库，允许构建实时数据处理应用：

```java
// 创建流处理拓扑
StreamsBuilder builder = new StreamsBuilder();
KStream<String, String> textLines = builder.stream("input-topic");

// 单词计数示例
KTable<String, Long> wordCounts = textLines
    .flatMapValues(value -> Arrays.asList(value.toLowerCase().split("\\W+")))
    .groupBy((key, word) -> word)
    .count();

// 将结果写回Kafka
wordCounts.toStream().to("output-topic", Produced.with(
    Serdes.String(), Serdes.Long()));

// 创建流处理应用
Topology topology = builder.build();
KafkaStreams streams = new KafkaStreams(topology, props);

// 启动应用
streams.start();

// 优雅关闭
Runtime.getRuntime().addShutdownHook(new Thread(streams::close));
```

## Kafka Connect

Kafka Connect是一个数据集成框架，用于从外部系统导入/导出数据到Kafka：

```bash
# 启动Connect分布式模式
connect-distributed.sh config/connect-distributed.properties

# 配置File Source Connector
curl -X POST http://localhost:8083/connectors -H "Content-Type: application/json" -d '{
    "name": "file-source",
    "config": {
        "connector.class": "FileStreamSource",
        "tasks.max": "1",
        "file": "/path/to/input.txt",
        "topic": "connect-test"
    }
}'

# 配置File Sink Connector
curl -X POST http://localhost:8083/connectors -H "Content-Type: application/json" -d '{
    "name": "file-sink",
    "config": {
        "connector.class": "FileStreamSink",
        "tasks.max": "1",
        "file": "/path/to/output.txt",
        "topics": "connect-test"
    }
}'
```

## 监控与管理

### JMX监控

Kafka提供丰富的JMX指标，可以使用JConsole、Prometheus或Grafana等工具监控：

```bash
# 启用JMX
export JMX_PORT=9999
kafka-server-start.sh config/server.properties
```

### Kafka Manager/CMAK

Kafka Manager（现在称为CMAK - Cluster Manager for Apache Kafka）是一个Web界面，用于管理Kafka集群：

```bash
# 启动CMAK
cmak -Dconfig.file=conf/application.conf -Dhttp.port=9000
```

### 重要监控指标

- **UnderReplicatedPartitions**：副本不足的分区数
- **OfflinePartitionsCount**：离线的分区数
- **ActiveControllerCount**：活动控制器数（应该为1）
- **BytesInPerSec/BytesOutPerSec**：流入/流出字节率
- **RequestsPerSec**：请求率
- **RequestQueueTimeMs**：请求队列时间
- **ProducerRequestQueueTimeMs**：生产者请求队列时间
- **ConsumerLag**：消费者滞后（消费者偏移量与最新消息之间的差距）

## 高级主题

### 事务

Kafka支持跨多个分区的原子性写入，实现精确一次语义(Exactly-Once Semantics)：

```java
// 配置事务生产者
props.put("transactional.id", "my-transactional-id");
Producer<String, String> producer = new KafkaProducer<>(props);

// 初始化事务
producer.initTransactions();

try {
    // 开始事务
    producer.beginTransaction();
    
    // 发送消息
    producer.send(new ProducerRecord<>("topic1", "key1", "value1"));
    producer.send(new ProducerRecord<>("topic2", "key2", "value2"));
    
    // 提交事务
    producer.commitTransaction();
} catch (Exception e) {
    // 中止事务
    producer.abortTransaction();
    throw e;
} finally {
    producer.close();
}
```

### 压缩

Kafka支持多种消息压缩方式，可以减少存储和网络传输的数据量：

```java
// 生产者启用压缩
props.put("compression.type", "snappy");  // 可选: none, gzip, snappy, lz4, zstd
```

### 安全性

Kafka支持多种安全机制，包括TLS加密、SASL认证和ACL授权：

```java
// SSL配置
props.put("security.protocol", "SSL");
props.put("ssl.truststore.location", "/path/to/client.truststore.jks");
props.put("ssl.truststore.password", "truststore-password");
props.put("ssl.keystore.location", "/path/to/client.keystore.jks");
props.put("ssl.keystore.password", "keystore-password");
props.put("ssl.key.password", "key-password");

// SASL配置
props.put("security.protocol", "SASL_SSL");
props.put("sasl.mechanism", "PLAIN");
props.put("sasl.jaas.config", "org.apache.kafka.common.security.plain.PlainLoginModule " +
                             "required username=\"user\" password=\"password\";");
```

### 日志压缩

Kafka支持日志压缩(Log Compaction)，保留每个键的最新值，适用于键值存储场景：

```bash
# 创建启用日志压缩的主题
kafka-topics.sh --create --bootstrap-server localhost:9092 \
                --replication-factor 3 --partitions 5 --topic compacted-topic \
                --config "cleanup.policy=compact" \
                --config "min.cleanable.dirty.ratio=0.5" \
                --config "segment.ms=100"
```

### 多集群复制(MirrorMaker)

MirrorMaker是Kafka官方提供的集群间复制工具，用于构建多数据中心部署：

```bash
# 启动MirrorMaker
kafka-mirror-maker.sh --consumer.config consumer.properties \
                     --producer.config producer.properties \
                     --whitelist ".*"
```

## 最佳实践

1. **合理设置分区数**：考虑吞吐量需求和消费者并行度
2. **监控消费者滞后**：定期检查消费者滞后，避免数据积压
3. **适当的复制因子**：通常设置为3，在可用性和性能间取得平衡
4. **批量处理**：使用批量发送和消费提高效率
5. **消息键设计**：合理设计消息键，确保相关消息路由到同一分区
6. **定期清理过期数据**：配置适当的数据保留策略
7. **资源规划**：为Kafka集群分配足够的内存和磁盘空间
8. **定期监控**：监控关键指标，及时发现潜在问题

## 常见问题及解决方案

### 数据积压

- 增加消费者数量（不超过分区数）
- 提高消费者处理能力
- 增加分区数量实现更高并行度

### 数据丢失

- 使用适当的生产者确认级别（acks=all）
- 配置足够的复制因子（至少3）
- 避免使用自动提交偏移量，实现手动控制

### 性能问题

- 调整批处理大小和linger.ms
- 使用消息压缩
- 优化磁盘I/O（使用多个磁盘、调整文件系统）
- 调整JVM堆大小和GC设置

Apache Kafka是构建实时数据处理系统的强大工具，掌握Kafka是ikun后端开发者必备的技能，特别是在处理大规模数据流和构建响应式系统时。
