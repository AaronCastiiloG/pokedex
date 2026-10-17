import type { RequestHandler } from 'express';

/**
 * @description Handles requests to undefined routes.
 */
export class NotFoundMiddleware {
  /**
   * @description Returns a 404 response for undefined routes.
   *
   * @returns {RequestHandler} The Express middleware.
   */
  public static handle(): RequestHandler {
    return (_req, res): void => {
      res.status(404).json({
        message: 'Route not found.',
      });
    };
  }
}
