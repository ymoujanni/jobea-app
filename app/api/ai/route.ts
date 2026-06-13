import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

export async function POST(req: Request) {
  try {
    const { action, payload } = await req.json();
    
    // Récupération de la clé configurée sur Vercel
    const apiKey = process.env.AI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ success: false, error: "Clé API manquante" }, { status: 500 });
    }

    // Initialisation de Gemini
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Construction du prompt selon l'action
    let prompt = "";
    if (action === "analyze_cv") {
      prompt = `Tu es un expert RH technique. Analyse ce texte de CV et extrais de manière très claire et structurée les informations suivantes :
      1. Profil général
      2. Compétences clés (notamment en robotique intelligente, systèmes embarqués, ROS 2, SLAM, etc.)
      3. Atouts majeurs pour décrocher un poste d'ingénieur.
      
      Voici le texte : \n\n${payload.cvText}`;
    }

    // Appel à Google Gemini
    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    return NextResponse.json({ success: true, result: responseText });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: "Erreur lors de la génération avec l'IA" }, { status: 500 });
  }
}
