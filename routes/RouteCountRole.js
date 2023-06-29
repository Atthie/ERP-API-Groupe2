import express from "express";
import { getUserCountByRole}  from '../controllers/userController.js';
const router = express.Router();

router.get('', getUserCountByRole);

export default router;
