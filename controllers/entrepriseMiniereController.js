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
      email,
      etat:'Ouverte'
    });
    // Envoi d'un e-mail à l'entreprise Miniere avec le lien de l inscription 
    const hashedId = await bcrypt.hash(String(newEntreprise.id), 10);
    const mailOptions = {
      from: 'atthiemn@gmail',
      to: newEntreprise.email,
      subject: 'Invitation d inscription',
      text: `Bonjour ${newEntreprise.nom}, voici votre lien d'inscription :  http://localhost:3000/User_Em/${newEntreprise.id}`,
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
    const entreprises = await Entreprise.findAll({
      where: {
        etat: 'Ouverte'
      }
    });
    res.json(entreprises);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Une erreur s\'est produite lors de la récupération des entreprises' });
  }
  
};

export const editEntrepriseById = async (req, res) => {
  const id  = req.params.id;
  
  const { nom, description, email, etat } = req.body;
  
  try {
    const entreprise = await Entreprise.findByPk(id);

    if (!entreprise) {
      return res.status(404).json({ error: 'Entreprise non trouvée' });
    }

    entreprise.nom = nom;
    entreprise.description = description;
    entreprise.email = email;
    entreprise.etat =  entreprise.etat;

    await entreprise.save();

    return res.status(200).json({ message: 'Entreprise modifier avec succès' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Une erreur est survenue lors de la mise à jour de l\'entreprise' });
  }
};

export const getEntrepriseById = async (req, res) => {
  const id = req.params.id;

  try {
    const entreprise = await Entreprise.findByPk(id);

    if (!entreprise) {
      return res.status(404).json({ error: "Entreprise non trouvée" });
    }

    return res.status(200).json(entreprise);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Une erreur est survenue lors de la récupération de l'entreprise" });
  }
};

export const modifierEtatEntreprise = async (req, res) => {
  const { id } = req.params; 
 

  try {
    const entreprise = await Entreprise.findByPk(id);

    if (!entreprise) {
      return res.status(404).json({ message: "Entreprise non trouvée" });
    }
    if(entreprise.etat === 'Ouverte'){
      entreprise.etat = 'Fermée';
    }else{
      entreprise.etat = 'Ouverte';
    }
    
    await entreprise.save();

    return res.status(200).json({ message: "État de l'entreprise modifié avec succès" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erreur lors de la modification de l'état de l'entreprise" });
  }
};





