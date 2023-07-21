import { validationResult } from 'express-validator';
import Facture from '../models/facture.js';

/**
 * Crée une facture en réponse à une demande de cotation.
 *
 * @param {Object} req - Requête HTTP
 * @param {Object} res - Réponse HTTP
 * @returns {Object} - Facture créée
 */
export const createFacture = async (req, res) => {
  try {
    const { entreprise, description, articles } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const totalHT = articles.reduce((total, article) => total + article.quantite * article.prixUnitaire, 0);
    const taxes = totalHT * 0.2;
    const totalTTC = totalHT + taxes;

    const nouvelleFacture = await Facture.create({
      nom,
      entreprise,
      description,
      articles,
      totalHT,
      taxes,
      totalTTC,
      date: new Date(),
    });

    res.status(201).json({ facture: nouvelleFacture });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Une erreur est survenue lors de la création de la facture.' });
  }
};

/**
 * Récupère toutes les factures.
 *
 * @param {Object} req - Requête HTTP
 * @param {Object} res - Réponse HTTP
 * @returns {Object} - Liste des factures
 */
export const getFactures = async (req, res) => {
  try {
    const factures = await Facture.findAll();
    res.status(200).json({ factures });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Une erreur est survenue lors de la récupération des factures.' });
  }
};

/**
 * Récupère une facture par son ID.
 *
 * @param {Object} req - Requête HTTP
 * @param {Object} res - Réponse HTTP
 * @returns {Object} - Facture par ID
 */
export const getFactureById = async (req, res) => {
  try {
    const { id } = req.params;
    const facture = await Facture.findByPk(id);

    if (!facture) {
      return res.status(404).json({ message: 'Facture non trouvée.' });
    }

    res.status(200).json({ facture });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Une erreur est survenue lors de la récupération de la facture.' });
  }
};

/**
 * Met à jour une facture.
 *
 * @param {Object} req - Requête HTTP
 * @param {Object} res - Réponse HTTP
 * @returns {Object} - Facture mise à jour
 */
export const updateFacture = async (req, res) => {
  try {
    const { id } = req.params;
    const { entreprise, description, articles } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const facture = await Facture.findByPk(id);

    if (!facture) {
      return res.status(404).json({ message: 'Facture non trouvée.' });
    }

    const totalHT = articles.reduce((total, article) => total + article.quantite * article.prixUnitaire, 0);
    const taxes = totalHT * 0.2;
    const totalTTC = totalHT + taxes;
    facture.nom = nom;
    facture.entreprise = entreprise;
    facture.description = description;
    facture.articles = articles;
    facture.totalHT = totalHT;
    facture.taxes = taxes;
    facture.totalTTC = totalTTC;
    facture.updatedAt = new Date();

    await facture.save();

    res.status(200).json({ facture });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Une erreur est survenue lors de la mise à jour de la facture.' });
  }
};

/**
 * Supprime une facture.
 *
 * @param {Object} req - Requête HTTP
 * @param {Object} res - Réponse HTTP
 * @returns {Object} - Message de succès
 */
export const deleteFacture = async (req, res) => {
  try {
    const { id } = req.params;

    const facture = await Facture.findByPk(id);

    if (!facture) {
      return res.status(404).json({ message: 'Facture non trouvée.' });
    }

    await facture.destroy();

    res.status(200).json({ message: 'Facture supprimée avec succès.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Une erreur est survenue lors de la suppression de la facture.' });
  }
};

/**
 * Annule une facture dans les 20 minutes suivant son envoi.
 *
 * @param {Object} req - Requête HTTP
 * @param {Object} res - Réponse HTTP
 * @returns {Object} - Message de succès
 */
export const cancelFacture = async (req, res) => {
  try {
    const { id } = req.params;

    const facture = await Facture.findByPk(id);

    if (!facture) {
      return res.status(404).json({ message: 'Facture non trouvée.' });
    }

    const currentTime = new Date();
    const timeDifference = currentTime - facture.date;

    if (timeDifference > 20 * 60 * 1000) {
      return res.status(400).json({ message: 'La période d\'annulation de la facture est écoulée.' });
    }

    await facture.destroy();

    res.status(200).json({ message: 'Facture annulée avec succès.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Une erreur est survenue lors de l\'annulation de la facture.' });
  }
};
