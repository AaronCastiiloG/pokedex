import { PokeApiClient } from '../clients/pokeminapi.client.js';
import type { PokeApiPokemon } from '../interfaces/pokemin-api.interface.js';
import type {
  PokemonDetail,
  PokemonListResponse,
  PokemonSummary,
} from '../interfaces/pokemon.interface.js';

/**
 * @description Handles Pokémon data retrieval and transformation.
 */
export class PokemonService {
  private readonly client = new PokeApiClient();

  /**
   * @description Retrieves a paginated list of Pokémon and transforms the results.
   *
   * @param {number} limit - Maximum number of Pokémon to retrieve.
   * @param {number} offset - Number of Pokémon to skip.
   * @returns {Promise<PokemonListResponse>} The transformed Pokémon list and pagination metadata.
   */
  async getPokemonList(
    limit: number,
    offset: number,
  ): Promise<PokemonListResponse> {
    const response = await this.client.getPokemonList(limit, offset);

    return {
      count: response.count,
      next: response.next
        ? `/api/pokemon?limit=${limit}&offset=${offset + limit}`
        : null,
      previous: response.previous
        ? `/api/pokemon?limit=${limit}&offset=${Math.max(0, offset - limit)}`
        : null,
      results: response.results.map((pokemon) => {
        const id = Number(pokemon.url.split('/').filter(Boolean).pop());

        return this.mapPokemonSummary(id, pokemon.name);
      }),
    };
  }

  /**
   * @description Retrieves a Pokémon by its numeric identifier.
   *
   * @param {number} id - Unique Pokémon identifier.
   * @returns {Promise<PokemonDetail>} The transformed Pokémon details.
   */
  async getPokemonById(id: number): Promise<PokemonDetail> {
    const pokemon = await this.client.getPokemonById(id);

    return this.mapPokemonDetail(pokemon);
  }

  /**
   * @description Searches for a Pokémon by its name.
   *
   * @param {string} name - Pokémon name to search for.
   * @returns {Promise<PokemonDetail>} The transformed Pokémon details.
   */
  async searchPokemonByName(name: string): Promise<PokemonDetail> {
    const pokemon = await this.client.getPokemonByName(name);

    return this.mapPokemonDetail(pokemon);
  }

  /**
   * @description Transforms basic Pokémon data into the application summary format.
   *
   * @param {number} id - Unique Pokémon identifier.
   * @param {string} name - Pokémon name.
   * @returns {PokemonSummary} The normalized Pokémon summary.
   */
  private mapPokemonSummary(
    id: number,
    name: string,
  ): PokemonSummary {
    return {
      id,
      name,
      image: this.getPokemonImage(id, null),
      url: `/api/pokemon/${id}`,
    };
  }

  /**
   * @description Transforms a PokeAPI response into the application detail format.
   *
   * @param {PokeApiPokemon} pokemon - Pokémon data received from the PokeAPI.
   * @returns {PokemonDetail} The normalized Pokémon details.
   */
  private mapPokemonDetail(pokemon: PokeApiPokemon): PokemonDetail {
    return {
      ...this.mapPokemonSummary(pokemon.id, pokemon.name),
      image: this.getPokemonImage(
        pokemon.id,
        pokemon.sprites.front_default,
      ),
      height: pokemon.height,
      weight: pokemon.weight,
      types: pokemon.types.map(({ type }) => type.name),
      abilities: pokemon.abilities.map(({ ability }) => ability.name),
      stats: pokemon.stats.map(({ base_stat, stat }) => ({
        name: stat.name,
        value: base_stat,
      })),
    };
  }

  /**
   * @description Returns the Pokémon image URL or a fallback image when unavailable.
   *
   * @param {number} id - Unique Pokémon identifier.
   * @param {string | null} image - Image URL provided by the PokeAPI.
   * @returns {string} The Pokémon image URL.
   */
  private getPokemonImage(
    id: number,
    image: string | null,
  ): string {
    return (
      image ??
      `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
    );
  }
}
