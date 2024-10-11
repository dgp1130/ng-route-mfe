import { Controller, All, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { ProxyService } from './proxy.service';

const mfe1Origin = 'http://localhost:4201';

@Controller(['/', '/mfe1', '/mfe1/*'])
export class Mfe1Controller {
  constructor(private readonly proxyService: ProxyService) {}

  @All()
  async getData(@Req() req: Request, @Res() res: Response): Promise<Response> {
    return await this.proxyService.proxy(req, res, mfe1Origin);
  }
}
