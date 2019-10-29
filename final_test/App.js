import React, {Component} from 'react';
import { Provider } from 'react-redux';
import { createAppContainer, createSwitchNavigator} from 'react-navigation';
import { createStackNavigator,  } from 'react-navigation-stack';
import { createBottomTabNavigator, BottomTabBar } from 'react-navigation-tabs';
import {
  Container, 
  Content, 
  View, 
  Text, 
  Row,
  Form, 
  Item, 
  Input, 
  Button, 
  Icon,  
  } 
  from 'native-base';


import Room from './src/screens/Room'
import Checkin from './src/screens/Checkin'
import Customer from './src/screens/Customer'
import Setting from './src/screens/Setting'
import Login from './src/screens/Login'


import store from './src/_redux/store'

const SignedOut = createStackNavigator(
  {
    Login: {
      screen: Login,
      title: 'Login',
      navigationOptions: {header: null},
    }
  },
  {
    initialRouteName: 'Login',
  }
);

const RoomStack = createStackNavigator(
  {
    Room: {
      screen: Room,
      title: 'Room',
      navigationOptions: {header: null},
    },
  },
  {
    initialRouteName: 'Room',
  }
)

const CheckinStack = createStackNavigator(
  {
    Checkin: {
      screen:Checkin,
      title: 'Check In',
      navigationOptions: {header: null},
    },
  },
  {
    initialRouteName: 'Checkin',
  }
)

const SettingStack = createStackNavigator(
  {
    Setting: {
      screen:Setting,
      title: 'Setting',
      navigationOptions: {header: null},
    }
  },
  {
    initialRouteName: 'Setting',
  }
)

const CustomerStack = createStackNavigator(
  {
    Customer: {
      screen:Customer,
      title: 'Customer',
      navigationOptions: {header: null},
    }
  },
  {
    initialRouteName: 'Customer',
  }
)

const BottomTab = createBottomTabNavigator({
  Checkin: CheckinStack,
  Room: RoomStack ,
  Customer: CustomerStack,
  Setting: SettingStack
}, {
  defaultNavigationOptions: ({ navigation }) => ({
    tabBarIcon: ({horizontal,tintColor }) => {
      const { routeName } = navigation.state;
      let iconName;
      if (routeName === 'Checkin') {
        iconName = `check-circle`;
      } else if (routeName === 'Room') {
        iconName = `bed`;
      } else if (routeName === 'Customer') {
        iconName = `id-card`;
      } else if (routeName === 'Setting') {
        iconName = `cog`;}
    return <Icon type="FontAwesome5" name={iconName} size={25} style={{color: tintColor,}} />;
    },
  }),
  tabBarOptions: {
    activeTintColor: 'black',
    inactiveTintColor: '#e5dddd',
    showLabel:false,
    keyboardHidesTabBar: true,
    style:{
    backgroundColor: '#5dadec',
  }} 
})

const Switch = createSwitchNavigator({
  BottomTab: BottomTab, 
  SignedOut: SignedOut
  },
  {
   initialRouteName: "SignedOut",
  });

// export default createAppContainer(Switch);
// export default Room

const AppContainer = createAppContainer(Switch);

const App = () => {
  return (
    <Provider store={store}>
      <AppContainer />
    </Provider>
  )
}

export default App