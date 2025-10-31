"use client";

import { Furniture } from "../libs/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  furniture: Furniture;
}

export default function FurnitureCard({ furniture }: Props) {
  const router = useRouter();
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative bg-white shadow-md rounded-2xl overflow-hidden hover:shadow-lg transition cursor-pointer"
      onClick={() => router.push(`/furniture/${furniture.id}`)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Product Image */}
      <Image
        src={furniture?.imageUrl || "https://placehold.co/600x400"}
        alt={furniture.name}
        className="w-full h-64 object-cover"
        width={400}
        height={256}
      />

      {/* Product Info */}
      <div className="p-4">
        <h2 className="text-lg font-semibold">{furniture.name}</h2>
        <p className="text-gray-500 text-sm">{furniture.category}</p>
        <p className="text-gray-900 font-bold mt-2">₹{furniture.price}</p>
      </div>

      {/* Hover Popup (local to card) */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 flex items-center justify-center bg-white/90 backdrop-blur-md rounded-2xl z-10 pointer-events-none"
          >
            <div className="text-center">
              <Image
                src={furniture?.imageUrl || "https://placehold.co/800x600"}
                alt={furniture.name}
                width={250}
                height={180}
                className="rounded-lg object-cover mx-auto mb-2"
              />
              <p className="text-gray-700 text-sm">
                {`${furniture.length}cm x ${furniture.width}cm x ${furniture.height}cm` ||
                  "120cm × 80cm × 75cm"}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
