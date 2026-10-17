import { useEffect, useState } from 'react';

import { PokemonService } from '../pokedex.service';
import type { Pokemon } from '../pokedex.interfaces';

const PAGE_SIZE = 20;

export function usePokedex() {
  const pokemonService = new PokemonService();

  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [offset, setOffset] = useState(0);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [search, setSearch] = useState('');
  const [submittedSearch, setSubmittedSearch] = useState('');
  const [searchResults, setSearchResults] = useState<Pokemon[]>([]);
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    const loadInitialData = async (): Promise<void> => {
      setLoading(true);

      try {
        const pokemons = await pokemonService.getPokemons(PAGE_SIZE, 0);

        setPokemons(pokemons);
        setOffset(PAGE_SIZE);
        setHasMore(pokemons.length === PAGE_SIZE);
      } catch {
        setError('No se pudieron cargar los Pokémon.');
      } finally {
        setLoading(false);
      }

      try {
        const favoriteIds = await pokemonService.getFavorites();

        setFavorites(favoriteIds);
      } catch (error) {
        console.error('No se pudieron cargar los favoritos:', error);
      }
    };

    void loadInitialData();
  }, []);

  /**
   * @description Handle search input to find pokemon.
   */
  async function handleSearch(): Promise<void> {
    const name = search.trim();
    setSearchResults([]);

    if (!name) {
      setSubmittedSearch('');

      return;
    }

    setSearching(true);

    try {
      const results = await pokemonService.searchPokemon(name);

      setSearchResults(results);
      setSubmittedSearch(name);
    } catch {
      setSearchResults([]);
      setSubmittedSearch(name);
    } finally {
      setSearching(false);
    }
  }

  /**
   * @description Handle the process to get next pokemons.
   */
  async function handleLoadMore() {
    try {
      setLoadingMore(true);
      setError(null);

      const data = await pokemonService.getPokemons(PAGE_SIZE, offset);

      setPokemons((currentPokemons) => [
        ...currentPokemons,
        ...data,
      ]);

      setOffset((currentOffset) => currentOffset + data.length);
      setHasMore(data.length === PAGE_SIZE);
    } catch {
      setError('No se pudieron cargar más Pokémon. Intenta nuevamente.');
    } finally {
      setLoadingMore(false);
    }
  };

  /**
   * @description Adds or removes a Pokémon from the current user's favorites.
   *
   * @param {number} pokemonId - Identifier of the Pokémon to toggle.
   */
  async function toggleFavorite(pokemonId: number): Promise<void> {
    const isFavorite = favorites.includes(pokemonId);

    try {
      if (isFavorite) {
        await pokemonService.removeFavorite(pokemonId);

        setFavorites((currentFavorites) =>
          currentFavorites.filter((id) => id !== pokemonId),
        );
      } else {
        await pokemonService.addFavorite(pokemonId);

        setFavorites((currentFavorites) => [
          ...currentFavorites,
          pokemonId,
        ]);
      }
    } catch (error) {
      console.error('No se pudo actualizar el favorito:', error);
    }
  }

  return {
    pokemons,
    loading,
    error,
    handleLoadMore,
    loadingMore,
    hasMore,
    favorites,
    toggleFavorite,
    setSearch,
    search,
    searching,
    searchResults,
    handleSearch,
    submittedSearch
  };
}