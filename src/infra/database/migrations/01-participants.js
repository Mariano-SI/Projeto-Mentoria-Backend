const { DataTypes } = require('sequelize');
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Participants', {
      id: { 
          type: Sequelize.DataTypes.UUID,
          defaultValue: Sequelize.fn('newid'), 
            allowNull: false,
            primaryKey: true,            
      },
      name: {
        type: DataTypes.STRING
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Participants');
  }
};