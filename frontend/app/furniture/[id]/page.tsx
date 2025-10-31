"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { Furniture } from "@/libs/types";

export default function FurnitureDetailPage() {
  const { id } = useParams();
  const [furniture, setFurniture] = useState<Furniture | null>(null);
  const [quantity, setQuantity] = useState<number>(0);
  const router = useRouter();

  useEffect(() => {
    async function fetchFurniture() {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/furniture/${id}`
      );
      const data = await res.json();
      setFurniture(data);

      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      const existing = cart.find((item: Furniture) => item.id === data.id);
      if (existing) setQuantity(existing.quantity);
    }
    fetchFurniture();
  }, [id]);

  const handleAddToCart = () => {
    if (!furniture) return;
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    cart.push({ ...furniture, quantity: 1 });
    localStorage.setItem("cart", JSON.stringify(cart));
    setQuantity(1);
  };

  // Increment
  const handleIncrement = () => {
    if (!furniture) return;
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existing = cart.find((item: Furniture) => item.id === furniture.id);
    if (existing) existing.quantity += 1;
    localStorage.setItem("cart", JSON.stringify(cart));
    setQuantity((prev) => prev + 1);
  };

  // Decrement
  const handleDecrement = () => {
    if (!furniture) return;
    let cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existing = cart.find((item: Furniture) => item.id === furniture.id);

    if (existing) {
      if (existing.quantity > 1) {
        existing.quantity -= 1;
      } else {
        // Remove from cart if quantity becomes 0
        cart = cart.filter((item: Furniture) => item.id !== furniture.id);
      }
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    setQuantity((prev) => (prev > 1 ? prev - 1 : 0));
  };

  if (!furniture) return <p>Loading...</p>;

  return (
    <main className="max-w-5xl mx-auto px-6 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="relative w-full aspect-square bg-gray-50 rounded-2xl overflow-hidden">
          <Image
            src={furniture.imageUrl || "https://placehold.co/600x600"}
            alt={furniture.name}
            fill
            className="object-cover hover:scale-105 transition-transform"
          />
        </div>

        <div className="flex flex-col justify-center">
          <h1 className="text-3xl font-semibold mb-2">{furniture.name}</h1>
          <p className="text-gray-500 text-sm mb-3">{furniture.category}</p>
          <p className="text-gray-700 mb-6">{furniture.description}</p>

          <p className="text-2xl font-bold text-amber-600 mb-4">
            ₹{furniture.price.toLocaleString()}
          </p>

          {quantity === 0 ? (
            <button
              onClick={handleAddToCart}
              className="bg-black text-white py-3 px-6 rounded-xl w-fit hover:bg-gray-800 transition-all"
            >
              Add to Cart
            </button>
          ) : (
            <div className="flex items-center gap-4">
              <button
                onClick={handleDecrement}
                className="bg-gray-200 text-black px-4 py-2 rounded-lg text-lg"
              >
                -
              </button>
              <span className="text-xl font-medium">{quantity}</span>
              <button
                onClick={handleIncrement}
                className="bg-gray-200 text-black px-4 py-2 rounded-lg text-lg"
              >
                +
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
