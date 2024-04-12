import React from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';

import PokemonScreen from '../screens/PokemonScreen';

import Cart from '../screens/Cart';
import PokemonDetails from '../screens/PokemonDetails';
import CheckoutScreen from '../screens/PokemonDetails';
import {NavigationConstants} from './Navigation.constants';
import Bookmark from '../screens/Bookmark';
import Confirmation from '../screens/Confirmation';
import {Image} from 'react-native';

const BottomNav = createBottomTabNavigator();
const PokeScreens = createNativeStackNavigator();
const CartScreens = createNativeStackNavigator();

const PokeScreensNavigator = () => {
  return (
    <PokeScreens.Navigator initialRouteName="PokemonScreen">
      <PokeScreens.Screen
        name={NavigationConstants.POKESCREEN}
        component={PokemonScreen}
        options={{title: 'Pokemon To GO!'}}
      />
      <PokeScreens.Screen
        name={NavigationConstants.BOOKMARK}
        component={Bookmark}
        options={{title: 'Bookmark'}}
      />
      <PokeScreens.Screen
        name={NavigationConstants.POKEDETAILS}
        component={PokemonDetails}
        options={{title: 'Details'}}
      />
    </PokeScreens.Navigator>
  );
};
const CartScreensNavigator = () => {
  return (
    <CartScreens.Navigator initialRouteName={NavigationConstants.CART}>
      <CartScreens.Screen name={NavigationConstants.CART} component={Cart} />
      <CartScreens.Screen
        name={NavigationConstants.CHECKOUTSCREEN}
        component={CheckoutScreen}
      />
      <CartScreens.Screen
        name={NavigationConstants.CONFIRMATION}
        component={Confirmation}
      />
    </CartScreens.Navigator>
  );
};

const BottomTabNavigator = () => {
  return (
    <BottomNav.Navigator screenOptions={{headerShown: false}}>
      <BottomNav.Screen
        name="Home"
        options={{
          tabBarLabel: 'Home Screen',
          tabBarIcon: ({color, size}) => (
            <Image
              style={{width: 24, height: 24}}
              source={require('../assets/icons/homeicon/home.png')}
            />
          ),
        }}
        component={PokeScreensNavigator}
      />
      <BottomNav.Screen
        name="Cart"
        component={CartScreensNavigator}
        options={{
          tabBarLabel: 'Cart',
          tabBarIcon: () => (
            <Image
              style={{width: 24, height: 24}}
              source={require('../assets/icons/cartIcons/cart.png')}
            />
          ),
        }}
      />
    </BottomNav.Navigator>
  );
};

const RootNavigator = () => {
  return (
    <NavigationContainer>
      <BottomTabNavigator />
    </NavigationContainer>
  );
};
export default RootNavigator;
