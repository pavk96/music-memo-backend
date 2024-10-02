import { Body, Controller, Post } from '@nestjs/common';
import { MemoService } from './memo.service';

@Controller('memo')
export class MemoController {
  constructor(private readonly memoService: MemoService) {}
  @Post('/')
  async upsertMemo(@Body() body: { videoId: string; memo: string }) {
    return await this.memoService.upsertMemo(body);
  }
}
