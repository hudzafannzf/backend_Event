import type { Request, Response } from "express";
import { prisma } from "../lib/db.js";

// operasi create
export const createevents = async (req: Request, res: Response) => {
    try {
        const { name, categoryId, speakerIds, location, dateEvent, description } = req.body;

        // Validasi agar array speakerIds juga wajib diisi
        if (!name || !categoryId || !speakerIds || !location || !dateEvent || !description) {
            return res.status(400).json({
                message: "Semua field wajib diisi, termasuk daftar speakerIds",
            });
        }

        const newevent = await prisma.event.create({
            data: {
                name,
                categoryId: Number(categoryId),
                location,
                dateEvent: new Date(dateEvent),
                description,
                speakers: {
                    connect: speakerIds.map((id: number) => ({ id: Number(id) })),
                },
            },
            include: {
                category: true,
                speakers: true, 
            }
        });

        res.status(201).json({
            message: "Data event baru berhasil di simpan",
            data: newevent,
        });
    } catch (error) {
        res.status(500).json({ message: "Gagal membuat event baru", error })
    }
};

// operasi read
export const getallevents = async (req: Request, res: Response) => {
    try {
        const events = await prisma.event.findMany({
            orderBy: {
                createdAt: "desc",
            },
            include: {
                category: true,
                speakers: true,
            }
        });

        res.json(events);
    } catch (error) {
        res.status(500).json({
            message: "Gagal mengambil data",
            error,
        });
    }
};

// operasi read by id
export const geteventbyId = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);

        const event = await prisma.event.findUnique({
            where: { id },
            include: {
                category: true,
                speakers: true,
            }
        });
        if (!event) {
            return res.status(404).json({
                message: "Event tidak ditemukan",
            });
        }
        res.json(event);
    } catch (error) {
        res.status(500).json({
            message: "Gagal mengambil detail event",
            error,
        });
    }
};

// operasi update
export const updateevent = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);

        const existingEvent = await prisma.event.findUnique({
            where: { id },
        });
        if (!existingEvent) {
            return res.status(404).json({
                message: "Event tidak ditemukan",
            });
        }
        
        const { name, categoryId, speakerIds, location, dateEvent, description } = req.body;
        
        const updatedEvent = await prisma.event.update({
            where: { id },
            data: {
                name: name ?? existingEvent.name,
                categoryId: categoryId ? Number(categoryId) : existingEvent.categoryId,
                location: location ?? existingEvent.location,
                dateEvent: dateEvent ? new Date(dateEvent) : existingEvent.dateEvent,
                description: description ?? existingEvent.description,
                // JIKA user mengirim daftar speakerIds baru, kita timpa relasi lamanya
                ...(speakerIds && {
                    speakers: {
                        set: speakerIds.map((id: number) => ({ id: Number(id) })),
                    },
                }),
            },
            include: {
                category: true,
                speakers: true,
            }
        });
        
        res.json({
            message: "Event berhasil diupdate",
            data: updatedEvent,
        });
    } catch (error) {
        res.status(500).json({
            message: "Gagal update event",
            error,
        });
    }
};

// operasi delete
export const deleteevent = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);

        const existingEvent = await prisma.event.findUnique({
            where: { id },
        });
        if (!existingEvent) {
            return res.status(404).json({
                message: "Event tidak ditemukan",
            });
        }
        
        await prisma.event.delete({
            where: { id },
        });
        
        res.json({
            message: "Event berhasil dihapus",
        });
    } catch (error) {
        res.status(500).json({
            message: "Gagal menghapus event",
            error,
        });
    }
};