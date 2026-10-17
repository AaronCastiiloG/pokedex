import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  IconButton,
  Chip,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

import type { PokemonCardProps } from '../pokedex.interfaces';

export default function PokemonCard({
  name,
  image,
  id,
  favorites,
  onToggleFavorite,
}: PokemonCardProps) {
  const isFavorite = favorites.includes(id);

  return (
    <Card sx={{ maxWidth: 300, width: '100%' }}>
      <CardMedia
        component='img'
        image={image}
        alt={name}
        sx={{
          height: 180,
          objectFit: 'contain'
        }}
      />

      <CardContent>
        <Typography variant='h6' component='h3' sx={{ textTransform: 'capitalize' }}>
          {name}
        </Typography>

        <Chip
          label={`#${String(id).padStart(3, '0')}`}
          size='small'
        />
      </CardContent>

      <CardActions>
        <IconButton
          aria-label={isFavorite ? 'Quitar favorito' : 'Agregar favorito'}
          color={isFavorite ? 'error' : 'default'}
          onClick={() => onToggleFavorite(id)}
        >
          {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </IconButton>
      </CardActions>
    </Card>
  );
}
