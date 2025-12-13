import { Pokemon } from "@/types/pokemon";
import { X, Ruler, Weight, Zap, Heart, Shield, Swords, Target, Gauge } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

interface PokemonDetailProps {
  pokemon: Pokemon | null;
  onClose: () => void;
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

const statIcons: Record<string, React.ReactNode> = {
  hp: <Heart className="w-4 h-4" />,
  attack: <Swords className="w-4 h-4" />,
  defense: <Shield className="w-4 h-4" />,
  "special-attack": <Zap className="w-4 h-4" />,
  "special-defense": <Target className="w-4 h-4" />,
  speed: <Gauge className="w-4 h-4" />,
};

const statNames: Record<string, string> = {
  hp: "HP",
  attack: "ATK",
  defense: "DEF",
  "special-attack": "SP.ATK",
  "special-defense": "SP.DEF",
  speed: "SPD",
};

export function PokemonDetail({ pokemon, onClose }: PokemonDetailProps) {
  if (!pokemon) return null;

  const mainType = pokemon.types[0]?.type.name || "normal";

  return (
    <Dialog open={!!pokemon} onOpenChange={() => onClose()}>
      <DialogContent className="bg-card border-2 border-accent p-0 max-w-md w-[95vw] max-h-[90vh] overflow-hidden">
        <DialogTitle className="sr-only">{pokemon.name} Details</DialogTitle>
        
        {/* Header */}
        <div className={`${typeColors[mainType]} p-4 relative`}>
          <button
            onClick={onClose}
            className="absolute top-3 right-3 p-1 rounded-full bg-background/20 hover:bg-background/40 transition-colors"
          >
            <X className="w-5 h-5 text-white" />
          </button>

          <div className="flex items-center justify-between mb-2">
            <h2 className="font-tech text-xl text-white capitalize font-bold">
              {pokemon.name}
            </h2>
            <span className="font-tech text-lg text-white/80">
              #{String(pokemon.id).padStart(3, "0")}
            </span>
          </div>

          <div className="flex gap-2">
            {pokemon.types.map(({ type }) => (
              <span
                key={type.name}
                className="bg-white/20 px-3 py-1 rounded-full text-xs font-tech capitalize text-white"
              >
                {type.name}
              </span>
            ))}
          </div>
        </div>

        {/* Image */}
        <div className="relative -mt-8 px-4">
          <div className="bg-pokedex-screen rounded-2xl p-4 screen-glow relative overflow-hidden">
            <div className="absolute inset-0 scanline pointer-events-none" />
            <img
              src={pokemon.sprites.other["official-artwork"].front_default || pokemon.sprites.front_default}
              alt={pokemon.name}
              className="w-48 h-48 mx-auto object-contain relative z-10"
            />
          </div>
        </div>

        {/* Info */}
        <div className="p-4 space-y-4 overflow-y-auto max-h-[40vh]">
          {/* Physical */}
          <div className="flex justify-center gap-8">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Ruler className="w-5 h-5 text-accent" />
              <span className="font-tech text-sm">{(pokemon.height / 10).toFixed(1)}m</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Weight className="w-5 h-5 text-accent" />
              <span className="font-tech text-sm">{(pokemon.weight / 10).toFixed(1)}kg</span>
            </div>
          </div>

          {/* Abilities */}
          <div>
            <h3 className="font-tech text-xs text-muted-foreground mb-2">ABILITIES</h3>
            <div className="flex flex-wrap gap-2">
              {pokemon.abilities.map(({ ability }) => (
                <span
                  key={ability.name}
                  className="bg-muted px-3 py-1 rounded-lg text-xs font-tech capitalize text-foreground"
                >
                  {ability.name.replace("-", " ")}
                </span>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div>
            <h3 className="font-tech text-xs text-muted-foreground mb-3">BASE STATS</h3>
            <div className="space-y-2">
              {pokemon.stats.map(({ base_stat, stat }) => (
                <div key={stat.name} className="flex items-center gap-2">
                  <div className="flex items-center gap-1 w-20 text-accent">
                    {statIcons[stat.name]}
                    <span className="font-tech text-xs">{statNames[stat.name]}</span>
                  </div>
                  <span className="font-tech text-xs w-8 text-foreground">{base_stat}</span>
                  <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className={`h-full ${typeColors[mainType]} transition-all duration-500`}
                      style={{ width: `${Math.min((base_stat / 255) * 100, 100)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
