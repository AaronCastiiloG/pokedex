/**
 * Represents the props for card to show a Pokémon.
 */
export interface PokemonCardProps {
  name: string;
  image: string;
  id: number;
  favorites: number[];
  onToggleFavorite: (pokemonId: number) => void;
}

/**
 * Represents a Pokémon to show in card.
 */
export interface Pokemon {
  id: number;
  name: string;
  image: string;
}

/**
 * Represents the detailed information of a Pokémon.
 */
export interface PokemonApiResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonSummary[];
}

export interface PokemonApiResult {
  name: string;
  url: string;
}

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
 * @description Defines the structure of a Pokémon favorite.
 */
export interface FavoritePokemon {
  createdAt: string;
  pokemonId: number;
  userId: string;
}
