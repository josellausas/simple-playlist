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
        <Text style={styles.title}>{playlist.name}</Text>
        <View style={styles.songsContainer}>
          <Text style={styles.content}>{`${playlist.songs.length} songs`}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  playlistCard: {
    margin: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  songsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 40,
  },
  title: {
    fontSize: 20,
  },
  content: {
    fontSize: 16,
    fontStyle: 'italic',
  },
});
