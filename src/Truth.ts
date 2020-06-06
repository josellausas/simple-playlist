import {Playlist, Song} from './@types/Playlists';
import {TestPlaylistsData, SongData} from './sampleData';

interface TruthStore {
  playlists: Playlist[] | null;
  songs: Song[] | null;
  save: Function;
  getSongs: Function;
  getPlaylists: Function;
}

// Single Source of Truth. Reads and writes to disk to persist playlist changes,
// Keeps a representation of the state of the app.
export const useStore = (() => {
  let instance: null | TruthStore = null;
  async function saveToDisk(playlists: Playlist[], songs: Song[]) {
    // TODO: Async Storage to save to disk
    console.log(`Saving ${songs.length} songs`);
    console.log(`Saving ${playlists.length} playlists`);
    return true;
  }
  function loadPlaylistsFromDisk(): Playlist[] {
    return [];
  }
  function loadSongsFromDisk(): Song[] {
    return [];
  }
  const createInstance = (): TruthStore => {
    let playlists: Playlist[] | null = null;
    let songs: Song[] | null = null;
    return {
      playlists,
      songs,
      save: (pls: Playlist[], sngs: Song[]) => {
        saveToDisk(pls, sngs);
      },
      getSongs: (): Song[] => {
        if (!songs) {
          songs = loadSongsFromDisk();
        }
        return songs;
      },
      getPlaylists: (): Playlist[] => {
        if (!playlists) {
          playlists = loadPlaylistsFromDisk();
        }
        return playlists;
      },
    };
  };
  return () => {
    if (!instance) {
      instance = createInstance();
    }
    return instance;
  };
})();
