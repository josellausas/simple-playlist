import {SongOnDisk} from './@types/Playlists';
import {Song} from './objects/Song';
import {Playlist} from './objects/Playlist';

export const CreateSongMap = (songs: SongOnDisk[]): Map<string, Song> => {
  const idMap = new Map<string, Song>();
  songs.forEach((s) => {
    idMap.set(s.id, new Song(s));
  });
  return idMap;
};

export const CreateSelectedSongMap = (
  songs: SongOnDisk[],
  playlist: Playlist,
): Map<string, Song> => {
  // Load Songs
  const idMap = CreateSongMap(songs);
  // Mark selected
  playlist.songs.forEach((s) => {
    let song = idMap.get(s.id);
    if (song) {
      song.isSelected = true;
    }
  });
  return idMap;
};
