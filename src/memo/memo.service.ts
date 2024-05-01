import { Injectable } from '@nestjs/common';
import { CreateMemoDTO } from './dto/memo.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MemoService {
  constructor(private readonly prismaService: PrismaService) {}
  async createMemo(data: CreateMemoDTO) {
    const createdMemo = await this.prismaService.memo.create({ data });
    return createdMemo;
  }
}
