const Sequelize = require('sequelize');
const Model = Sequelize.Model;

const sequelize = new Sequelize('Eingeschriebener', "LERA", "Nata_5442488",
    {host: 'localhost', dialect: 'mssql'}
);

let start = setInterval(() =>
{
    connect();
}, 1000);


const connect = () =>  sequelize.sync()
    .then(() => {
        clearInterval(start);
        console.log(`Connected to Eingeschriebener, host : localhost`) })
    .catch(error => console.log(error));

module.exports = {Sequelize, Model, sequelize}