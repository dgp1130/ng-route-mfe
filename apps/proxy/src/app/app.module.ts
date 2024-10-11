import { Module } from '@nestjs/common';

import { Mfe1Controller } from './mfe1.controller';
import { Mfe2Controller } from './mfe2.controller';

@Module({
  imports: [],
  controllers: [Mfe1Controller, Mfe2Controller],
})
export class AppModule {}
