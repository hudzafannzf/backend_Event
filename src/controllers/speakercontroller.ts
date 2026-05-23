import type { Request, Response } from 'express';
import { prisma } from '../lib/db.js';

// operasi create
export const createspeaker = async (req: Request, res: Response) => {
    try {
        const { name, role, image } = req.body;

        // Validasi input wajib
        if (!name || !role || !image) {
            return res.status(400).json({ message: "Semua field (name, role, image) wajib diisi" });
        }

        const newSpeaker = await prisma.speaker.create({
            data: { name, role, image },
        });

        res.status(201).json({
            message: "Speaker berhasil dibuat",
            data: newSpeaker,
        });
    } catch (error) {
        res.status(500).json({ message: "Gagal membuat speaker", error });
    }
};

// operasi read
export const getspeakers = async (req: Request, res: Response) => {
    try {
        const speakers = await prisma.speaker.findMany({
            orderBy: { id: "asc" },
            // Supaya daftar event tiap speaker ikut muncul
            include: {
                events: true, 
            },
        });
        res.json(speakers);
    } catch (error) {
        res.status(500).json({ message: "Gagal mengambil data speaker", error });
    }
};

// operasi read by id
export const getspeakerbyId = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);

        const speaker = await prisma.speaker.findUnique({
            where: { id },
            // Agar detail event yang diisi ikut keluar
            include: {
                events: true,
            },
        });

        if (!speaker) {
            return res.status(404).json({ message: "Speaker tidak ditemukan" });
        }

        res.json(speaker);
    } catch (error) {
        res.status(500).json({ message: "Gagal mengambil detail speaker", error });
    }
};

// operasi update
export const updatespeaker = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const { name, role, image } = req.body;

        // Cek apakah data speaker ada di database
        const existingSpeaker = await prisma.speaker.findUnique({ where: { id } });
        if (!existingSpeaker) {
            return res.status(404).json({ message: "Speaker tidak ditemukan" });
        }

        const updatedSpeaker = await prisma.speaker.update({
            where: { id },
            data: {
                name: name ?? existingSpeaker.name,
                role: role ?? existingSpeaker.role,
                image: image ?? existingSpeaker.image,
            },
        });

        res.json({
            message: "Data speaker berhasil diupdate",
            data: updatedSpeaker,
        });
    } catch (error) {
        res.status(500).json({ message: "Gagal mengupdate speaker", error });
    }
};

// operasi delete
export const deletespeaker = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);

        const existingSpeaker = await prisma.speaker.findUnique({ where: { id } });
        if (!existingSpeaker) {
            return res.status(404).json({ message: "Speaker tidak ditemukan" });
        }

        await prisma.speaker.delete({
            where: { id },
        });

        res.json({ message: "Speaker berhasil dihapus secara permanen" });
    } catch (error) {
        res.status(500).json({ message: "Gagal menghapus speaker", error });
    }
};