"use client";

import { Furniture } from "@/libs/types";

export default function FurnitureTable({
  furnitureList,
}: {
  furnitureList: Furniture[];
  onRefresh: () => void;
}) {
  return (
    <div className="bg-white shadow rounded-2xl p-6">
      <h2 className="text-xl font-semibold mb-4">All Furniture</h2>
      <table className="min-w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Name</th>
            <th className="border p-2">Category</th>
            <th className="border p-2">Price</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {furnitureList?.map((f: Furniture) => (
            <tr key={f.id}>
              <td className="border p-2">{f.name}</td>
              <td className="border p-2">{f.category}</td>
              <td className="border p-2">₹{f.price}</td>
              <td className="border p-2 text-center">
                <button
                  onClick={() => alert("Edit logic here (fill form fields)")}
                  className="text-blue-600 hover:underline"
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
