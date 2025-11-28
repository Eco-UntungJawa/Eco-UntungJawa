export enum WasteCategory {
  ORGANIC = 'Organik',
  INORGANIC = 'Anorganik',
  UNCERTAIN = 'Tidak Diketahui'
}

export interface WasteAnalysisResult {
  itemName: string;
  category: WasteCategory;
  confidence: number;
  explanation: string;
  disposalAdvice: string[];
  recyclingPotential: 'Tinggi' | 'Sedang' | 'Rendah' | 'Tidak Ada';
}

export interface ImageState {
  file: File | null;
  previewUrl: string | null;
  base64: string | null;
}

export interface RewardItem {
  id: number;
  name: string;
  shopName: string;
  cost: number;
  image: string; // Emoji or URL
  available: boolean;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}