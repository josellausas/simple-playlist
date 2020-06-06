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
  Playlists: undefined;
  Details: {playlist: Playlist; updateList: (list: Playlist) => void};
  Edit: {
    playlist: Playlist;
    updateList: (list: Playlist) => void;
  };
};
