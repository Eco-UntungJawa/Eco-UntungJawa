import React, { useRef, useState } from 'react';
import { Camera, Upload, Image as ImageIcon } from 'lucide-react';

interface ImageUploaderProps {
  onImageSelected: (file: File) => void;
  isLoading: boolean;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageSelected, isLoading }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      onImageSelected(event.target.files[0]);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
      const file = event.dataTransfer.files[0];
      if (file.type.startsWith('image/')) {
        onImageSelected(file);
      }
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <input
        type="file"
        accept="image/*"
        capture="environment" // Opens rear camera on mobile
        className="hidden"
        ref={fileInputRef}
        onChange={handleFileChange}
      />
      
      <div className="grid grid-cols-2 gap-4">
        {/* Main Camera Button */}
        <button
          onClick={() => fileInputRef.current?.click()}
          disabled={isLoading}
          className="col-span-2 group relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 p-8 text-white shadow-lg shadow-emerald-500/25 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
        >
          <div className="absolute inset-0 bg-white/0 transition-colors group-hover:bg-white/10" />
          <div className="relative flex flex-col items-center justify-center gap-3">
            <div className="p-4 bg-white/20 rounded-full backdrop-blur-sm shadow-inner">
              <Camera size={40} className="stroke-2" />
            </div>
            <div className="text-center">
              <span className="block text-xl font-bold">Ambil Foto</span>
              <span className="text-emerald-100 text-sm">Gunakan kamera HP</span>
            </div>
          </div>
        </button>

        {/* Drag & Drop / Upload Area */}
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => fileInputRef.current?.click()}
          className={`col-span-2 cursor-pointer border-2 border-dashed rounded-2xl p-6 transition-all duration-200 flex flex-col items-center justify-center gap-3 bg-white
            ${isDragging 
              ? 'border-emerald-500 bg-emerald-50' 
              : 'border-slate-200 hover:border-emerald-300 hover:bg-slate-50'
            } ${isLoading ? 'opacity-50 pointer-events-none' : ''}`}
        >
          <div className="p-3 bg-slate-100 rounded-full text-slate-500">
            <Upload size={24} />
          </div>
          <div className="text-center">
            <p className="font-medium text-slate-700">Upload dari Galeri</p>
            <p className="text-xs text-slate-400 mt-1">JPG, PNG support</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageUploader;
