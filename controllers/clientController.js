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
export const createClient = async (req, res) => {
  try {
    const { nom, email, entreprise, adresse } = req.body;
    const utilisateur = req.user; // Obtient l'utilisateur actuel à partir de l'authentification (exemple: JWT)

    const erreurs = validationResult(req);
    if (!erreurs.isEmpty()) {
      return res.status(400).json({ erreurs: erreurs.array() });
    }

    const nouveauClient = await Client.create({
      nom,
      email,
      entreprise,
      adresse,
      statut: '',
      userId: utilisateur.id // Lie le client à l'utilisateur actuel
    });

    res.status(201).json({ client: nouveauClient });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Une erreur est survenue lors de la création du client.' });
  }
};

/**
 * Récupère tous les clients de l'utilisateur actuel.
 *
 * @param {Object} req - Requête HTTP
 * @param {Object} res - Réponse HTTP
 * @returns {Object} - Liste des clients
 */
export const getClients = async (req, res) => {
  try {
    const utilisateur = req.user; // Obtient l'utilisateur actuel à partir de l'authentification (exemple: JWT)

    const clients = await Client.findAll({ where: { userId: utilisateur.id } });

    res.status(200).json({ clients });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Une erreur est survenue lors de la récupération des clients.' });
  }
};

/**
 * Récupère un client par son ID.
 *
 * @param {Object} req - Requête HTTP
 * @param {Object} res - Réponse HTTP
 * @returns {Object} - Client récupéré
 */
export const getClientById = async (req, res) => {
  try {
    const utilisateur = req.user; // Obtient l'utilisateur actuel à partir de l'authentification (exemple: JWT)
    const idClient = req.params.id;

    const client = await Client.findOne({ where: { id: idClient, userId: utilisateur.id } });

    if (!client) {
      return res.status(404).json({ message: 'Client non trouvé.' });
    }

    res.status(200).json({ client });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Une erreur est survenue lors de la récupération du client.' });
  }
};

/**
 * Met à jour les informations d'un client.
 *
 * @param {Object} req - Requête HTTP
 * @param {Object} res - Réponse HTTP
 * @returns {Object} - Client mis à jour
 */
export const updateClient = async (req, res) => {
  try {
    const { nom, email, entreprise, adresse, statut } = req.body;
    const utilisateur = req.user; // Obtient l'utilisateur actuel à partir de l'authentification (exemple: JWT)
    const idClient = req.params.id;

    const erreurs = validationResult(req);
    if (!erreurs.isEmpty()) {
      return res.status(400).json({ erreurs: erreurs.array() });
    }

    const client = await Client.findOne({ where: { id: idClient, userId: utilisateur.id } });

    if (!client) {
      return res.status(404).json({ message: 'Client non trouvé.' });
    }

    await client.update({
      nom: nom || client.nom,
      email: email || client.email,
      entreprise: entreprise || client.entreprise,
      adresse: adresse || client.adresse,
      statut: statut || client.statut
    });

    res.status(200).json({ client });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Une erreur est survenue lors de la mise à jour du client.' });
  }
};

/**
 * Supprime un client.
 *
 * @param {Object} req - Requête HTTP
 * @param {Object} res - Réponse HTTP
 * @returns {Object} - Confirmation de suppression
 */
export const deleteClient = async (req, res) => {
  try {
    const utilisateur = req.user; // Obtient l'utilisateur actuel à partir de l'authentification (exemple: JWT)
    const idClient = req.params.id;

    const client = await Client.findOne({ where: { id: idClient, userId: utilisateur.id } });

    if (!client) {
      return res.status(404).json({ message: 'Client non trouvé.' });
    }

    await client.destroy();

    res.status(200).json({ message: 'Client supprimé avec succès.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Une erreur est survenue lors de la suppression du client.' });
  }
};
