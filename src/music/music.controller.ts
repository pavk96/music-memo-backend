import { Controller, Get } from '@nestjs/common';
import { MusicService } from './music.service';

@Controller('music')
export class MusicController {
  constructor(private readonly musicService: MusicService) {}

  @Get()
  async searchMusic() {
    await this.musicService.searchMusic({});
  }

  @Get('playlist')
  async findAllPlayList() {
    await this.musicService.findAllPlaylist(
      'PLmXAZclIUR48ZtUQg7FjxMGAYHk1PncwO',
    );
  }
}
