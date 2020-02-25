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

  async update(req, res) {
    const user = await User.findByPk(req.userId);
    const student = await Student.findOne({ where: { user_id: user.id } });
    const studentUpdate = await student.update(req.body);
    return res.json({ studentUpdate });
  }

  async index(req, res) {
    const { userId } = req.params;
    const student = await Student.findOne({ where: { user_id: userId } });
    if (!student) {
      return res.status(401).json({ error: 'Estudante não encontrado' });
    }

    return res.json({ student });
  }

  async list(req, res) {
    const students = await Student.findAll({
      attributes: [
        'id',
        'nome',
        'cpf',
        'matricula',
        'curso',
        'curriculo_latte',
      ],
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'email'],
        },
      ],
    });
    return res.json(students);
  }
}

export default new StudentController();
