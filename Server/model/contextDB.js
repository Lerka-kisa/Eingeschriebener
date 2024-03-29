const Sequelize = require('sequelize');
const Model = Sequelize.Model;

// const sequelize = new Sequelize(
//     'Eingeschriebener',
//     "root",
//     "9I50ybkubu",
//     {host: 'localhost', dialect: 'mariadb'}
// )
const sequelize = new Sequelize('Eingeschriebener', "LERA", "Nata_5442488",
    {host: 'localhost', dialect: 'mssql'}
);

let start = setInterval(() =>
{
    connect();
}, 5000);


const connect = () =>  sequelize.sync(/*{force : true}*/)
    .then(() => {
        clearInterval(start);
        console.log(`Connected to Eingeschriebener, host : localhost`) })
    .catch(error => console.log(error));

module.exports = {Sequelize, Model, sequelize}
