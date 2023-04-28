const { DataTypes } = require('sequelize');
module.exports = {
    async up(queryInterface, Sequelize){
        await queryInterface.createTable('Contests',{
            id:{
                type: DataTypes.UUID,
                defaultValue: Sequelize.fn('newid'), 
                allowNull: false,
                primaryKey: true, 
            },
            initial_date:{
                type: DataTypes.DATE,
                defaultValue: Sequelize.literal('(getdate())'),
                allowNull: false,
                timezone: true, 
            },
            final_date:{
                type: DataTypes.DATE,
                defaultValue: null,
                allowNull: true,
                timezone: true, 
            },
            active:{
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue:true
            }
        })
    },
    async down(queryInterface, Sequelize){
        queryInterface.dropTable('Contests')
    }
}