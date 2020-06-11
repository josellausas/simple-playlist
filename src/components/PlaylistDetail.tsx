import React from 'react';
import {View, Text, Button, FlatList} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';

import {RootStackParamList} from '../@types/Playlists';
import {Playlist} from '../objects/Playlist';
import {SongCard} from './SongCard';
import AppTheme from '../AppTheme';

interface Props {
  navigation: StackNavigationProp<RootStackParamList, 'Details'>;
  route: RouteProp<RootStackParamList, 'Details'>;
}

interface State {
  playlist: Playlist;
}

export default class PlaylistDetail extends React.Component<Props, State> {
  state = {
    playlist: this.props.route.params.playlist,
  };

  backButton = () => (
    <Button
      onPress={() => {
        this.props.navigation.navigate('Playlists', {
          playlist: this.state.playlist,
        });
      }}
      title="Back"
    />
  );

  editButton = (): Element => (
    <View style={AppTheme.headerButton}>
      <Button
        onPress={() => {
          this.props.navigation.navigate('Edit', {
            playlist: this.state.playlist,
          });
        }}
        title="Edit"
      />
    </View>
  );

  componentDidMount() {
    this.props.navigation.setOptions({
      headerRight: this.editButton,
      headerLeft: this.backButton,
      title: this.state.playlist.name,
    });
  }

  render() {
    const {playlist} = this.state;
    const backgroundStyle = {backgroundColor: playlist.color, flex: 1};

    return (
      <View style={backgroundStyle}>
        <Text style={AppTheme.title}>{playlist.name}</Text>
        <Text
          style={AppTheme.subtitle}>{`${playlist.songs.length} songs`}</Text>
        <FlatList
          data={playlist.songs}
          keyExtractor={(item) => item.id}
          renderItem={({item}) => <SongCard song={item} key={item.id} />}
        />
      </View>
    );
  }
}

