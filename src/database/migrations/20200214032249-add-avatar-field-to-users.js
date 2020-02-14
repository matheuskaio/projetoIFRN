module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      // NOME DA TABELA
      'users',
      // CAMPO PARA SER ADICIONADO
      'avatar_id',
      {
        type: Sequelize.INTEGER,
        references: { model: 'files', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true,
      }
    );
  },

  down: queryInterface => {
    return queryInterface.removeColumn('users', 'avatar_id');
  },
};
