import Teacher from '../models/Teacher';
import User from '../models/User';

class TeacherController {
  async store(req, res) {
    const userExist = await User.findOne({ where: { email: req.body.email } });

    if (userExist) {
      return res
        .status(400)
        .json({ error: 'Já existe um usuário com esse e-mail.' });
    }

    const matriculaExist = await Teacher.findOne({
      where: { matricula: req.body.matricula },
    });

    if (matriculaExist) {
      return res
        .status(400)
        .json({ error: 'Já existe um usuário com essa matricula cadastrada.' });
    }

    const cpfExist = await Teacher.findOne({ where: { cpf: req.body.cpf } });

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

    const teacherCreate = await Teacher.create({
      nome: student.nome,
      cpf: student.cpf,
      matricula: student.matricula,
      area_atuacao: student.area_atuacao,
      curriculo_latte: student.curriculo_latte,
      user_id: id,
    });
    return res.json({ teacherCreate });
  }

  async update(req, res) {
    const { user_id } = req.params;
    // const user = await User.findByPk(user_id);
    // const student = await Student.findOne({ where: { user_id: user.id } });
    const teacher = await Teacher.findByPk(user_id);
    const teacherUpdate = await teacher.update(req.body);
    return res.json(teacherUpdate);
  }

  async list(req, res) {
    const teachers = await Teacher.findAll({
      attributes: [
        'id',
        'nome',
        'cpf',
        'matricula',
        'curriculo_latte',
        'area_atuacao',
      ],
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'email'],
        },
      ],
    });
    return res.json(teachers);
  }
}

export default new TeacherController();
