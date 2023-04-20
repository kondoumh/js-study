# kafka-consumer

```shell
npm start
```

Send message with header to topic

```shell
echo '{"message":"hoge","number":100}' | kcat -b localhost:9092 -t test -H correlation-id=fugafuga -H trace-id=abcdefg
```
