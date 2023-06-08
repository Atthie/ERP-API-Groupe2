import Entreprise from "../models/users.js";
import validator from 'validator';
export const userController = async (req, res) => {
  try {
    const {  nom, description, email, telephone } = req.body;
  
    const newUser = await Entreprise.create({
      nom,
      description,
      email,
      telephone
    });

    res.status(201).json(newUser);
  } catch (error) {
    console.error("Erreur lors de l'inscription de l'utilisateur :", error);
    res.status(500).json({ error: "Une erreur est survenue lors de l'inscription" });
  }
};

