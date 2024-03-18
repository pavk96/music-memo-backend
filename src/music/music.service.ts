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
  async findAllPlaylist(accessToken: string) {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/youtube/v3/playlists`,
        {
          params: {
            part: 'snippet',
            mine: true,
          },
          headers: {
            Authorization: 'Bearer ' + accessToken,
            Accept: 'application/json',
          },
        },
      );

      const itemsOfChannelsPromise = response.data.items.map(
        async (playList) => {
          const itemsResponse = await axios.get(
            `https://www.googleapis.com/youtube/v3/playlistItems`,
            {
              params: {
                part: 'snippet',
                playlistId: playList.id,
                maxResults: 63,
              },
              headers: {
                Authorization: 'Bearer ' + accessToken,
                Accept: 'application/json',
              },
            },
          );

          const items = itemsResponse.data.items;
          return items.map((item) => {
            return item.snippet;
          });
        },
      );
      return await Promise.all(itemsOfChannelsPromise);
    } catch (error) {
      console.error(`Error fetching playlists: ${error}`);
    }
  }
}
