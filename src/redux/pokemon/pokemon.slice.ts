/* eslint-disable @typescript-eslint/no-shadow */
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

const pokePath = 'https://pokeapi.co/api/v2/';
const pokeQuery = 'pokemon?limit=30&offset=0';
const pokemonList = `${pokePath}${pokeQuery}`;

export const fetchPokemonData = createAsyncThunk<any>(
  'pokemon/fetchPokemonData',
  async () => {
    const response = await fetch(pokemonList);
    const data = await response.json();

    // Extracting the URLs of individual Pokémon
    const pokemonUrls = data.results.map((pokemon: {url: string}) => [
      pokemon.url,
    ]);

    // Fetching additional data for each pokemon
    const pokemonDataPromises = pokemonUrls.map((url: string) =>
      fetch(url).then(response => response.json()),
    );
    const pokemonData = await Promise.all(pokemonDataPromises);

    return pokemonData;
  },
);

export interface Pokemon {
  name: string;
  url: string;
  id: number;
  sprites: {
    back_default: string | null;
    back_female: string | null;
    back_shiny: string | null;
    back_shiny_female: string | null;
    front_default: string | null;
    front_female: string | null;
    front_shiny: string | null;
    front_shiny_female: string | null;
  };
  weight: number;
  quantity?: number;
  cost?: number;
}

const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState: {
    pokemonData: [] as Pokemon[],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchPokemonData.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchPokemonData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.pokemonData = action.payload;
      })
      .addCase(fetchPokemonData.rejected, state => {
        state.status = 'failed';
      });
  },
});

export default pokemonSlice.reducer;
