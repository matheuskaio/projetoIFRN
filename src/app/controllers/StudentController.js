import Student from '../models/Student';
import User from '../models/User';

class StudentController {
  async store(req, res) {
    const userExist = await User.findOne({ where: { email: req.body.email } });

    if (userExist) {
      return res
        .status(400)
        .json({ error: 'Já existe um usuário com esse e-mail.' });
    }

    const matriculaExist = await Student.findOne({
      where: { matricula: req.body.matricula },
    });

    if (matriculaExist) {
      return res
        .status(400)
        .json({ error: 'Já existe um usuário com essa matricula cadastrada.' });
    }

    const cpfExist = await Student.findOne({ where: { cpf: req.body.cpf } });

    if (cpfExist) {
      return res
        .status(400)
        .json({ error: 'Já existe um usuário cadastrado com esse cpf' });
    }

    const student = req.body;
    const { id } = await User.create({
      name: student.name,
      email: student.email,
      password: student.password,
      type_user: student.type_user,
    });

    const studentCreate = await Student.create({
      nome: student.nome,
      cpf: student.cpf,
      matricula: student.matricula,
      curso: student.curso,
      curriculo_latte: student.curriculo_latte,
      user_id: id,
    });
    return res.json({ studentCreate });
  }
}

export default new StudentController();
