import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
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
            <Text>{pl.name}</Text>
            <Text>{`${pl.songs.length} songs`}</Text>
          </View>
        ))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  homeView: {},
});
