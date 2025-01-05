// src/components/PlantInfo.tsx
interface PlantData {
  name: string;
  species: string;
  habitat: string;
  uses: string[];
}

interface PlantInfoProps {
  data: PlantData;
}

export default function PlantInfo({ data }: PlantInfoProps) {
  return (
    <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-semibold text-green-800 mb-4">
        {data.name}
      </h2>
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-medium text-green-700">Species</h3>
          <p className="text-gray-600">{data.species}</p>
        </div>
        <div>
          <h3 className="text-lg font-medium text-green-700">Habitat</h3>
          <p className="text-gray-600">{data.habitat}</p>
        </div>
        <div>
          <h3 className="text-lg font-medium text-green-700">Uses</h3>
          <ul className="list-disc list-inside text-gray-600">
            {data.uses.map((use, index) => (
              <li key={index}>{use}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
