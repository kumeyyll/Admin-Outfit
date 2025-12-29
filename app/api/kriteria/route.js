// app/api/kriteria/route.js
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

// ================= GET =================
export async function GET() {
  const { data, error } = await supabase
    .from("kriteria")
    .select("id_kriteria, kode, nama_kriteria, bobot, tipe")
    .order("id_kriteria", { ascending: true });

  if (error) {
    return NextResponse.json(
      { message: "Gagal mengambil data", error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json({
    message: "Data kriteria berhasil diambil",
    data,
  });
}

// ================= POST =================
export async function POST(request) {
  const body = await request.json();

  const { kode, nama_kriteria, bobot, tipe } = body;

  if (!kode || !nama_kriteria || !bobot || !tipe) {
    return NextResponse.json(
      { message: "Data tidak lengkap" },
      { status: 400 }
    );
  }

  const { data, error } = await supabase
    .from("kriteria")
    .insert([{ kode, nama_kriteria, bobot, tipe }])
    .select();

  if (error) {
    return NextResponse.json(
      { message: "Gagal menambahkan data", error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json({
    message: "Kriteria berhasil ditambahkan",
    data,
  });
}

// ================= PUT =================
export async function PUT(request) {
  const body = await request.json();
  const { id_kriteria, kode, nama_kriteria, bobot, tipe } = body;

  if (!id_kriteria) {
    return NextResponse.json(
      { message: "ID kriteria wajib ada" },
      { status: 400 }
    );
  }

  const { error } = await supabase
    .from("kriteria")
    .update({ kode, nama_kriteria, bobot, tipe })
    .eq("id_kriteria", id_kriteria);

  if (error) {
    return NextResponse.json(
      { message: "Gagal update data", error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json({
    message: "Kriteria berhasil diupdate",
  });
}

// ================= DELETE =================
export async function DELETE(request) {
  const { id_kriteria } = await request.json();

  if (!id_kriteria) {
    return NextResponse.json(
      { message: "ID kriteria wajib ada" },
      { status: 400 }
    );
  }

  const { error } = await supabase
    .from("kriteria")
    .delete()
    .eq("id_kriteria", id_kriteria);

  if (error) {
    return NextResponse.json(
      { message: "Gagal menghapus data", error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json({
    message: "Kriteria berhasil dihapus",
  });
}

