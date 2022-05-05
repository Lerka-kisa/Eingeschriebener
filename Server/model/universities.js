const  {Sequelize, Model, sequelize} = require('./contextDB')

class University_data extends Model{}
class Faculty_data extends Model{}
class Speciality_data extends Model{}
class Entry_threshold extends Model{}

University_data.init(
    {
        name:   {type: Sequelize.STRING, allowNull:false},
        full_name:   {type: Sequelize.STRING, allowNull:false},
        link:   {type: Sequelize.STRING, allowNull:false}
    },
    {sequelize, modelName:'University_data', tableName:'University_data', timestamps:false}
);
Faculty_data.init(
    {
        id_university:  {type: Sequelize.INTEGER, allowNull:false, references: {model: University_data, key:'id'}},
        name:           {type: Sequelize.STRING, allowNull:false}
    },
    {sequelize, modelName:'Faculty_data', tableName:'Faculty_data', timestamps:false}
);
Speciality_data.init(
    {
        id_faculty:     {type: Sequelize.INTEGER, allowNull:false, references: {model: Faculty_data, key:'id'}},
        name:           {type: Sequelize.STRING, allowNull:false},
        full_name:      {type: Sequelize.STRING, allowNull:false},
        specification:  {type: Sequelize.STRING, allowNull:false}
    },
    {sequelize, modelName:'Speciality_data', tableName:'Speciality_data', timestamps:false}
);
Entry_threshold.init(
    {
        id_speciality:          {type: Sequelize.INTEGER, allowNull:false, references: {model: Speciality_data, key:'id'}},
        budgetary2020:          {type: Sequelize.INTEGER, allowNull:false},
        paid2020:               {type: Sequelize.INTEGER, allowNull:false},
        budgetary2021:          {type: Sequelize.INTEGER, allowNull:false},
        paid2021:               {type: Sequelize.INTEGER, allowNull:false}
    },
    {sequelize, modelName:'Entry_threshold', tableName:'Entry_threshold', timestamps:false}
);

University_data.hasMany(Faculty_data, {foreignKey: 'id_university'});
Faculty_data.belongsTo(University_data, {foreignKey: 'id_university'});

Faculty_data.hasMany(Speciality_data, {foreignKey: 'id_faculty'});
Speciality_data.belongsTo(Faculty_data, {foreignKey: 'id_faculty'});

Speciality_data.hasMany(Entry_threshold, {foreignKey: 'id_speciality'});
Entry_threshold.belongsTo(Speciality_data, {foreignKey: 'id_speciality'});

//sequelize.sync({force:true});

module.exports = {University_data, Faculty_data, Speciality_data, Entry_threshold};