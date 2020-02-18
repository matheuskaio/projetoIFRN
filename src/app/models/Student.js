import Sequelize, { Model } from 'sequelize';

class Student extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: Sequelize.STRING,
        cpf: Sequelize.STRING,
        matricula: Sequelize.STRING,
        curso: Sequelize.STRING,
        curriculo_latte: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    this.belongsToMany(models.Project, {
      foreignKey: 'student_id',
      through: 'student_projects',
      as: 'projects',
    });
  }
}

export default Student;
