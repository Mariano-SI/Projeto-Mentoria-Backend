const {DataTypes, Sequelize} = require('sequelize')

module.exports={
    async up(queryInterface, Sequelize){
        await queryInterface.createTable('ContestResult', {
            id:{
                type: DataTypes.UUID,
                defaultValue: Sequelize.fn('newid'), 
                allowNull: false,
                primaryKey: true, 
            },
            participant_id:{
                type: DataTypes.UUID,
                allowNull: false,
                references: {
                    model: 'Participants',
                    key: 'id',
                },
            },
            contest_id:{
                type: DataTypes.UUID,
                allowNull: false,
                references: {
                    model: 'Contests',
                    key: 'id',
                },
            },
            votes_count:{
                type:DataTypes.BIGINT,
                allowNull:true,
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
        })
    },

    async down(queryInterface){
        queryInterface.dropTable('ContestResult')
    }
}