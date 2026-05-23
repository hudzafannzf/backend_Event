import type { Request, Response } from 'express';
import { prisma } from '../lib/db.js';

// operasi create
export const createcategory = async (req: Request, res: Response) => {
    try {
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({ message: "Nama kategori wajib diisi" });
        }

        const newCategory = await prisma.category.create({
            data: { name },
        });

        res.status(201).json({
            message: "Kategori berhasil dibuat",
            data: newCategory,
        });
    } catch (error) {
        res.status(500).json({ message: "Gagal membuat kategori", error });
    }
};

// operasi read
export const getcategories = async (req: Request, res: Response) => {
    try {
        const categories = await prisma.category.findMany({
            orderBy: { id: "asc" },
            include: {
                events: true, // Agar tahu kategori ini dipakai di event apa saja
            }
        });
        res.json(categories);
    } catch (error) {
        res.status(500).json({ message: "Gagal mengambil data kategori", error });
    }
};

// operasi read by id
export const getcategorybyId = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);

        const category = await prisma.category.findUnique({
            where: { id },
            include: {
                events: true, // Supaya detail event-nya ikut keluar
            }
        });

        if (!category) {
            return res.status(404).json({
                message: "Kategori tidak ditemukan",
            });
        }

        res.json(category);
    } catch (error) {
        res.status(500).json({
            message: "Gagal mengambil detail kategori",
            error,
        });
    }
};

// operasi update
export const updatecategory = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);

        const existingCategory = await prisma.category.findUnique({
            where: { id },
        });

        if (!existingCategory) {
            return res.status(404).json({
                message: "Kategori tidak ditemukan",
            });
        }

        const { name } = req.body;

        if (!name) {
            return res.status(400).json({ message: "Nama kategori baru wajib diisi" });
        }

        const updatedCategory = await prisma.category.update({
            where: { id },
            data: { name },
        });

        res.json({
            message: "Kategori berhasil diupdate",
            data: updatedCategory,
        });
    } catch (error) {
        res.status(500).json({
            message: "Gagal update kategori",
            error,
        });
    }
};

// operasi delete
export const deletecategory = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);

        // Cek apakah kategorinya ada sebelum dihapus
        const existingCategory = await prisma.category.findUnique({
            where: { id },
        });

        if (!existingCategory) {
            return res.status(404).json({
                message: "Kategori tidak ditemukan",
            });
        }

        // Melakukan penghapusan
        await prisma.category.delete({
            where: { id },
        });

        res.json({
            message: "Kategori berhasil dihapus secara permanen",
        });
    } catch (error) {
        // TIPS: Jika kategori ini sudah terlanjur dipakai di tabel Event, 
        // PostgreSQL akan menolak dihapus (Error Foreign Key Constraint). Kita tangani di sini:
        res.status(500).json({
            message: "Gagal menghapus kategori. Pastikan kategori tidak sedang digunakan oleh event mana pun.",
            error,
        });
    }
};