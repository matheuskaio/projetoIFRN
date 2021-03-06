import Sequelize from 'sequelize';

import User from '../app/models/User';
import File from '../app/models/File';
import Student from '../app/models/Student';
import Teacher from '../app/models/Teacher';
import Project from '../app/models/Project';

import databaseConfig from '../config/database';

const models = [User, File, Student, Teacher, Project];

class Database {
  constructor() {
    this.init();
  }

  // Faz a conexão com as bases de dados
  init() {
    this.connection = new Sequelize(databaseConfig);
    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
