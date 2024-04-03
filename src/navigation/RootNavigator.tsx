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

const BottomNav = createBottomTabNavigator();
const PokeScreens = createNativeStackNavigator();

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
      <PokeScreens.Screen
        name={NavigationConstants.CHECKOUTSCREEN}
        component={CheckoutScreen}
      />
    </PokeScreens.Navigator>
  );
};
const BottomTabNavigator = () => {
  return (
    <BottomNav.Navigator screenOptions={{headerShown: false}}>
      <BottomNav.Screen name="Home" component={PokeScreensNavigator} />
      <BottomNav.Screen name="Cart" component={Cart} />
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
