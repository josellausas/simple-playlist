import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

import {Playlist} from '../objects/Playlist';

interface Props {
  playlist: Playlist;
  onPress: (_e: any) => void;
}

export const PlaylistCard = (props: Props) => {
  const {playlist, onPress} = props;
  const backColor = {backgroundColor: playlist.color};
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.playlistCard, backColor]}>
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
  },
  songsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 40,
  },
});
