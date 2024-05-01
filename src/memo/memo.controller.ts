import { Body, Controller, Post } from '@nestjs/common';
import { CreateMemoDTO } from './dto/memo.dto';
import { MemoService } from './memo.service';

@Controller('memo')
export class MemoController {
  constructor(private readonly memoService: MemoService) {}
  @Post('/')
  async createMemo(@Body() body: CreateMemoDTO) {
    try {
      await this.memoService.createMemo(body);
    } catch (error) {
      console.log(error);

      throw new Error(error);
    }
  }
}
