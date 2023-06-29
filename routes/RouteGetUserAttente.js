import express from "express";
import { getUserAttente}  from '../controllers/userController.js';
const router = express.Router();

router.get('', getUserAttente);

export default router;
