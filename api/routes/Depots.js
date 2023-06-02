import express from 'express';
import { addDepot } from '../controllers/Depot';

const router = express.Router();

// Route pour ajouter un dépôt
router.post('/addDepot', addDepot);

export default router;
