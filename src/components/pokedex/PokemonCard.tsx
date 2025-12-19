import { Pokemon } from "@/types/pokemon";
import { usePokedexSounds } from "@/hooks/usePokedexSounds";

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
  const { playHover } = usePokedexSounds();
  
  return (
    <div className="perspective-1000" onMouseEnter={playHover}>
      <button
        onClick={onClick}
        className="group relative bg-card rounded-xl p-3 md:p-4 border-2 border-border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent card-3d preserve-3d"
        onMouseMove={(e) => {
          const card = e.currentTarget;
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;
          const rotateX = (y - centerY) / 10;
          const rotateY = (centerX - x) / 10;
          card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
        }}
        onMouseLeave={(e) => {
          const card = e.currentTarget;
          card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        }}
      >
        {/* Holographic shine effect */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/20 via-transparent to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        
        {/* Glow effect */}
        <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-accent/50 via-primary/50 to-accent/50 opacity-0 group-hover:opacity-50 blur-md transition-opacity duration-300 -z-10" />

        {/* Pokemon Number */}
        <span className="absolute top-2 right-2 font-tech text-xs text-muted-foreground z-10">
          #{String(pokemon.id).padStart(3, "0")}
        </span>

        {/* Pokemon Image */}
        <div className="relative w-full aspect-square mb-2">
          <div className="absolute inset-0 bg-muted/50 rounded-full scale-75 group-hover:scale-90 transition-transform" />
          {/* Shadow */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-4 bg-black/30 rounded-full blur-md group-hover:blur-lg group-hover:w-full transition-all" />
          <img
            src={pokemon.sprites.other["official-artwork"].front_default || pokemon.sprites.front_default}
            alt={pokemon.name}
            className="relative z-10 w-full h-full object-contain group-hover:animate-float transition-transform drop-shadow-2xl group-hover:drop-shadow-[0_20px_30px_rgba(0,0,0,0.5)]"
            loading="lazy"
          />
        </div>

        {/* Pokemon Name */}
        <h3 className="font-tech text-xs md:text-sm text-foreground capitalize mb-2 truncate relative z-10">
          {pokemon.name}
        </h3>

        {/* Types */}
        <div className="flex gap-1 justify-center flex-wrap relative z-10">
          {pokemon.types.map(({ type }) => (
            <span
              key={type.name}
              className={`${typeColors[type.name] || "type-normal"} px-2 py-0.5 rounded text-[10px] md:text-xs font-tech capitalize text-white shadow-lg`}
            >
              {type.name}
            </span>
          ))}
        </div>
      </button>
    </div>
  );
}
