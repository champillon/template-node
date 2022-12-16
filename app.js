import client from 'prom-client'
import express from 'express';

var app = express();
const collectDefaultMetrics = client.collectDefaultMetrics

collectDefaultMetrics()

const counter = new client.Counter({
  name: 'node_request_operations_total',
  help: 'The total number of processed requests'
});

const histogram = new client.Histogram({
  name: 'node_request_duration_seconds',
  help: 'Histogram for the duration in seconds.',
  buckets: [1, 2, 5, 6, 10]
});

app.get('/', (req, res) => {

  //Simulate a sleep
  var start = new Date()
  var simulateTime = 1000

  setTimeout(function(argument) {
    // execution time simulated with setTimeout function
    var end = new Date() - start
    histogram.observe(end / 1000); //convert to seconds
  }, simulateTime)

  counter.inc();
  
  res.send('Hello world\n');
});

app.get('/metrics', async (req, res) => {
  res.set("Content-Type", client.register.contentType)

  return res.send(await client.register.metrics())
})

app.listen(4000, function () {
  console.log('Example app listening on port 3000!');
});
