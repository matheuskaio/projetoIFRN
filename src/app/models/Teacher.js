import Sequelize, { Model } from 'sequelize';

class Teacher extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: Sequelize.STRING,
        cpf: Sequelize.STRING,
        matricula: Sequelize.STRING,
        area_atuacao: Sequelize.STRING,
        curriculo_latte: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'user',
    });
    this.belongsToMany(models.Project, {
      foreignKey: 'teacher_id',
      through: 'teacher_projects',
      as: 'projects',
    });
  }
}

export default Teacher;
