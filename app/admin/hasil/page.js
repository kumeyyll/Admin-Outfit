"use client";

import { useState } from "react";

export default function HasilPerhitunganPage() {
  const [hasil, setHasil] = useState([
    { id: 1, alternatif: "Outfit A", skor: 0.85, ranking: 1 },
    { id: 2, alternatif: "Outfit B", skor: 0.78, ranking: 2 },
    { id: 3, alternatif: "Outfit C", skor: 0.66, ranking: 3 },
  ]);

  const handleDetail = () => {
    alert("Menampilkan detail perhitungan SAW 💖");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FADADD] via-[#E8B4B8]/40 to-white p-10 font-[Poppins] transition-all duration-300">
      {/* Judul */}
      <h1 className="text-4xl font-extrabold text-[#8C4C58] mb-10 text-center tracking-wide drop-shadow-sm">
        💕 Hasil Perhitungan SAW 💕
      </h1>

      {/* Container Tabel */}
      <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-lg p-8 border border-[#E8B4B8]/30 max-w-5xl mx-auto">
        <table className="w-full text-center border border-[#FADADD] rounded-2xl overflow-hidden shadow-sm">
          <thead className="bg-gradient-to-r from-[#FADADD] to-[#E8B4B8]/70 text-[#703F47] font-semibold">
            <tr>
              <th className="p-3 border border-[#FADADD]">Alternatif</th>
              <th className="p-3 border border-[#FADADD]">Skor Total</th>
              <th className="p-3 border border-[#FADADD]">Ranking</th>
            </tr>
          </thead>
          <tbody className="text-[#704B50] bg-white/70">
            {hasil.map((row) => (
              <tr
                key={row.id}
                className="hover:bg-[#FADADD]/30 transition-all duration-200"
              >
                <td className="border border-[#FADADD] p-3 font-medium text-[#8C4C58]">
                  {row.alternatif}
                </td>
                <td className="border border-[#FADADD] p-3">{row.skor}</td>
                <td className="border border-[#FADADD] p-3 font-semibold text-[#C77B8B]">
                  {row.ranking}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Tombol */}
        <div className="mt-10 flex justify-center">
          <button
            onClick={handleDetail}
            className="bg-gradient-to-r from-[#E8B4B8] to-[#FADADD] hover:from-[#FADADD] hover:to-[#E8B4B8] text-white font-semibold px-8 py-3 rounded-xl shadow-md transition-all duration-300 hover:shadow-pink-200/70 hover:scale-105"
          >
            🔍 Lihat Detail Perhitungan
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center text-[#704B50] text-sm mt-10 italic">
        © 2025 | SPK Rekomendasi Outfit Syar’i <br />
        <span className="text-[#9B5C6B] font-semibold">by Kumeyyy 🩷</span>
      </footer>
    </div>
  );
}
