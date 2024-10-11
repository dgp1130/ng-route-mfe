import { Controller, Get } from '@nestjs/common';

@Controller(['/', '/mfe1', '/mfe1/*'])
export class Mfe1Controller {
  @Get()
  getData() {
    return { mfe: 1 };
  }
}
