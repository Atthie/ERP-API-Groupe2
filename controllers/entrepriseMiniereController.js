import Entreprise from "../models/entreprises.js";
import validator from 'validator';
import transporter from "../config/emailConfig.js";
import bcrypt from 'bcrypt';

export const inscriptionEMController = async (req, res) => {
  try {
    const { nom, description, email } = req.body;
    // Validation des données
    if (validator.isEmpty(nom)) {
      return res.status(400).json({ error: "Le champ 'nom' est requis." });
    }
    if (validator.isEmpty(description)) {
      return res.status(400).json({ error: "Le champ 'description' est requis." });
    }
   
    if (validator.isEmpty(email)) {
      return res.status(400).json({ error: "Le champ 'email' est requis." });
    }
    if (!validator.isEmail(email)) {
      return res.status(400).json({ error: "L'adresse e-mail est invalide." });
    }
    const existingEntrepriseName = await Entreprise.findOne({ where: { nom } });
    if (existingEntrepriseName) {
      return res.status(400).json({ error: "Une entreprise avec ce nom existe" });
    }
    const existingEntrepriseEmail = await Entreprise.findOne({ where: { email } });
    if (existingEntrepriseEmail) {
      return res.status(400).json({ error: "Une entreprise avec cette adresse e-mail existe déjà." });
    }

    // Création de l'entreprise
    const newEntreprise = await Entreprise.create({
      nom,
      description,
      email

    });

    // Envoi d'un e-mail à l'entreprise Miniere avec le lien de l inscription 
    
    const hashedId = await bcrypt.hash(String(newEntreprise.id), 10);
    const mailOptions = {
      from: 'atthiemn@gmail',
      to: newEntreprise.email,
      subject: 'Invitation d inscription',
      text: `Bonjour ${newEntreprise.nom}, voici votre lien d'inscription :  http://192.168.0.105:3001/${hashedId}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Erreur lors de l'envoi de l'e-mail :", error);
      } else {
        console.log('E-mail envoyé avec succès:', info.response);
      }
    });
    // Fin de l'envoi de l'e-mail

    res.status(201).json({
      message: "Compte crée avec succès"

    });
  } catch (error) {
    console.error("Erreur lors de l'inscription de l'utilisateur :", error);
    res.status(500).json({ error: "Une erreur est survenue lors de l'inscription" });
  }
};

export const getAllEntreprisesMinieres = async (req, res) => {
  try {
    const entreprises = await Entreprise.findAll();
    res.json(entreprises);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Une erreur s\'est produite lors de la récupération des entreprises' });
  }
};




