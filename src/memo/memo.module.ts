import { Module } from '@nestjs/common';
import { MemoService } from './memo.service';
import { MemoController } from './memo.controller';

@Module({
  providers: [MemoService],
  controllers: [MemoController]
})
export class MemoModule {}
