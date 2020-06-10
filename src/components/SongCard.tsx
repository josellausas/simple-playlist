import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

import {Song} from '../objects/Song';

export interface SongCardProps {
  song: Song;
  key: string;
  onPress: Function;
}

export const SongCard = (props: SongCardProps) => {
  const {song, onPress} = props;
  return (
    <TouchableOpacity
      onPress={(e) => {
        onPress(e, song.id);
      }}>
      <View style={styles.songCard}>
        <Text>{`${song.name} ${song.isSelected ? '✅' : ''}`}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  songCard: {
    backgroundColor: '#aaa',
    minHeight: 40,
    margin: 20,
  },
});
