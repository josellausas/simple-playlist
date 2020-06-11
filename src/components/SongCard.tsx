import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

import {Song} from '../objects/Song';

interface Props {
  song: Song;
  key: string;
  onPress: (_e: any, songId: string) => void;
}

export const SongCard = (props: Props) => {
  const {song} = props;
  return (
    <View style={styles.songCard}>
      <Text style={styles.content}>{song.name}</Text>
    </View>
  );
};

export const SongButtonCard = (props: Props) => {
  const {song, onPress} = props;

  return (
    <TouchableOpacity
      onPress={(e) => {
        onPress(e, song.id);
      }}>
      <View style={styles.songCard}>
        <Text style={styles.content}>{`${song.name} ${
          song.isSelected ? '✅' : ''
        }`}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  songCard: {
    backgroundColor: '#ccc',
    minHeight: 56,
    margin: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    fontSize: 18,
  },
});
