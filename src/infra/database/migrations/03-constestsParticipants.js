const {DataTypes} = require('sequelize')

module.exports={
    async up(queryInterface, Sequelize){
        await queryInterface.createTable('ConstestsParticipants',{
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
            creation_date:{
                type:DataTypes.DATE,
                allowNull:false,
                defaultValue:Sequelize.literal('(getdate())'),
            }
        })
    },

    async down(queryInterface, Sequelize){
        queryInterface.dropTable('ConstestsParticipants')
    }
}