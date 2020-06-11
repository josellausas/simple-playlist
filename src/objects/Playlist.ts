import {Song} from './Song';

export class Playlist extends Object {
  name: string;
  songs: Song[];
  color: string;

  constructor(name: string, color: string) {
    super();
    this.name = name;
    this.songs = [];
    this.color = color;
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
