import { Furniture } from "./types";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

export async function getAllFurniture() {
  const res = await fetch(`${BASE_URL}/furniture`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch furniture list");
  return res.json();
}

export async function getFurnitureById(id: number) {
  const res = await fetch(`${BASE_URL}/furniture/${id}`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch furniture details");
  return res.json();
}

export async function getAllFurnitureForAdmin() {
  const res = await fetch(`${BASE_URL}/admin/furniture`);
  return res.json();
}

export async function addFurniture(data: Furniture) {
  const res = await fetch(`${BASE_URL}/admin/furniture`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function updateFurniture(id: number, data: Furniture) {
  const res = await fetch(`${BASE_URL}/admin/furniture/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}
