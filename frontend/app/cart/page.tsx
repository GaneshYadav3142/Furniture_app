"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { CartItem } from "../../libs/types";

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const router = useRouter();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(storedCart);
  }, []);

  const totalAmount = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    router.push("/checkout");
  };

  if (cart.length === 0)
    return (
      <p className="text-center py-20 text-gray-600">Your cart is empty 🛒</p>
    );

  return (
    <main className="max-w-4xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-semibold mb-6">Your Cart</h1>

      <div className="space-y-6">
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between bg-white shadow-md rounded-xl p-4"
          >
            <div className="flex items-center gap-4">
              <div className="relative w-20 h-20">
                <Image
                  src={item.imageUrl || "https://placehold.co/100x100"}
                  alt={item.name}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-gray-500">
                  ₹{item.price.toLocaleString()} × {item.quantity}
                </p>
              </div>
            </div>
            <p className="font-semibold">
              ₹{(item.price * item.quantity).toLocaleString()}
            </p>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center mt-10 border-t pt-6">
        <p className="text-xl font-semibold">
          Total: ₹{totalAmount.toLocaleString()}
        </p>
        <button
          onClick={handleCheckout}
          className="bg-black text-white py-3 px-6 rounded-xl hover:bg-gray-800 transition-all"
        >
          Checkout
        </button>
      </div>
    </main>
  );
}
