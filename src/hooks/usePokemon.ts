import { useState, useEffect } from "react";
import { Pokemon, PokemonListItem, GENERATIONS, Generation } from "@/types/pokemon";

const API_BASE = "https://pokeapi.co/api/v2";

export function usePokemonList(generation: Generation) {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPokemon = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const response = await fetch(
          `${API_BASE}/pokemon?offset=${generation.offset}&limit=${generation.limit}`
        );
        const data = await response.json();
        
        const pokemonDetails = await Promise.all(
          data.results.map(async (p: PokemonListItem) => {
            const res = await fetch(p.url);
            return res.json();
          })
        );
        
        setPokemon(pokemonDetails);
      } catch (err) {
        setError("Error loading Pokémon");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemon();
  }, [generation]);

  return { pokemon, loading, error };
}

export function usePokemonSearch(query: string) {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!query.trim()) {
      setPokemon(null);
      return;
    }

    const searchPokemon = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `${API_BASE}/pokemon/${query.toLowerCase().trim()}`
        );
        
        if (!response.ok) {
          throw new Error("Pokémon not found");
        }
        
        const data = await response.json();
        setPokemon(data);
      } catch (err) {
        setError("Pokémon not found");
        setPokemon(null);
      } finally {
        setLoading(false);
      }
    };

    const debounce = setTimeout(searchPokemon, 500);
    return () => clearTimeout(debounce);
  }, [query]);

  return { pokemon, loading, error };
}

export function usePokemonDetail(id: number | null) {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setPokemon(null);
      return;
    }

    const fetchPokemon = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`${API_BASE}/pokemon/${id}`);
        const data = await response.json();
        setPokemon(data);
      } catch (err) {
        setError("Error loading Pokémon details");
      } finally {
        setLoading(false);
      }
    };

    fetchPokemon();
  }, [id]);

  return { pokemon, loading, error };
}
