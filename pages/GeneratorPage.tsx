
import React, { useState } from 'react';
import { UploadArea } from '../components/UploadArea';
import { ConfigPanel } from '../components/ConfigPanel';
import { ResultViewer } from '../components/ResultViewer';
import { HeadshotStyle, OutfitType, GenerationConfig } from '../types';
import { generateHeadshot } from '../services/geminiService';
import { useCredits } from '../contexts/CreditContext';

export const GeneratorPage: React.FC = () => {
  const { credits, deductCredit, openProModal } = useCredits();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  
  const [config, setConfig] = useState<GenerationConfig>({
    style: HeadshotStyle.CORPORATE,
    outfit: OutfitType.SUIT,
    highQuality: false,
    brandColor: '',
    retouching: {
      smoothSkin: true,
      whitenTeeth: false,
      brightenEyes: true
    }
  });

  const handleGenerate = async () => {
    if (!selectedImage) return;

    if (credits <= 0) {
      openProModal();
      return;
    }

    setIsGenerating(true);
    try {
      const result = await generateHeadshot(selectedImage, config);
      setGeneratedImage(result);
      deductCredit(); // Only deduct after successful generation
    } catch (error) {
      console.error("Failed to generate:", error);
      alert("Failed to generate headshot. Please try again or check your API key.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleReset = () => {
    setGeneratedImage(null);
  };

  const handleClearUpload = () => {
    setSelectedImage(null);
    setGeneratedImage(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">AI Headshot Studio</h1>
            <p className="text-slate-500 mt-2">Professional studio quality for teams and individuals.</p>
          </div>
          {credits < 3 && (
             <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-2 rounded-lg text-sm flex items-center gap-2">
               <span>Running low on credits?</span>
               <button onClick={openProModal} className="font-bold underline hover:text-yellow-900">Top up now</button>
             </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Upload & Config */}
          <div className="lg:col-span-5 space-y-6">
            <UploadArea 
              selectedImage={selectedImage}
              onImageSelected={setSelectedImage}
              onClear={handleClearUpload}
            />
            
            <ConfigPanel 
              config={config} 
              onChange={setConfig}
              isGenerating={isGenerating}
              onGenerate={handleGenerate}
              disabled={!selectedImage}
            />
          </div>

          {/* Right Column: Results */}
          <div className="lg:col-span-7 sticky top-24">
            <ResultViewer 
              originalImage={selectedImage}
              generatedImage={generatedImage}
              isGenerating={isGenerating}
              onReset={handleReset}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
