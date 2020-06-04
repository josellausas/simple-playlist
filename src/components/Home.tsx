import React from 'react';
import {View, Text} from 'react-native';

export default class Home extends React.Component<{}, {}> {
  state = {};
  render() {
    return (
      <View>
        <Text>{'Hello World'}</Text>
      </View>
    );
  }
}
