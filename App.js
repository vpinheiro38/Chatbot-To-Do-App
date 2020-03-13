import React from 'react';
import {
  SafeAreaView,
  StatusBar,
} from 'react-native';

import ChatScreen from './src/navigation/Chat';
import { colors } from './src/constants/colors';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import SkillPageScreen from './src/navigation/SkillPage';
import EditTaskScreen from './src/navigation/EditTask';
import LoadingScreen from './src/navigation/Loading';
import { NavigationContainer } from '@react-navigation/native';

import { Provider } from 'react-redux';
import store from './src/redux/store';

// async function bootstrap() {
//   await GoogleSignin.configure({
//     webClientId: '292831481126-fcs12qu5ldrmut8fgr2231k812h7cavk.apps.googleusercontent.com',
//   });
// }

const Tab = createMaterialTopTabNavigator();

const TabContainer = () => {
  return (
      <Tab.Navigator
        initialRouteName='Chat' 
        tabBar={() => {}}
        swipeEnabled
      >
        <Tab.Screen name="Tasks" component={SkillPageScreen} />
        <Tab.Screen name="Chat" component={ChatScreen}  />          
      </Tab.Navigator>
  )
}

const AppNavigator = createStackNavigator({
  EditTask: {
    screen: EditTaskScreen,
    navigationOptions: {
      header: () => false
    }
  },
  Tabs: {
    screen: TabContainer
  },
  Loading: {
    screen: LoadingScreen,
  },
},
{
  initialRouteName: 'Loading',
  defaultNavigationOptions: {
    header: () => false
  }
});

const AppContainer = createAppContainer(AppNavigator);

const App = () => {
  // bootstrap()
  
  return (
    <Provider store={ store }>
      <NavigationContainer>
        <StatusBar barStyle="light-content" backgroundColor={colors.mainColor} />
        <SafeAreaView style={{flex: 1}}>
          <AppContainer/>
        </SafeAreaView>
      </NavigationContainer>
    </Provider>
  );
};

export default App;