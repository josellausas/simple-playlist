export interface ISong {
  id: string;
  name: string;
}

export interface Playlist {
  name: string;
  songs: ISong[];
}
export interface PlaylistOnDisk {
  name: string;
  songIds: string[];
}

export type RootStackParamList = {
  Playlists: undefined;
  Details: {playlist: Playlist; updateList: (list: Playlist) => void};
  Edit: {
    playlist: Playlist;
    songs: ISong[];
    updateList: (list: Playlist) => void;
  };
};
