/**
 * Represents a Pokémon entry returned by the PokeAPI list endpoint.
 */
export interface PokeApiPokemonListItem {
  name: string;
  url: string;
}

/**
 * Represents the paginated response returned by the PokeAPI.
 */
export interface PokeApiPokemonList {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokeApiPokemonListItem[];
}

/**
 * Represents the Pokémon data retrieved from the PokeAPI.
 */
export interface PokeApiPokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  sprites: {
    front_default: string | null;
  };
  types: Array<{
    type: {
      name: string;
    };
  }>;
  abilities: Array<{
    ability: {
      name: string;
    };
  }>;
  stats: Array<{
    base_stat: number;
    stat: {
      name: string;
    };
  }>;
}
