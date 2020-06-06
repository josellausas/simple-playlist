import React from 'react';
import {View, Text, StyleSheet, Button, Alert} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';

import {RootStackParamList, Playlist, ISong} from '../@types/Playlists';
import {SongData} from '../sampleData';
import {SongCard, Song} from './SongCard';

interface DetailsProps {
  navigation: StackNavigationProp<RootStackParamList, 'Edit'>;
  route: RouteProp<RootStackParamList, 'Edit'>;
}

interface DetailsState {
  songMap: Map<string, Song>;
  isDirty: boolean;
}

const loadSongs = (songs: ISong[], playlist: Playlist): Map<string, Song> => {
  const idMap = new Map<string, Song>();
  songs.forEach((s: ISong) => {
    idMap.set(s.id, new Song(s));
  });
  // Mark this playlists songs as selected:
  playlist.songs.forEach((s) => {
    let song = idMap.get(s.id);
    if (song) {
      song.isSelected = true;
    }
  });
  return idMap;
};

export class PlaylistEdit extends React.Component<DetailsProps, DetailsState> {
  state = {
    songMap: loadSongs(SongData, this.props.route.params.playlist),
    isDirty: false,
  };

  saveButton = (): Element => (
    <Button
      onPress={() => {
        const {playlist, updateList} = this.props.route.params;
        const selectedSongs: ISong[] = [];
        [...this.state.songMap.values()].forEach((s: Song) => {
          if (s.isSelected) {
            selectedSongs.push(s);
          }
        });
        playlist.songs = [...selectedSongs];
        updateList(playlist);
        this.setState({isDirty: false});
        this.props.navigation.goBack();
      }}
      title="Save"
    />
  );

  backButton = (): Element => (
    <Button
      onPress={() => {
        if (this.state.isDirty) {
          Alert.alert('Forgot to Save changes?');
          this.setState({isDirty: false});
        } else {
          this.props.navigation.goBack();
        }
      }}
      title={'Back'}
    />
  );

  componentDidMount() {
    this.props.navigation.setOptions({
      headerRight: this.saveButton,
      headerLeft: this.backButton,
    });
  }

  render() {
    // TODO: Change this to a ListView
    const {route} = this.props;
    const {playlist} = route.params;
    const {songMap} = this.state;
    const songList = [...songMap.values()].map((s: Song) => (
      <SongCard
        key={s.id}
        song={s}
        isSelected={s.isSelected}
        onPress={(_e: any, id: string) => {
          s.isSelected = !s.isSelected;
          songMap.set(id, s);
          this.setState({isDirty: true, songMap});
        }}
      />
    ));
    return (
      <View style={styles.songContainer}>
        <Text>{`Edit ${playlist.name} (${songMap.size})`}</Text>
        {songList}
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
