"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    if (res.ok) {
      router.push("/admin/dashboard");
    } else {
      setError(data.message || "Login gagal, coba lagi yaa 🥺");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#FADADD] via-[#E8B4B8] to-white font-[Poppins]">
      <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-lg p-10 w-[380px] relative border border-[#E8B4B8]/30">
        {/* Ikon cewek berhijab */}
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[#E8B4B8] rounded-full w-20 h-20 flex items-center justify-center shadow-md">
          <span className="text-white text-3xl font-bold">🧕</span>
        </div>

        <h1 className="text-2xl font-extrabold text-center text-[#9B5C6B] mt-12 mb-6 tracking-wide">
          Login Admin NyariGamis ✨
        </h1>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#9B5C6B] mb-1">
              Username
            </label>
            <input
              type="text"
              className="w-full border border-[#E8B4B8] focus:border-[#C88A96] focus:ring-2 focus:ring-[#E8B4B8]/50 rounded-xl px-4 py-2 outline-none transition-all duration-200 placeholder:text-gray-400"
              placeholder="Masukkan username"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#9B5C6B] mb-1">
              Password
            </label>
            <input
              type="password"
              className="w-full border border-[#E8B4B8] focus:border-[#C88A96] focus:ring-2 focus:ring-[#E8B4B8]/50 rounded-xl px-4 py-2 outline-none transition-all duration-200 placeholder:text-gray-400"
              placeholder="Masukkan password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>

          {error && (
            <p className="text-sm text-red-500 text-center mt-2">{error}</p>
          )}

          <button
            type="submit"
            className="w-full bg-[#E8B4B8] hover:bg-[#C88A96] text-white font-semibold py-2 rounded-xl transition-all duration-300 shadow-md hover:shadow-pink-200/50"
          >
            Masuk
          </button>
        </form>

        <p className="text-center text-[#9B5C6B]/80 text-sm mt-6 leading-relaxed">
          Sistem Pendukung Keputusan <br />
          <span className="text-[#C88A96] font-semibold">
            Rekomendasi Gamis 💕
          </span>
        </p>

        {/* Ornamen lembut */}
        <div className="absolute -bottom-6 -left-6 bg-[#FADADD] w-16 h-16 rounded-full blur-lg opacity-60"></div>
        <div className="absolute -top-6 -right-6 bg-[#E8B4B8] w-20 h-20 rounded-full blur-lg opacity-50"></div>
      </div>
    </div>
  );
}
