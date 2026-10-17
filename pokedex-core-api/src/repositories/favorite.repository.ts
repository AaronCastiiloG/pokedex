import { FavoriteModel } from '../models/favorite.model.js';
import type { Favorite } from '../interfaces/favorite.interface.js';

/**
 * @description Handles database operations for Pokémon favorites.
 */
export class FavoriteRepository {
  /**
   * @description Retrieves all favorites belonging to a user.
   *
   * @param {string} userId - Unique identifier of the user.
   * @returns {Promise<Favorite[]>} The user's favorite Pokémon records.
   */
  public async findByUserId(userId: string): Promise<Favorite[]> {
    return FavoriteModel.find({ userId }).sort({ createdAt: -1 }).exec();
  }

  /**
   * @description Adds a Pokémon to a user's favorites.
   *
   * @param {string} userId - Unique identifier of the user.
   * @param {number} pokemonId - Identifier of the Pokémon to save.
   * @returns {Promise<Favorite>} The created favorite record.
   */
  public async create(userId: string, pokemonId: number): Promise<Favorite> {
    return FavoriteModel.create({ userId, pokemonId });
  }

  /**
   * @description Removes a Pokémon from a user's favorites.
   *
   * @param {string} userId - Unique identifier of the user.
   * @param {number} pokemonId - Identifier of the Pokémon to remove.
   * @returns {Promise<boolean>} Whether a favorite record was deleted.
   */
  public async delete(userId: string, pokemonId: number): Promise<boolean> {
    const result = await FavoriteModel.deleteOne({ userId, pokemonId }).exec();

    return result.deletedCount > 0;
  }

  /**
   * @description Checks whether a Pokémon is already a user's favorite.
   *
   * @param {string} userId - Unique identifier of the user.
   * @param {number} pokemonId - Identifier of the Pokémon.
   * @returns {Promise<boolean>} Whether the favorite already exists.
   */
  public async exists(userId: string, pokemonId: number): Promise<boolean> {
    const favorite = await FavoriteModel.exists({ userId, pokemonId });

    return favorite !== null;
  }
}
