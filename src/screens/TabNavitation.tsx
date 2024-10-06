import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from './HomeScreen';
import PlayerScreen from './PlayerScreen';
import SavedScreen from './SavedScreen';
import PlaylistScreen from './PlaylistScreen';
import usePermission from './../hooks/usePermission';
import PermissionRequired from './../components/reusable/permission-required';
import Header from './../components/header/header';
import usePlayerEvents from './../hooks/usePlayerEvents';

const Tab = createBottomTabNavigator();

const TabNavitation = () => {
  const {isHavePermission} = usePermission();

  usePlayerEvents();

  return isHavePermission ? (
    <Tab.Navigator
      screenOptions={{headerShown: true, header: () => <Header />}}>
      <Tab.Screen name="home" component={HomeScreen} />
      <Tab.Screen name="player" component={PlayerScreen} />
      <Tab.Screen name="saved" component={SavedScreen} />
      <Tab.Screen name="playlist" component={PlaylistScreen} />
    </Tab.Navigator>
  ) : (
    <PermissionRequired />
  );
};

export default TabNavitation;
