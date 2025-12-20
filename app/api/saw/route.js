import { NextResponse } from "next/server";
import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "spk_outfit_syari",
});

export async function GET() {
  const conn = await pool.getConnection();

  try {
    const [outfits] = await conn.query("SELECT * FROM outfit");
    const [kriteria] = await conn.query("SELECT * FROM kriteria");
    const [nilai] = await conn.query("SELECT * FROM nilai_outfit");

    // cari max & min tiap kriteria
    const pembagi = {};
    kriteria.forEach(k => {
      const vals = nilai
        .filter(n => n.id_kriteria === k.id_kriteria)
        .map(n => n.nilai);

      pembagi[k.id_kriteria] = {
        max: Math.max(...vals),
        min: Math.min(...vals),
        tipe: k.tipe,
        bobot: k.bobot,
      };
    });

    // hitung SAW
    const hasil = outfits.map(o => {
      let total = 0;
      let normalisasi = {};

      kriteria.forEach(k => {
        const n = nilai.find(
          x => x.id_outfit === o.id_outfit && x.id_kriteria === k.id_kriteria
        );
        if (!n) return;

        let norm =
          k.tipe === "benefit"
            ? n.nilai / pembagi[k.id_kriteria].max
            : pembagi[k.id_kriteria].min / n.nilai;

        normalisasi[k.nama_kriteria.toLowerCase().replace(" ", "_")] = norm;
        total += norm * k.bobot;
      });

      return {
        id_outfit: o.id_outfit,
        nama_outfit: o.nama_outfit,
        gaya: o.gaya,
        normalisasi,
        skor: total,
      };
    });

    hasil.sort((a, b) => b.skor - a.skor);

    conn.release();

    return NextResponse.json({
      ranking: hasil,
    });
  } catch (err) {
    conn.release();
    return NextResponse.json({ message: "SAW error" }, { status: 500 });
  }
}
