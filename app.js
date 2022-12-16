import client from 'prom-client'
import express from 'express';

var app = express();
const collectDefaultMetrics = client.collectDefaultMetrics

collectDefaultMetrics()

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/metrics', async (req, res) => {
  res.set("Content-Type", client.register.contentType)

  return res.send(await client.register.metrics())
})

app.listen(4000, function () {
  console.log('Example app listening on port 3000!');
});
