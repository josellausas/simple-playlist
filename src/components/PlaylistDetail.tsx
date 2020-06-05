import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';

import {RootStackParamList, Playlist, Song} from '../@types/Playlists';

interface DetailsProps {
  navigation: StackNavigationProp<RootStackParamList, 'Details'>;
  route: RouteProp<RootStackParamList, 'Details'>;
}

export default class PlaylistDetail extends React.Component<DetailsProps, {}> {
  render() {
    const {route} = this.props;
    const pl = route.params as Playlist;
    return (
      <View style={styles.songContainer}>
        <Text>{pl.name}</Text>
        {pl.songs.map((s: Song) => (
          <View key={s.name} style={styles.songCard}>
            <Text>{`${s.name}`}</Text>
          </View>
        ))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  songContainer: {
    backgroundColor: '#efe',
  },
  songCard: {
    backgroundColor: '#aaa',
    minHeight: 40,
    margin: 20,
  },
});
