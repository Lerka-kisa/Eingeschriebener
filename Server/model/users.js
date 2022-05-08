const  {Sequelize, Model, sequelize} = require('./contextDB')

class Authorization_data extends Model{}
class Users_data extends Model{}
class Users_marks extends Model{}

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
        date_of_birth:  {type: Sequelize.DATEONLY,  allowNull:false},
        city:           {type: Sequelize.STRING,    allowNull:false},
        address:        {type: Sequelize.STRING,    allowNull:false}
    },
    {sequelize, modelName:'Users_data', tableName:'Users_data', timestamps:false}
);
Users_marks.init(
    {
        id_auth:        {type: Sequelize.INTEGER,   allowNull:false, references: {model: Users_data, key:'id'}},
        math:        {type: Sequelize.INTEGER,    allowNull:true},
        phys:           {type: Sequelize.INTEGER,    allowNull:true},
        lang:    {type: Sequelize.INTEGER,    allowNull:true},
        att:  {type: Sequelize.INTEGER,  allowNull:true}
    },
    {sequelize, modelName:'Users_marks', tableName:'Users_marks', timestamps:false}
);
//sequelize.sync({force:true});

module.exports = {Users_data, Authorization_data, Users_marks};