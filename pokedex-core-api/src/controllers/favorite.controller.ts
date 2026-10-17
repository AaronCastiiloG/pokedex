import type { NextFunction, Request, Response } from 'express';
import { FavoriteService } from '../services/favorite.service.js';

/**
 * @description Handles HTTP requests related to Pokémon favorites.
 */
export class FavoriteController {
  private readonly favoriteService = new FavoriteService();

  /**
   * @description Retrieves all favorites belonging to a user.
   *
   * @param {Request} req - Express request containing the user identifier.
   * @param {Response} res - Express response.
   * @param {NextFunction} next - Middleware function for error handling.
   * @returns {Promise<void>} A promise that resolves when the response is sent or an error is forwarded.
   */
  public async getFavorites(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.header('X-User-Id')!;

      const favorites = await this.favoriteService.getFavoritesByUserId(userId);

      res.status(200).json(favorites);
    } catch (error) {
      next(error);
    }
  }

  /**
   * @description Adds a Pokémon to a user's favorites.
   *
   * @param {Request} req - Express request containing the Pokémon identifier and user header.
   * @param {Response} res - Express response.
   * @param {NextFunction} next - Middleware function for error handling.
   * @returns {Promise<void>} A promise that resolves when the response is sent or an error is forwarded.
   */
  public async addFavorite(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.header('X-User-Id')!;
      const pokemonId = Number(req.params.pokemonId);

      const favorite = await this.favoriteService.addFavorite(userId, pokemonId);

      res.status(201).json(favorite);
    } catch (error) {
      next(error);
    }
  }

  /**
   * @description Removes a Pokémon from a user's favorites.
   *
   * @param {Request} req - Express request containing the Pokémon identifier and user header.
   * @param {Response} res - Express response.
   * @param {NextFunction} next - Middleware function for error handling.
   * @returns {Promise<void>} A promise that resolves when the response is sent or an error is forwarded.
   */
  public async removeFavorite(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.header('X-User-Id')!;
      const pokemonId = Number(req.params.pokemonId);

      const deleted = await this.favoriteService.removeFavorite(userId, pokemonId);

      if (!deleted) {
        res.status(404).json({
          message: 'Favorite not found.',
        });
        return;
      }

      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}
