import { Router } from 'express';
import { createspeaker, getspeakers, getspeakerbyId, updatespeaker, deletespeaker } from '../controllers/speakercontroller.js';

const router = Router();

router.post('/speakers', createspeaker);
router.get('/speakers', getspeakers);
router.get('/speakers/:id', getspeakerbyId);
router.put('/speakers/:id', updatespeaker);
router.delete('/speakers/:id', deletespeaker);

export default router;