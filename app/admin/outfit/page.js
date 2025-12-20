"use client";

import React, { useEffect, useState } from "react";


export default function DataOutfitPage() {
  const API_BASE = "http://localhost:3001/api/outfit";

  const [outfit, setOutfit] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [gambar, setGambar] = useState(null);


  const [modalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({
    id_outfit: null,
    kode_outfit: "",
    nama_outfit: "",
    harga: "",
    bahan: "",
    warna: "",
    gaya: "",
  });

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(API_BASE);
      if (!res.ok) throw new Error("Gagal mengambil data");
      const json = await res.json();
      setOutfit(Array.isArray(json.data) ? json.data : []);
    } catch (err) {
      setError(err.message || "Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  }

  function openAdd() {
    setIsEditing(false);
    setForm({ id_outfit: null, kode_outfit: "", nama_outfit: "", harga: "", bahan: "", warna: "", gaya: "" });
    setModalOpen(true);
  }

  function openEdit(item) {
    setIsEditing(true);
    setForm({
      id_outfit: item.id_outfit,
      kode_outfit: item.kode_outfit ?? "",
      nama_outfit: item.nama_outfit ?? "",
      harga: item.harga ?? "",
      bahan: item.bahan ?? "",
      warna: item.warna ?? "",
      gaya: item.gaya ?? "",
    });
    setModalOpen(true);
  }

    async function handleSubmit(e) {
  e.preventDefault();

  const formData = new FormData();
  Object.keys(form).forEach((key) => {
    if (form[key] !== null) formData.append(key, form[key]);
  });

  if (gambar) formData.append("gambar", gambar);
  if (isEditing) formData.append("gambar_lama", form.gambar);

  const res = await fetch(API_BASE, {
    method: isEditing ? "PUT" : "POST",
    body: formData,
  });

  if (!res.ok) {
    alert("Gagal menyimpan data");
    return;
  }

  setModalOpen(false);
  fetchData();
}


  async function handleDelete(id) {
    const ok = confirm("Hapus outfit ini?");
    if (!ok) return;

    try {
      const res = await fetch(API_BASE, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id_outfit: id }), // ✅ kirim id dari parameter
      });

      if (!res.ok) throw new Error("Gagal menghapus outfit");

      // update list
      setOutfit((prev) => prev.filter((p) => p.id_outfit !== id)); // ✅ pakai id dari parameter
    } catch (err) {
      alert(err.message || "Terjadi kesalahan");
    }
  }
    

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FADADD] via-[#E8B4B8]/40 to-white p-10 rounded-3xl font-[Poppins] transition-all duration-300">
      <h1 className="text-3xl font-extrabold text-[#9B5C6B] mb-10 text-center tracking-wide drop-shadow-sm">
        👗 Data Alternatif (Outfit) 👗
      </h1>

      <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-lg p-6 border border-[#E8B4B8]/30">
        {loading && <div className="text-center py-4">Loading...</div>}
        {error && <div className="text-red-500 text-center py-2">{error}</div>}

        <table className="w-full text-center border border-[#FADADD] rounded-2xl overflow-hidden">
          <thead className="bg-[#FADADD] text-[#9B5C6B] font-semibold">
            <tr>
              <th className="border border-[#FADADD] p-3">No</th>
              <th className="border border-[#FADADD] p-3">Kode Outfit</th>
              <th className="border border-[#FADADD] p-3">Nama Outfit</th>
              <th className="border border-[#FADADD] p-3">Harga</th>
              <th className="border border-[#FADADD] p-3">Bahan</th>
              <th className="border border-[#FADADD] p-3">Warna</th>
              <th className="border border-[#FADADD] p-3">Gaya</th>
              <th className="border border-[#FADADD] p-3">Gambar</th>
              <th className="border border-[#FADADD] p-3">Aksi</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 bg-white/70">
            {outfit.length === 0 && !loading ? (
              <tr>
                <td colSpan="6" className="p-6">Belum ada data</td>
              </tr>
            ) : (
              outfit.map((item, i) => (
                <tr key={item.id_outfit} className="hover:bg-[#FADADD]/30 transition-all duration-200">
                  <td className="border border-[#FADADD] p-3">{i + 1}</td>
                  <td className="border border-[#FADADD] p-3">{item.kode_outfit}</td>
                  <td className="border border-[#FADADD] p-3">{item.nama_outfit}</td>
                  <td className="border border-[#FADADD] p-3">{item.harga}</td>
                  <td className="border border-[#FADADD] p-3">{item.bahan}</td>
                  <td className="border border-[#FADADD] p-3">{item.warna}</td>
                  <td className="border border-[#FADADD] p-3">{item.gaya}</td>
                  <td>
                    {item.gambar && (
                      <img
                        src={`/uploads/${item.gambar}`}
                        className="w-20 h-20 object-cover rounded-xl mx-auto"
                      />
                    )}
                  </td>
                  <td className="border border-[#FADADD] p-3 flex justify-center gap-3">
                    <button
                      onClick={() => openEdit(item)}
                      className="text-[#E8B4B8] hover:text-[#C88A96] transition-all duration-200"
                      title="Edit"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => handleDelete(item.id_outfit)}
                      className="text-[#E8B4B8] hover:text-[#C88A96] transition-all duration-200"
                      title="Hapus"
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        <div className="flex justify-center mt-8">
          <button
            onClick={openAdd}
            className="bg-[#E8B4B8] hover:bg-[#C88A96] text-white font-semibold px-6 py-2 rounded-xl shadow-md transition-all duration-300 hover:shadow-pink-200/50"
          >
            ➕ Tambah Outfit
          </button>
        </div>
      </div>

      <footer className="text-center text-gray-600 text-sm mt-10 italic">
        © 2025 | SPK Rekomendasi Outfit Syar’i <br />
        <span className="text-[#9B5C6B] font-semibold">by Kumeyyy 🩷</span>
      </footer>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40" onClick={() => setModalOpen(false)} />
          <form
            onSubmit={handleSubmit}
            className="relative bg-white rounded-2xl p-6 w-[90%] max-w-xl shadow-lg z-10"
          >
            <h2 className="text-xl font-semibold mb-4">{isEditing ? "Edit Outfit" : "Tambah Outfit"}</h2>

            <label className="block mb-2 text-sm">
              Kode Outfit
              <input
                value={form.kode_outfit}
                onChange={(e) => setForm((s) => ({ ...s, kode_outfit: e.target.value }))}
                className="w-full mt-1 p-2 border rounded"
                required
              />
            </label>

            <label className="block mb-2 text-sm">
              Nama Outfit
              <input
                value={form.nama_outfit}
                onChange={(e) => setForm((s) => ({ ...s, nama_outfit: e.target.value }))}
                className="w-full mt-1 p-2 border rounded"
                required
              />
            </label>

            <label className="block mb-2 text-sm">
              Harga
              <input
                value={form.harga}
                onChange={(e) => setForm((s) => ({ ...s, harga: e.target.value }))}
                className="w-full mt-1 p-2 border rounded"
                required
              />
            </label>

            <label className="block mb-2 text-sm">
              Bahan
              <input
                value={form.bahan}
                onChange={(e) => setForm((s) => ({ ...s, bahan: e.target.value }))}
                className="w-full mt-1 p-2 border rounded"
                required
              />
            </label>

            <label className="block mb-2 text-sm">
              Warna
              <input
                value={form.warna}
                onChange={(e) => setForm((s) => ({ ...s, warna: e.target.value }))}
                className="w-full mt-1 p-2 border rounded"
                required
              />
            </label>

            <label className="block mb-2 text-sm">
              Gaya
              <input
                value={form.gaya}
                onChange={(e) => setForm((s) => ({ ...s, gaya: e.target.value }))}
                className="w-full mt-1 p-2 border rounded"
                required
              />
            </label>

            <label className="block mb-2 text-sm">
              Gambar Outfit
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setGambar(e.target.files[0])}
                className="w-full mt-1"
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
        </div>
      )}
    </div>
  );
}
