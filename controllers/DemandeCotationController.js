import Entreprise from "../models/entreprises.js";
import validator from 'validator';
import transporter from "../config/emailConfig.js";
import bcrypt from 'bcrypt';
import DemandeCotation from '../models/demandeCotation.js';

export const DemandeCotationController = async (req, res) => {
    const { etat,userId, description, dateFin } = req.body;
    if (typeof userId === 'string') {
      if (validator.isEmpty(userId)) {
        return res.status(400).json({ error: "Le champ 'nom' est requis." });
      }
    }
    
    if (validator.isEmpty(description)) {
      return res.status(400).json({ error: "Le champ 'description' est requis." });
    }
    if (validator.isEmpty(dateFin)) {
      return res.status(400).json({ error: "Le champ 'email' est requis." });
    }
   
    const dm = await DemandeCotation.create({
      description,
      etat,
      dateFin,
      userId
    });
   
    res.status(201).json(dm);
  
};

export const getAllDemandeCotation = async (req, res) => {
  try {
    const demandesCotation = await DemandeCotation.findAll();
    res.json(demandesCotation);
  } catch (error) {
    res.status(500).json({ error: 'Une erreur est survenue lors de la récupération des demandes de cotation.' });
  }
};

export const deleteDemandeCotation = async (req, res) => {
  const { id } = req.params;

  try {
    const demandeCotation = await DemandeCotation.findByPk(id);
    if (!demandeCotation) {
      return res.status(404).json({ error: 'Demande de cotation non trouvée' });
    }

    await demandeCotation.destroy();

    return res.status(200).json({ message: 'Demande de cotation supprimée avec succès' });
  } catch (error) {
    console.error('Une erreur est survenue lors de la suppression de la demande de cotation :', error);
    return res.status(500).json({ error: 'Une erreur est survenue lors de la suppression de la demande de cotation' });
  }
};

export const getLastCreatedElement = async (req, res) => {
  try {
    const lastElement = await DemandeCotation.findOne({
      order: [['createdAt', 'DESC']], // Tri par ordre décroissant selon la date de création
    });

    if (!lastElement) {
      return res.status(404).json({ message: "Aucun élément trouvé." });
    }

    return res.status(200).json(lastElement);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Une erreur s'est produite lors de la récupération du dernier élément créé." });
  }
};






