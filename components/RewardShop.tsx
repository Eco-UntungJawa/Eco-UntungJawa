import React from 'react';
import { RewardItem } from '../types';
import { Coins, ShoppingBag, Store } from 'lucide-react';

interface RewardShopProps {
  points: number;
  onRedeem: (item: RewardItem) => void;
}

const rewards: RewardItem[] = [
  {
    id: 1,
    name: 'Es Teh Manis Jumbo',
    shopName: 'Warung Bu Siti',
    cost: 50,
    image: '🥤',
    available: true,
  },
  {
    id: 2,
    name: 'Keripik Singkong Level 3',
    shopName: 'Snack UMKM Jaya',
    cost: 100,
    image: '🥔',
    available: true,
  },
  {
    id: 3,
    name: 'Cilok Bumbu Kacang',
    shopName: 'Gerobak Mang Asep',
    cost: 80,
    image: '🍡',
    available: true,
  },
  {
    id: 4,
    name: 'Voucher Diskon 50%',
    shopName: 'Kantin Sehat',
    cost: 150,
    image: '🏷️',
    available: true,
  },
  {
    id: 5,
    name: 'Totebag Daur Ulang',
    shopName: 'Eco Craft',
    cost: 250,
    image: '👜',
    available: true,
  }
];

const RewardShop: React.FC<RewardShopProps> = ({ points, onRedeem }) => {
  return (
    <div className="w-full max-w-md mx-auto animate-in fade-in duration-500 mb-20">
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 mb-6">
        <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            <Store className="text-emerald-600" />
            Jajanan UMKM Mitra
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          Tukarkan poin hasil pilah sampahmu dengan produk lokal terbaik.
        </p>
      </div>

      <div className="space-y-4">
        {rewards.map((item) => (
          <div key={item.id} className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex items-center gap-4 transition-transform active:scale-[0.99]">
            <div className="w-16 h-16 bg-slate-50 rounded-lg flex items-center justify-center text-3xl shrink-0">
              {item.image}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-slate-800 truncate">{item.name}</h3>
              <p className="text-xs text-slate-500">{item.shopName}</p>
              <div className="flex items-center gap-1 mt-2 text-yellow-600 font-semibold text-sm">
                <Coins size={14} />
                <span>{item.cost} Poin</span>
              </div>
            </div>
            <button
              onClick={() => onRedeem(item)}
              disabled={points < item.cost}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                points >= item.cost
                  ? 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-md shadow-emerald-200'
                  : 'bg-slate-100 text-slate-400 cursor-not-allowed'
              }`}
            >
              Tukar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RewardShop;