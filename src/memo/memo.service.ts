import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MemoService {
  constructor(private readonly prisma: PrismaService) {}
  async upsertMemo({ videoId, memo }: { videoId: string; memo: string }) {
    try {
      await this.prisma.memo.upsert({
        create: { videoId, memo },
        update: { videoId, memo },
        where: { videoId },
      });
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  }
  async findMemo(videoId: string) {
    try {
      return await this.prisma.memo.findUnique({ where: { videoId } });
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  }
}
