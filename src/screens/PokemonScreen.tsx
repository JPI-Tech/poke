import {
  Text,
  SafeAreaView,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useEffect} from 'react';
import {fetchPokemonData} from '../redux/pokemon/pokemon.slice';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import {useNavigation} from '@react-navigation/native';
import {NavigationConstants} from '../navigation/Navigation.constants';

const PokemonScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const data = useSelector((state: RootState) => state.pokemon.pokemonData);

  useEffect(() => {
    dispatch(fetchPokemonData());
  }, [dispatch]);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate(NavigationConstants.POKEDETAILS, {
                item,
              })
            }
            style={styles.item}>
            <Text>{item.name}</Text>
            <Image
              width={100}
              height={100}
              source={{uri: item?.sprites!.front_default!}}
            />
          </TouchableOpacity>
        )}
        keyExtractor={item => item.name}
        numColumns={4}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 'auto',
  },
  item: {
    backgroundColor: 'oldlace',
    flex: 1,
    maxWidth: '25%',
    alignItems: 'center',
    padding: 10,
    borderWidth: 1.5,
    borderColor: '#fff',
  },
  title: {
    fontSize: 32,
  },
});

export default PokemonScreen;
