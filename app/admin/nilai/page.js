"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export default function DataNilaiPage() {
  const API_NILAI = "http://localhost:3001/api/nilai_outfit";
  const API_KRITERIA = "http://localhost:3001/api/kriteria";
  const API_OUTFIT = "http://localhost:3001/api/outfit";

  const [nilai, setNilai] = useState([]);
  const [kriteria, setKriteria] = useState([]);
  const [outfit, setOutfit] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [form, setForm] = useState({
    id_nilai: null,
    id_outfit: "",
    id_kriteria: "",
    nilai: "",
  });

  useEffect(() => {
    fetchAll();
  }, []);

  async function fetchAll() {
    setLoading(true);
    try {
      const [resNilai, resKriteria, resOutfit] = await Promise.all([
        fetch(API_NILAI),
        fetch(API_KRITERIA),
        fetch(API_OUTFIT),
      ]);

      const jsonNilai = await resNilai.json();
      const jsonKriteria = await resKriteria.json();
      const jsonOutfit = await resOutfit.json();

      setNilai(Array.isArray(jsonNilai.data) ? jsonNilai.data : []);
      setKriteria(Array.isArray(jsonKriteria.data) ? jsonKriteria.data : []);
      setOutfit(Array.isArray(jsonOutfit.data) ? jsonOutfit.data : []);
    } catch (err) {
      setError("Gagal mengambil data");
    } finally {
      setLoading(false);
    }
  }

  function openAdd() {
    setIsEditing(false);
    setForm({ id_nilai: null, id_outfit: "", id_kriteria: "", nilai: "" });
    setModalOpen(true);
  }

  function openEdit(item) {
    setIsEditing(true);
    setForm({
      id_nilai: item.id_nilai,
      id_outfit: item.id_outfit,
      id_kriteria: item.id_kriteria,
      nilai: item.nilai,
    });
    setModalOpen(true);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const payload = {
      id_nilai: form.id_nilai,
      id_outfit: parseInt(form.id_outfit),
      id_kriteria: parseInt(form.id_kriteria),
      nilai: parseFloat(form.nilai),
    };

    if (!payload.id_outfit || !payload.id_kriteria || isNaN(payload.nilai)) {
      alert("Mohon isi semua field dengan benar");
      return;
    }

    try {
      let res;

      if (isEditing) {
        res = await fetch(API_NILAI, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error("Gagal update nilai");
      } else {
        res = await fetch(API_NILAI, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error("Gagal tambah nilai");
      }

      await fetchAll();
      setModalOpen(false);
    } catch (err) {
      alert(err.message || "Terjadi kesalahan");
    }
  }

  async function handleDelete(id) {
    const ok = confirm("Hapus nilai ini?");
    if (!ok) return;

    try {
      const res = await fetch(API_NILAI, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id_nilai: id }),
      });

      if (!res.ok) throw new Error("Gagal menghapus nilai");

      setNilai((prev) => prev.filter((p) => p.id_nilai !== id));
    } catch (err) {
      alert(err.message || "Terjadi kesalahan");
    }
  }

  function getOutfitName(id) {
    return outfit.find((o) => o.id_outfit === id)?.nama_outfit || "-";
  }

  function getKriteriaName(id) {
    return kriteria.find((k) => k.id_kriteria === id)?.nama_kriteria || "-";
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FADADD] via-[#E8B4B8]/40 to-white p-10 rounded-3xl font-[Poppins]">
      <h1 className="text-3xl font-extrabold text-[#9B5C6B] mb-10 text-center">
        📊 Data Nilai Kriteria
      </h1>

      <div className="bg-white/90 rounded-3xl shadow-lg p-6">
        {loading && <div className="text-center py-4">Loading...</div>}
        {error && <div className="text-red-500 text-center py-2">{error}</div>}

        <table className="w-full text-center border border-[#FADADD] rounded-2xl overflow-hidden">
          <thead className="bg-[#FADADD] text-[#9B5C6B] font-semibold">
            <tr>
              <th className="border p-3">No</th>
              <th className="border p-3">Outfit</th>
              <th className="border p-3">Kriteria</th>
              <th className="border p-3">Nilai</th>
              <th className="border p-3">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {nilai.length === 0 && !loading ? (
              <tr>
                <td colSpan="5" className="p-6">Belum ada data</td>
              </tr>
            ) : (
              nilai.map((item, i) => (
                <tr key={item.id_nilai} className="hover:bg-[#FADADD]/30 transition-all duration-200">
                  <td className="border p-3">{i + 1}</td>
                  <td className="border p-3">{getOutfitName(item.id_outfit)}</td>
                  <td className="border p-3">{getKriteriaName(item.id_kriteria)}</td>
                  <td className="border p-3">{item.nilai}</td>
                  <td className="border p-3 flex justify-center gap-3">
                    <button onClick={() => openEdit(item)}>✏️</button>
                    <button onClick={() => handleDelete(item.id_nilai)}>🗑️</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        <div className="flex justify-center mt-8">
          <button
            onClick={openAdd}
            className="bg-[#E8B4B8] text-white px-6 py-2 rounded-xl"
          >
            ➕ Tambah Nilai
          </button>
        </div>
      </div>

      {/* Modal */}
            {modalOpen &&
        createPortal(
          <div className="fixed inset-0 z-[9999] flex items-center justify-center">
            
            {/* Overlay */}
            <div
              className="absolute inset-0 bg-black/40"
              onClick={() => setModalOpen(false)}
            />
      
            {/* Modal Box */}
            <form
              onSubmit={handleSubmit}
              className="
                relative
                bg-white
                rounded-2xl
                w-[90%]
                max-w-xl
                max-h-[85vh]
                overflow-y-auto
                p-6
                shadow-2xl
                z-10
              "
            >
            <h2 className="text-xl font-semibold mb-4">
              {isEditing ? "Edit Nilai" : "Tambah Nilai"}
            </h2>

            <label className="block mb-3 text-sm">
              Outfit
              <select
                value={form.id_outfit}
                onChange={(e) => setForm((s) => ({ ...s, id_outfit: e.target.value }))}
                className="w-full mt-1 p-2 border rounded"
                required
              >
                <option value="">-- Pilih Outfit --</option>
                {outfit.map((o) => (
                  <option key={o.id_outfit} value={o.id_outfit}>
                    {o.nama_outfit}
                  </option>
                ))}
              </select>
            </label>

            <label className="block mb-3 text-sm">
              Kriteria
              <select
                value={form.id_kriteria}
                onChange={(e) => setForm((s) => ({ ...s, id_kriteria: e.target.value }))}
                className="w-full mt-1 p-2 border rounded"
                required
              >
                <option value="">-- Pilih Kriteria --</option>
                {kriteria.map((k) => (
                  <option key={k.id_kriteria} value={k.id_kriteria}>
                    {k.nama_kriteria}
                  </option>
                ))}
              </select>
            </label>

            <label className="block mb-4 text-sm">
              Nilai
              <input
                type="number"
                step="0.01"
                value={form.nilai}
                onChange={(e) => setForm((s) => ({ ...s, nilai: e.target.value }))}
                className="w-full mt-1 p-2 border rounded"
                required
              />
            </label>

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 rounded bg-gray-200"
              >
                Batal
              </button>
              <button type="submit" className="px-4 py-2 rounded bg-[#E8B4B8] text-white">
                Simpan
              </button>
            </div>
          </form>
    </div>,
    document.body
  )}
    </div>
  );
}
