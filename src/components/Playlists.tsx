import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import {RootStackParamList, PlaylistOnDisk} from '../@types/Playlists';

import {PlaylistsData, SongData} from '../sampleData';
import {Playlist} from '../objects/Playlist';
import {PlaylistCard} from './PlaylistCard';
import {CreateSongMap} from '../helpers';

interface State {
  lists: Playlist[];
}

interface Props {
  navigation: StackNavigationProp<RootStackParamList, 'Playlists'>;
  route: RouteProp<RootStackParamList, 'Playlists'>;
}

export default class Playlists extends React.Component<Props, State> {
  state = {
    lists: this.loadPlaylists(),
  };
  loadPlaylists(): Playlist[] {
    const songs = CreateSongMap(SongData);
    return PlaylistsData.map((p: PlaylistOnDisk) => {
      const pobj = new Playlist(p.name);
      p.songIds.forEach((sID) => {
        pobj.addSongWithId(songs, sID);
      });
      return pobj;
    });
  }
  render() {
    const {lists} = this.state;
    const {navigation} = this.props;
    return (
      <View style={styles.homeView}>
        <Text>{`${lists.length} Playlists`}</Text>
        {lists.map((pl) => (
          <PlaylistCard
            onPress={(_e: any) => {
              navigation.navigate('Details', {playlist: pl});
            }}
            playlist={pl}
            key={pl.name}
          />
        ))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  homeView: {
    backgroundColor: '#aaa',
  },
});
