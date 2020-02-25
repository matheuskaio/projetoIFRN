import Student from '../models/Student';
import Teacher from '../models/Teacher';

class ProjectUserController {
  async list(req, res) {
    // const id = req.userId;
    const { tipo } = req.params;
    const student = await Student.findOne({ where: { user_id: req.userId } });
    const teacher = await Teacher.findOne({ where: { user_id: req.userId } });

    // const student = await Student.findByPk(1);
    if (student) {
      const pro = await student.getProjects({
        // attributes: ['nome'],
        where: { tipo },
        include: [
          { model: Teacher, as: 'teachers' },
          { model: Student, as: 'students' },
        ],
      });
      return res.json(pro);
    }
    if (teacher) {
      const pro = await teacher.getProjects({
        // attributes: ['nome'],
        where: { tipo },
        include: [
          { model: Teacher, as: 'teachers' },
          { model: Student, as: 'students' },
        ],
      });
      return res.json(pro);
    }
    return res
      .status(401)
      .json({ error: 'Estudante ou Professor não encontrado' });
  }

  async list1(req, res) {
    // const id = req.userId;
    // const { tipo } = req.params;
    const student = await Student.findOne({ where: { user_id: req.userId } });
    const teacher = await Teacher.findOne({ where: { user_id: req.userId } });

    // const student = await Student.findByPk(1);
    if (student) {
      const pro = await student.getProjects({
        // attributes: ['nome'],
        // where: { tipo },
        include: [
          { model: Teacher, as: 'teachers' },
          { model: Student, as: 'students' },
        ],
      });
      return res.json(pro);
    }
    if (teacher) {
      const pro = await teacher.getProjects({
        // attributes: ['nome'],
        // where: { tipo },
        include: [
          { model: Teacher, as: 'teachers' },
          { model: Student, as: 'students' },
        ],
      });
      return res.json(pro);
    }
    return res
      .status(401)
      .json({ error: 'Estudante ou Professor não encontrado' });
  }
}

export default new ProjectUserController();
