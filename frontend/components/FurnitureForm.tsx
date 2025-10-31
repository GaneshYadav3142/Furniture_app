"use client";

import { useState } from "react";
import { addFurniture, updateFurniture } from "../libs/api";

interface FurnitureFormData {
  id?: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  length: number;
  width: number;
  height: number;
  category: string;
}

export default function FurnitureForm({
  onSuccess,
}: {
  onSuccess: () => void;
}) {
  const [form, setForm] = useState<FurnitureFormData>({
    name: "",
    description: "",
    price: 0,
    imageUrl: "",
    length: 0,
    width: 0,
    height: 0,
    category: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (form.id) {
      await updateFurniture(form.id, form); // ✅ safely cast to number
    } else {
      await addFurniture(form);
    }

    // ✅ reset all fields to empty strings (consistent types)
    setForm({
      name: "",
      description: "",
      price: 0,
      imageUrl: "",
      length: 0,
      width: 0,
      height: 0,
      category: "",
    });

    onSuccess();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow p-6 rounded-2xl mb-8 grid grid-cols-2 gap-4"
    >
      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Name"
        className="border p-2 rounded"
        required
      />
      <input
        name="category"
        value={form.category}
        onChange={handleChange}
        placeholder="Category"
        className="border p-2 rounded"
      />
      <input
        name="price"
        value={form.price}
        onChange={handleChange}
        placeholder="Price"
        className="border p-2 rounded"
        type="number"
      />
      <input
        name="imageUrl"
        value={form.imageUrl}
        onChange={handleChange}
        placeholder="Image URL"
        className="border p-2 rounded"
      />
      <input
        name="length"
        value={form.length}
        onChange={handleChange}
        placeholder="Length"
        className="border p-2 rounded"
        type="number"
      />
      <input
        name="width"
        value={form.width}
        onChange={handleChange}
        placeholder="Width"
        className="border p-2 rounded"
        type="number"
      />
      <input
        name="height"
        value={form.height}
        onChange={handleChange}
        placeholder="Height"
        className="border p-2 rounded"
        type="number"
      />
      <input
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Description"
        className="border p-2 rounded col-span-2"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 col-span-2"
      >
        {form.id ? "Update Furniture" : "Add Furniture"}
      </button>
    </form>
  );
}
