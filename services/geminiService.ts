import { GoogleGenAI, Type, Schema } from "@google/genai";
import { WasteAnalysisResult, WasteCategory } from "../types";

// Initialize the Gemini API client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const analysisSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    itemName: {
      type: Type.STRING,
      description: "Nama benda sampah yang teridentifikasi dalam bahasa Indonesia.",
    },
    category: {
      type: Type.STRING,
      enum: [WasteCategory.ORGANIC, WasteCategory.INORGANIC, WasteCategory.UNCERTAIN],
      description: "Kategori utama sampah.",
    },
    confidence: {
      type: Type.NUMBER,
      description: "Tingkat keyakinan AI antara 0.0 hingga 1.0.",
    },
    explanation: {
      type: Type.STRING,
      description: "Penjelasan singkat mengapa benda tersebut masuk ke dalam kategori tersebut.",
    },
    disposalAdvice: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "Daftar langkah-langkah cara membuang atau mengolah sampah ini dengan benar.",
    },
    recyclingPotential: {
      type: Type.STRING,
      enum: ['Tinggi', 'Sedang', 'Rendah', 'Tidak Ada'],
      description: "Potensi daur ulang sampah tersebut.",
    },
  },
  required: ["itemName", "category", "explanation", "disposalAdvice", "recyclingPotential"],
};

export const analyzeWasteImage = async (base64Image: string): Promise<WasteAnalysisResult> => {
  try {
    // Remove header if present (e.g., "data:image/jpeg;base64,")
    const cleanBase64 = base64Image.split(',')[1] || base64Image;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: "image/jpeg",
              data: cleanBase64,
            },
          },
          {
            text: "Identifikasi sampah dalam gambar ini. Tentukan apakah ini Organik atau Anorganik. Berikan saran pembuangan yang spesifik untuk konteks desa wisata di Indonesia (Pulau Untung Jawa). Jawab dalam format JSON.",
          },
        ],
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: analysisSchema,
        temperature: 0.4,
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error("No response from AI");
    }

    return JSON.parse(text) as WasteAnalysisResult;
  } catch (error) {
    console.error("Error analyzing waste:", error);
    throw error;
  }
};

export const chatWithEcoBot = async (message: string, history: {role: string, parts: {text: string}[]}[] = []) => {
  try {
    const chat = ai.chats.create({
      model: "gemini-2.5-flash",
      config: {
        systemInstruction: `Anda adalah EcoBot, asisten virtual ramah untuk aplikasi "Eco Untung" di Desa Wisata Pulau Untung Jawa, Kepulauan Seribu.
        
        Tugas Anda:
        1. Menjawab pertanyaan tentang pemilahan sampah (Organik vs Anorganik) dengan edukatif.
        2. Memberikan informasi tentang sejarah dan spot wisata di Pulau Untung Jawa (Jembatan Pengantin, Pantai Sakura, Kampung Jepang, Hutan Mangrove).
        3. Menjelaskan cara kerja aplikasi: Foto sampah -> Dapat Poin -> Tukar di UMKM lokal.
        4. Selalu ingatkan pengguna untuk menjaga kebersihan pulau/laut.
        
        Gaya bicara: Santai, ramah, membantu, dan menggunakan Bahasa Indonesia yang baik.`,
      },
      history: history
    });

    const response = await chat.sendMessage({ message });
    return response.text;
  } catch (error) {
    console.error("Chat error:", error);
    return "Maaf, EcoBot sedang istirahat sebentar (koneksi error). Silakan coba lagi nanti ya!";
  }
};