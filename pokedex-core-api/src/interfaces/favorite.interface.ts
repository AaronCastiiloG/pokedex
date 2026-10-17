/**
 * @description Defines the structure of a Pokémon favorite document.
 */
export interface Favorite {
  createdAt: Date;
  pokemonId: number;
  userId: string;
}
