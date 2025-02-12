import {
  Controller,
  Get,
  Post,
  Query,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { MusicService } from './music.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { exec } from 'child_process';
import path from 'path';
import * as fs from 'fs';
import { Express } from 'express';
import { diskStorage } from 'multer';

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

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('audioFile', {
      storage: diskStorage({
        destination: './uploads', // 파일 저장 위치
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(
            null,
            file.fieldname +
              '-' +
              uniqueSuffix +
              path.extname(file.originalname),
          );
        },
      }),
    }),
  )
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file);

    const filePath = path.join(__dirname, file.filename);
    const pythonScriptPath = path.join(
      __dirname,
      'scripts',
      'audio_analysis.py',
    );

    return new Promise((resolve, reject) => {
      exec(
        `python3 ${pythonScriptPath} ${filePath}`,
        (error, stdout, stderr) => {
          if (error) {
            reject(`Error: ${stderr}`);
          }
          resolve(stdout); // stdout contains the analysis result
        },
      );
    });
  }
}
