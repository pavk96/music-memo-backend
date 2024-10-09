import { Controller, Get, Query, Req } from '@nestjs/common';
import { MusicService } from './music.service';

@Controller('music')
export class MusicController {
  constructor(private readonly musicService: MusicService) {}

  @Get()
  async searchMusic() {
    await this.musicService.searchMusic({});
  }

  @Get('playlists')
  async findAllPlayLists(@Req() req: any) {
    try {
      const accessToken = req.headers.authorization;
      const playlist = await this.musicService.findAllPlaylist(accessToken);
      return playlist;
    } catch (error) {
      console.error(error);
    }
  }
  @Get('playlist')
  async findPlayList(
    @Query('playlist-id') playlistId: string,
    @Req() req: any,
  ) {
    try {
      const accessToken = req.headers.authorization;
      const playlist = await this.musicService.findPlaylist(
        playlistId,
        accessToken,
      );
      return playlist;
    } catch (error) {
      console.error(error);
    }
  }
}
