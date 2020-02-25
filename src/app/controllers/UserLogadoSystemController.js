import User from '../models/User';
import Student from '../models/Student';
import Teacher from '../models/Teacher';

class UserLogadoSystemController {
  // eslint-disable-next-line consistent-return
  async index(req, res) {
    const user = await User.findByPk(req.userId);
    const teacher = await Teacher.findOne({
      where: { user_id: user.id },
      include: [{ model: User, as: 'user', attributes: ['email'] }],
    });
    const student = await Student.findOne({
      where: { user_id: user.id },
      include: [{ model: User, as: 'user', attributes: ['email'] }],
    });
    if (student) {
      return res.json({
        id: student.id,
        nome: student.nome,
        email: student.user.email,
        cpf: student.cpf,
        matricula: student.matricula,
        curso: student.curso,
        curriculo_latte: student.curriculo_latte,
        tipo: 'Student',
      });
    }
    if (teacher) {
      return res.json({
        id: teacher.id,
        nome: teacher.nome,
        email: teacher.user.email,
        cpf: teacher.cpf,
        matricula: teacher.matricula,
        area_atuacao: teacher.area_atuacao,
        curriculo_latte: teacher.curriculo_latte,
        tipo: 'Teacher',
      });
    }
    return res.status(401).json({ error: 'Algo de Errado Nª 001' });
  }
}

export default new UserLogadoSystemController();
