import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '@reduxjs/toolkit/query';
import {fetchPokemonData} from '../redux/pokemon/pokemon.slice';

const {items} = useSelector((state: RootState) => state.cart);
const dispatch = useDispatch();
useEffect(() => {
  dispatch(fetchPokemonData());
}, [dispatch]);

const Cart = ({item}) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.text}>Cart</Text>

      <View>
        <TouchableOpacity style={styles.item}>
          <Text>Pokemon :{}</Text>
          <Image
            width={100}
            height={100}
            source={{uri: item?.sprites!.front_default!}}
          />
          <Text>Quanity{}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 100,
  },
  text: {fontSize: 25, fontWeight: 'bold'},
  textmono: {fontSize: 14, fontWeight: 'bold'},
  item: {
    backgroundColor: 'oldlace',
    maxWidth: '100%',
    alignItems: 'center',
    padding: 10,
    borderWidth: 1.5,
    borderColor: '#fff',
  },
});
export default Cart;
