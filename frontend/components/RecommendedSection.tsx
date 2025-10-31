"use client";

import { useEffect, useState } from "react";
import FurnitureCard from "./FurnitureCard";
import { Furniture } from "@/libs/types";

export default function RecommendedSection() {
  const [recommended, setRecommended] = useState<Furniture[]>([]);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) {
      setLoading(false);
      return;
    }

    setToken(storedToken);
    fetchRecommendations(storedToken);
  }, []);

  const fetchRecommendations = async (authToken: string) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/recommendations`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      if (!res.ok) throw new Error("Failed to fetch recommendations");

      const data = await res.json();
      setRecommended(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center text-gray-500 py-8">
        Loading recommendations...
      </div>
    );
  }

  if (!token || recommended.length === 0) {
    return null;
  }

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-semibold mb-6">Recommended for You</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {recommended.map((item: Furniture) => (
          <FurnitureCard key={item.id} furniture={item} />
        ))}
      </div>
    </section>
  );
}
