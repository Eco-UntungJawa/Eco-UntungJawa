import React from 'react';
import { MapPin, Info, Leaf, Trash2, AlertTriangle, Lightbulb } from 'lucide-react';

const HomeContent: React.FC = () => {
  return (
    <div className="space-y-8 pb-8 animate-in fade-in duration-500">
      
      {/* Hero / History Section */}
      <section className="relative rounded-2xl overflow-hidden shadow-lg group">
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-10" />
        <img 
          src="https://images.unsplash.com/photo-1596423736767-f32f3922f258?q=80&w=800&auto=format&fit=crop" 
          alt="Dermaga Pulau Untung Jawa" 
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute bottom-0 left-0 p-6 z-20 text-white">
          <div className="flex items-center gap-1 text-emerald-300 text-sm font-semibold mb-2">
            <MapPin size={16} />
            <span>Kepulauan Seribu Selatan</span>
          </div>
          <h2 className="text-2xl font-bold mb-2">Selamat Datang di Pulau Untung Jawa</h2>
          <p className="text-sm text-slate-200 line-clamp-3">
            Desa Wisata bersejarah yang dulunya bernama Pulau Amiterdam. Dikenal dengan keramahan penduduknya, keindahan Hutan Mangrove, Pantai Sakura, dan legenda Jembatan Pengantin. Mari jaga keindahan ini bersama Eco Untung!
          </p>
        </div>
      </section>

      {/* Daily Eco Tip */}
      <section className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex gap-4 items-start shadow-sm">
        <div className="bg-white p-2 rounded-full shadow-sm shrink-0">
          <Lightbulb className="text-yellow-500 w-6 h-6" />
        </div>
        <div>
          <h3 className="font-bold text-slate-800 text-sm mb-1">Pengingat Hari Ini</h3>
          <p className="text-sm text-slate-600">
            Jangan tinggalkan plastik sekecil apapun di pasir pantai. Mikroplastik bisa termakan oleh ikan dan merusak ekosistem laut kita!
          </p>
        </div>
      </section>

      {/* Gallery / Spots */}
      <section>
        <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
          <MapPin className="text-emerald-600" size={20} />
          Spot Wajib Dikunjungi
        </h3>
        <div className="flex gap-4 overflow-x-auto pb-4 hide-scrollbar snap-x">
          {[
            { name: "Jembatan Pengantin", img: "https://images.unsplash.com/photo-1544985365-d4990d0eb3f6?q=80&w=400&auto=format&fit=crop" },
            { name: "Hutan Mangrove", img: "https://images.unsplash.com/photo-1563804803713-3329f604ec28?q=80&w=400&auto=format&fit=crop" },
            { name: "Pantai Sakura", img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=400&auto=format&fit=crop" }
          ].map((spot, idx) => (
            <div key={idx} className="min-w-[140px] snap-center rounded-xl overflow-hidden shadow-md relative">
              <img src={spot.img} alt={spot.name} className="w-full h-24 object-cover" />
              <div className="absolute inset-0 bg-black/40 flex items-end p-2">
                <span className="text-white text-xs font-bold">{spot.name}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Education: How to sort */}
      <section>
        <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
          <Info className="text-emerald-600" size={20} />
          Filter: Cara Membedakan Sampah
        </h3>
        
        <div className="grid grid-cols-1 gap-4">
          {/* Organic Card */}
          <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-5 flex items-start gap-4">
            <div className="bg-emerald-100 p-3 rounded-full shrink-0">
              <Leaf className="text-emerald-600 w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-emerald-800 mb-2">Sampah Organik</h4>
              <ul className="text-sm text-emerald-700 space-y-1 list-disc list-inside">
                <li>Mudah membusuk & terurai alam.</li>
                <li>Berasal dari makhluk hidup (sisa makanan, daun, kulit buah).</li>
                <li>Biasanya lembek atau basah.</li>
              </ul>
            </div>
          </div>

          {/* Inorganic Card */}
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-5 flex items-start gap-4">
            <div className="bg-blue-100 p-3 rounded-full shrink-0">
              <Trash2 className="text-blue-600 w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-blue-800 mb-2">Sampah Anorganik</h4>
              <ul className="text-sm text-blue-700 space-y-1 list-disc list-inside">
                <li>Sulit/tidak bisa terurai alam.</li>
                <li>Buatan pabrik (Plastik, kaleng, kaca, styrofoam).</li>
                <li>Biasanya keras, kering, dan awet.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <div className="bg-slate-100 p-4 rounded-xl text-center">
        <p className="text-xs text-slate-500">
          "Pilah sampahmu sekarang, tukarkan poinnya dengan oleh-oleh khas Pulau Untung Jawa!"
        </p>
      </div>

    </div>
  );
};

export default HomeContent;