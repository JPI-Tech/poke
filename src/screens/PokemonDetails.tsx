/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  useWindowDimensions,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import {fetchCost} from '../redux/pokemon/pokemon.slice';
import {NavigationConstants} from '../navigation/Navigation.constants';
import {CartItem, addItem, removeItem} from '../redux/cart/cart.slice';

const PokemonDetails: React.FC = () => {
  const route = useRoute();
  const {width} = useWindowDimensions();
  const {item} = route.params;
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const cost = useSelector((state: RootState) => state.pokemon.cost);

  useEffect(() => {
    dispatch(fetchCost(item.id));
    console.log(`cost ${item.id}`);
  }, [dispatch, item.id]);

  const increment = (item: CartItem) => {
    dispatch(addItem(item));
  };
  const decrement = (item: number) => {
    dispatch(removeItem(item));
  };

  const ButtonContainer = () => {
    return (
      <View style={{height: 40, width: width, marginLeft: 10}}>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            onPress={() => decrement(item)}
            style={styles.quantityButton}>
            <Text>-</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => increment(item)}
            style={styles.quantityButton}>
            <Text>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Image
          width={width}
          height={220}
          source={{uri: item?.sprites!.front_default!}}
          resizeMode="contain"
        />
        <View style={styles.detailsContainer}>
          <ButtonContainer />
          <Text style={styles.text}>Pokemon name: {item.name}</Text>
          <Text style={styles.text}>Pokemon ID{item.id}</Text>
          <Text style={styles.text}>Pokemon Weight: {item.weight} LBS</Text>
          <Text style={[styles.text, {fontWeight: 'bold'}]}>
            Pokemon Cost: ${Number(cost.cost)}
          </Text>
        </View>
        <View>
          <TouchableOpacity
            onPress={() => navigation.navigate(NavigationConstants.CART)}
            style={styles.checkout}>
            <Text style={styles.checkoutText}>Checkout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'oldlace',
    alignItems: 'center',
  },
  quantityButton: {
    height: 35,
    width: 35,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightgray',
  },
  detailsContainer: {
    flex: 1,
  },
  quantitybar: {
    flexDirection: 'row',
  },
  checkout: {
    height: 50,
    marginHorizontal: 10,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  checkoutText: {
    color: 'white',
    fontSize: 16,
  },
  text: {fontSize: 20, marginLeft: 10},
});

export default PokemonDetails;
