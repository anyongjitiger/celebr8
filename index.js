/**
 * @format
 */
import 'react-native-gesture-handler';
import { AppRegistry, LogBox } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { getGlobal } from '@global' //need for ReactN initializatin
import i18n from "./src/i18n";
LogBox.ignoreLogs(['Require cycle: node_modules']);
AppRegistry.registerComponent(appName, () => App);
