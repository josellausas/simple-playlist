import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

import {Song} from '../objects/Song';

interface Props {
  song: Song;
  key: string;
  onPress: (_e: any, songId: string) => void;
}

export const SongCard = (props: Props) => {
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
    backgroundColor: '#ccc',
    minHeight: 40,
    margin: 20,
  },
});
