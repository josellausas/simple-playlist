import React from 'react';
import {View, Text, Button, FlatList, StyleSheet} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';

import {RootStackParamList} from '../@types/Playlists';
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
    const backgroundStyle = {backgroundColor: playlist.color};
    return (
      <View style={backgroundStyle}>
        <Text>{playlist.name}</Text>
        <FlatList
          data={playlist.songs}
          keyExtractor={(item) => item.id}
          renderItem={({item}) => (
            <View style={styles.songCard} key={item.id}>
              <Text>{`${item.name}`}</Text>
            </View>
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  songCard: {
    backgroundColor: '#ddd',
    minHeight: 40,
    margin: 20,
  },
});
