import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

import {ISong} from '../@types/Playlists';

export class Song extends Object {
  name: string;
  id: string;
  isSelected: boolean;

  constructor(s: ISong) {
    super();
    this.name = s.name;
    this.id = s.id;
    this.isSelected = false;
  }
}

export interface SongCardProps {
  song: Song;
  isSelected: boolean;
  key: string;
  onPress: Function;
}

export const SongCard = (props: SongCardProps) => {
  const {song, isSelected, onPress} = props;
  return (
    <TouchableOpacity
      onPress={(e) => {
        onPress(e, song.id);
      }}>
      <View style={styles.songCard}>
        <Text>{`${song.name} ${isSelected ? '✅' : ''}`}</Text>
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
