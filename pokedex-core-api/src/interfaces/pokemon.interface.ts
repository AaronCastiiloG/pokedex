/**
 * Represents a Pokémon in the list response.
 */
export interface PokemonSummary {
  id: number;
  name: string;
  image: string;
  url: string;
}

/**
 * Represents the detailed information of a Pokémon.
 */
export interface PokemonDetail extends PokemonSummary {
  height: number;
  weight: number;
  types: string[];
  abilities: string[];
  stats: PokemonStat[];
}

/**
 * Represents a Pokémon base statistic.
 */
export interface PokemonStat {
  name: string;
  value: number;
}

/**
 * Represents a paginated list of Pokémon.
 */
export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonSummary[];
}
