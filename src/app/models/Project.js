import Sequelize, { Model } from 'sequelize';

class Project extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: Sequelize.STRING,
        resumo: Sequelize.STRING,
        introducao: Sequelize.STRING,
        justificativa: Sequelize.STRING,
        metodologia_execucao_projeto: Sequelize.STRING,
        objetivo_geral: Sequelize.STRING,
        fundamentacao_teorica: Sequelize.STRING,
        tipo: Sequelize.STRING,
        campus: Sequelize.STRING,
        data_inicio: Sequelize.DATE,
        data_termino: Sequelize.DATE,
        acompanhamento_avaliacao_projeto: Sequelize.STRING,
        area_conhecimento: Sequelize.STRING,
        observacao: Sequelize.STRING,
        referencia: Sequelize.STRING,
        resultado_esperado: Sequelize.STRING,
        resultado_alcancado: Sequelize.STRING,
        resultado_disseminacao_esperado: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsToMany(models.Student, {
      foreignKey: 'project_id',
      through: 'student_projects',
      as: 'students',
    });
    this.belongsToMany(models.Teacher, {
      foreignKey: 'project_id',
      through: 'teacher_projects',
      as: 'teachers',
    });
  }
}

export default Project;
