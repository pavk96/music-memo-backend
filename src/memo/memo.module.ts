import { Module } from '@nestjs/common';
import { MemoService } from './memo.service';
import { MemoController } from './memo.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [MemoService, PrismaService],
  controllers: [MemoController],
})
export class MemoModule {}
