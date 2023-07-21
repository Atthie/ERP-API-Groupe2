import express from "express";
import { Affcomptabilite,ReqComptabilite} from "../controllers/comptabiliteController.js";

const routerCompte = express.Router()

routerCompte.get("/montant",Affcomptabilite)
// router.post("/enregistrer",ReqProduction)

routerCompte.post("/transaction" , ReqComptabilite);

export default routerCompte