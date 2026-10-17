import type { NextFunction, Request, Response } from 'express';
import { PokemonService } from '../services/pokemon.service.js';

/**
 * @description Handles HTTP requests related to Pokémon.
 */
export class PokemonController {
  private readonly pokemonService = new PokemonService();

  /**
   * @description Retrieves a paginated list of Pokémon.
   *
   * @param {Request} req - Express request containing pagination parameters.
   * @param {Response} res - Express response used to return the Pokémon list.
   * @param {NextFunction} next - Middleware function for error handling.
   * @returns {Promise<void>} A promise that resolves when the response is sent or an error is forwarded.
   */
  public async getPokemonList(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const limit = Number(req.query.limit ?? 20);
      const offset = Number(req.query.offset ?? 0);

      if (
        !Number.isInteger(limit) ||
        limit < 1 ||
        limit > 100 ||
        !Number.isInteger(offset) ||
        offset < 0
      ) {
        res.status(400).json({
          message: 'Invalid pagination parameters.',
        });

        return;
      }

      const pokemon = await this.pokemonService.getPokemonList(
        limit,
        offset,
      );

      res.status(200).json(pokemon);
    } catch (error) {
      next(error);
    }
  }

  /**
   * @description Retrieves a Pokémon by its numeric identifier.
   *
   * @param {Request} req - Express request containing the Pokémon identifier.
   * @param {Response} res - Express response used to return the Pokémon details.
   * @param {NextFunction} next - Middleware function for error handling.
   * @returns {Promise<void>} A promise that resolves when the response is sent or an error is forwarded.
   */
  public async getPokemonById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = Number(req.params.id);

      if (!Number.isInteger(id) || id < 1) {
        res.status(400).json({
          message: 'Invalid Pokémon identifier.',
        });
        return;
      }

      const pokemon = await this.pokemonService.getPokemonById(id);

      res.status(200).json(pokemon);
    } catch (error) {
      next(error);
    }
  }

  /**
   * @description Searches for a Pokémon by its name.
   *
   * @param {Request} req - Express request containing the Pokémon name.
   * @param {Response} res - Express response used to return the Pokémon details.
   * @param {NextFunction} next - Middleware function for error handling.
   * @returns {Promise<void>} A promise that resolves when the response is sent or an error is forwarded.
   */
  public async searchPokemonByName(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const name = req.query.name;

      if (typeof name !== 'string' || !name.trim()) {
        res.status(400).json({
          message: 'A Pokémon name is required.',
        });
        return;
      }

      const pokemon = await this.pokemonService.searchPokemonByName(name);

      res.status(200).json(pokemon);
    } catch (error) {
      next(error);
    }
  }
}
