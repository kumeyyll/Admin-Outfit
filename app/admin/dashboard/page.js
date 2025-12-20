"use client";

import { useEffect, useState } from "react";

export default function DashboardAdmin() {
  const [data, setData] = useState({
    totalOutfit: 0,
    totalKriteria: 0,
    totalNilai: 0,
    outfitTerbaik: "-",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/dashboard")
      .then((res) => res.json())
      .then((res) => {
        setData(res);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Title */}
      <h1 className="text-2xl font-bold mb-6">
        Dashboard Admin SPK Outfit Syar’i
      </h1>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card title="Total Outfit" value={data.totalOutfit} />
        <Card title="Total Kriteria" value={data.totalKriteria} />
        <Card title="Total Penilaian" value={data.totalNilai} />
        <Card title="Outfit Terbaik" value={data.outfitTerbaik} />
      </div>
    </div>
  );
}

/* ===== COMPONENT CARD ===== */
function Card({ title, value }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-5 hover:shadow-lg transition">
      <p className="text-gray-500 text-sm">{title}</p>
      <h2 className="text-3xl font-bold mt-2 text-pink-600">
        {value}
      </h2>
    </div>
  );
}
