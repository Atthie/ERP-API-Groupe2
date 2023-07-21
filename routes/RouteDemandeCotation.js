import express from 'express';
import  {createDemandeCotation, getAllDemandeCotation, getDemandeCotationById, updateDemandeCotation, deleteDemandeCotation} from '../controllers/DemandeCotationController.js';

const router = express.Router();

// Créer une nouvelle demande de cotation
router.post('/', createDemandeCotation);

// Récupérer toutes les demandes de cotation
router.get('/', getAllDemandeCotation);

// Récupérer la demande de cotation par id
router.get('/', getDemandeCotationById);

// Mettre à jour une demande de cotation
router.put('/:id', updateDemandeCotation);

// Supprimer une demande de cotation
router.delete('/:id', deleteDemandeCotation);

export default router;
