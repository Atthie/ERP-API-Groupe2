import Entreprise from "../models/entreprises.js";
import validator from 'validator';
import transporter from "../config/emailConfig.js";

export const inscriptionEMController = async (req, res) => {
  try {
    const { nom, description, email, telephone } = req.body;
    // Validation des données
    if (validator.isEmpty(nom)) {
      return res.status(400).json({ error: "Le champ 'nom' est requis." });
    }
    if (validator.isEmpty(description)) {
      return res.status(400).json({ error: "Le champ 'description' est requis." });
    }
    if (validator.isEmpty(telephone)) {
      return res.status(400).json({ error: "Le champ 'telephone' est requis." });
    }
    if (validator.isEmpty(email)) {
      return res.status(400).json({ error: "Le champ 'email' est requis." });
    }
    if (!validator.isEmail(email)) {
      return res.status(400).json({ error: "L'adresse e-mail est invalide." });
    }
    // Fin de la validation des données

    // Vérification si l'entreprise existe déjà
    const existingEntreprise = await Entreprise.findOne({ where: { email } });
    if (existingEntreprise) {
      return res.status(400).json({ error: "Une entreprise avec cette adresse e-mail existe déjà." });
    }

    // Création de l'entreprise
    const newEntreprise = await Entreprise.create({
      nom,
      description,
      email,
      telephone
    });

    // Envoi d'un e-mail à l'entreprise Miniere avec le lien de l inscription 
    
    const mailOptions = {
      from: 'atthiemn@gmail',
      to: newEntreprise.email,
      subject: 'Invitation d inscription',
      text: `Bonjour ${newEntreprise.nom}, voici votre lien d'inscription :  http://192.168.0.105:3001`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Erreur lors de l'envoi de l'e-mail :", error);
      } else {
        console.log('E-mail envoyé avec succès:', info.response);
      }
    });
    // Fin de l'envoi de l'e-mail

    res.status(201).json({newEntreprise
    });
  } catch (error) {
    console.error("Erreur lors de l'inscription de l'utilisateur :", error);
    res.status(500).json({ error: "Une erreur est survenue lors de l'inscription" });
  }
};


