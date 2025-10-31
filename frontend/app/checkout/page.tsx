"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CartItem } from "../../libs/types";
import Image from "next/image";
import AuthModal from "../../components/AuthModal"; //

export default function CheckoutPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
  });
  const [loading, setLoading] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(storedCart);
  }, []);

  const totalAmount = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.address) {
      alert("Please fill all fields");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      setShowAuth(true); //
      return;
    }

    const items = cart.map((item) => ({
      furnitureId: item.id,
      quantity: item.quantity,
    }));

    setLoading(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ items }),
      });

      if (!res.ok) {
        throw new Error("Failed to place order");
      }

      const order = await res.json();

      setTimeout(() => {
        localStorage.removeItem("cart");
        window.dispatchEvent(new Event("cart-updated"));
        router.push(`/order-success?orderId=${order.id}`);
      }, 5000);
    } catch (error) {
      alert("Error placing order. Try again!");
      console.error(error);
      setLoading(false);
    }
  };

  if (cart.length === 0)
    return <p className="text-center py-10">Your cart is empty.</p>;

  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-semibold mb-6">Checkout</h1>

      {/* User Form */}
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10"
      >
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          className="border p-3 rounded-md w-full"
        />
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          className="border p-3 rounded-md w-full"
        />
        <input
          type="text"
          name="address"
          placeholder="Shipping Address"
          value={formData.address}
          onChange={handleChange}
          className="border p-3 rounded-md w-full md:col-span-2"
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-black text-white py-3 rounded-md md:col-span-2 hover:bg-gray-800 transition-all"
        >
          {loading ? "Processing Order..." : `Place Order ₹${totalAmount}`}
        </button>
      </form>

      {/* Order Summary */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between border-b py-3"
          >
            <div className="flex items-center gap-4">
              <Image
                src={item.imageUrl}
                alt={item.name}
                className="w-16 h-16 object-cover rounded"
                width={1000}
                height={1000}
              />
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-gray-500">
                  Qty: {item.quantity} × ₹{item.price}
                </p>
              </div>
            </div>
            <p className="font-semibold">
              ₹{(item.price * item.quantity).toLocaleString()}
            </p>
          </div>
        ))}

        <div className="flex justify-between mt-4 text-lg font-semibold">
          <span>Total:</span>
          <span>₹{totalAmount.toLocaleString()}</span>
        </div>
      </div>

      {showAuth && (
        <AuthModal
          onClose={() => setShowAuth(false)}
          onSuccess={() =>
            handleSubmit(new Event("submit") as unknown as React.FormEvent)
          }
        />
      )}
    </main>
  );
}
