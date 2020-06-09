import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';

import {RootStackParamList} from '../@types/Playlists';
import {Song} from '../objects/Song';
import {Playlist} from '../objects/Playlist';

interface DetailsProps {
  navigation: StackNavigationProp<RootStackParamList, 'Details'>;
  route: RouteProp<RootStackParamList, 'Details'>;
}

interface DetailsState {
  playlist: Playlist;
}

export default class PlaylistDetail extends React.Component<
  DetailsProps,
  DetailsState
> {
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
  editButton = () => (
    <Button
      onPress={() => {
        this.props.navigation.navigate('Edit', {
          playlist: this.state.playlist,
        });
      }}
      title="Edit"
    />
  );
  componentDidMount() {
    console.log('Mounter PlaylistDeatail');
    this.props.navigation.setOptions({
      headerRight: this.editButton,
      headerLeft: this.backButton,
    });
  }
  componentWillUnmount() {
    console.log('Unmount PlaylistDEtail');
  }
  render() {
    const {playlist} = this.state;
    return (
      <View style={styles.songContainer}>
        <Text>{playlist.name}</Text>
        {playlist.songs.map((s: Song) => (
          <View style={styles.songCard} key={s.id}>
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
