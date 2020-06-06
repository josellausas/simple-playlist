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
  songs = loadSongs(SongData, this.props.route.params.playlist);
  state = {
    songMap: this.songs,
    isDirty: false,
  };
  componentDidMount() {
    this.props.navigation.setOptions({
      headerRight: () => (
        <Button
          onPress={() => {
            Alert.alert('Save goes here');
            this.setState({isDirty: false});
          }}
          title="Save"
        />
      ),
      headerLeft: () => (
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
      ),
    });
  }

  render() {
    const {route} = this.props;
    const {playlist} = route.params;
    const {songMap} = this.state;
    const songList = [...songMap.values()].map((s: Song) => (
      <SongCard
        key={s.id}
        song={s}
        isSelected={s.isSelected}
        onPress={(_e: any, id: string) => {
          this.setState({isDirty: true});
          const song = songMap.get(id);
          if (song) {
            song.isSelected = !song.isSelected;
            songMap.set(id, song);
            this.setState({songMap});
          } else {
            // TODO: Report to Sentry
            console.error(`Song ID (${id}) was not found`);
          }
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
