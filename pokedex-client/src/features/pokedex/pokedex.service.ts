import apiClient from '../../lib/api-client';
import type {
  FavoritePokemon,
  Pokemon,
  PokemonApiResponse,
  PokemonDetail,
} from './pokedex.interfaces';

/**
 * @description Handles Pokémon API requests.
 */
export class PokemonService {
  /**
   * @description Retrieves a paginated list of Pokémon.
   *
   * @param {number} limit - Maximum number of Pokémon to retrieve.
   * @param {number} offset - Number of Pokémon to skip.
   * @returns {Promise<PokemonApiResponse>} The paginated Pokémon response.
   */
  public async getPokemons(limit: number, offset: number): Promise<Pokemon[]> {
    const response = await apiClient.get<PokemonApiResponse>(
      '/pokemon',
      {
        params: {
          limit,
          offset,
        },
      },
    );

    return response.data.results.map((pokemon) => ({
      id: pokemon.id,
      name: pokemon.name,
      image: pokemon.image
    }));
  }

  /**
   * @description Searches for a Pokémon by name.
   *
   * @param {string} name - Name of the Pokémon to search for.
   * @returns {Promise<PokemonDetail>} The Pokémon details.
   */
  public async searchPokemon(name: string): Promise<Pokemon[]> {
    const response = await apiClient.get<PokemonDetail>(
      '/pokemon/search',
      {
        params: {
          name: name.trim().toLowerCase(),
        },
      },
    );

    return [response.data];
  }

  /**
   * @description Retrieves a Pokémon by its identifier.
   *
   * @param {number} id - Identifier of the Pokémon.
   * @returns {Promise<PokemonDetail>} The Pokémon details.
   */
  public async getPokemonById(id: number): Promise<PokemonDetail> {
    const response = await apiClient.get<PokemonDetail>(
      `/pokemon/${id}`,
    );

    return response.data;
  }

  /**
   * @description Retrieves the current user's favorite Pokémon IDs.
   *
   * @returns {Promise<number[]>} The list of favorite Pokémon IDs.
   */
  public async getFavorites(): Promise<number[]> {
    const response = await apiClient.get<FavoritePokemon[]>('/favorites');

    return response.data.map((favorite) => favorite.pokemonId);
  }

  /**
   * @description Adds a Pokémon to the current user's favorites.
   *
   * @param {number} pokemonId - Identifier of the Pokémon to add.
   * @returns {Promise<FavoritePokemon>} The created favorite.
   */
  public async addFavorite(pokemonId: number): Promise<FavoritePokemon> {
    const response = await apiClient.post<FavoritePokemon>(
      `/favorites/${pokemonId}`,
    );

    return response.data;
  }

  /**
   * @description Removes a Pokémon from the current user's favorites.
   *
   * @param {number} pokemonId - Identifier of the Pokémon to remove.
   * @returns {Promise<void>} Resolves when the favorite is removed.
   */
  public async removeFavorite(pokemonId: number): Promise<void> {
    await apiClient.delete(`/favorites/${pokemonId}`);
  }
}
