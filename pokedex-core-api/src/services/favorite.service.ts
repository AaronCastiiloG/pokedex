import { AppError } from '../errors/app-error.js';
import type { Favorite } from '../interfaces/favorite.interface.js';
import { FavoriteRepository } from '../repositories/favorite.repository.js';
import { PokemonService } from './pokemon.service.js';

/**
 * @description Handles the business logic for Pokémon favorites.
 */
export class FavoriteService {
  private readonly favoriteRepository = new FavoriteRepository();
  private readonly pokemonService = new PokemonService();

  /**
   * @description Retrieves all favorites belonging to a user.
   *
   * @param {string} userId - Unique identifier of the user.
   * @returns {Promise<Favorite[]>} The user's favorite Pokémon records.
   */
  public async getFavoritesByUserId(userId: string): Promise<Favorite[]> {
    return this.favoriteRepository.findByUserId(userId);
  }

  /**
   * @description Adds a Pokémon to a user's favorites.
   *
   * @param {string} userId - Unique identifier of the user.
   * @param {number} pokemonId - Identifier of the Pokémon to save.
   * @returns {Promise<Favorite>} The created favorite record.
   */
  public async addFavorite(userId: string, pokemonId: number): Promise<Favorite> {
    await this.pokemonService.getPokemonById(pokemonId);
    const exists = await this.favoriteRepository.exists(userId, pokemonId);

    if (exists) {
      throw new AppError('Pokémon is already in favorites.', 409);
    }

    return this.favoriteRepository.create(userId, pokemonId);
  }

  /**
   * @description Removes a Pokémon from a user's favorites.
   *
   * @param {string} userId - Unique identifier of the user.
   * @param {number} pokemonId - Identifier of the Pokémon to remove.
   * @returns {Promise<boolean>} Whether a favorite record was deleted.
   */
  public async removeFavorite(
    userId: string,
    pokemonId: number,
  ): Promise<boolean> {
    return this.favoriteRepository.delete(userId, pokemonId);
  }
}
