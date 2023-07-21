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
