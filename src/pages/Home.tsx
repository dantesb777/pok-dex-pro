import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-96 h-96 bg-primary/20 rounded-full blur-3xl -top-48 -left-48 animate-pulse" />
        <div className="absolute w-96 h-96 bg-accent/20 rounded-full blur-3xl -bottom-48 -right-48 animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {/* Pokédex Device */}
      <div className="relative perspective-1000">
        <button
          onClick={() => navigate("/pokedex")}
          className="group relative transform-gpu transition-all duration-500 hover:scale-105 focus:outline-none"
        >
          {/* Main Pokédex Body */}
          <div className="relative bg-primary rounded-3xl p-6 md:p-8 pokedex-border shadow-2xl w-[320px] md:w-[400px] transform-gpu transition-transform duration-300 group-hover:rotate-y-3">
            {/* Top Section with LEDs */}
            <div className="flex items-center gap-3 mb-6">
              {/* Big Blue LED */}
              <div className="relative">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-led-blue via-blue-400 to-blue-600 border-4 border-white/30 led-glow-blue animate-pulse-glow" />
                <div className="absolute top-2 left-2 w-4 h-4 md:w-6 md:h-6 bg-white/40 rounded-full blur-sm" />
              </div>
              
              {/* Small LEDs */}
              <div className="flex gap-2">
                <div className="w-4 h-4 rounded-full bg-destructive led-glow-yellow animate-pulse" style={{ animationDelay: '0.2s' }} />
                <div className="w-4 h-4 rounded-full bg-yellow-400 led-glow-yellow animate-pulse" style={{ animationDelay: '0.4s' }} />
                <div className="w-4 h-4 rounded-full bg-led-green led-glow-green animate-pulse" style={{ animationDelay: '0.6s' }} />
              </div>
            </div>

            {/* Screen */}
            <div className="bg-pokedex-screen rounded-2xl p-6 screen-glow relative overflow-hidden">
              {/* Scanline overlay */}
              <div className="absolute inset-0 scanline pointer-events-none z-10 opacity-50" />
              
              {/* Screen content */}
              <div className="relative z-20 text-center">
                <h1 className="font-pixel text-lg md:text-xl text-accent mb-4 animate-pulse">
                  POKÉDEX
                </h1>
                <p className="font-tech text-sm text-muted-foreground mb-6">
                  Toca para entrar
                </p>
                
                {/* Pokéball Icon */}
                <div className="w-20 h-20 mx-auto relative group-hover:animate-spin-slow">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-b from-destructive to-red-700 overflow-hidden">
                    <div className="absolute top-1/2 left-0 right-0 h-1 bg-foreground/80" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-foreground border-4 border-muted" />
                  </div>
                  <div className="absolute inset-0 top-1/2 rounded-b-full bg-gradient-to-b from-foreground/90 to-foreground" />
                </div>
              </div>
            </div>

            {/* Bottom Controls */}
            <div className="mt-6 flex items-center justify-center gap-4">
              <div className="w-12 h-12 rounded-full bg-muted border-4 border-secondary" />
              <div className="flex gap-2">
                <div className="w-10 h-3 bg-secondary rounded" />
                <div className="w-10 h-3 bg-secondary rounded" />
              </div>
            </div>

            {/* D-Pad */}
            <div className="absolute bottom-6 right-6 w-16 h-16">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-5 h-6 bg-muted rounded-t" />
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-5 h-6 bg-muted rounded-b" />
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-6 h-5 bg-muted rounded-l" />
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-6 h-5 bg-muted rounded-r" />
            </div>
          </div>

          {/* Hover glow effect */}
          <div className="absolute inset-0 rounded-3xl bg-accent/0 group-hover:bg-accent/10 transition-colors duration-300 pointer-events-none" />
        </button>

        {/* Title below */}
        <h2 className="text-center font-pixel text-xs md:text-sm text-muted-foreground mt-8 animate-pulse">
          Presiona para explorar
        </h2>
      </div>
    </div>
  );
}
