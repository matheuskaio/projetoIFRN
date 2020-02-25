import jwt from 'jsonwebtoken';

import * as Yup from 'yup';
import User from '../models/User';
import authConfig from '../../config/auth';

class SessionController {
  async store(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Erro de validação de dados' });
    }

    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ error: 'Usuário não encontrado' });
    }

    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ error: 'A senha informada não confere' });
    }

    const { id, name, type_user } = user;
    return res.json({
      user: {
        id,
        name,
        email,
        type_user,
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }

  async index(req, res) {
    const userData = req.body;
    try {
      if (userData) {
        // const token = jwt.decode(userData.token, authConfig.secret);
        res.json(true);
      }
    } catch (e) {
      return res.status(500).json({ error: 'Fudeu' });
    }
    res.json(false);
  }
}

export default new SessionController();
