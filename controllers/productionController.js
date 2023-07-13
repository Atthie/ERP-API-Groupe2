import { validationResult } from 'express-validator';
import User from '../models/users.js';
import Client from '../models/client.js';

/**
 * Crée un nouveau client.
 *
 * @param {Object} req - Requête HTTP
 * @param {Object} res - Réponse HTTP
 * @returns {Object} - Client créé
 */
export const createProduction = async (req, res) => {
  try {
    const { Produit, Ressource, Delai, Etat,Cout,Quantite } = req.body;
    const utilisateur = req.user; // Obtient l'utilisateur actuel à partir de l'authentification (exemple: JWT)

    const erreurs = validationResult(req);
    if (!erreurs.isEmpty()) {
      return res.status(400).json({ erreurs: erreurs.array() });
    }

    const nouveauProduit = await Production.create({
      Non,
      Ressource,
      Delai,
      Etat,
      Cout,
      Quantite,
      userId: utilisateur.id // Lie le client à l'utilisateur actuel
    });

    res.status(201).json({ Production: nouveauProduit });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Une erreur est survenue lors de la création du produit.' });
  }
};

/**
 * Récupère tous les clients de l'utilisateur actuel.
 *
 * @param {Object} req - Requête HTTP
 * @param {Object} res - Réponse HTTP
 * @returns {Object} - Liste des clients
 */
export const getProductions = async (req, res) => {
  try {
    const utilisateur = req.user; // Obtient l'utilisateur actuel à partir de l'authentification (exemple: JWT)

    const Production = await Production.findAll({ where: { userId: utilisateur.id } });

    res.status(200).json({ Production });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Une erreur est survenue lors de la récupération des Produits.' });
  }
};

/**
 * Récupère un client par son ID.
 *
 * @param {Object} req - Requête HTTP
 * @param {Object} res - Réponse HTTP
 * @returns {Object} - Client récupéré
 */
export const getProductionById = async (req, res) => {
  try {
    const utilisateur = req.user; // Obtient l'utilisateur actuel à partir de l'authentification (exemple: JWT)
    const idProduction = req.params.id;

    const Production = await Client.findOne({ where: { id: idClient, userId: utilisateur.id } });

    if (!Production) {
      return res.status(404).json({ message: 'Produit non trouvé.' });
    }

    res.status(200).json({ Production });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Une erreur est survenue lors de la récupération du Produit.' });
  }
};

/**
 * Met à jour les informations d'un client.
 *
 * @param {Object} req - Requête HTTP
 * @param {Object} res - Réponse HTTP
 * @returns {Object} - Client mis à jour
 */
export const updateProduction = async (req, res) => {
  try {
    const { Produit, Ressource, Quantite, Delai, Cout, Etat } = req.body;
    const utilisateur = req.user; // Obtient l'utilisateur actuel à partir de l'authentification (exemple: JWT)
    const idProduction = req.params.id;

    const erreurs = validationResult(req);
    if (!erreurs.isEmpty()) {
      return res.status(400).json({ erreurs: erreurs.array() });
    }

    const Production = await Production.findOne({ where: { id: idProduction, userId: utilisateur.id } });

    if (!Production) {
      return res.status(404).json({ message: 'Produit non trouvé.' });
    }

    await Production.update({
      nom: nom || Produit.nom,
      ressource: Ressource || Produit.ressource,
      quantite: Quantite || Produit.Quantite,
      etat: Etat || Produit.etat,
      delai: Delai || Produit.delai,
      cout: Cout || Produit.cout
    });

    res.status(200).json({ Production });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Une erreur est survenue lors de la mise à jour du produit.' });
  }
};

/**
 * Supprime un client.
 *
 * @param {Object} req - Requête HTTP
 * @param {Object} res - Réponse HTTP
 * @returns {Object} - Confirmation de suppression
 */
export const deleteProduction = async (req, res) => {
  try {
    const utilisateur = req.user; // Obtient l'utilisateur actuel à partir de l'authentification (exemple: JWT)
    const idProduction = req.params.id;

    const Production = await Production.findOne({ where: { id: idProduction, userId: utilisateur.id } });

    if (!Production) {
      return res.status(404).json({ message: 'Produit non trouvé.' });
    }

    await Production.destroy();

    res.status(200).json({ message: 'Produit supprimé avec succès.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Une erreur est survenue lors de la suppression du produit.' });
  }
};
