import express from 'express';
import { join } from 'path';
import compression from 'compression';
import responseTime from 'response-time';
import logger from './logger';
// import APIRouteHandler from "./routes/api";

const app = express();

app.use(responseTime());

app.use(compression());
app.use(express.static(join(__dirname, '..', '..', 'static')));

app.disable('x-powered-by');
// app.use("/api", APIRouteHandler);
app.use('*', async (req, res, next) => {
  await res.send(`Done: Response Latency`);
  next();
});

let responseTimes = [];
let averageResponseTime;

setInterval(() => {
  if (responseTimes.length > 100) {
    responseTimes = [];
    return;
  }
  const sum = responseTimes.reduce((a, b) => a + b, 0);
  averageResponseTime = sum / responseTimes.length;
  averageResponseTime = averageResponseTime.toFixed(3);
}, 1000);

app.use(async (req, res, next) => {
  let resTime = res.getHeader('X-Response-Time');
  resTime = parseFloat(resTime.substr(0, resTime.length - 2));
  responseTimes.push(resTime);
  res.averageResponseTime = averageResponseTime;
  next();
});

app.use(logger);

app.listen(3000);

export default app;
