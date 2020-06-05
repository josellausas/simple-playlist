import 'react-native-gesture-handler';
// !!! Leave the line above where it is. !!!
/**
 * If you move the first import, your app may crash
 * in production even if it works fine in development.
 * @format
 */
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
