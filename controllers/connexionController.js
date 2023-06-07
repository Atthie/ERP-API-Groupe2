import User from "../models/users.js";
import bcrypt from "bcrypt";
import validator from "validator";

export const connexionController = async (req, res) => {
  try {
    const { username, pwd} = req.body;

    if (validator.isEmpty(username)) {
      return res.status(400).json({ error: "Le champ 'nom d'utilisateur' est requis." });
    }
    if (validator.isEmpty(pwd)) {
      return res.status(400).json({ error: "Le champ 'mot de passe' est requis." });
    }
    const user = await User.findOne({ where: { username } });
    const passwordMatch = await bcrypt.compare(pwd, user.pwd);

    if (!user) {
      return res.status(401).json({ error: "Nom d'utilisateur incorrect" });
    }
    if (!passwordMatch) {
      return res.status(401).json({ error: "Mot de passe incorrect" });
    }

 
    res.status(200).json({username});
  } catch (error) {
    console.error("Erreur lors de la connexion de l'utilisateur :", error);
    res.status(500).json({ error: "Une erreur est survenue lors de la connexion" });
  }
};
