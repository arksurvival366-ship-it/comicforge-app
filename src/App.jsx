import React, { useState } from 'react';
import { Sparkles, Image as ImageIcon, Copy, RefreshCw, Layers, Cpu, CheckCircle } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('generator');
  const [apiKey, setApiKey] = useState('');
  const [stylePreset, setStylePreset] = useState('ricardo-federici');
  const [customPrompt, setCustomPrompt] = useState('A lone detective walking through a gothic rain-soaked alleyway, neon reflections in puddles');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState(null);
  
  const [generatedPanels, setGeneratedPanels] = useState([
    { id: 1, prompt: '', imageUrl: null },
    { id: 2, prompt: '', imageUrl: null },
    { id: 3, prompt: '', imageUrl: null },
    { id: 4, prompt: '', imageUrl: null }
  ]);

  const stylePresets = {
    'ricardo-federici': {
      name: 'Ricardo Federici Chiaroscuro',
      suffix: 'masterpiece, high contrast dark fantasy ink lines, heavy chiaroscuro lighting, gritty textures, dramatic shadows, highly detailed graphite and ink style, cinematic composition, moody atmosphere.'
    },
    'alex-ross-realism': {
      name: 'Alex Ross Cinematic Realism',
      suffix: 'hyper-realistic graphic novel style, painted oil texture, profound psychological depth, dramatic moody lighting, rich dark tones, photorealistic facial expressions, cinematic framing.'
    },
    'dark-seinen-manga': {
      name: 'Dark Seinen Manga Ink',
      suffix: 'dark seinen manga style, dense cross-hatching, ink splatter, high contrast monochrome with deep blacks, gritty cyberpunk or gothic horror atmosphere, intricate architectural details.'
    },
    'modern-noir-comics': {
      name: 'Modern Noir Comics',
      suffix: 'neo-noir graphic novel, stark contrast, sharp harsh lighting, deep shadows, moody cyan and crimson color grading, moody rainy night ambiance, highly detailed linework.'
    }
  };

  const handleGeneratePrompt = () => {
    const selectedStyle = stylePresets[stylePreset].suffix;
    const fullPrompt = `${customPrompt}, ${selectedStyle}`;
    
    const updated = generatedPanels.map((panel, idx) => ({
      ...panel,
      prompt: `Panel ${idx + 1}: ${fullPrompt} --ar 4:5`
    }));
    setGeneratedPanels(updated);
  };

  const simulateGeneration = async () => {
    if (!apiKey) {
      alert("Veuillez entrer votre clé API Gemini pour générer les images.");
      return;
    }
    setIsGenerating(true);
    
    setTimeout(() => {
      setGeneratedPanels(prev => prev.map(p => ({
        ...p,
        imageUrl: `https://picsum.photos/800/1200?random=${p.id + Math.floor(Math.random() * 1000)}`
      })));
      setIsGenerating(false);
    }, 2000);
  };

  const copyToClipboard = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="flex flex-col min-h-screen bg-zinc-950 text-zinc-100 font-sans pb-24">
      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-zinc-900/95 backdrop-blur-md border-b border-zinc-800 px-4 py-3 flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-2.5">
          <div className="bg-gradient-to-tr from-purple-600 to-indigo-600 p-2 rounded-xl text-white shadow-md shadow-purple-900/30">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-bold text-sm tracking-wider uppercase">COMICFORGE <span className="text-purple-400">AI</span></h1>
            <p className="text-[10px] text-zinc-400">Dark Comics & Webtoon Studio</p>
          </div>
        </div>
        
        <div>
          <input 
            type="password" 
            placeholder="Clé API Gemini..." 
            value={apiKey} 
            onChange={(e) => setApiKey(e.target.value)}
            className="bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-1.5 text-xs w-32 md:w-48 text-zinc-200 focus:outline-none focus:border-purple-500 shadow-inner"
          />
        </div>
      </header>

      {/* CONTENU PRINCIPAL */}
      <main className="flex-1 max-w-xl w-full mx-auto p-4 space-y-6">
        
        {activeTab === 'generator' && (
          <div className="space-y-6">
            {/* CARTE DE CONTRÔLE */}
            <div className="bg-zinc-900/90 border border-zinc-800/80 rounded-2xl p-4 shadow-2xl space-y-4 backdrop-blur-sm">
              <h2 className="text-xs font-bold uppercase tracking-wider text-purple-400 flex items-center gap-2">
                <Cpu className="w-4 h-4" /> Studio de Synthèse de Prompts Dark
              </h2>

              <div className="space-y-1.5">
                <label className="text-[11px] text-zinc-400 font-medium">Style Artistique & Ambiance</label>
                <select 
                  value={stylePreset} 
                  onChange={(e) => setStylePreset(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-2.5 text-xs text-zinc-200 focus:outline-none focus:border-purple-500"
                >
                  {Object.entries(stylePresets).map(([key, val]) => (
                    <option key={key} value={key}>{val.name}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] text-zinc-400 font-medium">Description de la Scène / Action</label>
                <textarea 
                  rows="3"
                  value={customPrompt}
                  onChange={(e) => setCustomPrompt(e.target.value)}
                  placeholder="Décrivez votre scène sombre..."
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-2.5 text-xs text-zinc-200 focus:outline-none focus:border-purple-500 resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1">
                <button 
                  onClick={handleGeneratePrompt}
                  className="bg-zinc-800 hover:bg-zinc-700 font-medium py-2.5 px-3 rounded-xl text-xs transition flex items-center justify-center gap-1.5 border border-zinc-700 text-zinc-200 active:scale-95"
                >
                  <Copy className="w-3.5 h-3.5 text-purple-400" /> Générer Prompts
                </button>
                <button 
                  onClick={simulateGeneration}
                  disabled={isGenerating}
                  className="bg-purple-600 hover:bg-purple-500 font-medium py-2.5 px-3 rounded-xl text-xs transition flex items-center justify-center gap-1.5 text-white shadow-lg shadow-purple-900/40 disabled:opacity-50 active:scale-95"
                >
                  {isGenerating ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
                  {isGenerating ? 'Création...' : 'Générer Planches'}
                </button>
              </div>
            </div>

            {/* LISTE DES PANNEAUX */}
            <div className="space-y-4">
              <div className="flex items-center justify-between px-1">
                <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-300">Storyboard (4 Panneaux)</h3>
                <span className="text-[10px] bg-purple-950/80 text-purple-300 border border-purple-800/50 px-2 py-0.5 rounded-full font-mono">Format 4:5</span>
              </div>

              <div className="space-y-4">
                {generatedPanels.map((panel, idx) => (
                  <div key={panel.id} className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-lg">
                    <div className="bg-zinc-950 px-3 py-2 border-b border-zinc-800/80 flex justify-between items-center text-[11px] text-zinc-400">
                      <span className="font-semibold text-zinc-300">Panneau #{idx + 1}</span>
                      <span className="text-purple-400 font-mono">Vertical 4:5</span>
                    </div>

                    <div className="relative aspect-[4/5] bg-zinc-950 flex items-center justify-center border-b border-zinc-800">
                      {panel.imageUrl ? (
                        <img src={panel.imageUrl} alt={`Panel ${idx+1}`} className="w-full h-full object-cover" />
                      ) : (
                        <div className="text-center p-6 text-zinc-600 space-y-2">
                          <ImageIcon className="w-8 h-8 mx-auto opacity-30 text-purple-400" />
                          <p className="text-[11px]">En attente de rendu visuel...</p>
                        </div>
                      )}
                    </div>

                    <div className="p-3 bg-zinc-900 space-y-2">
                      <p className="text-[11px] text-zinc-400 italic line-clamp-2 bg-zinc-950/50 p-2 rounded-lg border border-zinc-800/50 font-mono">
                        {panel.prompt || 'Appuyez sur "Générer Prompts" pour configurer ce panneau.'}
                      </p>
                      
                      <button 
                        onClick={() => copyToClipboard(panel.prompt, idx)}
                        className="w-full bg-zinc-800 hover:bg-zinc-700 active:scale-95 py-2 px-3 rounded-xl text-[11px] font-medium text-zinc-200 flex items-center justify-center gap-1.5 transition border border-zinc-700/50"
                      >
                        {copiedIndex === idx ? (
                          <>
                            <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                            <span className="text-emerald-400">Copié !</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5 text-purple-400" />
                            <span>Copier le prompt pour ce panneau</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'webtoon' && (
          <div className="space-y-4 animate-fadeIn">
            <div className="bg-zinc-900 border border-zinc-800 p-3 rounded-xl text-center space-y-1">
              <h3 className="text-xs font-bold text-purple-400 uppercase tracking-widest">Mode Lecture Webtoon Vertical</h3>
              <p className="text-[10px] text-zinc-400">Défilement fluide optimisé pour smartphone</p>
            </div>

            <div className="bg-black border-2 border-zinc-800 rounded-3xl p-3 shadow-2xl space-y-3 max-h-[75vh] overflow-y-auto">
              {generatedPanels.map((panel, idx) => (
                <div key={panel.id} className="rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800 shadow-md">
                  {panel.imageUrl ? (
                    <img src={panel.imageUrl} alt={`Webtoon panel ${idx+1}`} className="w-full h-auto object-cover" />
                  ) : (
                    <div className="h-56 flex items-center justify-center text-zinc-600 bg-zinc-950 text-xs">
                      Panneau {idx + 1} (Non généré)
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

      </main>

      {/* NAVIGATION MOBILE INFERIEURE */}
      <nav className="fixed bottom-0 left-0 right-0 bg-zinc-900/95 backdrop-blur-md border-t border-zinc-800 py-2.5 px-8 flex justify-around items-center z-50 shadow-2xl">
        <button 
          onClick={() => setActiveTab('generator')}
          className={`flex flex-col items-center gap-1 text-[11px] transition ${activeTab === 'generator' ? 'text-purple-400 font-bold scale-105' : 'text-zinc-400 hover:text-zinc-200'}`}
        >
          <Sparkles className="w-5 h-5" />
          <span>Studio & Panneaux</span>
        </button>
        <button 
          onClick={() => setActiveTab('webtoon')}
          className={`flex flex-col items-center gap-1 text-[11px] transition ${activeTab === 'webtoon' ? 'text-purple-400 font-bold scale-105' : 'text-zinc-400 hover:text-zinc-200'}`}
        >
          <Layers className="w-5 h-5" />
          <span>Mode Webtoon</span>
        </button>
      </nav>
    </div>
  );
}
