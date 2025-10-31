"use client";
import { useState } from "react";

export default function ReviewForm({ furnitureId }: { furnitureId: number }) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const submitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ furnitureId, rating, comment }),
    });
    if (res.ok) setSubmitted(true);
  };

  if (submitted)
    return <p className="text-green-600 mt-2">Review submitted!</p>;

  return (
    <form onSubmit={submitReview} className="mt-4 space-y-2">
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            type="button"
            key={star}
            onClick={() => setRating(star)}
            className={star <= rating ? "text-yellow-500" : "text-gray-400"}
          >
            ★
          </button>
        ))}
      </div>
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Write your feedback..."
        className="border w-full rounded p-2 text-sm"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-1 rounded"
      >
        Submit Review
      </button>
    </form>
  );
}
