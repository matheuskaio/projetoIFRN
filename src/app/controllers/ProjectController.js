import { Op } from 'sequelize';
import Project from '../models/Project';
import Student from '../models/Student';
import Teacher from '../models/Teacher';

class ProjectController {
  async store(req, res) {
    const { student_id, teacher_id } = req.body;

    const student = await Student.findByPk(student_id);
    const teacher = await Teacher.findByPk(teacher_id);

    const project = req.body;

    if (!student) {
      return res.status(400).json({ error: 'Estudante não encotrado' });
    }
    if (!teacher) {
      return res.status(400).json({ error: 'Professor não encotrado' });
    }
    const projetcCreate = await Project.create(project);

    await student.addProject(projetcCreate);
    await teacher.addProject(projetcCreate);

    return res.json({ projetcCreate });

    // const { student_id, teacher_id } = req.params;
    // const student = await Student.findByPk(student_id);
    // const teacher = await Teacher.findByPk(teacher_id);
    // const project = req.body;
    // if (!student) {
    //   return res.status(400).json({ error: 'Estudante não encotrado' });
    // }
    // if (!teacher) {
    //   return res.status(400).json({ error: 'Professor não encotrado' });
    // }
    // const projetcCreate = await Project.create(project);
    // await student.addProject(projetcCreate);
    // await teacher.addProject(projetcCreate);
    // return res.json({ projetcCreate });
  }

  async update(req, res) {
    // const { student_id, teacher_id } = req.body;

    // const project = await Project.findByPk(req.params.project_id);
    // if (!project) {
    //   res.status(401).json({ error: 'Projeto não encontrado' });
    // }
    // await project.update(req.body);
    // res.json({ msg: 'Deu certo' });
    const projectSource = await Project.findByPk(req.params.project_id);
    if (!projectSource) {
      res.status(401).json({ error: 'Projeto não encontrado' });
    }
    await projectSource.update(req.body);
    const { student_id } = req.body;
    // eslint-disable-next-line array-callback-return
    const studentSource = await Student.findByPk(student_id);
    const studentProjects = await studentSource.getProjects();
    if (studentProjects.length === 0) {
      studentSource.addProject(projectSource);
    }
    if (studentProjects.length !== 0) {
      // eslint-disable-next-line array-callback-return
      studentProjects.map(project => {
        if (project.id !== projectSource.id) {
          studentSource.addProject(projectSource);
        }
      });
    }
    return res.json(studentProjects);
  }

  async list(req, res) {
    const projects = await Project.findAll({
      include: [
        { model: Student, as: 'students' },
        { model: Teacher, as: 'teachers' },
      ],
    });
    return res.json(projects);
  }

  async index(req, res) {
    const { project_id } = req.params;
    const project = await Project.findOne({
      where: { id: project_id },
      include: [
        { model: Student, as: 'students' },
        { model: Teacher, as: 'teachers' },
      ],
    });
    return res.json(project);
  }

  async search(req, res) {
    const { search } = req.params;
    const projects = await Project.findAll({
      where: {
        [Op.or]: {
          nome: { [Op.iLike]: `%${search}%` },
          area_conhecimento: { [Op.iLike]: `%${search}%` },
          campus: { [Op.iLike]: `%${search}%` },
        },
      },
    });
    if (projects.length === 0) {
      return res.status(401).json({ error: 'Nenhum projeto encontrado!' });
    }
    return res.json(projects);
  }
}

export default new ProjectController();
