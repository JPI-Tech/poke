/* eslint-disable @typescript-eslint/no-shadow */
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

const pokePath = 'https://pokeapi.co/api/v2/';
const pokeQuery = 'pokemon?limit=100&offset=0';
const pokemonList = `${pokePath}${pokeQuery}`;
const costURL = `https://pokeapi.co/api/v2/item/`;

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
export const fetchCost = createAsyncThunk<any>(
  'pokemon/fetchCost',
  async id => {
    const costUrl = `${costURL}${id}`;
    const response = await fetch(costUrl);
    const data = await response.json();
    console.log(`data ${data.cost}`);

    return data;
  },
);

export interface Pokemon {
  name: string;
  url: string;
  id: Number;
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
}

const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState: {
    pokemonData: [] as Pokemon[],
    cost: {cost: Number},
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
      })
      .addCase(fetchCost.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchCost.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.cost = action.payload;
      })
      .addCase(fetchCost.rejected, state => {
        state.status = 'failed';
      });
  },
});

export default pokemonSlice.reducer;
