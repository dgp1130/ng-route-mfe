import { APP_BASE_HREF } from '@angular/common';
import { CommonEngine } from '@angular/ssr';
import express from 'express';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import bootstrap from './src/main.server';

// The Express app is exported so that it can be used by serverless Functions.
export function app(): express.Express {
  const server = express();
  const serverDistFolder = dirname(fileURLToPath(import.meta.url));
  const browserDistFolder = resolve(serverDistFolder, '../browser');
  const indexHtml = join(serverDistFolder, 'index.server.html');

  const commonEngine = new CommonEngine();

  server.set('view engine', 'html');
  server.set('views', browserDistFolder);

  // Internal redirect `/mfe1/{path}.{ext}` -> `/{path}.{ext}`.
  // This allows `express.static` to ignore the `/mfe1` prefix.
  // We limit this to files with extensions, because `express.static` may serve pre-rendered HTML pages
  // which should not be affected by this transform.
  // Also we exempt `index.html` files specifically, since users may request `/` and `/index.html`, both of
  // which should return the same content.
  server.get('**', (req, _res, next) => {
    // TODO: How to allow routes with `.` in them?
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const file = req.url.split('/').at(-1)!;
    if (file.includes('.') && !file.endsWith('.html') && req.url.startsWith('/mfe2')) {
      req.url = req.url === '/mfe2' ? '/' : req.url.replace('/mfe2', '');
    }

    next('route');
  });

  // Example Express Rest API endpoints
  // server.get('/api/**', (req, res) => { });
  // Serve static files from /browser
  server.get(
    '**',
    express.static(browserDistFolder, {
      maxAge: '1y',
      index: 'index.html',
      // Don't redirect `/foo` to `/foo/`, Angular would immediately client-side redirect back to `/foo` anyways.
      redirect: false,
    })
  );

  // All regular routes use the Angular engine
  server.get('**', (req, res, next) => {
    const { protocol, originalUrl, baseUrl, headers } = req;

    commonEngine
      .render({
        bootstrap,
        documentFilePath: indexHtml,
        url: `${protocol}://${headers.host}${originalUrl}`,
        publicPath: browserDistFolder,
        providers: [{ provide: APP_BASE_HREF, useValue: baseUrl }],
      })
      .then((html) => res.send(html))
      .catch((err) => next(err));
  });

  return server;
}

function run(): void {
  const port = process.env['PORT'] || 4202;

  // Start up the Node server
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

run();
