import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  GestureResponderEvent,
} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import {
  RootStackParamList,
  PlaylistOnDisk,
  SongOnDisk,
} from '../@types/Playlists';

import {PlaylistsData, SongData} from '../sampleData';
import {Song} from '../objects/Song';
import {Playlist} from '../objects/Playlist';

interface PlaylistsState {
  lists: Playlist[];
}

interface PlaylistsProps {
  navigation: StackNavigationProp<RootStackParamList, 'Playlists'>;
  route: RouteProp<RootStackParamList, 'Playlists'>;
}

const loadSongs = (songs: SongOnDisk[]): Map<string, Song> => {
  const idMap = new Map<string, Song>();
  songs.forEach((s) => {
    idMap.set(s.id, new Song(s));
  });
  return idMap;
};

export default class Playlists extends React.Component<
  PlaylistsProps,
  PlaylistsState
> {
  state = {
    lists: this.loadPlaylistsFromDisk(PlaylistsData),
  };
  componentDidMount() {
    console.log('Mount Playlists');
  }
  componentWillUnmount() {
    console.log('Unmount Playlists');
  }
  updateList = (list: Playlist) => {
    const l = this.state.lists;
    l.forEach((pl) => {
      if (pl.name === list.name) {
        pl.songs = [...list.songs];
      }
    });
    this.setState({lists: l});
  };
  loadPlaylistsFromDisk(playlists: PlaylistOnDisk[]): Playlist[] {
    const songs = loadSongs(SongData);
    return playlists.map((p: PlaylistOnDisk) => {
      const pobj = new Playlist(p.name);
      p.songIds.forEach((sID) => {
        pobj.addSongWithId(songs, sID);
      });
      return pobj;
    });
  }
  render() {
    const {lists} = this.state;
    const {navigation} = this.props;
    return (
      <View style={styles.homeView}>
        <Text>{`${lists.length} Playlists`}</Text>
        {lists.map((pl) => (
          <View key={pl.name}>
            <TouchableOpacity
              onPress={(_e: GestureResponderEvent) => {
                navigation.navigate('Details', {
                  playlist: pl,
                });
              }}>
              <View style={styles.playlistCard}>
                <Text>{pl.name}</Text>
                <View style={styles.songsContainer}>
                  <Text>{`${pl.songs.length} songs`}</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  homeView: {
    backgroundColor: '#aaa',
  },
  playlistCard: {
    margin: 14,
    backgroundColor: '#faa',
  },
  songsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1aa',
    minHeight: 40,
  },
});
