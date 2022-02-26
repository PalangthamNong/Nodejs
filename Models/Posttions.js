const Sequelize = require('sequelize')
const DB =  require('../Database/db') ; 

module.export = DB.sequelize.defile(
    'posttions',{
        PositTion_Name : {
            type :  Sequelize.STRING ,
            allowNull: false
        },
        Posittions_ID  : {
            type :  Sequelize.STRING ,
            allowNull: false , 
            primarykey : true ,
          
        },
        
    },
    {
        timestamps : false ,
        freezeTableName : true , 
        tableName : 'posttions'

    }


)