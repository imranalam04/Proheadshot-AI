
import React from 'react';
import { HeadshotStyle, OutfitType, GenerationConfig } from '../types';
import { Briefcase, Building, Camera, Sun, Sparkles, User, CheckCircle2, Palette, Wand2 } from 'lucide-react';

interface ConfigPanelProps {
  config: GenerationConfig;
  onChange: (config: GenerationConfig) => void;
  isGenerating: boolean;
  onGenerate: () => void;
  disabled: boolean;
}

export const ConfigPanel: React.FC<ConfigPanelProps> = ({ config, onChange, isGenerating, onGenerate, disabled }) => {

  const updateConfig = <K extends keyof GenerationConfig>(key: K, value: GenerationConfig[K]) => {
    onChange({ ...config, [key]: value });
  };

  const updateRetouching = (key: keyof GenerationConfig['retouching']) => {
    onChange({
      ...config,
      retouching: {
        ...config.retouching,
        [key]: !config.retouching[key]
      }
    });
  };

  const styles = [
    { id: HeadshotStyle.CORPORATE, icon: Building, label: 'Corporate' },
    { id: HeadshotStyle.STARTUP, icon: Briefcase, label: 'Startup' },
    { id: HeadshotStyle.OUTDOOR, icon: Sun, label: 'Outdoor' },
    { id: HeadshotStyle.CREATIVE, icon: Camera, label: 'Creative' },
    { id: HeadshotStyle.BW, icon: User, label: 'B&W' },
  ];

  const outfits = [
    { id: OutfitType.SUIT, label: 'Suit' },
    { id: OutfitType.BUSINESS_CASUAL, label: 'Biz Casual' },
    { id: OutfitType.CASUAL, label: 'Casual' },
    { id: OutfitType.TUXEDO, label: 'Tuxedo' },
    { id: OutfitType.DOCTOR, label: 'Medical' },
  ];

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 h-full flex flex-col overflow-y-auto max-h-[calc(100vh-120px)] sticky top-24">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <Sparkles className="text-primary-600" size={20} />
          Studio Configuration
        </h2>
        <p className="text-xs text-slate-500 mt-1">Configure your perfect professional look.</p>
      </div>

      {/* Style Selection */}
      <div className="mb-6">
        <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Environment Style</label>
        <div className="grid grid-cols-3 gap-2">
          {styles.map((style) => (
            <button
              key={style.id}
              onClick={() => updateConfig('style', style.id)}
              className={`flex flex-col items-center justify-center p-2 rounded-xl border transition-all text-xs font-medium gap-2 h-20
                ${config.style === style.id 
                  ? 'border-primary-500 bg-primary-50 text-primary-700 ring-1 ring-primary-500' 
                  : 'border-slate-200 hover:border-primary-200 hover:bg-slate-50 text-slate-600'
                }`}
            >
              <style.icon size={18} />
              {style.label}
            </button>
          ))}
        </div>
      </div>

      {/* Outfit Selection */}
      <div className="mb-6">
        <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Attire</label>
        <div className="grid grid-cols-2 gap-2">
          {outfits.map((outfit) => (
            <button
              key={outfit.id}
              onClick={() => updateConfig('outfit', outfit.id)}
              className={`flex items-center justify-between px-3 py-2.5 rounded-lg border transition-all text-sm font-medium
                ${config.outfit === outfit.id
                  ? 'border-primary-500 bg-primary-50 text-primary-700' 
                  : 'border-slate-200 hover:border-primary-200 hover:bg-slate-50 text-slate-600'
                }`}
            >
              {outfit.label}
              {config.outfit === outfit.id && <CheckCircle2 size={14} />}
            </button>
          ))}
        </div>
      </div>

      {/* Team Branding */}
      <div className="mb-6">
         <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
            <Palette size={14} />
            Team Branding
         </label>
         <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200">
            <input 
              type="color" 
              value={config.brandColor || '#ffffff'}
              onChange={(e) => updateConfig('brandColor', e.target.value)}
              className="w-8 h-8 rounded cursor-pointer border-0 bg-transparent p-0"
              title="Choose Brand Color"
            />
            <div className="flex-1">
              <p className="text-sm font-medium text-slate-900">Brand Color Accent</p>
              <p className="text-xs text-slate-500">Injects your brand color into the background.</p>
            </div>
            {config.brandColor && (
               <button 
                onClick={() => updateConfig('brandColor', '')}
                className="text-xs text-slate-400 hover:text-slate-600"
               >
                 Clear
               </button>
            )}
         </div>
      </div>

      {/* Retouching Suite */}
      <div className="mb-6">
        <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
          <Wand2 size={14} />
          Retouching Suite
        </label>
        <div className="space-y-2">
           <label className="flex items-center justify-between p-2 hover:bg-slate-50 rounded-lg cursor-pointer transition-colors">
              <span className="text-sm text-slate-700">Smooth Skin</span>
              <input 
                type="checkbox" 
                checked={config.retouching.smoothSkin}
                onChange={() => updateRetouching('smoothSkin')}
                className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
              />
           </label>
           <label className="flex items-center justify-between p-2 hover:bg-slate-50 rounded-lg cursor-pointer transition-colors">
              <span className="text-sm text-slate-700">Whiten Teeth</span>
              <input 
                type="checkbox" 
                checked={config.retouching.whitenTeeth}
                onChange={() => updateRetouching('whitenTeeth')}
                className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
              />
           </label>
           <label className="flex items-center justify-between p-2 hover:bg-slate-50 rounded-lg cursor-pointer transition-colors">
              <span className="text-sm text-slate-700">Eye Enhancer</span>
              <input 
                type="checkbox" 
                checked={config.retouching.brightenEyes}
                onChange={() => updateRetouching('brightenEyes')}
                className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
              />
           </label>
        </div>
      </div>

      {/* Quality Toggle */}
      <div className="mb-8">
        <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200">
          <div>
            <div className="font-medium text-slate-900 flex items-center gap-2">
              Pro Quality (HD)
              <span className="bg-yellow-100 text-yellow-800 text-[10px] px-1.5 py-0.5 rounded-full font-bold uppercase">Pro</span>
            </div>
            <p className="text-[10px] text-slate-500 mt-1">Slower generation, 2x better detail (2K)</p>
          </div>
          <button 
            onClick={() => updateConfig('highQuality', !config.highQuality)}
            className={`w-10 h-6 rounded-full transition-colors relative ${config.highQuality ? 'bg-primary-600' : 'bg-slate-300'}`}
          >
            <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform ${config.highQuality ? 'left-5' : 'left-1'}`} />
          </button>
        </div>
      </div>

      <div className="mt-auto pt-4 border-t border-slate-100">
        <button
          onClick={onGenerate}
          disabled={disabled || isGenerating}
          className={`w-full py-4 px-6 rounded-xl font-bold text-lg shadow-lg shadow-primary-500/20 flex items-center justify-center gap-2 transition-all
            ${disabled || isGenerating
              ? 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
              : 'bg-primary-600 hover:bg-primary-700 text-white hover:shadow-primary-600/30 hover:-translate-y-0.5'
            }`}
        >
          {isGenerating ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Generating...
            </>
          ) : (
            <>
              <Sparkles size={20} />
              Generate
            </>
          )}
        </button>
        {disabled && !isGenerating && (
          <p className="text-center text-xs text-red-500 mt-3">Please upload an image first</p>
        )}
      </div>
    </div>
  );
};
