const  {Sequelize, Model, sequelize} = require('./contextDB')

class Authorization_data extends Model{}
class Users_data extends Model{}

Authorization_data.init(
    {
        login:      {type: Sequelize.STRING, allowNull:false},
        mail:       {type: Sequelize.STRING, allowNull:false},
        password:   {type: Sequelize.STRING, allowNull:false},
        role:       {type: Sequelize.STRING, allowNull:false}
    },
    {sequelize, modelName:'Authorization_data', tableName:'Authorization_data', timestamps:false}
);
Users_data.init(
    {
        id_auth:        {type: Sequelize.INTEGER,   allowNull:false, references: {model: Authorization_data, key:'id'}},
        surname:        {type: Sequelize.STRING,    allowNull:false},
        name:           {type: Sequelize.STRING,    allowNull:false},
        middle_name:    {type: Sequelize.STRING,    allowNull:false},
        date_of_birth:  {type: Sequelize.DATE,      allowNull:false},
        city:           {type: Sequelize.STRING,    allowNull:false},
        address:        {type: Sequelize.STRING,    allowNull:false}
    },
    {sequelize, modelName:'Users_data', tableName:'Users_data', timestamps:false}
);
//sequelize.sync({force:true});

module.exports = {Users_data, Authorization_data};