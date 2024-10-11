import { Module } from '@nestjs/common';

import { Mfe1Controller } from './mfe1.controller';
import { Mfe2Controller } from './mfe2.controller';
import { ProxyService } from './proxy.service';

@Module({
  imports: [],
  controllers: [Mfe1Controller, Mfe2Controller],
  providers: [ProxyService],
})
export class AppModule {}
