import axios from 'axios';

import { env } from '../config/env.js';
import { PokeApiPokemon, PokeApiPokemonList, PokeApiPokemonListItem } from '../interfaces/pokemin-api.interface.js';
/**
 * Axios instance configured to communicate with the PokeAPI.
 */
const pokeApi = axios.create({
  baseURL: env.pokeApiBaseUrl,
  timeout: 10000,
  headers: {
    Accept: 'application/json',
  },
});

/**
 * Client responsible for retrieving Pokémon data from the PokeAPI.
 */
export class PokeApiClient {
  /**
   * Retrieves a paginated list of Pokémon.
   *
   * @param limit - Maximum number of Pokémon to retrieve.
   * @param offset - Number of Pokémon to skip.
   * @returns The paginated Pokémon list.
   */
  public async getPokemonList(limit: number, offset: number): Promise<PokeApiPokemonList> {
    const { data } = await pokeApi.get<PokeApiPokemonList>('pokemon', {
      params: { limit, offset },
    });

    return data;
  }

  /**
   * Retrieves a Pokémon by its numeric identifier.
   *
   * @param id - Unique Pokémon identifier.
   * @returns The requested Pokémon data.
   */
  public async getPokemonById(id: number): Promise<PokeApiPokemon> {
    const { data } = await pokeApi.get<PokeApiPokemon>(`pokemon/${id}`);

    return data;
  }

  /**
   * Retrieves a Pokémon by its name.
   *
   * @param name - Pokémon name to search for.
   * @returns The requested Pokémon data.
   */
  public async getPokemonByName(name: string): Promise<PokeApiPokemon> {
    const normalizedName = encodeURIComponent(name.trim().toLowerCase());

    const { data } = await pokeApi.get<PokeApiPokemon>(
      `pokemon/${normalizedName}`
    );

    return data;
  }
}
