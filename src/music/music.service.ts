import { Injectable } from '@nestjs/common';

@Injectable()
export class MusicService {
  async searchMusic({ query }: { query?: string }) {
    const searchedMusic = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=${query}`,
    );
    console.log(searchedMusic);
  }
}
