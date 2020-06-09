import React from 'react';
import {View, Text, StyleSheet, Button, Alert} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';

import {RootStackParamList, SongOnDisk} from '../@types/Playlists';
import {SongData} from '../sampleData';
import {SongCard} from './SongCard';
import {Song} from '../objects/Song';
import {Playlist} from '../objects/Playlist';

interface DetailsProps {
  navigation: StackNavigationProp<RootStackParamList, 'Edit'>;
  route: RouteProp<RootStackParamList, 'Edit'>;
}

interface DetailsState {
  songMap: Map<string, Song>;
  isDirty: boolean;
}

const loadSongsAndMarkSelected = (
  songs: SongOnDisk[],
  playlist: Playlist,
): Map<string, Song> => {
  const idMap = new Map<string, Song>();
  songs.forEach((s) => {
    idMap.set(s.id, new Song(s));
  });
  // Mark the playlists songs as selected:
  playlist.songs.forEach((s) => {
    let song = idMap.get(s.id);
    if (song) {
      song.isSelected = true;
    }
  });
  return idMap;
};

export class PlaylistEdit extends React.Component<DetailsProps, DetailsState> {
  // TODO: Get Song data as props from Parent, since we already loaded them
  state = {
    songMap: loadSongsAndMarkSelected(
      SongData,
      this.props.route.params.playlist,
    ),
    isDirty: false,
  };

  saveButton = (): Element => (
    <Button
      onPress={() => {
        const {playlist} = this.props.route.params;
        const {songMap} = this.state;
        playlist.songs = [...songMap.values()].filter(
          (s: Song) => s.isSelected,
        );
        this.setState({isDirty: false});
        // TODO: Launch async save to disk here
        this.props.navigation.navigate('Details', {
          playlist: playlist,
        });
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
    console.log('Mount PlaylistEdit');
    this.props.navigation.setOptions({
      headerRight: this.saveButton,
      headerLeft: this.backButton,
    });
  }
  componentWillUnmount() {
    console.log('Unmounted PlaylistEdit');
  }

  render() {
    // TODO: Change this to a ListView
    const {playlist} = this.props.route.params;
    const {songMap} = this.state;
    const songList = [...songMap.values()].map((s: Song) => (
      <SongCard
        key={s.id}
        song={s}
        isSelected={s.isSelected}
        onPress={(_e: any, id: string) => {
          // Flip selection
          s.isSelected = !s.isSelected;
          // Set changes to state
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
