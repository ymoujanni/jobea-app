'use client';
import { useState } from 'react';

export default function Home() {
  const [activeTab, setActiveTab] = useState('cv');
  
  // Fonction pour afficher le contenu selon l'onglet
  const renderContent = () => {
    switch (activeTab) {
      case 'cv':
        return <div className="p-6 bg-white rounded-lg shadow">Contenu Analyse CV ici...</div>;
      case 'lettre':
        return <div className="p-6 bg-white rounded-lg shadow">Contenu Générateur de Lettre ici...</div>;
      case 'entreprises':
        return <div className="p-6 bg-white rounded-lg shadow">Contenu Recherche Entreprises ici...</div>;
      case 'suivi':
        return <div className="p-6 bg-white rounded-lg shadow">Contenu Suivi de candidatures ici...</div>;
      default:
        return null;
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 p-8 text-gray-800">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-blue-600">JOBPUSH</h1>
        
        {/* Navigation */}
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

        {/* Affichage dynamique */}
        {renderContent()}
      </div>
    </main>
  );
}
