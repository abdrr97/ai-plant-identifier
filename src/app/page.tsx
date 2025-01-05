"use client";
import ImageUpload from "@/components/ImageUpload";
import PlantInfo from "@/components/PlantInfo";
import { identifyPlant } from "@/lib/gemini";
import { useState } from "react";

export default function Home() {
  const [plantData, setPlantData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageUpload = async (image: File) => {
    setLoading(true);
    try {
      const result = await identifyPlant(image);
      setPlantData(result);
    } catch (error) {
      console.error("Error identifying plant:", error);
    }
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-green-50 to-green-100">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center text-green-800 mb-8">
          Plant Identifier
        </h1>
        <ImageUpload onUpload={handleImageUpload} disabled={loading} />
        {loading && (
          <div className="text-center mt-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-green-500 border-t-transparent"></div>
          </div>
        )}
        {plantData && <PlantInfo data={plantData} />}
      </div>
    </main>
  );
}
