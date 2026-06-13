'use client';
import { useState } from 'react';

export default function Home() {
  const [activeTab, setActiveTab] = useState('cv');
  const [cvText, setCvText] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    setLoading(true);
    setResponse('Analyse en cours par l\'IA...');
    
    try {
      const res = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'analyze_cv', payload: { cvText } })
      });
      const data = await res.json();
      setResponse(data.result || data.error);
    } catch (error) {
      setResponse("Erreur de connexion au serveur.");
    }
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-gray-50 p-8 text-gray-800">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-blue-600">Jobea - Assistant CDI</h1>
        
        {/* Navigation des onglets */}
        <div className="flex space-x-4 mb-6 border-b pb-2">
          {['cv', 'lettre', 'entreprises', 'suivi'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`capitalize font-semibold ${activeTab === tab ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
            >
              {tab === 'cv' ? 'Analyse CV' : tab}
            </button>
          ))}
        </div>

        {/* Contenu de l'onglet actif */}
        {activeTab === 'cv' && (
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold mb-4">Analyse de profil</h2>
            <textarea 
              className="w-full h-40 p-3 border rounded-md mb-4"
              placeholder="Colle les textes de ton CV ou de tes expériences ici..."
              value={cvText}
              onChange={(e) => setCvText(e.target.value)}
            />
            <button 
              onClick={handleAnalyze}
              disabled={loading}
              className={`${loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'} text-white px-6 py-2 rounded-md transition`}
            >
              Extraire mon profil
            </button>
            
            {response && (
              <div className="mt-6 p-4 bg-gray-50 rounded-md border whitespace-pre-wrap">
                {response}
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
