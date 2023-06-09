import validator from 'validator';

const validationDataUser = (req, res, next) => {
  const { username, role, idEntreprise, pwd, pwdConfirm, telephone, email } = req.body;

  if (validator.isEmpty(username)) {
    return res.status(400).json({ error: "Le champ 'nom d'utilisateur' est requis." });
  }
  if (validator.isEmpty(role)) {
    return res.status(400).json({ error: "Le champ 'nom d'utilisateur' est requis." });
  }
  if (validator.isEmpty(idEntreprise)) {
    return res.status(400).json({ error: "Le champ 'identifiant de l'entreprise' est requis." });
  }
  if (validator.isEmpty(pwd)) {
    return res.status(400).json({ error: "Le champ 'mot de passe' est requis." });
  }
  if (validator.isEmpty(pwdConfirm)) {
    return res.status(400).json({ error: "Le champ 'confirmation de mot de passe' est requis." });
  }
  if (!validator.equals(pwd, pwdConfirm)) {
    return res.status(400).json({ error: "Les mots de passe ne correspondent pas." });
  }
  if (validator.isEmpty(telephone)) {
    return res.status(400).json({ error: "Le champ 'téléphone' est requis." });
  }
  if (validator.isEmpty(email)) {
    return res.status(400).json({ error: "Le champ 'email' est requis." });
  }
  if (!validator.isEmail(email)) {
    return res.status(400).json({ error: "L'adresse e-mail est invalide." });
  }

  next();
};
export default validationDataUser;
