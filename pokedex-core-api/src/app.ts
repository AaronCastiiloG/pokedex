import express from 'express';
import cors from 'cors';

import { ApiRoutes } from './routes.js';
import { ErrorMiddleware } from './middlewares/error.middleware.js';
import { NotFoundMiddleware } from './middlewares/not-found.middleware.js';
import { UserIdMiddleware } from './middlewares/user-id.middleware.js';

/**
 * @description Configures the Express application.
 */
class App {
  private readonly app = express();

  constructor() {
    this.configureMiddlewares();
    this.configureRoutes();
  }

  /**
   * @description Registers the application middlewares.
   *
   * @returns {void} Nothing.
   */
  private configureMiddlewares(): void {
    this.app.use(cors());
    this.app.use(express.json());
  }

  /**
   * @description Registers the application routes.
   *
   * @returns {void} Nothing.
   */
  private configureRoutes(): void {
    this.app.get('/api/health', (_req, res) => {
      res.status(200).json({
        status: 'ok',
        message: 'Pokédex API is running',
      });
    });

    this.app.use('/api', new ApiRoutes().getRouter());
    this.app.use(ErrorMiddleware.handle());
    this.app.use(UserIdMiddleware.handle());
    this.app.use(NotFoundMiddleware.handle());
  }

  /**
   * @description Returns the Express application instance.
   *
   * @returns {express.Express} The configured Express application.
   */
  public getApp(): express.Express {
    return this.app;
  }
}

export default new App().getApp();
