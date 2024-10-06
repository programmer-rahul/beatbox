import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from './HomeScreen';
import PlayerScreen from './PlayerScreen';
import SavedScreen from './SavedScreen';
import PlaylistScreen from './PlaylistScreen';
import usePlayerEvents from './../hooks/usePlayerEvents';
import {StatusBar, View} from 'react-native';
import MiniMusicPlayer from '../components/home/tabs/mini-music-player';
import {useState} from 'react';
import COLORS from '../constants/colors';
import {Heart, House, ListMusic, Music} from 'lucide-react-native';

const Tab = createBottomTabNavigator();

const TabNavitation = () => {
  const [currentTab, setCurrentTab] = useState('home');
  console.log('CURRENT TAB :- ', currentTab);

  usePlayerEvents();

  return (
    <View className="flex-1">
      <Tab.Navigator
        screenOptions={{
          headerShown: false,

          tabBarStyle: {
            backgroundColor:
              currentTab === 'player' ? COLORS.secondaryBg : COLORS.primaryBg,

            borderColor:
              currentTab === 'player' ? 'transparent' : COLORS.secondaryBg,
          },

          tabBarActiveTintColor: COLORS.main,
          tabBarInactiveTintColor: COLORS.secondaryIcon,
        }}>
        <Tab.Screen
          name="home"
          component={HomeScreen}
          listeners={{tabPress: () => setCurrentTab('home')}}
          options={{tabBarIcon: ({color}) => <House color={color} />}}
        />
        <Tab.Screen
          name="player"
          component={PlayerScreen}
          listeners={{
            tabPress: () => setCurrentTab('player'),
            focus: () => {
              StatusBar.setBackgroundColor(COLORS.secondaryBg, false);
              StatusBar.setBarStyle('dark-content');
            },
            blur: () => {
              StatusBar.setBackgroundColor(COLORS.primaryBg, false);
              StatusBar.setBarStyle('light-content');            },
          }}
          options={{
            tabBarIcon: ({color}) => <Music color={color} />,
          }}
        />
        <Tab.Screen
          name="saved"
          component={SavedScreen}
          listeners={{tabPress: () => setCurrentTab('saved')}}
          options={{tabBarIcon: ({color}) => <Heart color={color} />}}
        />
        <Tab.Screen
          name="playlist"
          component={PlaylistScreen}
          listeners={{tabPress: () => setCurrentTab('playlist')}}
          options={{tabBarIcon: ({color}) => <ListMusic color={color} />}}
        />
      </Tab.Navigator>
      <View style={{display: currentTab !== 'player' ? 'flex' : 'none'}}>
        <MiniMusicPlayer />
      </View>
    </View>
  );
};

export default TabNavitation;
