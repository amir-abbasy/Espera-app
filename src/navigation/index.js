import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';

import Home from '../screens/Home';
import WishList from '../screens/WishList';
import ContestDetails from '../screens/ContestDetails';
import Cart from '../screens/Cart';
import Profile from '../screens/profile/Profile';
import Settings from '../screens/profile/Settings';
import Details from '../screens/profile/Details';
import Coupens from '../screens/Coupens';
import Splash from '../screens/Splash';
import Register from '../screens/auth/Register';
import ForgotPassword from '../screens/auth/ForgotPassword';

// Auth
import Login from '../screens/auth/Login';
import { StatusBar } from 'react-native';

const StackNavation = createNativeStackNavigator();

export default function StackNavationScreens() {
  return (
    <NavigationContainer >
        <StatusBar
        animated={true}
        backgroundColor="#444"
       />
    <StackNavation.Navigator  initialRouteName='Splash'
      screenOptions={{
        headerShown: false,
      }}>
      <StackNavation.Screen name="Splash" component={Splash} />
      <StackNavation.Screen name="Main" component={App} />
      <StackNavation.Screen name="Cart" component={Cart} />
      <StackNavation.Screen name="Profile" component={Profile} />
      <StackNavation.Screen name="Settings" component={Settings} />
      <StackNavation.Screen name="Details" component={Details} />
      <StackNavation.Screen name="WishList" component={WishList} />
      
      
      <StackNavation.Screen name="ContestDetails" component={ContestDetails} />
      <StackNavation.Screen name="Login" component={Login} />
      <StackNavation.Screen name="Register" component={Register} />
      <StackNavation.Screen name="ForgotPassword" component={ForgotPassword} />

    </StackNavation.Navigator>
    </NavigationContainer>
  );
}

const BottomTab = createBottomTabNavigator();

 function App() {
  return (
      <BottomTab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: '#444444',
          tabBarInactiveTintColor: '#444',
        }}>
        <BottomTab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({focused, color, size}) => (
              <Ionicons name={focused ? "ios-home" : "ios-home-outline"} color={color} size={size} />
            ),
          }}
        />
        <BottomTab.Screen
          name="Favourite"
          component={WishList}
          options={{
            tabBarLabel: 'Wishlist',
            tabBarIcon: ({focused, color, size}) => (
              <AntDesign name={focused ? "heart" : "hearto"} color={color} size={size} />
            ),
          }}
        />
        <BottomTab.Screen
          name="Coupen"
          component={Coupens}
          options={{
            tabBarLabel: 'Coupens',
            tabBarIcon: ({focused, color, size}) => (
              <Ionicons name={focused ? "ios-card" : "card-outline"} color={color} size={size} />
            ),
          }}
        />
        <BottomTab.Screen
          name="Cart"
          component={Cart}
          options={{
            tabBarLabel: 'My Cart',
            tabBarIcon: ({focused, color, size}) => (
              <Ionicons name={focused ? "cart" : "cart-outline"} color={color} size={size} />
            ),
          }}
        />
      </BottomTab.Navigator>
  );
}
