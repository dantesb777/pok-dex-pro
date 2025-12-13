import { GENERATIONS, Generation } from "@/types/pokemon";

interface GenerationTabsProps {
  selectedGen: Generation;
  onSelectGen: (gen: Generation) => void;
}

export function GenerationTabs({ selectedGen, onSelectGen }: GenerationTabsProps) {
  return (
    <div className="bg-secondary p-2 md:p-3 overflow-x-auto scrollbar-hide">
      <div className="flex gap-1 md:gap-2 min-w-max">
        {GENERATIONS.map((gen) => (
          <button
            key={gen.id}
            onClick={() => onSelectGen(gen)}
            className={`px-3 py-2 md:px-4 md:py-2 rounded-lg font-tech text-xs md:text-sm transition-all ${
              selectedGen.id === gen.id
                ? "bg-accent text-accent-foreground shadow-lg"
                : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
            }`}
          >
            {gen.name}
          </button>
        ))}
      </div>
    </div>
  );
}
