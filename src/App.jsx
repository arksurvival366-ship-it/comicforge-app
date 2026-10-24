import React, { useState } from 'react';
import { Sparkles, Image as ImageIcon, Layout, Download, Copy, RefreshCw, Layers, ShieldAlert, Cpu } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('generator');
  const [apiKey, setApiKey] = useState('');
  const [stylePreset, setStylePreset] = useState('ricardo-federici');
  const [customPrompt, setCustomPrompt] = useState('A lone detective walking through a gothic rain-soaked alleyway, neon reflections in puddles');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPanels, setGeneratedPanels] = useState([
    { id: 1, prompt: '', imageUrl: null, status: 'idle' },
    { id: 2, prompt: '', imageUrl: null, status: 'idle' },
    { id: 3, prompt: '', imageUrl: null, status: 'idle' }
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
      suffix: 'dark seinen manga style, dense cross-hatching, ink splatter, high contrast monochrome with deep blacks, gritty cyberpunk or gothic horror atmosphere, intricate architectural details, masterpiece.'
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
        imageUrl: `https://picsum.photos/800/1200?random=${p.id + Math.random()}`,
        status: 'success'
      })));
      setIsGenerating(false);
    }, 2000);
  };

  return (
    <div className="flex flex-col min-h-screen bg-zinc-950 text-zinc-100 pb-20">
      <header className="sticky top-0 z-50 bg-zinc-900/90 backdrop-blur-md border-b border-zinc-800 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-purple-600 p-2 rounded-lg text-white">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-bold text-base tracking-wider">COMICFORGE <span className="text-purple-400">AI</span></h1>
            <p className="text-xs text-zinc-400">Dark Comics & Webtoon Studio</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <input 
            type="password" 
            placeholder="Clé API Gemini..." 
            value={apiKey} 
            onChange={(e) => setApiKey(e.target.value)}
            className="bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-1.5 text-xs w-28 md:w-48 text-zinc-200 focus:outline-none focus:border-purple-500"
          />
        </div>
      </header>

      <main className="flex-1 max-w-4xl w-full mx-auto p-4 space-y-6">
        {activeTab === 'generator' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 shadow-xl space-y-4">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-purple-400 flex items-center gap-2">
                <Cpu className="w-4 h-4" /> Studio de Synthèse de Prompts Dark
              </h2>

              <div className="space-y-2">
                <label className="text-xs text-zinc-400 font-medium">Style Artistique & Ambiance</label>
                <select 
                  value={stylePreset} 
                  onChange={(e) => setStylePreset(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-sm text-zinc-200 focus:outline-none focus:border-purple-500"
                >
                  {Object.entries(stylePresets).map(([key, val]) => (
                    <option key={key} value={key}>{val.name}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs text-zinc-400 font-medium">Description de la Scène / Action</label>
                <textarea 
                  rows="3"
                  value={customPrompt}
                  onChange={(e) => setCustomPrompt(e.target.value)}
                  placeholder="Décrivez votre scène sombre, vos personnages, les cadrages..."
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-sm text-zinc-200 focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button 
                  onClick={handleGeneratePrompt}
                  className="flex-1 bg-zinc-800 hover:bg-zinc-700 font-medium py-3 px-4 rounded-xl text-sm transition flex items-center justify-center gap-2 border border-zinc-700"
                >
                  <Copy className="w-4 h-4" /> Générer les Prompts
                </button>
                <button 
                  onClick={simulateGeneration}
                  disabled={isGenerating}
                  className="flex-1 bg-purple-600 hover:bg-purple-500 font-medium py-3 px-4 rounded-xl text-sm transition flex items-center justify-center gap-2 text-white shadow-lg shadow-purple-900/40 disabled:opacity-50"
                >
                  {isGenerating ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                  {isGenerating ? 'Génération...' : 'Créer les Planches'}
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-zinc-300 flex items-center justify-between">
                <span>Planche de BD / Storyboard Actuel</span>
                <span className="text-xs text-purple-400">{generatedPanels.length} Panneaux</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {generatedPanels.map((panel, idx) => (
                  <div key={panel.id} className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden flex flex-col">
                    <div className="bg-zinc-950 px-4 py-2 border-b border-zinc-800 flex justify-between items-center text-xs text-zinc-400">
                      <span>Panneau #{idx + 1} (Vertical 4:5)</span>
                      <span className="text-purple-400 font-mono">ID: {panel.id}</span>
                    </div>

                    <div className="relative aspect-[4/5] bg-zinc-950 flex items-center justify-center border-b border-zinc-800">
                      {panel.imageUrl ? (
                        <img src={panel.imageUrl} alt={`Panel ${idx+1}`} className="w-full h-full object-cover" />
                      ) : (
                        <div className="text-center p-6 text-zinc-600">
                          <ImageIcon className="w-10 h-10 mx-auto mb-2 opacity-40" />
                          <p className="text-xs">En attente de génération visuelle</p>
                        </div>
                      )}
                    </div>

                    <div className="p-3 bg-zinc-900 flex flex-col gap-2">
                      <p className="text-xs text-zinc-400 italic line-clamp-2">
                        {panel.prompt || 'Aucun prompt généré pour le moment.'}
                      </p>
                      <button 
                        onClick={() => navigator.clipboard.writeText(panel.prompt)}
                        className="w-full bg-zinc-800 hover:bg-zinc-700 py-1.5 px-3 rounded-lg text-xs font-medium text-zinc-300 flex items-center justify-center gap-1"
                      >
                        <Copy className="w-3 h-3" /> Copier Prompt
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'webtoon' && (
          <div className="space-y-4 animate-fadeIn max-w-md mx-auto">
            <div className="bg-zinc-900 border border-zinc-800 p-3 rounded-xl text-center">
              <h3 className="text-xs font-semibold text-purple-400 uppercase tracking-widest">Mode Lecture Verticale Webtoon</h3>
              <p className="text-xs text-zinc-400">Optimisé pour smartphone</p>
            </div>

            <div className="bg-black border-2 border-zinc-800 rounded-3xl p-3 shadow-2xl space-y-4 max-h-[70vh] overflow-y-auto">
              {generatedPanels.map((panel, idx) => (
                <div key={panel.id} className="rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800">
                  {panel.imageUrl ? (
                    <img src={panel.imageUrl} alt={`Webtoon panel ${idx+1}`} className="w-full h-auto object-cover" />
                  ) : (
                    <div className="h-64 flex items-center justify-center text-zinc-600 bg-zinc-950">
                      <p className="text-xs">Panneau {idx + 1} vide</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-zinc-900/95 backdrop-blur-md border-t border-zinc-800 py-2 px-6 flex justify-around items-center z-50">
        <button 
          onClick={() => setActiveTab('generator')}
          className={`flex flex-col items-center gap-1 text-xs transition ${activeTab === 'generator' ? 'text-purple-400 font-semibold' : 'text-zinc-400 hover:text-zinc-200'}`}
        >
          <Sparkles className="w-5 h-5" />
          <span>Générateur</span>
        </button>
        <button 
          onClick={() => setActiveTab('webtoon')}
          className={`flex flex-col items-center gap-1 text-xs transition ${activeTab === 'webtoon' ? 'text-purple-400 font-semibold' : 'text-zinc-400 hover:text-zinc-200'}`}
        >
          <Layers className="w-5 h-5" />
          <span>Webtoon</span>
        </button>
      </nav>
    </div>
  );
}
