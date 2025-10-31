import { getAllFurniture } from "../libs/api";
import FurnitureCard from "../components/FurnitureCard";
import { Furniture } from "@/libs/types";
import RecommendedSection from "@/components/RecommendedSection";

export default async function HomePage() {
  const furnitureList = await getAllFurniture();

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-12 px-4">
        <RecommendedSection />
        <h1 className="text-3xl font-bold mb-8">Shop Furniture</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {furnitureList.map((item: Furniture) => (
            <FurnitureCard key={item.id} furniture={item} />
          ))}
        </div>
      </div>
    </main>
  );
}
