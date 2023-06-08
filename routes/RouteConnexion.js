import express from "express";
import { connexionController } from "../controllers/connexionController.js";

const routerConnexion = express.Router();

routerConnexion.post("", connexionController);
export default routerConnexion;
