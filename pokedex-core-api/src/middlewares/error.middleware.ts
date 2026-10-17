import axios from 'axios';

import { AppError } from '../errors/app-error.js';
import type { ErrorRequestHandler } from 'express';

/**
 * @description Handles application errors and returns a consistent response.
 */
export class ErrorMiddleware {
  /**
   * @description Processes errors and returns an appropriate HTTP response.
   *
   * @returns {ErrorRequestHandler} The Express error handler.
   */
  public static handle(): ErrorRequestHandler {
    return (error, _req, res, _next): void => {
      console.error(error);

      if (error instanceof AppError) {
        res.status(error.statusCode).json({
          message: error.message,
        });

        return;
      }

      if (axios.isAxiosError(error)) {
        if (error.response?.status === 404) {
          res.status(404).json({
            message: 'Pokémon not found.',
          });

          return;
        }

        res.status(502).json({
          message: 'The Pokémon service is currently unavailable.',
        });

        return;
      }

      res.status(500).json({
        message: 'An unexpected error occurred.',
      });
    };
  }
}
