import { Controller, All, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { ProxyService } from './proxy.service';

const mfe2Origin = 'http://localhost:4202';

@Controller(['/mfe2', '/mfe2/*'])
export class Mfe2Controller {
  constructor(private readonly proxyService: ProxyService) {}

  @All()
  async getData(@Req() req: Request, @Res() res: Response): Promise<Response> {
    return await this.proxyService.proxy(req, res, mfe2Origin);
  }
}
