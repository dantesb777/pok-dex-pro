import { Pokemon } from "@/types/pokemon";

interface PokemonCardProps {
  pokemon: Pokemon;
  onClick: () => void;
}

const typeColors: Record<string, string> = {
  normal: "type-normal",
  fire: "type-fire",
  water: "type-water",
  electric: "type-electric",
  grass: "type-grass",
  ice: "type-ice",
  fighting: "type-fighting",
  poison: "type-poison",
  ground: "type-ground",
  flying: "type-flying",
  psychic: "type-psychic",
  bug: "type-bug",
  rock: "type-rock",
  ghost: "type-ghost",
  dragon: "type-dragon",
  dark: "type-dark",
  steel: "type-steel",
  fairy: "type-fairy",
};

export function PokemonCard({ pokemon, onClick }: PokemonCardProps) {
  const mainType = pokemon.types[0]?.type.name || "normal";
  
  return (
    <button
      onClick={onClick}
      className="group relative bg-card rounded-xl p-3 md:p-4 border-2 border-border hover:border-accent transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-accent/20 focus:outline-none focus:ring-2 focus:ring-accent"
    >
      {/* Pokemon Number */}
      <span className="absolute top-2 right-2 font-tech text-xs text-muted-foreground">
        #{String(pokemon.id).padStart(3, "0")}
      </span>

      {/* Pokemon Image */}
      <div className="relative w-full aspect-square mb-2">
        <div className="absolute inset-0 bg-muted/50 rounded-full scale-75 group-hover:scale-90 transition-transform" />
        <img
          src={pokemon.sprites.other["official-artwork"].front_default || pokemon.sprites.front_default}
          alt={pokemon.name}
          className="relative z-10 w-full h-full object-contain group-hover:animate-float transition-transform"
          loading="lazy"
        />
      </div>

      {/* Pokemon Name */}
      <h3 className="font-tech text-xs md:text-sm text-foreground capitalize mb-2 truncate">
        {pokemon.name}
      </h3>

      {/* Types */}
      <div className="flex gap-1 justify-center flex-wrap">
        {pokemon.types.map(({ type }) => (
          <span
            key={type.name}
            className={`${typeColors[type.name] || "type-normal"} px-2 py-0.5 rounded text-[10px] md:text-xs font-tech capitalize text-white`}
          >
            {type.name}
          </span>
        ))}
      </div>
    </button>
  );
}
