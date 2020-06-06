import {Song} from './Song';

export class Playlist {
  name: string;
  songs: Song[];
  constructor(name: string) {
    this.name = name;
    this.songs = [];
  }
  addSongWithId(songMap: Map<string, Song>, songId: string) {
    const song = songMap.get(songId);
    if (song) {
      this.songs.push(song);
    }
  }
  addSong(song: Song) {
    this.songs.push(song);
  }
}
