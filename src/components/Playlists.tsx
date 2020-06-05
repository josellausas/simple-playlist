import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  GestureResponderEvent,
} from 'react-native';
import {Playlist} from '../@types/Playlists';

interface PlaylistsProps {
  lists: Playlist[];
}

export default class Playlists extends React.Component<PlaylistsProps, {}> {
  state = {};
  render() {
    const {lists} = this.props;
    return (
      <View style={styles.homeView}>
        <Text>{`${lists.length} Playlists`}</Text>
        {lists.map((pl) => (
          <View key={pl.name}>
            <TouchableOpacity
              onPress={(_e: GestureResponderEvent) => {
                Alert.alert(`Naviate to: ${pl.name}`);
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
