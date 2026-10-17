import type { RequestHandler } from 'express';

/**
 * @description Validates the user identifier provided in the request header.
 */
export class UserIdMiddleware {
  /**
   * @description Validates the X-User-Id header as a UUID.
   *
   * @returns {RequestHandler} The Express middleware.
   */
  public static handle(): RequestHandler {
    return (req, res, next): void => {
      const userId = req.header('X-User-Id');

      const uuidPattern =
        /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

      if (!userId || !uuidPattern.test(userId)) {
        res.status(400).json({
          message: 'A valid X-User-Id header is required.',
        });
        return;
      }

      next();
    };
  }
}
