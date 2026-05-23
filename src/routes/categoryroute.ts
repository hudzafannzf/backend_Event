import { Router } from 'express';
import { createcategory, getcategories, getcategorybyId, updatecategory, deletecategory } from '../controllers/categorycontroller.js';

const router = Router();

router.post('/categories', createcategory);
router.get('/categories', getcategories);
router.get('/categories/:id', getcategorybyId); 
router.put('/categories/:id', updatecategory);   
router.delete('/categories/:id', deletecategory); 

export default router;