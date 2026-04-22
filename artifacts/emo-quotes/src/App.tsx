import { useState, useEffect } from "react";
import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, RefreshCw, Twitter, Github, HeartCrack, Skull } from "lucide-react";
import { toast } from "sonner";
import { getRandomLyric, generateTrendQuote, TREND_PROMPTS, type Quote } from "@/lib/quotes";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";

const queryClient = new QueryClient();

function DisquietApp() {
  const [quote, setQuote] = useState<Quote | null>(null);
  const [count, setCount] = useState(0);
  const [mode, setMode] = useState<"lyrics" | "trends">("lyrics");
  const [trendInput, setTrendInput] = useState("");

  const handleGenerate = (customTrend?: string) => {
    if (mode === "lyrics") {
      setQuote(getRandomLyric());
    } else {
      const activeTrend = customTrend || trendInput || TREND_PROMPTS[Math.floor(Math.random() * TREND_PROMPTS.length)];
      setQuote(generateTrendQuote(activeTrend));
    }
    setCount((prev) => prev + 1);
  };

  const handleCopy = async () => {
    if (!quote) return;
    const payload = `${quote.text} — ${quote.source}`;
    let ok = false;
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(payload);
        ok = true;
      }
    } catch {
      ok = false;
    }
    if (!ok) {
      try {
        const ta = document.createElement("textarea");
        ta.value = payload;
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        ta.style.left = "-9999px";
        document.body.appendChild(ta);
        ta.focus();
        ta.select();
        ok = document.execCommand("copy");
        document.body.removeChild(ta);
      } catch {
        ok = false;
      }
    }
    if (ok) {
      toast.success("Copied to your tragic clipboard.", {
        icon: <HeartCrack className="w-4 h-4 text-purple-500" />,
      });
    } else {
      toast.error("Couldn't copy. Even the clipboard left.");
    }
  };

  const handleShare = () => {
    if (quote) {
      const text = encodeURIComponent(`"${quote.text}" — ${quote.source}`);
      window.open(`https://twitter.com/intent/tweet?text=${text}`, "_blank");
    }
  };

  return (
    <div className="min-h-[100dvh] w-full bg-background text-foreground flex flex-col relative overflow-hidden font-sans">
      <div className="texture-noise" />
      <div className="absolute inset-0 bg-radial-glow pointer-events-none" />
      
      {/* Header */}
      <header className="w-full p-6 flex justify-between items-center z-10 relative">
        <div className="flex items-center gap-2">
          <Skull className="w-6 h-6 text-primary" />
          <h1 className="text-xl font-bold tracking-tighter text-white font-serif italic">Disquiet</h1>
        </div>
        {count > 0 && (
          <span className="text-sm text-muted-foreground font-medium bg-card/50 backdrop-blur-md border border-white/5 px-3 py-1.5 rounded-full">
            {count} confessions
          </span>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-2xl mx-auto px-6 py-12 flex flex-col items-center justify-center z-10 relative">
        
        <Tabs 
          value={mode} 
          onValueChange={(v) => { setMode(v as "lyrics" | "trends"); setQuote(null); }} 
          className="w-full mb-12"
        >
          <TabsList className="grid w-full grid-cols-2 bg-card border border-white/10 rounded-full h-12 p-1">
            <TabsTrigger value="lyrics" className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300">
              Classic Lyrics
            </TabsTrigger>
            <TabsTrigger value="trends" className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300">
              Modern Despair
            </TabsTrigger>
          </TabsList>

          <TabsContent value="trends" className="mt-6 flex flex-col items-center animate-in fade-in slide-in-from-bottom-2 duration-500">
            <div className="w-full max-w-sm flex gap-2">
              <Input 
                placeholder="Enter a trend (e.g. doomscrolling)" 
                value={trendInput}
                onChange={(e) => setTrendInput(e.target.value)}
                className="bg-card/50 border-white/10 focus-visible:ring-primary rounded-full px-4"
                onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
              />
            </div>
            <div className="flex flex-wrap gap-2 justify-center mt-4">
              {TREND_PROMPTS.slice(0, 5).map(trend => (
                <button
                  key={trend}
                  onClick={() => { setTrendInput(trend); handleGenerate(trend); }}
                  className="text-xs px-3 py-1.5 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 hover:border-primary/50 text-muted-foreground hover:text-white transition-all"
                >
                  {trend}
                </button>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Spotlight Card */}
        <div className="w-full min-h-[300px] flex items-center justify-center relative my-8">
          <AnimatePresence mode="wait">
            {quote ? (
              <motion.div
                key={quote.text}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="w-full"
              >
                <div className="relative p-8 md:p-12 text-center flex flex-col gap-6">
                  {/* Subtle quote marks */}
                  <span className="absolute top-0 left-4 text-6xl text-primary/20 font-serif leading-none select-none">"</span>
                  
                  <p className="text-2xl md:text-4xl font-serif text-white leading-relaxed tracking-wide text-balance">
                    {quote.text}
                  </p>
                  
                  <div className="flex flex-col items-center gap-4 mt-4">
                    <span className="text-sm font-medium text-primary/80 tracking-widest uppercase text-balance">
                      {quote.source}
                    </span>
                    
                    <div className="flex items-center gap-3 mt-4">
                      <button onClick={handleCopy} className="p-2 rounded-full hover:bg-white/5 text-muted-foreground hover:text-white transition-colors group relative" aria-label="Copy quote">
                        <Copy className="w-4 h-4" />
                        <span className="sr-only">Copy</span>
                      </button>
                      <button onClick={handleShare} className="p-2 rounded-full hover:bg-white/5 text-muted-foreground hover:text-twitter hover:text-[#1DA1F2] transition-colors group relative" aria-label="Share on Twitter">
                        <Twitter className="w-4 h-4" />
                        <span className="sr-only">Share</span>
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center p-8 text-muted-foreground/60 font-serif italic text-xl"
              >
                The silence is deafening. Break it.
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Generate Button */}
        <motion.button
          onClick={() => handleGenerate()}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="group relative px-8 py-4 bg-primary text-primary-foreground rounded-full font-semibold text-lg overflow-hidden shadow-lg shadow-primary/20 mt-8"
        >
          <span className="relative z-10 flex items-center gap-2">
            <RefreshCw className={`w-5 h-5 ${quote ? 'group-hover:rotate-180 transition-transform duration-500' : ''}`} />
            {quote ? "Bleed Again" : "Spill Your Guts"}
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </motion.button>
        
      </main>

      {/* Footer */}
      <footer className="w-full p-6 flex justify-center items-center gap-6 z-10 relative border-t border-white/5 mt-auto">
        <a 
          href="https://twitter.com/topShotta" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-muted-foreground hover:text-white transition-colors flex items-center gap-2 text-sm"
        >
          <Twitter className="w-4 h-4" />
          @topShotta
        </a>
        <span className="text-white/10">•</span>
        <a 
          href="https://github.com/topShottaCrypto" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-muted-foreground hover:text-white transition-colors flex items-center gap-2 text-sm"
        >
          <Github className="w-4 h-4" />
          topShottaCrypto
        </a>
      </footer>
    </div>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={DisquietApp} />
      <Route>
        <div className="min-h-screen w-full flex items-center justify-center bg-background text-foreground flex-col gap-4 font-serif">
          <h1 className="text-4xl text-primary">404</h1>
          <p className="text-xl">Nothing gold can stay.</p>
        </div>
      </Route>
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster theme="dark" position="bottom-center" />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;