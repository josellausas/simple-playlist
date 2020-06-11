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
    <View style={styles.headerButton}>
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
      title: this.state.playlist.name,
    });
  }

  render() {
    const {playlist} = this.state;
    const backgroundStyle = {backgroundColor: playlist.color, flex: 1};

    return (
      <View style={backgroundStyle}>
        <Text style={styles.title}>{playlist.name}</Text>
        <Text style={styles.subtitle}>{`${playlist.songs.length} songs`}</Text>
        <FlatList
          data={playlist.songs}
          keyExtractor={(item) => item.id}
          renderItem={({item}) => (
            <View style={styles.songCard} key={item.id}>
              <Text style={styles.songTitle}>{`${item.name}`}</Text>
            </View>
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  songCard: {
    backgroundColor: '#abc',
    minHeight: 56,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    marginLeft: 10,
  },
  subtitle: {
    fontSize: 24,
    fontStyle: 'italic',
    marginLeft: 10,
  },
  headerButton: {
    marginRight: 8,
  },
  songTitle: {
    fontSize: 20,
  },
});
