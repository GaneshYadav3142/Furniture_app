"use client";
import { useEffect, useState } from "react";
import ReviewForm from "../../components/ReviewForm";
import { useSearchParams } from "next/navigation";
import { Order } from "@/libs/types";

export default function OrderSuccessPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    if (orderId) {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders/${orderId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
        .then((res) => res.json())
        .then((data) => setOrder(data));
    }
  }, [orderId]);

  if (!order) return <p className="text-center p-10">Loading order...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Order Successful 🎉</h1>
      <p className="mb-4">Order ID: {order.id}</p>

      <div className="space-y-6">
        {order.items.map((item) => (
          <div key={item.id} className="border rounded-lg p-4">
            <h3 className="font-semibold">{item.furniture?.name}</h3>
            <p>Qty: {item.quantity}</p>
            <p>Price: ₹{item.price}</p>

            <ReviewForm furnitureId={item.furnitureId} />
          </div>
        ))}
      </div>
    </div>
  );
}
