import React from 'react';
import {View, Text, Button, FlatList} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';

import {RootStackParamList} from '../@types/Playlists';
import {SongData} from '../sampleData';
import {SongButtonCard} from './SongCard';
import {Song} from '../objects/Song';
import {CreateSelectedSongMap} from '../helpers';
import AppTheme from '../AppTheme';

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
    <View style={AppTheme.headerButton}>
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
    </View>
  );

  componentDidMount() {
    this.props.navigation.setOptions({
      headerRight: this.saveButton,
      title: this.props.route.params.playlist.name,
    });
  }

  render() {
    const {playlist} = this.props.route.params;
    const {songMap, isDirty} = this.state;
    const songList = [...songMap.values()];
    const backgroundStyle = {backgroundColor: playlist.color, flex: 1};

    return (
      <View style={backgroundStyle}>
        <Text style={AppTheme.title}>{`Edit: ${playlist.name}`}</Text>
        <Text style={AppTheme.subtitle}>{`${
          isDirty ? '*(Unsaved changes)' : ''
        }`}</Text>
        <FlatList
          data={songList}
          keyExtractor={(item) => item.id}
          renderItem={({item}) => (
            <SongButtonCard
              key={item.id}
              song={item}
              onPress={(_e: any, id: string) => {
                item.isSelected = !item.isSelected;
                songMap.set(id, item);
                this.setState({isDirty: true, songMap});
              }}
            />
          )}
        />
      </View>
    );
  }
}
