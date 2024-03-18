import { Controller, Get, Req } from '@nestjs/common';
import { MusicService } from './music.service';

@Controller('music')
export class MusicController {
  constructor(private readonly musicService: MusicService) {}

  @Get()
  async searchMusic() {
    await this.musicService.searchMusic({});
  }

  @Get('playlist')
  async findAllPlayList(@Req() req: any) {
    try {
      const accessToken = req.headers.authorization;
      const playlist = await this.musicService.findAllPlaylist(accessToken);

      return playlist;
    } catch (error) {
      console.error(error);
    }
  }
}
