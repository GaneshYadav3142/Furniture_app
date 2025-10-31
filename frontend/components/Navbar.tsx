"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ShoppingCart } from "lucide-react";
import { CartItem } from "@/libs/types";
import AuthModal from "@/components/AuthModal";

export default function Navbar() {
  const [cartCount, setCartCount] = useState(0);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      setCartCount(cart.length);
    };

    const checkToken = () => {
      const storedToken = localStorage.getItem("token");
      setToken(storedToken);
    };

    updateCartCount();
    checkToken();

    window.addEventListener("cart-updated", updateCartCount);
    window.addEventListener("storage", checkToken);

    return () => {
      window.removeEventListener("cart-updated", updateCartCount);
      window.removeEventListener("storage", checkToken);
    };
  }, [pathname]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    router.refresh();
  };

  return (
    <>
      <nav className="flex justify-between items-center px-6 py-4 shadow-sm bg-white sticky top-0 z-[100]">
        <Link href="/" className="text-2xl font-semibold">
          🪑 FurniStore
        </Link>

        <div className="flex items-center gap-6">
          <Link href="/" className="text-gray-700 hover:text-black">
            Home
          </Link>

          {token ? (
            <>
              <button
                onClick={handleLogout}
                className="text-gray-700 hover:text-black"
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="bg-black text-white px-4 py-2 rounded"
            >
              Login
            </button>
          )}
          <button
            onClick={() => router.push("/cart")}
            className="relative flex items-center"
          >
            <ShoppingCart size={24} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs rounded-full px-2 py-px">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </nav>

      {/* 🔹 Auth Modal */}
      {isAuthModalOpen && (
        <AuthModal
          onClose={() => setIsAuthModalOpen(false)}
          onSuccess={(newToken) => {
            setToken(newToken);
            setIsAuthModalOpen(false);
          }}
        />
      )}
    </>
  );
}
