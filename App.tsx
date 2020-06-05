/**
 * Simple Playlist App
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  StatusBar,
  View,
  Dimensions,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

import Playlists from './src/components/Playlists';
import {Playlist as IPlaylist} from './src/@types/Playlists';

declare const global: {HermesInternal: null | {}};

const samplePlaylists = [
  {name: 'Playlist 1', songs: [{name: 'Stairway to heaven', selected: false}]},
  {
    name: 'Playlist 2',
    songs: [
      {name: 'Stairway to heaven', selected: false},
      {name: 'Tesselate', selected: false},
    ],
  },
];

interface AppState {
  screenHeight: number;
  screenOrientation: string;
  playlists: IPlaylist[];
}

class App extends React.Component<{}, AppState> {
  isPortrait = () => {
    const screen = Dimensions.get('screen');
    return screen.height >= screen.width;
  };

  state = {
    screenHeight: Dimensions.get('window').height,
    screenOrientation: this.isPortrait() ? 'portrait' : 'landscape',
    playlists: samplePlaylists,
  };

  screenSizeChangedHandler = () => {
    this.setState({
      screenHeight: Dimensions.get('window').height,
      screenOrientation: this.isPortrait() ? 'portrait' : 'landscape',
    });
  };

  componentDidMount() {
    Dimensions.addEventListener('change', this.screenSizeChangedHandler);
    // TODO: Load songs from sample data
    // TODO: Load playlists from sample data
  }

  componentWillUnmount() {
    // TODO: Remember to unregister all listeners here to prevent memory leaks!
    Dimensions.removeEventListener('change', this.screenSizeChangedHandler);
  }

  render() {
    const {screenHeight, playlists} = this.state;
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            contentContainerStyle={styles.contentContainer}
            style={styles.scrollView}>
            <View style={[styles.container, {height: screenHeight}]}>
              <Playlists lists={playlists} />
            </View>
          </ScrollView>
        </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  contentContainer: {
    flexGrow: 1,
  },
  container: {
    backgroundColor: '#ccc',
  },
});

export default App;
