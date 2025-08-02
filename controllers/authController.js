const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

// TODO/ 
// Demander le role de l'utilisateur lors de l'inscription, si son role est "Manager",  el id mta"ou houa yethat fel manager 
// si employe , lezem yootlob alih manager , wel manager heka ykoun different lel personne heki eli bech ta3mel signup 
const register = async (req, res) => {
  const { name, email, password, role, manager } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: 'Utilisateur déjà existant' });

    // Si role = Employé, vérifier que manager est fourni
    if (role === 'Employé') {
      if (!manager) {
        return res.status(400).json({ message: 'L’employé doit avoir un manager.' });
      }
      const managerUser = await User.findById(manager);
      if (!managerUser || managerUser.role !== 'Manager') {
        return res.status(400).json({ message: 'Manager invalide.' });
      }
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role,
      manager: role === 'Employé' ? manager : null 
    });

    await newUser.save();

    res.status(201).json({ message: 'Utilisateur créé avec succès' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: 'Email ou mot de passe invalide' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: 'Email ou mot de passe invalide' });

    // Générer token JWT
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  register,
  login
};
