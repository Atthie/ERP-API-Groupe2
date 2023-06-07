import Entreprise from "../models/entreprises.js";
import validator from 'validator';
import User from "../models/users.js"
import transporter from "../config/emailConfig.js"
export const inscriptionController = async (req, res) => {
  try {
    const {  nom, description, email, telephone } = req.body;
    // Validation de données

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
     //Fin Validation de données

    //  Creation de l'entreprise
    const newEntreprise = await Entreprise.create({
      nom,
      description,
      email,
      telephone
    });

    // Creation de l'utilisateur de l'entreprise
    const idEntreprise = newEntreprise.id;

    const newUser = await User.create({
      username: newEntreprise.email,
      idEntreprise,
      pwd: "Erp@2023",
      email: "",
      telephone: "",
      role:"Vendeur"
    });


    // Envoi d'un e-mail à l'entreprise avec les informations de connexion de l'utilisateur
    const mailOptions = {
      from: 'atthie27@gmail',
      to: newEntreprise.email,
      subject: 'Informations de connexion',
      text: `Bonjour ${newEntreprise.nom},\n\nVoici les informations de connexion pour votre utilisateur :\n\nNom d'utilisateur : ${newUser.username}\nMot de passe : ${newUser.pwd}\n\nCordialement,`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Erreur lors de l'envoi de l'e-mail :", error);
      } else {
        console.log('E-mail envoyé avec succès:', info.response);
      }
    });
    // Fin envoi mail

    res.status(201).json({
        entreprise: newEntreprise,
        user:newUser,
    });
  } catch (error) {
    console.error("Erreur lors de l'inscription de l'utilisateur :", error);
    res.status(500).json({ error: "Une erreur est survenue lors de l'inscription" });
  }
};

