import User from "../models/users.js";
import bcrypt from 'bcrypt';
import validationDataUser from "../middlewares/validationDataUser.js"

 const userEM = async (req, res) => {
  try {
    // Valider les données
    validationDataUser (req, res, async() => {
      // Les données sont valides, procéder à l'inscription
      const { username,role,  idEntreprise, pwd, pwdConfirm, telephone, email } = req.body;
      
      // Vérifier si l'utilisateur existe déjà
      const existingUser = await User.findOne({ where: { username } });
      if (existingUser) {
        return res.status(400).json({ error: "Cet utilisateur existe déjà." });
      }

      // Comparer si le mot de passe et la confirmation sont identiques
      if (pwd !== pwdConfirm) {
        return res.status(400).json({ error: "Les mots de passe ne correspondent pas." });
      }

      // Hasher le mot de passe
      const hashedPwd = await bcrypt.hash(pwd, 10);

      // Créer l'utilisateur
      const newUser = await User.create({
        username,
        role,
        idEntreprise,
        pwd: hashedPwd,
        telephone,
        email
      });

      // Répondre avec les données de l'utilisateur
      res.status(201).json({ newUser });
    });
  } catch (error) {
    console.error("Erreur lors de l'inscription de l'utilisateur :", error);
    res.status(500).json({ error: "Une erreur est survenue lors de l'inscription" });
  }
};
export default userEM