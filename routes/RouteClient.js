import express from 'express';
import { createClient, getClients, getClientById, updateClient, deleteClient } from '../controllers/clientController.js';

const router = express.Router();

// Créer un nouveau client
router.post('/',createClient);

// Récupérer tous les clients de l'utilisateur actuel
router.get('/', getClients);

// Récupérer un client par son ID
router.get('/:id', getClientById);

// Mettre à jour les informations d'un client
router.put('/:id',updateClient);

// Supprimer un client
router.delete('/:id', deleteClient);

export default router;
