import React, { useState } from 'react';

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

  // Styles CSS intégrés pour un look Dark Studio irréprochable
  const styles = {
    container: { backgroundColor: '#09090b', color: '#f4f4f5', minHeight: '100vh', fontFamily: 'system-ui, sans-serif', paddingBottom: '90px' },
    header: { position: 'sticky', top: 0, zIndex: 50, backgroundColor: 'rgba(24, 24, 27, 0.95)', backdropFilter: 'blur(8px)', borderBottom: '1px solid #27272a', padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
    logoBox: { display: 'flex', alignItems: 'center', gap: '10px' },
    iconBadge: { background: 'linear-gradient(135deg, #9333ea, #4f46e5)', padding: '8px', borderRadius: '10px', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' },
    title: { fontWeight: '700', fontSize: '14px', letterSpacing: '0.05em', margin: 0 },
    subtitle: { fontSize: '10px', color: '#a1a1aa', margin: 0 },
    inputKey: { backgroundColor: '#09090b', border: '1px solid #27272a', borderRadius: '8px', padding: '8px 12px', fontSize: '12px', color: '#f4f4f5', width: '130px', outline: 'none' },
    main: { maxWidth: '500px', margin: '0 auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: '20px' },
    card: { backgroundColor: '#18181b', border: '1px solid #27272a', borderRadius: '16px', padding: '16px', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.5)', display: 'flex', flexDirection: 'column', gap: '12px' },
    label: { fontSize: '11px', color: '#a1a1aa', fontWeight: '500' },
    select: { width: '100%', backgroundColor: '#09090b', border: '1px solid #27272a', borderRadius: '10px', padding: '10px', fontSize: '12px', color: '#f4f4f5', outline: 'none' },
    textarea: { width: '100%', backgroundColor: '#09090b', border: '1px solid #27272a', borderRadius: '10px', padding: '10px', fontSize: '12px', color: '#f4f4f5', outline: 'none', resize: 'none', height: '70px', boxSizing: 'border-box' },
    buttonRow: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' },
    btnSecondary: { backgroundColor: '#27272a', border: '1px solid #3f3f46', borderRadius: '10px', padding: '10px', fontSize: '12px', color: '#f4f4f5', fontWeight: '500', cursor: 'pointer', textAlign: 'center' },
    btnPrimary: { backgroundColor: '#9333ea', border: 'none', borderRadius: '10px', padding: '10px', fontSize: '12px', color: '#fff', fontWeight: '600', cursor: 'pointer', textAlign: 'center', boxShadow: '0 4px 12px rgba(147, 51, 234, 0.4)' },
    panelCard: { backgroundColor: '#18181b', border: '1px solid #27272a', borderRadius: '16px', overflow: 'hidden', display: 'flex', flexDirection: 'column' },
    panelHeader: { backgroundColor: '#09090b', padding: '8px 12px', borderBottom: '1px solid #27272a', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11px', color: '#a1a1aa' },
    panelImageArea: { aspectRatio: '4/5', backgroundColor: '#09090b', display: 'flex', alignItems: 'center', justifyContent: 'center', borderBottom: '1px solid #27272a', overflow: 'hidden' },
    panelBody: { padding: '12px', display: 'flex', flexDirection: 'column', gap: '8px' },
    promptText: { fontSize: '11px', color: '#a1a1aa', fontStyle: 'italic', backgroundColor: '#09090b', padding: '8px', borderRadius: '8px', border: '1px solid #27272a', margin: 0, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' },
    nav: { position: 'fixed', bottom: 0, left: 0, right: 0, backgroundColor: 'rgba(24, 24, 27, 0.95)', backdropFilter: 'blur(8px)', borderTop: '1px solid #27272a', padding: '10px 24px', display: 'flex', justifyContent: 'around', alignItems: 'center', zIndex: 50 },
    navBtn: (isActive) => ({ background: 'none', border: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', fontSize: '11px', color: isActive ? '#c084fc' : '#a1a1aa', fontWeight: isActive ? '700' : '400', cursor: 'pointer', flex: 1 })
  };

  return (
    <div style={styles.container}>
      {/* HEADER */}
      <header style={styles.header}>
        <div style={styles.logoBox}>
          <div style={styles.iconBadge}>✨</div>
          <div>
            <h1 style={styles.title}>COMICFORGE <span style={{color: '#c084fc'}}>AI</span></h1>
            <p style={styles.subtitle}>Dark Comics & Webtoon Studio</p>
          </div>
        </div>
        <div>
          <input 
            type="password" 
            placeholder="Clé API Gemini..." 
            value={apiKey} 
            onChange={(e) => setApiKey(e.target.value)}
            style={styles.inputKey}
          />
        </div>
      </header>

      {/* CONTENU PRINCIPAL */}
      <main style={styles.main}>
        
        {activeTab === 'generator' && (
          <div style={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
            
            {/* CARTE CONTRÔLE */}
            <div style={styles.card}>
              <h2 style={{fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase', color: '#c084fc', margin: 0}}>
                ⚡ Studio de Synthèse de Prompts Dark
              </h2>

              <div>
                <label style={styles.label}>Style Artistique & Ambiance</label>
                <select 
                  value={stylePreset} 
                  onChange={(e) => setStylePreset(e.target.value)}
                  style={styles.select}
                >
                  {Object.entries(stylePresets).map(([key, val]) => (
                    <option key={key} value={key}>{val.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label style={styles.label}>Description de la Scène / Action</label>
                <textarea 
                  value={customPrompt}
                  onChange={(e) => setCustomPrompt(e.target.value)}
                  placeholder="Décrivez votre scène sombre..."
                  style={styles.textarea}
                />
              </div>

              <div style={styles.buttonRow}>
                <button onClick={handleGeneratePrompt} style={styles.btnSecondary}>
                  📋 Générer Prompts
                </button>
                <button onClick={simulateGeneration} disabled={isGenerating} style={styles.btnPrimary}>
                  {isGenerating ? 'Création...' : '✨ Générer Planches'}
                </button>
              </div>
            </div>

            {/* LISTE DES PANNEAUX */}
            <div style={{display: 'flex', flexDirection: 'column', gap: '12px'}}>
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 4px'}}>
                <span style={{fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase', color: '#d4d4d8'}}>Storyboard (4 Panneaux)</span>
                <span style={{fontSize: '10px', backgroundColor: '#3b0764', color: '#d8b4fe', padding: '2px 8px', borderRadius: '10px', border: '1px solid #581c87'}}>Format 4:5</span>
              </div>

              <div style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
                {generatedPanels.map((panel, idx) => (
                  <div key={panel.id} style={styles.panelCard}>
                    <div style={styles.panelHeader}>
                      <span style={{fontWeight: '600', color: '#e4e4e7'}}>Panneau #{idx + 1}</span>
                      <span style={{color: '#c084fc', fontFamily: 'monospace'}}>Vertical 4:5</span>
                    </div>

                    <div style={styles.panelImageArea}>
                      {panel.imageUrl ? (
                        <img src={panel.imageUrl} alt={`Panel ${idx+1}`} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
                      ) : (
                        <div style={{textAlign: 'center', padding: '20px', color: '#52525b'}}>
                          <div style={{fontSize: '28px', marginBottom: '6px'}}>🖼️</div>
                          <p style={{fontSize: '11px', margin: 0}}>En attente de rendu visuel...</p>
                        </div>
                      )}
                    </div>

                    <div style={styles.panelBody}>
                      <p style={styles.promptText}>
                        {panel.prompt || 'Appuyez sur "Générer Prompts" pour configurer ce panneau.'}
                      </p>
                      
                      <button 
                        onClick={() => copyToClipboard(panel.prompt, idx)}
                        style={styles.btnSecondary}
                      >
                        {copiedIndex === idx ? '✅ Copié !' : '📋 Copier le prompt'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'webtoon' && (
          <div style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
            <div style={{backgroundColor: '#18181b', border: '1px solid #27272a', padding: '12px', borderRadius: '12px', textAlign: 'center'}}>
              <h3 style={{fontSize: '12px', fontWeight: 'bold', color: '#c084fc', textTransform: 'uppercase', margin: '0 0 4px 0'}}>Mode Lecture Webtoon Vertical</h3>
              <p style={{fontSize: '10px', color: '#a1a1aa', margin: 0}}>Défilement fluide optimisé pour smartphone</p>
            </div>

            <div style={{backgroundColor: '#000', border: '2px solid #27272a', borderRadius: '20px', padding: '12px', maxHeight: '75vh', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px'}}>
              {generatedPanels.map((panel, idx) => (
                <div key={panel.id} style={{borderRadius: '12px', overflow: 'hidden', backgroundColor: '#18181b', border: '1px solid #27272a'}}>
                  {panel.imageUrl ? (
                    <img src={panel.imageUrl} alt={`Webtoon panel ${idx+1}`} style={{width: '100%', height: 'auto', display: 'block'}} />
                  ) : (
                    <div style={{height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#52525b', fontSize: '12px'}}>
                      Panneau {idx + 1} (Non généré)
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

      </main>

      {/* NAVIGATION MOBILE INFÉRIEURE */}
      <nav style={styles.nav}>
        <button onClick={() => setActiveTab('generator')} style={styles.navBtn(activeTab === 'generator')}>
          <span style={{fontSize: '18px'}}>⚡</span>
          <span>Studio & Panneaux</span>
        </button>
        <button onClick={() => setActiveTab('webtoon')} style={styles.navBtn(activeTab === 'webtoon')}>
          <span style={{fontSize: '18px'}}>📜</span>
          <span>Mode Webtoon</span>
        </button>
      </nav>
    </div>
  );
}
