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

const Home = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const pokemonNames = useSelector(
    (state: RootState) => state.pokemon.pokemonNames,
  );

  useEffect(() => {
    dispatch(fetchPokemonData());
    // console.log(data);
  }, [dispatch]);

  return (
    <SafeAreaView style={{flex: 1}}>
      <Text>App</Text>
      <FlatList
        data={pokemonNames}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => navigation.navigate(NavigationConstants.POKESCREEN)}>
            <Text>{item}</Text>
            <Image
              style={{height: 50, width: 50}}
              // src={data.sprites.back_shiny}
            />
          </TouchableOpacity>
        )}
        keyExtractor={item => item}
        numColumns={4}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 'auto',
    width: 400,
  },
  item: {
    backgroundColor: '#f9c2ff',
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

export default Home;
