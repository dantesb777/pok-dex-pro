import { Pokemon } from "@/types/pokemon";
import { PokemonCard } from "./PokemonCard";
import { Loader2 } from "lucide-react";

interface PokemonGridProps {
  pokemon: Pokemon[];
  loading: boolean;
  error: string | null;
  onSelectPokemon: (pokemon: Pokemon) => void;
}

export function PokemonGrid({ pokemon, loading, error, onSelectPokemon }: PokemonGridProps) {
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Loader2 className="w-12 h-12 text-accent animate-spin mb-4" />
        <p className="font-tech text-sm text-muted-foreground">Loading Pokémon...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <p className="font-tech text-sm text-destructive">{error}</p>
      </div>
    );
  }

  if (pokemon.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <p className="font-tech text-sm text-muted-foreground">No Pokémon found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-4 p-4">
      {pokemon.map((p) => (
        <PokemonCard key={p.id} pokemon={p} onClick={() => onSelectPokemon(p)} />
      ))}
    </div>
  );
}
