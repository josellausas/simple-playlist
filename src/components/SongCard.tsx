import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

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
    <View>
      <TouchableOpacity
        onPress={(e) => {
          onPress(e, song.id);
        }}>
        <Text>{song.name}</Text>
        <Text>{isSelected ? 'Selected' : ''}</Text>
      </TouchableOpacity>
    </View>
  );
};
