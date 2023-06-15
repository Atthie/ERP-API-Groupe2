import Entreprise from "../models/entreprises.js";
import validator from 'validator';
import User from "../models/users.js";
import transporter from "../config/emailConfig.js";
import bcrypt from 'bcrypt';

export const inscriptionController = async (req, res) => {
  try {
    const { nom, logo,description, email } = req.body;
    // Validation des données
    if (validator.isEmpty(nom)) {
      return res.status(400).json({ error: "Le champ 'nom' est requis." });
    }
    if (validator.isEmpty(description)) {
      return res.status(400).json({ error: "Le champ 'description' est requis." });
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
      etat:'Ouverte'

    });

    // Création de l'utilisateur de l'entreprise avec mot de passe crypté
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash("Erp@2023", saltRounds);
    const newUser = await User.create({
      username: newEntreprise.email,
      idEntreprise: newEntreprise.id,
      pwd: hashedPassword,
      email: "",
      telephone: "",
      role: "Vendeur"
    });

    // Envoi d'un e-mail à l'entreprise avec les informations de connexion de l'utilisateur
    const mailOptions = {
      from: 'atthiemn@gmail',
      to: newEntreprise.email,
      subject: 'Informations de connexion',
      text: `Bonjour ${newEntreprise.nom},\n\nVoici les informations de connexion pour votre utilisateur :\n\nNom d'utilisateur : ${newUser.username}\nMot de passe : Erp@2023\n\nCordialement,`,
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
     message: "Compte crée avec succès, veuillez consulter votre boite mail"
    });
  } catch (error) {
    console.error("Erreur lors de l'inscription de l'utilisateur :", error);
    res.status(500).json({ error: "Une erreur est survenue lors de l'inscription" });
  }
};


