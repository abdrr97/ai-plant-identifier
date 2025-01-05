// src/components/ImageUpload.tsx
import { Upload } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface ImageUploadProps {
  onUpload: (file: File) => void;
  disabled?: boolean;
}

export default function ImageUpload({ onUpload, disabled }: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      onUpload(file);
    }
  };

  return (
    <div className="w-full">
      <div className="max-w-xl mx-auto">
        <label className="flex flex-col items-center px-4 py-6 bg-white rounded-lg shadow-lg border-2 border-dashed border-green-300 cursor-pointer hover:bg-green-50 transition-colors">
          <Upload className="h-12 w-12 text-green-500 mb-2" />
          <span className="text-sm text-gray-600">Upload a plant image</span>
          <input
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleFileChange}
            disabled={disabled}
          />
        </label>
        {preview && (
          <div className="mt-4">
            <Image
              width={200}
              height={200}
              quality={100}
              src={preview}
              alt="Preview"
              className="max-w-full h-auto rounded-lg shadow-md"
            />
          </div>
        )}
      </div>
    </div>
  );
}
