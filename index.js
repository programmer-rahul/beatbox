/**
 * @format
 */

import { AppRegistry } from "react-native";
import App from "./App";
import { name as appName } from "./app.json";

import { LogBox } from "react-native";

// Ignore the specific warning
LogBox.ignoreLogs([
  'A props object containing a "key" prop is being spread into JSX',
]);

AppRegistry.registerComponent(appName, () => App);
