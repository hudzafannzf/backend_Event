import { Router } from 'express';
import { createevents, getallevents, geteventbyId, updateevent, deleteevent } from '../controllers/eventcontrollers.js';

const router = Router();

router.post('/events', createevents); // Route untuk tambah data
router.get('/events', getallevents);   // Route untuk ambil semua data
router.get('/events/:id', geteventbyId); // Route untuk ambil data berdasarkan id
router.put('/events/:id', updateevent); // Route untuk update data
router.delete('/events/:id', deleteevent); // Route untuk delete data

export default router;