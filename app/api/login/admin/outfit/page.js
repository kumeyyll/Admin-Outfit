// "use client";
// import { useEffect, useState } from "react";

// export default function OutfitPage() {
//   const [outfits, setOutfits] = useState([]);
//   const [form, setForm] = useState({ nama_outfit: "", warna: "", bahan: "", harga: "", kenyamanan: "" });

//   // ambil data dari API
//   const fetchOutfits = async () => {
//     const res = await fetch("/api/outfit");
//     const data = await res.json();
//     setOutfits(data);
//   };

//   useEffect(() => {
//     fetchOutfits();
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     await fetch("/api/outfit", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(form),
//     });
//     setForm({ nama_outfit: "", warna: "", bahan: "", harga: "", kenyamanan: "" });
//     fetchOutfits();
//   };

//   return (
//     <div className="min-h-screen bg-pink-50 p-8">
//       <h1 className="text-3xl font-bold text-pink-700 mb-6">Data Outfit Syar’i 👗</h1>

//       <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow-md mb-8">
//         <div className="grid grid-cols-2 gap-4">
//           <input className="border p-2 rounded" placeholder="Nama Outfit"
//             value={form.nama_outfit} onChange={e => setForm({ ...form, nama_outfit: e.target.value })} />
//           <input className="border p-2 rounded" placeholder="Warna"
//             value={form.warna} onChange={e => setForm({ ...form, warna: e.target.value })} />
//           <input className="border p-2 rounded" placeholder="Bahan"
//             value={form.bahan} onChange={e => setForm({ ...form, bahan: e.target.value })} />
//           <input className="border p-2 rounded" placeholder="Harga"
//             value={form.harga} onChange={e => setForm({ ...form, harga: e.target.value })} />
//           <input className="border p-2 rounded" placeholder="Kenyamanan (1-5)"
//             value={form.kenyamanan} onChange={e => setForm({ ...form, kenyamanan: e.target.value })} />
//         </div>
//         <button type="submit" className="mt-4 bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700">
//           Tambah Outfit
//         </button>
//       </form>

//       <table className="w-full bg-white rounded-2xl shadow-md">
//         <thead>
//           <tr className="bg-pink-100 text-pink-700">
//             <th className="p-3">Nama</th>
//             <th className="p-3">Warna</th>
//             <th className="p-3">Bahan</th>
//             <th className="p-3">Harga</th>
//             <th className="p-3">Kenyamanan</th>
//           </tr>
//         </thead>
//         <tbody>
//           {outfits.map((o, i) => (
//             <tr key={i} className="text-center border-t">
//               <td className="p-3">{o.nama_outfit}</td>
//               <td className="p-3">{o.warna}</td>
//               <td className="p-3">{o.bahan}</td>
//               <td className="p-3">{o.harga}</td>
//               <td className="p-3">{o.kenyamanan}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }
