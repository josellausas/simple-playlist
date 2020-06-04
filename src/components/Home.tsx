import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default class Home extends React.Component<{}, {}> {
  state = {};
  render() {
    return (
      <View style={styles.homeView}>
        <Text>{'Hello World'}</Text>
        <Text>{'Hello World'}</Text>
        <Text>{'Hello World'}</Text>
        <Text>{'Hello World'}</Text>
        <Text>{'Hello World'}</Text>
        <Text>{'Hello World'}</Text>
        <Text>{'Hello World'}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  homeView: {
    // flex: 1,
  },
});
