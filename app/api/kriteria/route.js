// app/api/kriteria/route.js
import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'spk_outfit_syari'
};

const pool = mysql.createPool(dbConfig);

// 1. FUNGSI GET (Mengambil Semua Data)
export async function GET() {
    try {
        const connection = await pool.getConnection();
        const [rows] = await connection.query('SELECT id_kriteria, kode, nama_kriteria, bobot, tipe FROM kriteria');
        connection.release();
        
        return NextResponse.json({
            message: "Data kriteria berhasil diambil",
            data: rows,
        }, {
            status: 200
        });
    } catch (error) {
        console.error('Database error:', error);
        return NextResponse.json({ message: "Gagal mengambil data dari database" }, { status: 500 });
    }
}

// 2. FUNGSI POST (Menambahkan Data Baru)
export async function POST(request) {
    try {
        const newKriteria = await request.json();

        if (!newKriteria.kode || !newKriteria.nama_kriteria || !newKriteria.bobot || !newKriteria.tipe) {
            return NextResponse.json({
                message: "Data kriteria tidak lengkap. Kode, nama kriteria, bobot, dan tipe wajib diisi."
            }, { status: 400 });
        }

        const connection = await pool.getConnection();
        const [result] = await connection.query(
            'INSERT INTO kriteria (kode, nama_kriteria, bobot, tipe) VALUES (?, ?, ?, ?)',
            [newKriteria.kode, newKriteria.nama_kriteria, newKriteria.bobot, newKriteria.tipe]
        );
        connection.release();

        return NextResponse.json({
            message: "Kriteria berhasil ditambahkan",
            data: newKriteria
        }, { status: 201 });

    } catch (error) {
        console.error('Database error:', error);
        return NextResponse.json({ message: "Gagal menambahkan data ke database" }, { status: 500 });
    }
}

// 3. FUNGSI PUT (Mengupdate Data)
export async function PUT(request) {
    try {
        const updatedData = await request.json();
        const { id_kriteria } = updatedData;

        if (!id_kriteria) {
            return NextResponse.json({ message: "ID kriteria wajib disertakan" }, { status: 400 });
        }

        const connection = await pool.getConnection();
        const [result] = await connection.query(
            'UPDATE kriteria SET kode = ?, nama_kriteria = ?, bobot = ?, tipe = ? WHERE id_kriteria = ?',
            [updatedData.kode, updatedData.nama_kriteria, updatedData.bobot, updatedData.tipe, id_kriteria]
        );
        connection.release();

        if (result.affectedRows === 0) {
            return NextResponse.json({ message: `Kriteria dengan ID ${id_kriteria} tidak ditemukan` }, { status: 404 });
        }

        return NextResponse.json({
            message: `Kriteria dengan ID ${id_kriteria} berhasil diupdate`,
            data: updatedData
        }, { status: 200 });

    } catch (error) {
        console.error('Database error:', error);
        return NextResponse.json({ message: "Gagal mengupdate data di database" }, { status: 500 });
    }
}

// 4. FUNGSI DELETE (Menghapus Data)
export async function DELETE(request) {
    try {
        const { id_kriteria } = await request.json();

        if (!id_kriteria) {
            return NextResponse.json({ message: "ID kriteria wajib disertakan" }, { status: 400 });
        }

        const connection = await pool.getConnection();
        const [result] = await connection.query('DELETE FROM kriteria WHERE id_kriteria = ?', [id_kriteria]);
        connection.release();

        if (result.affectedRows === 0) {
            return NextResponse.json({ message: `Kriteria dengan ID ${id_kriteria} tidak ditemukan` }, { status: 404 });
        }

        return NextResponse.json({
            message: `Kriteria dengan ID ${id_kriteria} berhasil dihapus`
        }, { status: 200 });

    } catch (error) {
        console.error('Database error:', error);
        return NextResponse.json({ message: "Gagal menghapus data dari database" }, { status: 500 });
    }
}
