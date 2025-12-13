import { useState, useMemo } from "react";
import { Pokemon, GENERATIONS, Generation } from "@/types/pokemon";
import { usePokemonList, usePokemonSearch } from "@/hooks/usePokemon";
import { PokedexHeader } from "./PokedexHeader";
import { GenerationTabs } from "./GenerationTabs";
import { PokemonGrid } from "./PokemonGrid";
import { PokemonDetail } from "./PokemonDetail";

export function Pokedex() {
  const [selectedGen, setSelectedGen] = useState<Generation>(GENERATIONS[0]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);

  const { pokemon: genPokemon, loading: genLoading, error: genError } = usePokemonList(selectedGen);
  const { pokemon: searchedPokemon, loading: searchLoading, error: searchError } = usePokemonSearch(searchQuery);

  const displayedPokemon = useMemo(() => {
    if (searchQuery.trim() && searchedPokemon) {
      return [searchedPokemon];
    }
    if (searchQuery.trim() && !searchedPokemon && !searchLoading) {
      // Filter from current gen if no exact match
      return genPokemon.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.id.toString().includes(searchQuery)
      );
    }
    return genPokemon;
  }, [searchQuery, searchedPokemon, searchLoading, genPokemon]);

  const isLoading = searchQuery.trim() ? searchLoading : genLoading;
  const error = searchQuery.trim() ? (searchError && displayedPokemon.length === 0 ? searchError : null) : genError;

  return (
    <div className="min-h-screen bg-background p-2 md:p-4 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Pokédex Device */}
        <div className="bg-primary rounded-3xl shadow-2xl overflow-hidden pokedex-border">
          <PokedexHeader 
            searchQuery={searchQuery} 
            onSearchChange={setSearchQuery} 
          />
          
          <GenerationTabs 
            selectedGen={selectedGen} 
            onSelectGen={(gen) => {
              setSelectedGen(gen);
              setSearchQuery("");
            }} 
          />

          {/* Screen Area */}
          <div className="bg-pokedex-screen min-h-[60vh] relative">
            {/* Scanline overlay */}
            <div className="absolute inset-0 scanline pointer-events-none z-10 opacity-50" />
            
            {/* Scan animation */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
              <div className="absolute left-0 right-0 h-1 bg-gradient-to-b from-transparent via-accent/20 to-transparent animate-scan" />
            </div>

            <PokemonGrid
              pokemon={displayedPokemon}
              loading={isLoading}
              error={error}
              onSelectPokemon={setSelectedPokemon}
            />
          </div>

          {/* Bottom Controls */}
          <div className="bg-primary p-4 flex items-center justify-center gap-4">
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-muted border-4 border-secondary" />
            <div className="flex gap-2">
              <div className="w-8 h-2 bg-secondary rounded" />
              <div className="w-8 h-2 bg-secondary rounded" />
            </div>
          </div>
        </div>

        {/* Pokemon Detail Modal */}
        <PokemonDetail
          pokemon={selectedPokemon}
          onClose={() => setSelectedPokemon(null)}
        />
      </div>
    </div>
  );
}
