import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Button} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';

import {RootStackParamList, Playlist, ISong} from '../@types/Playlists';
import {SongData} from '../sampleData';

interface DetailsProps {
  navigation: StackNavigationProp<RootStackParamList, 'Details'>;
  route: RouteProp<RootStackParamList, 'Details'>;
}

export default class PlaylistDetail extends React.Component<DetailsProps, {}> {
  state = {
    playlist: this.props.route.params.playlist,
  };
  componentDidMount() {
    const {playlist} = this.state;
    this.props.navigation.setOptions({
      headerRight: () => (
        <Button
          onPress={() => {
            this.props.navigation.navigate('Edit', {
              playlist: playlist,
              songs: SongData,
              updateList: (list) => {
                playlist.songs = [...list.songs];
                this.setState({playlist});
                this.props.route.params.updateList(playlist);
              },
            });
          }}
          title="Edit"
        />
      ),
    });
  }
  render() {
    const {playlist} = this.state;
    return (
      <View style={styles.songContainer}>
        <Text>{playlist.name}</Text>
        {/* // TODO: Change this to a ListView */}
        {playlist.songs.map((s: ISong) => (
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
