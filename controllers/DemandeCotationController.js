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





