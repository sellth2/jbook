import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import path from 'path';

export const serve = (port: number, filename: string, dir: string, useProxy: boolean) => {
  const app = express();

  if (useProxy) {
    app.use(
      createProxyMiddleware({
       target: 'http://127.0.0.1:3000',
       ws: true,
       logLevel: 'silent', //yoksa her income requesti log yapmaya çalışır
     })
     );
  } else {
    const packagePath = require.resolve('local-client/build/index.html');//absolute path to local folder in your machine
    app.use(express.static(path.dirname(packagePath)));
  }
  return new Promise<void>((resolve, reject) => {
    app.listen(port, resolve).on('error', reject);
  });
};