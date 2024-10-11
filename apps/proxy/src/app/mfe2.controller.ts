import { Controller, Get } from '@nestjs/common';

@Controller(['/mfe2', '/mfe2/*'])
export class Mfe2Controller {
  @Get()
  getData() {
    return { mfe: 2 };
  }
}
