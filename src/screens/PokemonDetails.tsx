import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  useWindowDimensions,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useEffect} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useDispatch} from 'react-redux';

import {addToCart} from '../redux/cart/cart.slice';

const PokemonDetails: React.FC = () => {
  const route = useRoute();
  const {width} = useWindowDimensions();
  const {item} = route.params;
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(item);
  }, [item]);

  const handleAddToCart = () => {
    dispatch(addToCart(item));
    Alert.alert('Added to Cart');
    navigation.goBack();
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
          <Text style={styles.text}>Pokemon name: {item.name}</Text>
          <Text style={styles.text}>Pokemon ID : {item.id}</Text>
          <Text style={styles.text}>Pokemon Weight: {item.weight} LBS</Text>
        </View>
        <View style={styles.cart}>
          <TouchableOpacity onPress={handleAddToCart} style={styles.checkout}>
            <Text style={styles.checkoutText}>Add to Cart </Text>
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
  cart: {marginBottom: 20, marginHorizontal: 20},
});

export default PokemonDetails;
