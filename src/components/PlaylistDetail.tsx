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
  playlist = this.props.route.params as Playlist;
  componentDidMount() {
    this.playlist = this.props.route.params as Playlist;
    this.props.navigation.setOptions({
      headerRight: () => (
        <Button
          onPress={() => {
            this.props.navigation.navigate('Edit', {
              playlist: this.playlist,
              songs: SongData,
            });
          }}
          title="Edit"
        />
      ),
    });
  }
  render() {
    const {navigation} = this.props;
    return (
      <View style={styles.songContainer}>
        <Text>{this.playlist.name}</Text>
        {/* // TODO: Change this to a ListView */}
        {this.playlist.songs.map((s: ISong) => (
          <TouchableOpacity
            key={s.name}
            onPress={(_e) => {
              navigation.navigate('Edit', {
                playlist: this.playlist,
                songs: SongData,
              });
            }}>
            <View style={styles.songCard}>
              <Text>{`${s.name}`}</Text>
            </View>
          </TouchableOpacity>
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
