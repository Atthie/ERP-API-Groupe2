<<<<<<< HEAD
import Entreprise from "../models/entreprises.js";
import validator from 'validator';
import transporter from "../config/emailConfig.js";
import bcrypt from 'bcrypt';
import DemandeCotation from '../models/demandeCotation.js';
import ArticleCotation from "../models/articleCotation.js";

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
=======
import { validationResult } from 'express-validator';
import DemandeCotationModel from '../models/demandeCotation.js';

/**
 * Crée une nouvelle demande de cotation.
 *
 * @param {Object} req - Requête HTTP
 * @param {Object} res - Réponse HTTP
 * @returns {Object} - Demande de cotation créée
 */
export const createDemandeCotation = async (req, res) => {
>>>>>>> 6fe4e1486dae252451c4b324872ed938c10141c5
  try {
    const { nom, etat, description, duree, dateFin } = req.body;

    const erreurs = validationResult(req);
    if (!erreurs.isEmpty()) {
      return res.status(400).json({ erreurs: erreurs.array() });
    }

    const nouvelleDemandeCotation = await DemandeCotationModel.create({
      nom,
      etat,
      description,
      duree,
      dateFin,
    });

    res.status(201).json({ demandeCotation: nouvelleDemandeCotation });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Une erreur est survenue lors de la création de la demande de cotation.' });
  }
};

<<<<<<< HEAD
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

export const getDemandeCotationById = async (req, res) => {
  try {
    const { id } = req.params;

    const demandeCotation = await DemandeCotation.findByPk(id);
   
    if (!demandeCotation) {
      return res.status(404).json({ error: 'Demande de cotation introuvable' });
    }

    return res.json(demandeCotation);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erreur lors de la récupération de la demande de cotation' });
  }
};


export const publierDemandeCotation = async (req, res) => {
  const { id } = req.params; 

  try {
    const demandeCotation = await DemandeCotation.findByPk(id);

    if (!demandeCotation) {
      return res.status(404).json({ message: "La demande de cotation n'a pas été trouvée." });
    }

    demandeCotation.etat = 'publié';

    await demandeCotation.save();

    return res.status(200).json({ message: 'La demande de cotation a été publiée avec succès.' });
  } catch (error) {
    return res.status(500).json({ message: 'Une erreur est survenue lors de la modification de la demande de cotation.', error: error.message });
  }
};




=======
/**
 * Récupère toutes les demandes de cotation.
 *
 * @param {Object} req - Requête HTTP
 * @param {Object} res - Réponse HTTP
 * @returns {Object} - Liste des demandes de cotation
 */
export const getAllDemandeCotation = async (req, res) => {
  try {
    const demandeCotations = await DemandeCotationModel.findAll();
    const nombreTotalDemandesCotation = demandeCotations.length;
>>>>>>> 6fe4e1486dae252451c4b324872ed938c10141c5

    res.status(200).json({ demandeCotations, nombreTotalDemandesCotation });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Une erreur est survenue lors de la récupération des demandes de cotation.' });
  }
};

/**
 * Récupère une demande de cotation par son ID.
 *
 * @param {Object} req - Requête HTTP
 * @param {Object} res - Réponse HTTP
 * @returns {Object} - Demande de cotation récupérée
 */
export const getDemandeCotationById = async (req, res) => {
  try {
    const idDemandeCotation = req.params.id;

    const demandeCotation = await DemandeCotationModel.findOne({ where: { id: idDemandeCotation } });

    if (!demandeCotation) {
      return res.status(404).json({ message: 'Demande de cotation non trouvée.' });
    }

    res.status(200).json({ demandeCotation });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Une erreur est survenue lors de la récupération de la demande de cotation.' });
  }
};

/**
 * Met à jour les informations d'une demande de cotation.
 *
 * @param {Object} req - Requête HTTP
 * @param {Object} res - Réponse HTTP
 * @returns {Object} - Demande de cotation mise à jour
 */
export const updateDemandeCotation = async (req, res) => {
  try {
    const { nom, etat, description, duree, dateFin } = req.body;
    const idDemandeCotation = req.params.id;

    const erreurs = validationResult(req);
    if (!erreurs.isEmpty()) {
      return res.status(400).json({ erreurs: erreurs.array() });
    }

    const demandeCotation = await DemandeCotationModel.findOne({ where: { id: idDemandeCotation } });

    if (!demandeCotation) {
      return res.status(404).json({ message: 'Demande de cotation non trouvée.' });
    }

    await demandeCotation.update({
      nom: nom || demandeCotation.nom,
      etat: etat || demandeCotation.etat,
      description: description || demandeCotation.description,
      duree: duree || demandeCotation.duree,
      dateFin: dateFin || demandeCotation.dateFin,
    });

    res.status(200).json({ demandeCotation });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Une erreur est survenue lors de la mise à jour de la demande de cotation.' });
  }
};

/**
 * Supprime une demande de cotation.
 *
 * @param {Object} req - Requête HTTP
 * @param {Object} res - Réponse HTTP
 * @returns {Object} - Confirmation de suppression
 */
export const deleteDemandeCotation = async (req, res) => {
  try {
    const idDemandeCotation = req.params.id;

    const demandeCotation = await DemandeCotationModel.findOne({ where: { id: idDemandeCotation } });

    if (!demandeCotation) {
      return res.status(404).json({ message: 'Demande de cotation non trouvée.' });
    }

    await demandeCotation.destroy();

    res.status(200).json({ message: 'Demande de cotation supprimée avec succès.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Une erreur est survenue lors de la suppression de la demande de cotation.' });
  }
};
