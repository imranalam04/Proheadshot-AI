import React, { useCallback, useState } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';

interface UploadAreaProps {
  onImageSelected: (base64: string) => void;
  selectedImage: string | null;
  onClear: () => void;
}

export const UploadArea: React.FC<UploadAreaProps> = ({ onImageSelected, selectedImage, onClear }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const processFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file.');
      return;
    }
    
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        onImageSelected(e.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  if (selectedImage) {
    return (
      <div className="relative group w-full h-64 md:h-96 rounded-2xl overflow-hidden border-2 border-slate-200 bg-slate-50">
        <img 
          src={selectedImage} 
          alt="Uploaded preview" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <button 
            onClick={onClear}
            className="bg-white/90 hover:bg-white text-red-600 px-4 py-2 rounded-full font-medium shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all flex items-center gap-2"
          >
            <X size={18} /> Remove
          </button>
        </div>
      </div>
    );
  }

  return (
    <div 
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`relative w-full h-64 md:h-96 rounded-2xl border-2 border-dashed transition-all duration-300 flex flex-col items-center justify-center gap-4 text-center p-6
        ${isDragging 
          ? 'border-primary-500 bg-primary-50 scale-[1.02]' 
          : 'border-slate-300 hover:border-primary-400 hover:bg-slate-50 bg-white'
        }`}
    >
      <div className={`p-4 rounded-full ${isDragging ? 'bg-primary-100 text-primary-600' : 'bg-slate-100 text-slate-500'}`}>
        <Upload size={32} />
      </div>
      <div>
        <h3 className="text-lg font-semibold text-slate-900">Upload your selfie</h3>
        <p className="text-sm text-slate-500 mt-1 max-w-xs mx-auto">
          Drag and drop or click to browse. For best results, use good lighting and face forward.
        </p>
      </div>
      
      <input 
        type="file" 
        accept="image/*" 
        onChange={handleFileInput}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
      />
    </div>
  );
};
