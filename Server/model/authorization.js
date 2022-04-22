let Sequelize = require('sequelize');
const Model = Sequelize.Model

const sequelize = new Sequelize('Eingeschriebener', "LERA", "Nata_5442488",
    {host: 'localhost', dialect: 'mssql'}
);

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
sequelize.sync({force:true});

module.exports = {Users_data, Authorization_data};

let start = setInterval(() => {connect(); console.log("try connect")}, 10000);

const connect = () =>  sequelize.sync()
    .then(() => {
        clearInterval(start);
        console.log(`Connected to localhost`) })
    .catch(error => console.log(error));