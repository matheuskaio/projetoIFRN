import Project from '../models/Project';
import Student from '../models/Student';
import Teacher from '../models/Teacher';

class ProjectTypeController {
  async list(req, res) {
    const { type } = req.params;
    const projects = await Project.findAll({
      where: { tipo: type },
      include: [
        { model: Student, as: 'students' },
        { model: Teacher, as: 'teachers' },
      ],
    });
    return res.json(projects);
  }
}

export default new ProjectTypeController();
