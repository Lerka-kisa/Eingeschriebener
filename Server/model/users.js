const  {Sequelize, Model, sequelize} = require('./contextDB')

class Authorization_data extends Model{}
class Users_data extends Model{}
class Users_marks extends Model{}
class Overall_rating extends Model{}

Authorization_data.init(
    {
            login:      {type: Sequelize.STRING, allowNull:false, unique:true},
            password:   {type: Sequelize.STRING, allowNull:false},
            role:       {type: Sequelize.STRING, allowNull:false}
    },
    {sequelize, modelName:'Authorization_data', tableName:'Authorization_data', timestamps:false}
);
Users_data.init(
    {
            id_auth:        {type: Sequelize.INTEGER,   allowNull:false, unique:true, references: {model: Authorization_data, key:'id'}},
            surname:        {type: Sequelize.STRING,    allowNull:false},
            name:           {type: Sequelize.STRING,    allowNull:false},
            middle_name:    {type: Sequelize.STRING,    allowNull:false},
            date_of_birth:  {type: Sequelize.DATEONLY,  allowNull:false},
            number:         {type: Sequelize.STRING,    allowNull:false},
            mail:           {type: Sequelize.STRING,    allowNull:false},
            address:        {type: Sequelize.STRING,    allowNull:false}
    },
    {sequelize, modelName:'Users_data', tableName:'Users_data', timestamps:false}
);
Users_marks.init(
    {
            id_user:    {type: Sequelize.INTEGER,   allowNull:false, unique:true, references: {model: Users_data, key:'id'}},
            math:       {type: Sequelize.INTEGER,   allowNull:true},
            phys:       {type: Sequelize.INTEGER,   allowNull:true},
            lang:       {type: Sequelize.INTEGER,   allowNull:true},
            att:        {type: Sequelize.INTEGER,   allowNull:true}
    },
    {sequelize, modelName:'Users_marks', tableName:'Users_marks', timestamps:false}
);

Overall_rating.init(
    {
            id_user:    {type: Sequelize.INTEGER,    allowNull:false, unique:true, references: {model: Users_data, key:'id'}},
            file_number:{type: Sequelize.STRING,     allowNull:false},
            math:        {type: Sequelize.INTEGER,    allowNull:false},
            phys:        {type: Sequelize.INTEGER,    allowNull:false},
            lang:        {type: Sequelize.INTEGER,    allowNull:false},
            att:        {type: Sequelize.INTEGER,    allowNull:false},
            sum:        {type: Sequelize.INTEGER,    allowNull:false},
            POIT:       {type: Sequelize.INTEGER,    allowNull:false},
            ISIT:       {type: Sequelize.INTEGER,    allowNull:false},
            POIBMS:     {type: Sequelize.INTEGER,    allowNull:false},
            DEIVI:      {type: Sequelize.INTEGER,    allowNull:false},
            contract:   {type: Sequelize.STRING,     allowNull:false},
            confirm:    {type: Sequelize.BOOLEAN,    allowNull:false}
    },
    {sequelize, modelName:'Overall_rating', tableName:'Overall_rating', timestamps:false}
)

//Authorization_data.hasOne(Users_data, {foreignKey: 'id_auth'});
Authorization_data.hasMany(Users_data, {foreignKey: 'id_auth'});
Users_data.belongsTo(Authorization_data, {foreignKey: 'id_auth'});

//Users_data.hasOne(Users_marks, {foreignKey: 'id_user'});
Users_data.hasMany(Users_marks, {foreignKey: 'id_user'});
Users_marks.belongsTo(Users_data, {foreignKey: 'id_user'});

//Users_data.hasOne(Overall_rating, {foreignKey: 'id_user'});
Users_data.hasMany(Overall_rating, {foreignKey: 'id_user'});
Overall_rating.belongsTo(Users_data, {foreignKey: 'id_user'});

//sequelize.sync({force:true});

module.exports = {Users_data, Authorization_data, Users_marks, Overall_rating};