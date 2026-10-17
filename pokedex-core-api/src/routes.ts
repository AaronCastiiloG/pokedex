import { Router } from 'express';

import { FavoriteController } from './controllers/favorite.controller.js';
import { PokemonController } from './controllers/pokemon.controller.js';

/**
 * @description Configures the application API routes.
 */
export class ApiRoutes {
  private readonly router: Router;
  private readonly pokemonController: PokemonController;
  private readonly favoriteController: FavoriteController;

  constructor() {
    this.router = Router();
    this.pokemonController = new PokemonController();
    this.favoriteController = new FavoriteController();

    this.initializeRoutes();
  }

  /**
   * @description Registers all application endpoints.
   *
   * @returns {void} Nothing.
   */
  private initializeRoutes(): void {
    this.router.get('/pokemon',
      this.pokemonController.getPokemonList.bind(this.pokemonController)
    );

    this.router.get('/pokemon/search',
      this.pokemonController.searchPokemonByName.bind(this.pokemonController)
    );

    this.router.get('/pokemon/:id',
      this.pokemonController.getPokemonById.bind(this.pokemonController)
    );

    this.router.get('/favorites',
      this.favoriteController.getFavorites.bind(this.favoriteController)
    );

    this.router.post('/favorites/:pokemonId',
      this.favoriteController.addFavorite.bind(this.favoriteController)
    );

    this.router.delete('/favorites/:pokemonId',
      this.favoriteController.removeFavorite.bind(this.favoriteController)
    );
  }

  /**
   * @description Returns the configured application router.
   *
   * @returns {Router} The application router.
   */
  public getRouter(): Router {
    return this.router;
  }
}
