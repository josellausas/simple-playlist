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

import {Playlist, RootStackParamList} from '../@types/Playlists';
import {TestPlaylistsData} from '../sampleData';
interface PlaylistsState {
  lists: Playlist[];
}

interface PlaylistsProps {
  navigation: StackNavigationProp<RootStackParamList, 'Playlists'>;
  route: RouteProp<RootStackParamList, 'Playlists'>;
}

export default class Playlists extends React.Component<
  PlaylistsProps,
  PlaylistsState
> {
  state = {
    lists: TestPlaylistsData as Playlist[],
  };
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
                navigation.navigate('Details', pl);
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
