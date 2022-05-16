const jwt = require("jsonwebtoken");
const Error  = require("../Error");
const path = __dirname.split('\\');
const {University_data, Entry_threshold, Faculty_data, Speciality_data} = require("../model/universities");
const {Users_data, Users_marks, Authorization_data, Overall_rating} = require("../model/users")
const {accessKey, refreshKey} = require("../security/jwtKeys");
const {Sequelize} = require("../model/contextDB");
const {admin, enrollee, guest, rule} = require("../security/defines");
const Console = require("console");

path.pop();

exports.mainPage = async (req, res, next) => {
    switch (req.method) {
        case "GET":
            res.render(
                'belstuFitMain',
                {
                    title: "BelSTU",
                    css: `<link rel='stylesheet' href='/css/search.css'>`//TODO CSS
                });
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
                //req.ability
                if (req.ability.can(rule.admin)) {
                    //res.status(200).send("Hurray, you are admin");
                    //res.status(200).send({error: 2})
                    res.render(
                        'belstuFitAdmin',
                        {
                            title: "Admin",
                            css: `<link rel='stylesheet' href='/css/search.css'>`//TODO CSS
                        });
                    break
                    break
                }
                if (req.ability.can(rule.enrol)) {
                    console.log("lol")
                    res.render(
                        'belstuFitUserAccount',
                        {
                            title: "UserAccount",
                            css: `<link rel='stylesheet' href='/css/search.css'>`//TODO CSS
                        });
                    break
                }
                if (req.ability.can(rule.guests)) {
                    res.redirect('/auth/login')
                    break
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

exports.userinfodata = async (req, res, next) => {
    switch (req.method) {
        case "GET":
            try {
                let id = parseInt(req.payload.id)
                Users_data.findAll({
                    where: {
                        id_auth: id
                    },
                    include:[{
                        model: Users_marks,
                        required: true,
                        attributes:["math","phys","lang","att"]
                    }]
                })
                    .then(r => {
                        if (r.length === 0){
                            res.status(200).json({error:"noinfo"});
                            //res.redirect('/belstu_fit/userinfo/add');
                        }
                        else{
                            res.status(200).json(r);
                        }
                    })
                    .catch(err =>  res.send(err.message));
                return
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
            res.render(
                'belstuFitUserAddInfo',
                {
                    title: "AddInfo",
                    css: `<link rel='stylesheet' href='/css/search.css'>`//TODO CSS
                });
            //res.sendFile(path.join("\\") + "\\views\\addInfoUser.html");
            break;
        case "POST":
            let name = req.body.name
            let surname = req.body.surname
            let middle_name = req.body.middle_name
            let address = req.body.address
            let birthday = req.body.birthday
            let mail = req.body.mail
            let phonenumber = req.body.phonenumber

            console.log(name, surname, middle_name, address, birthday, mail, phonenumber)
            Users_data.create({id_auth: req.payload.id, name: name,  surname:surname, middle_name:middle_name, address:address, date_of_birth:birthday, mail: mail, number: phonenumber})
                .then((r) => {
                    Users_marks.create({id_user: r.dataValues.id, math:0, phys:0, lang:0, att:0})
                        .then(() => {
                            console.log("All norm)))")
                            //res.redirect('/belstu_fit/userinfo');
                        })
                        .catch(err =>  res.send(err.message + "user marks"))
                    res.redirect('/belstu_fit/userinfo');
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
// exports.addMarks = async (req, res, next) => {
//     switch (req.method) {
//         case "GET":
//             res.sendFile(path.join("\\") + "\\views\\usersMarks.html");
//             break;
//         case "POST":
//             let name = req.body.name
//             let surname = req.body.surname
//             let middle_name = req.body.middle_name
//             let city = req.body.city
//             let address = req.body.address
//             let birthday = req.body.birthday
//             console.log(name, surname, middle_name, city, address, birthday)
//             Users_data.create({id_auth: req.payload.id, name: name,  surname:surname, middle_name:middle_name, city:city, address:address, date_of_birth:birthday})
//                 .then(() => res.send("Add info is successful"))
//                 .catch(err =>  res.send(err.message));
//             break;
//             // res.status(200).send("Eee");
//             // break;
//         default:
//             res.statusCode = 405;
//             res.messageerror = "Method not allowed";
//             res.end();
//     }
//}
exports.getrating = async (req, res, next) => {
    switch (req.method) {
        case "GET":
            Overall_rating.findAll(
                {
                    attributes:['sum','POIT','ISIT','POIBMS','DEIVI']
                }
            )
                .then(r => {

                    //res.send("Add info is successful")
                    res.status(200).json(r)
                })
                .catch(err =>  {
                    res.status(200).json({error:"No data"})
                });
            break;
            // res.status(200).send("Eee");
            // break;
        default:
            res.statusCode = 405;
            res.messageerror = "Method not allowed";
            res.end();
    }
}
exports.filing = async (req, res, next) => {
    switch (req.method) {
        case "GET":
            if (req.ability.can(rule.enrol)){
                res.render(
                    'belstuFitApplication',
                    {
                        title: "AddApplication",
                        css: `<link rel='stylesheet' href='/css/search.css'>`//TODO CSS
                    });
            }
            else{
                res.redirect('/auth/login')
                break
            }

            //res.sendFile(path.join("\\") + "\\views\\addInfoUser.html");
            break;
        case "POST":
            let poit = req.body.priority_poit
            let isit = req.body.priority_isit
            let poibms = req.body.priority_poibms
            let deivi = req.body.priority_deivi
            let contract = req.body.contact
            let id_auth = parseInt(req.payload.id)
            let id_user = 0
            let sum = 0
            Users_data.findOne({
                where: {
                    id_auth: id_auth
                },
                attributes:["id"],
                include: [{
                    model: Users_marks,
                    attributes:[],
                    required: true,
                    attributes:["math","phys","lang","att"]
                }]}).then(r => {
                r.Users_marks.forEach(m => {
                    sum += m.math + m.phys + m.lang +m.att
                })
                id_user = r.id
                //console.log(sum + " " + id_user)
                Overall_rating.create({id_user:id_user,file_number:"no number", sum:sum, POIT:poit, ISIT:isit, POIBMS:poibms, DEIVI:deivi,contract:contract, confirm:false})
                    .then(() => {
                        res.redirect('/belstu_fit/userinfo');
                    })
                    .catch(err => {
                        res.send("Add info is not successful")
                    })
            })


            //res.sendFile(path.join("\\") + "\\views\\addInfoUser.html");
            break;
        default:
            res.statusCode = 405;
            res.messageerror = "Method not allowed";
            res.end();
    }
}