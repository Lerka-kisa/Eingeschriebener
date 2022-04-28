const jwt = require("jsonwebtoken");
const path = __dirname.split('\\');
const {University_data, Entry_threshold} = require("../model/universities");
const {accessKey, refreshKey} = require("../security/jwtKeys");
const {Sequelize} = require("../model/contextDB");
const Console = require("console");

path.pop();

exports.startpage = async (req, res, next) => {
    switch (req.method) {
        case "GET":
            res.sendFile(path.join("\\") + "\\views\\startpage.html");
            break;
        default:
            res.statusCode = 405;
            res.messageerror = "Method not allowed";
            res.end();
    }
}

exports.offer = (req, res, next) => {
    switch (req.method) {
        case "GET":
            res.send("Тут будет сендфайл")
            //res.sendFile(path.join("\\") + "\\views\\register.html");
            break;
        default:
            res.statusCode = 405;
            res.messageerror = "Method not allowed";
            res.end();
    }
}
exports.offerById = (req, res, next) => {
    switch (req.method) {
        case "GET":
            res.send("Тут будет сендфайл с айди")
            //res.sendFile(path.join("\\") + "\\views\\register.html");
            break;
        case "POST":
            //нужно тут проверять на отсутствие на какой-либо параметр
            if(!req.body){
                University_data.findAll()
                    .then(() => res.send("Poluchaj vse универы"))
                    .catch(err =>  res.send(err.message));
            }
            else{
                University_data.findAll()
                    .then(() => res.send("Poluchaj not vse универы"))
                    .catch(err =>  res.send(err.message));
            }
            break;
        default:
            res.statusCode = 405;
            res.messageerror = "Method not allowed";
            res.end();
    }
}

exports.offerById = (req, res, next) => {
    switch (req.method) {
        case "GET":
            res.send("Тут будет сендфайл с айди")
            //res.sendFile(path.join("\\") + "\\views\\register.html");
            break;
        case "POST":
            //нужно тут проверять на отсутствие на какой-либо параметр
            if (!req.body) {
                University_data.findAll()
                    .then(() => res.send("Poluchaj vse универы"))
                    .catch(err => res.send(err.message));
            } else {
                University_data.findAll()
                    .then((uni) => res.send(uni))//"Poluchaj not vse универы"))
                    .catch(err => res.send(err.message));
            }
            break;
        default:
            res.statusCode = 405;
            res.messageerror = "Method not allowed";
            res.end();
    }
}
