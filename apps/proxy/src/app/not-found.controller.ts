import { Controller, All, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { ProxyService } from './proxy.service';

const mfe1Origin = 'http://localhost:4201';

/** Any routes outside all MFEs are redirected to MFE1 to render the not found route. */
@Controller('*')
export class NotFoundController {
  constructor(private readonly proxyService: ProxyService) {}

  @All()
  async getData(@Req() req: Request, @Res() res: Response): Promise<Response> {
    return await this.proxyService.proxy(req, res, mfe1Origin);
  }
}
