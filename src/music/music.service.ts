import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { google } from 'googleapis';

@Injectable()
export class MusicService {
  youtubeService = google.youtube({ version: 'v3', key: process.env.API_KEY });

  async searchMusic({ query }: { query?: string }) {
    const searchedMusic = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=${query}`,
    );
    console.log(searchedMusic);
  }
  async findAllPlaylist(playlistId: string) {
    // try {
    //   const response = await this.youtubeService.playlistItems.list({
    //     part: ['snippet'],
    //     playlistId: playlistId,
    //     maxResults: 25, // 요청할 항목의 수
    //   });

    //   const items = response.data.items;
    //   return items.map((item) => {
    //     return {
    //       title: item.snippet.title,
    //       videoId: item.snippet.resourceId.videoId,
    //     };
    //   });
    // } catch (error) {
    //   console.error('Error fetching playlist items: ', error);
    //   throw error;
    // }
    try {
      const response = await axios.get(
        `https://www.googleapis.com/youtube/v3/playlistItems`,
        {
          params: {
            part: 'snippet',
            playlistId,
            maxResults: 63,
          },
          headers: {
            Authorization: process.env.ACCESS_TOKEN,
            Accept: 'application/json',
          },
        },
      );
      const items = response.data.items;
      return items.map((item) => {
        console.log(item.snippet);
      });

      console.log(response.data);
    } catch (error) {
      console.error(`Error fetching playlists: ${error}`);
    }
  }
}
