Managing logs from Docker swarm can be challenging with containers scattered across nodes. Here are strategies for centralized logging using the GELF driver and Logstash.

## Configure GELF Driver
Use the GELF logging driver in docker-compose.yml to forward logs to Logstash:
```bash
logging:
 driver: gelf
This sends container logs to the specified GELF/Logstash server.
```

## Sample Logstash Config
A sample Logstash pipeline config to accept GELF logs:
```javascript
input {  
  gelf {
    port => 12201
    type => "gelf" 
  }
}

filter {
  if [type] == "gelf" {
    elasticsearch {
      hosts => ["172.16.240.210:9200","172.16.240.211:9200","172.16.240.212:9200"]
      index => "gelf-%{+YYYY-MM-dd}"
      timeout => 5
    }
  }
}
```
This inputs GELF logs on port 12201 and forwards them to Elasticsearch.

## Benefits of GELF + Logstash
The GELF driver ships logs efficiently to Logstash. Logstash parses and enriches logs before loading them into Elasticsearch. This provides:

* Centralized storage of logs in Elasticsearch
* Powerful search, analytics and visualizations with Kibana
* Ability to route logs to other systems like Kafka, S3, etc.
For Docker swarm, it’s an effective centralized logging pipeline.

Other Log Routing Approaches
Tools like Fluentd and Logspout also gather scattered docker logs. Fluentd can route directly to Elasticsearch while Logspout offers other outputs.

No matter the method, centralizing swarm logs is critical for observability and debugging.

##Conclusion
The GELF logging driver combined with Logstash provides a straightforward way to implement centralized logging for Docker swarm services. Full log aggregation is achievable with the right tools and configuration.