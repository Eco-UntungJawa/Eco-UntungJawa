import React, { useState } from 'react';
import { analyzeWasteImage } from './services/geminiService';
import { ImageState, WasteAnalysisResult, RewardItem } from './types';
import ImageUploader from './components/ImageUploader';
import AnalysisResult from './components/AnalysisResult';
import RewardShop from './components/RewardShop';
import HomeContent from './components/HomeContent';
import ChatBot from './components/ChatBot';
import { Loader2, Recycle, Leaf, AlertCircle, Coins, Scan, ShoppingBag, Home } from 'lucide-react';

const App: React.FC = () => {
  const [image, setImage] = useState<ImageState>({ file: null, previewUrl: null, base64: null });
  const [result, setResult] = useState<WasteAnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  const [points, setPoints] = useState<number>(100); 
  const [activeTab, setActiveTab] = useState<'home' | 'scan' | 'shop'>('home');
  const [notification, setNotification] = useState<string | null>(null);

  const handleImageSelected = (file: File) => {
    setResult(null);
    setError(null);
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      setImage({
        file,
        previewUrl: URL.createObjectURL(file),
        base64: base64,
      });
      analyzeImage(base64);
    };
    reader.readAsDataURL(file);
  };

  const analyzeImage = async (base64: string) => {
    setIsLoading(true);
    try {
      const analysis = await analyzeWasteImage(base64);
      setResult(analysis);
    } catch (err) {
      console.error(err);
      setError("Gagal menganalisis gambar. Pastikan gambar jelas dan coba lagi.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClaimPoints = () => {
    const earnedPoints = 10;
    setPoints(prev => prev + earnedPoints);
    showNotification(`Berhasil! +${earnedPoints} Poin ditambahkan.`);
    
    // Reset scan state
    setImage({ file: null, previewUrl: null, base64: null });
    setResult(null);
    setError(null);
    
    // Optional: Switch to shop after earning points to encourage spending
    // setActiveTab('shop'); 
  };

  const handleRedeem = (item: RewardItem) => {
    if (points >= item.cost) {
      setPoints(prev => prev - item.cost);
      showNotification(`Berhasil menukar: ${item.name}`);
    } else {
      setError("Poin tidak cukup!");
    }
  };

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center relative">
      
      {/* Top Header - Fixed */}
      <div className="w-full bg-white shadow-sm z-20 sticky top-0">
        <header className="max-w-md mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-2 rounded-lg text-white shadow-md shadow-emerald-200">
              <Leaf size={20} />
            </div>
            <div>
              <h1 className="text-lg font-bold text-slate-800 leading-tight">Eco Untung</h1>
              <p className="text-[10px] text-slate-500 font-medium">Smart Tourism Pulau Untung Jawa</p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-yellow-50 px-3 py-1.5 rounded-full border border-yellow-200 shadow-sm">
            <Coins size={16} className="text-yellow-600" />
            <span className="font-bold text-slate-800 text-sm">{points}</span>
          </div>
        </header>
      </div>

      {/* Main Content Area */}
      <main className="w-full max-w-md p-4 pb-28 flex-1">
        
        {/* Notification Toast */}
        {notification && (
          <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-slate-800 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg animate-in fade-in slide-in-from-top-4">
            {notification}
          </div>
        )}

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3 text-red-700 animate-in fade-in slide-in-from-top-2">
            <AlertCircle className="shrink-0 w-5 h-5 mt-0.5" />
            <p className="text-sm">{error}</p>
          </div>
        )}

        {/* HOME TAB */}
        {activeTab === 'home' && (
          <HomeContent />
        )}

        {/* SCAN TAB */}
        {activeTab === 'scan' && (
          <>
            {!result && (
              <div className="space-y-6 animate-in fade-in duration-300">
                {/* Hero Card */}
                <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-6 text-white shadow-lg shadow-emerald-200 mb-6 relative overflow-hidden">
                   <div className="absolute right-0 top-0 opacity-10">
                      <Recycle size={120} />
                   </div>
                   <h2 className="text-2xl font-bold mb-2">
                    {isLoading ? "AI Sedang Bekerja..." : "Mulai Memilah"}
                   </h2>
                   <p className="text-emerald-50 opacity-90 max-w-[80%] text-sm leading-relaxed">
                     {isLoading 
                       ? "Sabar ya, EcoBot sedang menganalisis jenis sampahmu." 
                       : "Arahkan kamera ke sampah. EcoBot akan memberitahu jenisnya agar Pulau Untung Jawa tetap bersih!"}
                   </p>
                </div>

                {/* Image Preview during Loading */}
                {image.previewUrl && isLoading && (
                  <div className="relative w-48 h-48 mx-auto rounded-2xl overflow-hidden shadow-lg border-4 border-white">
                    <img 
                      src={image.previewUrl} 
                      alt="Analyzing" 
                      className="w-full h-full object-cover opacity-80" 
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/10 backdrop-blur-[2px]">
                       <Loader2 className="w-12 h-12 text-white animate-spin drop-shadow-md" />
                    </div>
                  </div>
                )}

                {/* Uploader */}
                {!isLoading && (
                  <ImageUploader 
                    onImageSelected={handleImageSelected} 
                    isLoading={isLoading} 
                  />
                )}
                
                {/* Steps */}
                {!image.previewUrl && (
                    <div className="grid grid-cols-3 gap-3 mt-4">
                        <div className="bg-white p-3 rounded-xl border border-slate-100 flex flex-col items-center text-center gap-1 shadow-sm">
                            <div className="bg-blue-50 p-2 rounded-full text-blue-600 mb-1"><Scan size={20}/></div>
                            <span className="text-xs font-bold text-slate-700">1. Foto</span>
                        </div>
                        <div className="bg-white p-3 rounded-xl border border-slate-100 flex flex-col items-center text-center gap-1 shadow-sm">
                             <div className="bg-emerald-50 p-2 rounded-full text-emerald-600 mb-1"><Leaf size={20}/></div>
                            <span className="text-xs font-bold text-slate-700">2. Pilah</span>
                        </div>
                        <div className="bg-white p-3 rounded-xl border border-slate-100 flex flex-col items-center text-center gap-1 shadow-sm">
                             <div className="bg-yellow-50 p-2 rounded-full text-yellow-600 mb-1"><ShoppingBag size={20}/></div>
                            <span className="text-xs font-bold text-slate-700">3. Reward</span>
                        </div>
                    </div>
                )}
              </div>
            )}

            {/* Result View */}
            {result && (
              <div className="relative animate-in slide-in-from-bottom-4 duration-500">
                 {/* Tiny preview */}
                 {image.previewUrl && (
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-20 h-20 rounded-full border-4 border-white shadow-md overflow-hidden z-10">
                    <img src={image.previewUrl} alt="Analyzed" className="w-full h-full object-cover" />
                  </div>
                )}
                <AnalysisResult result={result} onClaim={handleClaimPoints} />
              </div>
            )}
          </>
        )}

        {/* SHOP TAB */}
        {activeTab === 'shop' && (
          <RewardShop points={points} onRedeem={handleRedeem} />
        )}

      </main>

      {/* AI Chatbot Widget */}
      <ChatBot />

      {/* Bottom Navigation Bar */}
      <nav className="fixed bottom-0 left-0 w-full bg-white border-t border-slate-200 py-3 px-6 z-30 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
        <div className="max-w-md mx-auto grid grid-cols-3 gap-4">
          <button 
            onClick={() => setActiveTab('home')}
            className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'home' ? 'text-emerald-600' : 'text-slate-400 hover:text-slate-600'}`}
          >
            <Home size={24} strokeWidth={activeTab === 'home' ? 2.5 : 2} />
            <span className="text-[10px] font-medium">Beranda</span>
          </button>

          <button 
            onClick={() => setActiveTab('scan')}
            className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'scan' ? 'text-emerald-600' : 'text-slate-400 hover:text-slate-600'}`}
          >
            <Scan size={24} strokeWidth={activeTab === 'scan' ? 2.5 : 2} />
            <span className="text-[10px] font-medium">Scan</span>
          </button>
          
          <button 
            onClick={() => setActiveTab('shop')}
            className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'shop' ? 'text-emerald-600' : 'text-slate-400 hover:text-slate-600'}`}
          >
            <ShoppingBag size={24} strokeWidth={activeTab === 'shop' ? 2.5 : 2} />
            <span className="text-[10px] font-medium">Tukar Poin</span>
          </button>
        </div>
      </nav>

    </div>
  );
};

export default App;