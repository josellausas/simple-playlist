import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

import {Playlist} from '../objects/Playlist';

interface PlaylistCardProps {
  playlist: Playlist;
  onPress: (_e: any) => void;
}

export const PlaylistCard: React.SFC<PlaylistCardProps> = (props) => {
  const {playlist, onPress} = props;
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.playlistCard}>
        <Text>{playlist.name}</Text>
        <View style={styles.songsContainer}>
          <Text>{`${playlist.songs.length} songs`}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
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
