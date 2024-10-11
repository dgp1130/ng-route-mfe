import { Injectable } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class ProxyService {
    async proxy(req: Request, res: Response, host: string): Promise<Response> {
        const backendUrl = new URL(host);
        backendUrl.pathname = req.path;

        // Duplicate the incoming request but targeted at the given backend.
        const backendRes = await fetch(backendUrl, {
          method: req.method,
          headers: req.headers as Record<string, string>,
          body: req.method !== 'GET' && req.method !== 'HEAD'
            ? req.body
            : undefined,
        });

        // Propagate status and headers.
        res.status(backendRes.status);
        backendRes.headers.forEach((value, key) => {
            res.header(key, value);
        });

        // Stream the body.
        const reader = backendRes.body.getReader();
        while (true) {
            const { value, done } = await reader.read();
            if (done) break;

            res.write(value);
        }
        res.end();

        return res;
    }
}
