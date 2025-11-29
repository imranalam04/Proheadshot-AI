import React, { useState } from 'react';
import { Download, Share2, Maximize2, X, RefreshCw } from 'lucide-react';

interface ResultViewerProps {
  originalImage: string | null;
  generatedImage: string | null;
  isGenerating: boolean;
  onReset: () => void;
}

export const ResultViewer: React.FC<ResultViewerProps> = ({ originalImage, generatedImage, isGenerating, onReset }) => {
  const [showComparison, setShowComparison] = useState(false);

  if (!generatedImage && !isGenerating) {
    return (
      <div className="h-full bg-slate-100 rounded-2xl border-2 border-dashed border-slate-300 flex flex-col items-center justify-center text-slate-400 p-8 text-center min-h-[400px]">
        <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center mb-4">
          <ImageIconPlaceholder size={32} />
        </div>
        <p className="font-medium">Your professional headshot will appear here</p>
        <p className="text-sm mt-2">Configure your style and click Generate</p>
      </div>
    );
  }

  const handleDownload = () => {
    if (generatedImage) {
      const link = document.createElement('a');
      link.href = generatedImage;
      link.download = `pro-headshot-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="h-full flex flex-col bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
        <h3 className="font-bold text-slate-900">Result</h3>
        {generatedImage && (
          <div className="flex gap-2">
            <button 
              onClick={() => setShowComparison(!showComparison)}
              className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg text-sm font-medium"
              title="Compare with original"
            >
              {showComparison ? 'Hide Original' : 'Compare'}
            </button>
            <button 
              onClick={onReset}
              className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg"
              title="New Generation"
            >
              <RefreshCw size={20} />
            </button>
          </div>
        )}
      </div>

      <div className="flex-1 bg-slate-50 relative flex items-center justify-center p-6 min-h-[400px]">
        {isGenerating ? (
          <div className="text-center">
            <div className="w-24 h-24 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin mx-auto mb-6"></div>
            <h3 className="text-lg font-bold text-slate-900">AI is working its magic...</h3>
            <p className="text-slate-500 mt-2">Analyzing facial features • Adjusting lighting • Styling outfit</p>
          </div>
        ) : generatedImage ? (
          <div className="relative w-full max-w-md aspect-square rounded-xl overflow-hidden shadow-2xl">
             <img 
              src={showComparison ? originalImage! : generatedImage} 
              alt="Result" 
              className="w-full h-full object-cover"
            />
            {showComparison && (
              <div className="absolute top-4 left-4 bg-black/70 text-white text-xs px-2 py-1 rounded">Original</div>
            )}
             {!showComparison && (
              <div className="absolute top-4 left-4 bg-primary-600/90 text-white text-xs px-2 py-1 rounded">AI Generated</div>
            )}
          </div>
        ) : null}
      </div>

      {generatedImage && !isGenerating && (
        <div className="p-6 bg-white border-t border-slate-100">
          <div className="grid grid-cols-2 gap-4">
            <button 
              onClick={handleDownload}
              className="flex items-center justify-center gap-2 bg-slate-900 text-white py-3 px-4 rounded-xl font-medium hover:bg-slate-800 transition-colors"
            >
              <Download size={18} />
              Download HD
            </button>
            <button className="flex items-center justify-center gap-2 border border-slate-200 text-slate-700 py-3 px-4 rounded-xl font-medium hover:bg-slate-50 transition-colors">
              <Share2 size={18} />
              Share
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const ImageIconPlaceholder = ({ size }: { size: number }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
    <circle cx="9" cy="9" r="2" />
    <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
  </svg>
);
