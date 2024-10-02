import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MemoService {
  constructor(private readonly prisma: PrismaService) {}
  async upsertMemo(body: { videoId: string; memo: string }) {
    try {
      // await this.prisma.
    } catch (error) {}
  }
}
