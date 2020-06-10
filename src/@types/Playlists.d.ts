import {Playlist} from '../objects/Playlist';

export interface PlaylistOnDisk {
  name: string;
  songIds: string[];
}

export interface SongOnDisk {
  name: string;
  id: string;
}

export type RootStackParamList = {
  Playlists: {};
  Details: {
    playlist: Playlist;
  };
  Edit: {
    playlist: Playlist;
  };
};
