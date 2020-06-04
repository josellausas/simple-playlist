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

import Home from './src/components/Home';

declare const global: {HermesInternal: null | {}};

class App extends React.Component {
  isPortrait = () => {
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
    // Remember to unregister all listeners here and prevent mem-leaks
    Dimensions.removeEventListener('change', this.screenSizeChangedHandler);
  }
  render() {
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            contentContainerStyle={styles.contentContainer}
            style={styles.scrollView}>
            <View style={[styles.container, {height: this.state.screenHeight}]}>
              <Home />
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
