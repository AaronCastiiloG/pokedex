import {
  Alert,
  Box,
  Button,
  TextField,
  Typography,
} from '@mui/material';

import { Loader } from '../../../components/Loader';
import type { Pokemon } from '../pokedex.interfaces';
import PokemonCard from '../components/PokemonCard';
import { usePokedex } from './usePokedexPage';

export default function PokedexPage() {
  const pokedex = usePokedex();

  if (pokedex.loading) {
    return <Loader/>;
  }

  if (pokedex.error) {
    return <Alert severity='error'>{pokedex.error}</Alert>;
  }

  const displayedPokemons = (pokedex.submittedSearch || pokedex.searching) ? pokedex.searchResults : pokedex.pokemons;

  return (
    <Box sx={{ width: '100%', padding: 5 }}>
      <Typography variant='h4' component='h1' gutterBottom>
        Pokédex
      </Typography>

      <Typography color='text.secondary' sx={{ mb: 3 }}>
        Explora los Pokémon disponibles.
      </Typography>

      <Box sx={{ display: 'flex', gap: 2, mb: 3, width: '100%', justifyContent: 'center' }}>
        <TextField
          sx={{ background: 'white', width: '50%' }}
          fullWidth
          label='Buscar Pokémon'
          placeholder='Ej. pikachu'
          value={pokedex.search}
          onChange={(event) => pokedex.setSearch(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              pokedex.handleSearch();
            }
          }}
        />

        <Button
          variant='contained'
          onClick={pokedex.handleSearch}
          disabled={pokedex.searching}
        >
          Buscar
        </Button>
      </Box>

      {pokedex.searching && <Loader />}

      {!pokedex.searching &&
        pokedex.submittedSearch.trim() !== '' &&
        pokedex.searchResults.length === 0 && (
          <Typography>
            No se encontró ningún Pokémon.
          </Typography>
        )}

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
          gap: 10,
          padding:5
        }}
      >
        {displayedPokemons.map((pokemon: Pokemon) => (
          <PokemonCard
            id={pokemon.id}
            favorites={pokedex.favorites}
            image={pokemon.image}
            name={pokemon.name}
            key={pokemon.id}
            onToggleFavorite={pokedex.toggleFavorite} />
        ))}
      </Box>

      {pokedex.hasMore && (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
          <Button
            variant='contained'
            onClick={pokedex.handleLoadMore}
            disabled={pokedex.loadingMore}
          >
            {pokedex.loadingMore ? (
              <>
                <Loader />
              </>
            ) : (
              'Cargar más Pokémon'
            )}
          </Button>
        </Box>
      )}
    </Box>
  );
}