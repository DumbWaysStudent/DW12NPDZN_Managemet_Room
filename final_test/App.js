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
import AddRoom from './src/screens/AddRoom'
import EditRoom from './src/screens/EditRoom'
import AddCustomer from './src/screens/AddCustomer'
import EditCustomer from './src/screens/EditCustomer'
import AddCheckin from './src/screens/AddCheckin'
import Checkout from './src/screens/Checkout'

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
    },
    AddRoom: {
      screen: AddRoom,
      title: 'Add Room',
    },
    EditRoom: {
      screen: EditRoom,
      title: 'Edit Room',
    }
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
    },
    AddCheckin: {
      screen:AddCheckin,
      title: 'Add Check In',
    },
    Checkout: {
      screen:Checkout,
      title: 'Check Out',
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
    },
    AddCustomer: {
      screen:AddCustomer,
      title: 'Add Customer',
    },
    EditCustomer: {
      screen:EditCustomer,
      title: 'Edit Customer',
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
    inactiveTintColor: '#E1F7D5',
    showLabel:false,
    keyboardHidesTabBar: true,
    style:{
    backgroundColor: '#22bb33',
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