import express from "express";
import { addArticleCotation } from "../../controllers/articleCotation.js";

const router = express.Router();

router.post("", addArticleCotation);

export default router;
