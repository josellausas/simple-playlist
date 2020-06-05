export interface Song {
  name: string;
  selected: boolean;
}

export interface Playlist {
  name: string;
  songs: Song[];
}
