import { model, Schema } from 'mongoose';

import { Favorite } from '../interfaces/favorite.interface.js';

const favoriteSchema = new Schema<Favorite>(
  {
    userId: {
      type: String,
      required: true,
    },
    pokemonId: {
      type: Number,
      required: true,
      min: 1,
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
    versionKey: false,
  },
);

favoriteSchema.index(
  { userId: 1, pokemonId: 1 },
  { unique: true },
);

export const FavoriteModel = model<Favorite>(
  'Favorite',
  favoriteSchema,
);
