import React from 'react';
import { WasteAnalysisResult, WasteCategory } from '../types';
import { Leaf, Trash2, Recycle, Info, CheckCircle, Coins } from 'lucide-react';

interface AnalysisResultProps {
  result: WasteAnalysisResult;
  onClaim: () => void;
}

const AnalysisResult: React.FC<AnalysisResultProps> = ({ result, onClaim }) => {
  const isOrganic = result.category === WasteCategory.ORGANIC;
  
  // Dynamic styling based on category
  const themeColor = isOrganic ? 'emerald' : 'blue';
  const bgColor = isOrganic ? 'bg-emerald-50' : 'bg-blue-50';
  const borderColor = isOrganic ? 'border-emerald-200' : 'border-blue-200';
  const textColor = isOrganic ? 'text-emerald-800' : 'text-blue-800';
  const iconColor = isOrganic ? 'text-emerald-600' : 'text-blue-600';

  const Icon = isOrganic ? Leaf : Trash2;

  return (
    <div className={`w-full max-w-md mx-auto mt-6 rounded-2xl overflow-hidden shadow-xl border ${borderColor} bg-white animate-in fade-in slide-in-from-bottom-4 duration-500 mb-20`}>
      {/* Header */}
      <div className={`${isOrganic ? 'bg-emerald-600' : 'bg-blue-600'} p-6 text-white text-center`}>
        <div className="flex justify-center mb-3">
          <div className="p-3 bg-white/20 rounded-full backdrop-blur-sm">
            <Icon size={40} className="text-white" />
          </div>
        </div>
        <h2 className="text-3xl font-bold mb-1">{result.category}</h2>
        <p className="text-white/90 text-lg font-medium">{result.itemName}</p>
      </div>

      <div className="p-6 space-y-6">
        {/* Reward Banner */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 flex items-center gap-3">
          <div className="bg-yellow-100 p-2 rounded-full">
            <Coins className="text-yellow-600 w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-yellow-800 font-semibold">Pilah sampah yang hebat!</p>
            <p className="text-xs text-yellow-700">Klaim +10 poin untuk ditukarkan jajan.</p>
          </div>
        </div>

        {/* Explanation */}
        <div className={`p-4 rounded-xl ${bgColor} border ${borderColor}`}>
          <div className="flex items-start gap-3">
            <Info className={`w-5 h-5 ${iconColor} mt-0.5 shrink-0`} />
            <p className={`${textColor} text-sm leading-relaxed`}>
              {result.explanation}
            </p>
          </div>
        </div>

        {/* Recycling Potential Badge */}
        <div className="flex items-center justify-between py-3 border-b border-gray-100">
          <span className="text-gray-500 font-medium text-sm">Potensi Daur Ulang</span>
          <span className={`px-3 py-1 rounded-full text-xs font-bold ${
            result.recyclingPotential === 'Tinggi' ? 'bg-green-100 text-green-700' :
            result.recyclingPotential === 'Sedang' ? 'bg-yellow-100 text-yellow-700' :
            'bg-gray-100 text-gray-700'
          }`}>
            {result.recyclingPotential}
          </span>
        </div>

        {/* Action Items */}
        <div>
          <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <Recycle size={18} className="text-gray-500" />
            Saran Pembuangan
          </h3>
          <ul className="space-y-3">
            {result.disposalAdvice.map((advice, index) => (
              <li key={index} className="flex items-start gap-3 text-sm text-gray-600 group">
                <CheckCircle size={16} className={`mt-0.5 ${iconColor} shrink-0 group-hover:scale-110 transition-transform`} />
                <span>{advice}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Claim Button */}
        <button
          onClick={onClaim}
          className={`w-full py-4 rounded-xl font-bold text-white shadow-lg shadow-${themeColor}-500/20 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 ${
            isOrganic ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          <Coins className="w-5 h-5" />
          Klaim 10 Poin & Selesai
        </button>
      </div>
    </div>
  );
};

export default AnalysisResult;