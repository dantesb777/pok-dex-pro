import { Search } from "lucide-react";

interface PokedexHeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function PokedexHeader({ searchQuery, onSearchChange }: PokedexHeaderProps) {
  return (
    <header className="bg-primary pokedex-border rounded-t-3xl p-4 md:p-6">
      {/* LED Indicators */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-pokedex-led-blue led-glow-blue border-4 border-muted animate-pulse-glow" />
        <div className="flex gap-2">
          <div className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-red-500 led-glow-yellow" />
          <div className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-pokedex-led-yellow led-glow-yellow" />
          <div className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-pokedex-led-green led-glow-green" />
        </div>
      </div>

      {/* Title */}
      <h1 className="font-pixel text-xs md:text-sm text-primary-foreground mb-4 tracking-wider">
        POKÉDEX
      </h1>

      {/* Search Bar */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-accent" />
        </div>
        <input
          type="text"
          placeholder="Search by name or number..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-12 pr-4 py-3 bg-pokedex-screen text-accent font-tech text-sm rounded-lg border-2 border-secondary focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30 screen-glow placeholder:text-muted-foreground transition-all"
        />
      </div>
    </header>
  );
}
