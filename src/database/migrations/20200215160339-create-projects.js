module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('projects', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      nome: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      resumo: {
        type: Sequelize.STRING(20000),
        allowNull: false,
      },
      introducao: {
        type: Sequelize.STRING(20000),
        allowNull: false,
      },
      justificativa: {
        type: Sequelize.STRING(20000),
        allowNull: false,
      },
      metodologia_execucao_projeto: {
        type: Sequelize.STRING(20000),
        allowNull: false,
      },
      objetivo_geral: {
        type: Sequelize.STRING(20000),
        allowNull: false,
      },
      fundamentacao_teorica: {
        type: Sequelize.STRING(20000),
        allowNull: false,
      },
      tipo: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      campus: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      data_inicio: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      data_termino: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      acompanhamento_avaliacao_projeto: {
        type: Sequelize.STRING(20000),
        allowNull: false,
      },
      area_conhecimento: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      observacao: {
        type: Sequelize.STRING(20000),
        allowNull: false,
      },
      referencia: {
        type: Sequelize.STRING(20000),
        allowNull: false,
      },
      resultado_esperado: {
        type: Sequelize.STRING(20000),
        allowNull: false,
      },
      resultado_alcancado: {
        type: Sequelize.STRING(20000),
        allowNull: false,
      },
      resultado_disseminacao_esperado: {
        type: Sequelize.STRING(20000),
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('projects');
  },
};
