import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';

import {RootStackParamList} from '../@types/Playlists';
import {Song} from '../objects/Song';
import {Playlist} from '../objects/Playlist';

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
  editButton = (): Element => (
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
    this.props.navigation.setOptions({
      headerRight: this.editButton,
    });
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
