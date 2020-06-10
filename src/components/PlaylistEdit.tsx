import React from 'react';
import {View, Text, StyleSheet, Button, Alert} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';

import {RootStackParamList} from '../@types/Playlists';
import {SongData} from '../sampleData';
import {SongCard} from './SongCard';
import {Song} from '../objects/Song';
import {CreateSelectedSongMap} from '../helpers';

interface Props {
  navigation: StackNavigationProp<RootStackParamList, 'Edit'>;
  route: RouteProp<RootStackParamList, 'Edit'>;
}

interface State {
  songMap: Map<string, Song>;
  isDirty: boolean;
}

export class PlaylistEdit extends React.Component<Props, State> {
  state = {
    songMap: CreateSelectedSongMap(SongData, this.props.route.params.playlist),
    isDirty: false,
  };
  saveButton = (): Element => (
    <Button
      title="Save"
      onPress={() => {
        const {playlist} = this.props.route.params;
        const {songMap} = this.state;
        playlist.songs = [...songMap.values()].filter((s) => s.isSelected);
        this.setState({isDirty: false});
        this.props.navigation.navigate('Details', {playlist});
      }}
    />
  );
  componentDidMount() {
    this.props.navigation.setOptions({
      headerRight: this.saveButton,
    });
  }
  render() {
    // TODO: Change this to a ListView
    const {playlist} = this.props.route.params;
    const {songMap, isDirty} = this.state;
    const songList = [...songMap.values()].map((song: Song) => (
      <SongCard
        key={song.id}
        song={song}
        onPress={(_e: any, id: string) => {
          song.isSelected = !song.isSelected;
          songMap.set(id, song);
          this.setState({isDirty: true, songMap});
        }}
      />
    ));
    return (
      <View style={styles.songContainer}>
        <Text>
          {`Edit ${playlist.name} (${songMap.size}) 
            ${isDirty ? '*(Unsaved changes)' : ''}`}
        </Text>
        {songList}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  songContainer: {
    backgroundColor: '#efe',
  },
});
