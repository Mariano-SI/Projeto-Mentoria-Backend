const { DataTypes } = require('sequelize');
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Votes', {
      id: { 
          type: DataTypes.UUID,
          defaultValue: Sequelize.fn('newid'), 
            allowNull: false,
            primaryKey: true,            
      },
      user_id: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: Sequelize.fn('newid'), 
      },
      participant_id:{
        type:DataTypes.UUID,
        allowNull:false,
        references: {
            model: 'Participants',
            key: 'id',
        },
      },
      constest_id:{
        type:DataTypes.UUID,
        allowNull:false,
        references: {
            model: 'Contests',
            key: 'id',
        },
      },
      creation_date:{
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal('(getdate())'),
        allowNull: false,
        timezone: true,
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Votes');
  }
};