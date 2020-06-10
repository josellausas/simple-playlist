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
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Playlists from './src/components/Playlists';
import {RootStackParamList} from './src/@types/Playlists';
import PlaylistDetails from './src/components/PlaylistDetail';
import {PlaylistEdit} from './src/components/PlaylistEdit';

declare const global: {HermesInternal: null | {}};

interface AppState {
  screenHeight: number;
  screenOrientation: string;
}

const Stack = createStackNavigator<RootStackParamList>();

class App extends React.Component<{}, AppState> {
  isPortrait = (): boolean => {
    const screen = Dimensions.get('screen');
    return screen.height >= screen.width;
  };

  state = {
    screenHeight: Dimensions.get('window').height,
    screenOrientation: this.isPortrait() ? 'portrait' : 'landscape',
  };

  screenSizeChangedHandler = () => {
    this.setState({
      screenHeight: Dimensions.get('window').height,
      screenOrientation: this.isPortrait() ? 'portrait' : 'landscape',
    });
  };

  componentDidMount() {
    Dimensions.addEventListener('change', this.screenSizeChangedHandler);
  }

  componentWillUnmount() {
    Dimensions.removeEventListener('change', this.screenSizeChangedHandler);
  }

  render() {
    const {screenHeight} = this.state;
    return (
      <NavigationContainer>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            contentContainerStyle={styles.contentContainer}
            style={styles.scrollView}>
            <View style={[styles.container, {height: screenHeight}]}>
              <Stack.Navigator initialRouteName="Playlists">
                <Stack.Screen name="Playlists" component={Playlists} />
                <Stack.Screen name="Details" component={PlaylistDetails} />
                <Stack.Screen name="Edit" component={PlaylistEdit} />
              </Stack.Navigator>
            </View>
          </ScrollView>
        </SafeAreaView>
      </NavigationContainer>
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
