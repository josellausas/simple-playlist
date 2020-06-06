import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';

import {RootStackParamList, Playlist, ISong} from '../@types/Playlists';
import {SongData} from '../sampleData';

interface DetailsProps {
  navigation: StackNavigationProp<RootStackParamList, 'Details'>;
  route: RouteProp<RootStackParamList, 'Details'>;
}

export default class PlaylistDetail extends React.Component<DetailsProps, {}> {
  render() {
    const {route, navigation} = this.props;
    const pl = route.params as Playlist;
    return (
      <View style={styles.songContainer}>
        <Text>{pl.name}</Text>
        {pl.songs.map((s: ISong) => (
          <TouchableOpacity
            key={s.name}
            onPress={(_e) => {
              navigation.navigate('Edit', {playlist: pl, songs: SongData});
            }}>
            <View style={styles.songCard}>
              <Text>{`${s.name}`}</Text>
            </View>
          </TouchableOpacity>
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
