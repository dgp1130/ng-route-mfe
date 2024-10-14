import { Module } from '@nestjs/common';

import { Mfe1Controller } from './mfe1.controller';
import { Mfe2Controller } from './mfe2.controller';
import { NotFoundController } from './not-found.controller';
import { ProxyService } from './proxy.service';

@Module({
  imports: [],
  controllers: [
    Mfe1Controller,
    Mfe2Controller,
    // Controller order matters, `NotFoundController` must come last or it will take precedence of other routes.
    NotFoundController,
  ],
  providers: [ProxyService],
})
export class AppModule {}
