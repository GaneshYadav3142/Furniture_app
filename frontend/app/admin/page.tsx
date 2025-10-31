"use client";

import { useEffect, useState } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import FurnitureForm from "../../components/FurnitureForm";
import FurnitureTable from "../../components/FurnitureTable";
import { getAllFurniture } from "../../libs/api";

export default function AdminPage() {
  const [furnitureList, setFurnitureList] = useState([]);

  const fetchFurniture = async () => {
    const data = await getAllFurniture();
    setFurnitureList(data);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchFurniture();
  }, []);

  return (
    <ProtectedRoute>
      <main className="min-h-screen bg-gray-50 p-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">
          Admin Dashboard
        </h1>
        <FurnitureForm onSuccess={fetchFurniture} />
        <FurnitureTable
          furnitureList={furnitureList}
          onRefresh={fetchFurniture}
        />
      </main>
    </ProtectedRoute>
  );
}
