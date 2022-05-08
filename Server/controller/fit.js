const jwt = require("jsonwebtoken");
const Error  = require("../Error");
const path = __dirname.split('\\');
const {University_data, Entry_threshold, Faculty_data, Speciality_data} = require("../model/universities");
const {Users_data, Users_marks, Authorization_data} = require("../model/users")
const {accessKey, refreshKey} = require("../security/jwtKeys");
const {Sequelize} = require("../model/contextDB");
const {admin, enrollee, guest, rule} = require("../security/defines");
const Console = require("console");

path.pop();

exports.mainPage = async (req, res, next) => {
    switch (req.method) {
        case "GET":
            res.sendFile(path.join("\\") + "\\views\\belstuMainPage.html");
            break;
        default:
            res.statusCode = 405;
            res.messageerror = "Method not allowed";
            res.end();
    }
}

exports.userinfo = async (req, res, next) => {
    switch (req.method) {
        case "GET":
            try {
                req.ability
                if (req.ability.can(rule.admin)) {
                    res.status(200).send("Hurray, you are admin");
                    break
                    //return
                    // Commits.findAll({
                    //     where:
                    //         {
                    //             repoid: Number.parseInt(req.params.id)
                    //         }
                    // }).then(r => {
                    //     res.status(200).json(r);
                    // })
                }
                if (req.ability.can(rule.enrol)) {
                    console.log(req.payload.id)
                    let id = parseInt(req.payload.id)
                    Users_data.findOne({
                        where: {
                            id_auth: id
                        }
                    })
                        .then(r => {
                            if (r == null){
                                res.redirect('/belstu_fit/userinfo/add');
                            }
                            else{
                                res.status(200).json(r);
                            }
                        })
                        .catch(err =>  res.send(err.message));
                    //res.status(200).send("Hurray, you are enrollee");
                    return
                }
                if (req.ability.can(rule.guests)) {
                    res.redirect('/auth/login');
                }
                else {
                    Error.Error401(res);
                }
            } catch (err) {
                Error.Error500(res, err);
            }
            break;
        default:
            res.statusCode = 405;
            res.messageerror = "Method not allowed";
            res.end();
    }
}
exports.addInfo = async (req, res, next) => {
    switch (req.method) {
        case "GET":
            res.sendFile(path.join("\\") + "\\views\\addInfoUser.html");
            break;
        case "POST":
            let name = req.body.name
            let surname = req.body.surname
            let middle_name = req.body.middle_name
            let city = req.body.city
            let address = req.body.address
            let birthday = req.body.birthday
            console.log(name, surname, middle_name, city, address, birthday)
            Users_data.create({id_auth: req.payload.id, name: name,  surname:surname, middle_name:middle_name, city:city, address:address, date_of_birth:birthday})
                .then(() => {
                    Users_marks.create({id_auth: req.payload.id, math:0, phys:0, lang:0, att:0})
                        .then(() => {
                            console.log("All norm)))")
                        })
                        .catch(err =>  res.send(err.message + "user marks"))
                    res.send("Add info is successful")
                })
                .catch(err =>  res.send(err.message));
            break;
            // res.status(200).send("Eee");
            // break;
        default:
            res.statusCode = 405;
            res.messageerror = "Method not allowed";
            res.end();
    }
}
exports.addMarks = async (req, res, next) => {
    switch (req.method) {
        case "GET":
            res.sendFile(path.join("\\") + "\\views\\usersMarks.html");
            break;
        case "POST":
            let name = req.body.name
            let surname = req.body.surname
            let middle_name = req.body.middle_name
            let city = req.body.city
            let address = req.body.address
            let birthday = req.body.birthday
            console.log(name, surname, middle_name, city, address, birthday)
            Users_data.create({id_auth: req.payload.id, name: name,  surname:surname, middle_name:middle_name, city:city, address:address, date_of_birth:birthday})
                .then(() => res.send("Add info is successful"))
                .catch(err =>  res.send(err.message));
            break;
            // res.status(200).send("Eee");
            // break;
        default:
            res.statusCode = 405;
            res.messageerror = "Method not allowed";
            res.end();
    }
}