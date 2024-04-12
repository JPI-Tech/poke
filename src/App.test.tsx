import pokemonReducer, {fetchPokemonData} from './redux/pokemon/pokemon.slice';

describe('pokemonReducer', () => {
  it('should handle fetchPokemonData.fulfilled action', () => {
    const initialState = {
      pokemon: {
        pokemonData: [],
        status: 'loading',
        error: null,
      },
    };
    const pokemonData = [
      {
        name: 'Pikachu',
        url: 'https://pokeapi.co/api/v2/pokemon/25',
        id: 25,
        sprites: {},
        weight: 60,
      },
    ];
    const newState = pokemonReducer(
      initialState.pokemon,
      fetchPokemonData.fulfilled(pokemonData, ''),
    );
    expect(newState.status).toEqual('succeeded');
    expect(newState.pokemonData).toEqual(pokemonData);
  });

  it('should handle fetchPokemonData.rejected action', () => {
    const initialState = {
      pokemon: {
        pokemonData: [],
        status: 'loading',
        error: new Error() || null,
      },
    };
    const errorMessage = null;
    const newState = pokemonReducer(
      initialState.pokemon,
      fetchPokemonData.rejected(new Error(), ''),
    );
    expect(newState.status).toEqual('failed');
    expect(newState.error).toEqual(errorMessage);
  });
});
