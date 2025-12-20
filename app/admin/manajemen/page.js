"use client"

import { useState } from "react"

export default function ManajemenAdminPage() {
  const [admins, setAdmins] = useState([
    { id: 1, username: "admin1", email: "admin1@mail.com", role: "Super Admin" },
    { id: 2, username: "admin2", email: "admin2@mail.com", role: "Admin" },
    { id: 3, username: "admin3", email: "admin3@mail.com", role: "Editor" },
  ])

  const handleEdit = (id) => {
    alert(`Edit data admin dengan ID: ${id}`)
  }

  const handleDelete = (id) => {
    const confirmDelete = confirm("Yakin ingin menghapus admin ini?")
    if (confirmDelete) {
      setAdmins(admins.filter((a) => a.id !== id))
      alert("Admin berhasil dihapus 💖")
    }
  }

  return (
    <div
      className="p-8 min-h-screen font-[Poppins] bg-gradient-to-br from-[#FADADD] via-[#E8B4B8] to-white text-[#5C3D3D]"
    >
      <h1 className="text-3xl font-bold mb-8 text-center tracking-wide drop-shadow-md">
        🌸 Manajemen Admin 🌸
      </h1>

      <div className="bg-white/70 backdrop-blur-sm border border-pink-200 rounded-2xl shadow-lg p-8">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gradient-to-r from-[#E8B4B8] to-[#FADADD] text-[#5C3D3D] font-semibold">
              <th className="py-3 px-4 border border-pink-200 rounded-tl-2xl">
                Username
              </th>
              <th className="py-3 px-4 border border-pink-200">Email</th>
              <th className="py-3 px-4 border border-pink-200">Role</th>
              <th className="py-3 px-4 border border-pink-200 rounded-tr-2xl text-center">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody>
            {admins.length > 0 ? (
              admins.map((admin) => (
                <tr
                  key={admin.id}
                  className="border border-pink-100 hover:bg-pink-50/60 transition"
                >
                  <td className="py-3 px-4 font-medium">{admin.username}</td>
                  <td className="py-3 px-4 text-[#7A4E4E]">{admin.email}</td>
                  <td className="py-3 px-4 text-[#A86A6A] font-semibold">
                    {admin.role}
                  </td>
                  <td className="py-3 px-4 text-center space-x-3">
                    <button
                      onClick={() => handleEdit(admin.id)}
                      className="bg-gradient-to-r from-[#E8B4B8] to-[#FADADD] hover:from-[#FADADD] hover:to-[#E8B4B8] text-[#5C3D3D] font-semibold text-sm px-4 py-1.5 rounded-xl shadow-md transition-transform transform hover:scale-105"
                    >
                      ✏️ Edit
                    </button>
                    <button
                      onClick={() => handleDelete(admin.id)}
                      className="bg-gradient-to-r from-[#FADADD] to-[#E8B4B8] hover:from-[#E8B4B8] hover:to-[#FADADD] text-[#5C3D3D] font-semibold text-sm px-4 py-1.5 rounded-xl shadow-md transition-transform transform hover:scale-105"
                    >
                      🗑️ Hapus
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={4}
                  className="py-6 text-center text-[#A86A6A] italic"
                >
                  Belum ada data admin 💭
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-10 text-center">
        <button className="bg-gradient-to-r from-[#E8B4B8] to-[#FADADD] hover:from-[#FADADD] hover:to-[#E8B4B8] text-[#5C3D3D] font-semibold py-3 px-10 rounded-full shadow-lg transition-all transform hover:scale-105">
          ➕ Tambah Admin
        </button>
      </div>
    </div>
  )
}
