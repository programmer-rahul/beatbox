import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from './HomeScreen';
import PlayerScreen from './PlayerScreen';
import SavedScreen from './SavedScreen';
import PlaylistScreen from './PlaylistScreen';
import usePermission from './../hooks/usePermission';
import PermissionRequired from './../components/reusable/permission-required';
import Header from './../components/header/header';
import usePlayerEvents from './../hooks/usePlayerEvents';
import { StatusBar, View } from 'react-native';
import MiniMusicPlayer from '../components/home/tabs/mini-music-player';
import { useEffect } from 'react';
import COLORS from '../constants/colors';

const Tab = createBottomTabNavigator();

const TabNavitation = () => {
  
  usePlayerEvents();

  const currentTab = '/home';
  console.log("CURRENT TAB :- ", currentTab);

  useEffect(() => {
    // if (currentTab === "/player") {
    //   StatusBar.setBackgroundColor(COLORS.secondaryBg, false);
    //   StatusBar.setBarStyle("dark-content");
    // } else {
    //   StatusBar.setBackgroundColor(COLORS.primaryBg, false);
    //   StatusBar.setBarStyle("light-content");
    // }
  }, [currentTab]);

  return (
    <View className='flex-1'>
     <Tab.Navigator
      screenOptions={{headerShown: true, header: () => <Header />}}>
      <Tab.Screen name="home" component={HomeScreen} />
      <Tab.Screen name="player" component={PlayerScreen} />
      <Tab.Screen name="saved" component={SavedScreen} />
      <Tab.Screen name="playlist" component={PlaylistScreen} />
    </Tab.Navigator>
    <View style={{ display: currentTab !== "/player" ? "flex" : "none" }}>
    <MiniMusicPlayer />
  </View></View>
  )
};

export default TabNavitation;
