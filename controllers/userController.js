import User from "../models/users.js";
import bcrypt from 'bcrypt';
import validationDataUser from "../middlewares/validationDataUser.js"

 export const userEM = async (req, res) => {
  try {
   validationDataUser (req, res, async() => {
      const { username,role, pwd, pwdConfirm, telephone, email } = req.body;
      const idEntreprise = req.params.id;
      console.log(idEntreprise);
      const existingUser = await User.findOne({ where: { username } });
      if (existingUser) {
        return res.status(400).json({ error: "Cet utilisateur existe déjà." });
      }

      if (pwd !== pwdConfirm) {
        return res.status(400).json({ error: "Les mots de passe ne correspondent pas." });
      }

      const hashedPwd = await bcrypt.hash(pwd, 10);

      const newUser = await User.create({
        username,
        role:'Entreprise_Miniere',
        idEntreprise:idEntreprise,
        pwd: hashedPwd,
        telephone,
        email
      });

      res.status(201).json({message:"Compte crée avec succès" });
    });
  } catch (error) {
    console.error("Erreur lors de la creation de l'utilisateur :", error);
    res.status(500).json({ error: "Une erreur est survenue lors de la creation" });
  }
};
export default userEM;