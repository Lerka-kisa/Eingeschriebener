const jwt = require("jsonwebtoken");
const Error  = require("../Error");
const path = __dirname.split('\\');
const {University_data, Entry_threshold, Faculty_data, Speciality_data} = require("../model/universities");
const {Users_data, Users_marks, Authorization_data, Overall_rating} = require("../model/users")
const {accessKey, refreshKey} = require("../security/jwtKeys");
const {Sequelize} = require("../model/contextDB");
const {admin, enrollee, guest, rule} = require("../security/defines");
const Console = require("console");
const {where} = require("sequelize");

path.pop();

//Главная страница БГТУ
exports.mainPage = async (req, res, next) => {
    switch (req.method) {
        case "GET":
            res.render(
                'fitMain',
                {
                    title: "BelSTU",
                    css: ['dialog', 'belstu'],
                    enrollee: req.ability.can(rule.enrol),
                    auth: true
                });
            break;
        default:
            res.statusCode = 405;
            res.messageerror = "Method not allowed";
            res.end();
    }
}

//Значок личного кабинета
exports.userinfo = async (req, res, next) => {
    switch (req.method) {
        case "GET":
            try {

                if (req.ability.can(rule.admin)) {
                    res.redirect('/belstu_fit/admin')
                    break
                }
                if (req.ability.can(rule.enrol)) {
                    let userData = await Users_data.findOne({
                        raw: true,
                        nest: true,
                        where: {
                            id_auth: req.payload.id
                        },
                        include: [
                            {
                                required: true,
                                model: Users_marks,
                                separate: false,
                                attributes: ["math", "phys", "lang", "att"]
                            },
                            {
                                required: false,
                                model: Overall_rating
                        }]
                    })
                    if(userData === null){
                        res.redirect('/belstu_fit/userinfo/add')
                        break
                    }
                   /* userData.Users_marks.zero = false;*/

                    for (const key  in userData.Users_marks) {
                        if(userData.Users_marks[key] === 0)
                            userData.Users_marks.zero = true;
                    }

                    res.render(
                        'fitUserAccount',
                        {
                            title: "UserAccount",
                            css: ['search', 'userinfo'],
                            data: userData,
                            marks: userData.Users_marks,
                            rating: userData.Overall_ratings,
                            auth: true
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

//Заполнение личных данных юзера
//TODO мб сделать изменение личных данных?????
exports.addInfo = async (req, res, next) => {
    switch (req.method) {
        case "GET":
            if (req.ability.can(rule.enrol)) {
                res.render(
                    'fitUserAddInfo',
                    {
                        title: "AddInfo",
                        css: ['search'],
                        auth: true
                    });
            }
            else {
                res.redirect('/auth/login')
                break
            }
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
                        .catch(err => {
                            console.log(err.message)
                            res.status(200).json({"status":"not ok"})
                        })
                    res.status(200).json({"status":"ok"})
                })
                .catch(err =>  {
                    console.log(err.message)
                    res.status(200).json({"status":"not ok"})
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

//Изменение своих баллов
exports.updMarks = async (req, res, next) => {
    switch (req.method) {
        case "GET":
             if (req.ability.can(rule.enrol)) {
                 let marks = await Users_data.findOne({
                     raw: true,
                     nest: true,
                     where: {
                         id_auth: req.payload.id
                     },
                     include:
                         {
                             required: true,
                             model: Users_marks,
                             separate: false,
                             attributes: ["math", "phys", "lang", "att"]
                         }
                 })

                 res.render('marks',
                     {
                         auth: true,
                         marks: marks.Users_marks,
                         css: ['marks', 'materialize.min']
                     }
             )
             }
             else{
                 res.redirect('/auth/login')
                 break
             }
             break;
        case "POST":
            let math = parseInt(req.body.math)
            let phys = parseInt(req.body.physics)
            let lang = parseInt(req.body.language)
            let att = parseInt(req.body.certificate)
            let id = parseInt(req.payload.id)
            console.log(math, phys, lang, att)
            Users_data.findOne({
                where: {
                    id_auth: id
                },
                attributes:["id"]})
                .then(r => {
                    Users_marks.update(
                        {
                            math: math,
                            phys: phys,
                            lang: lang,
                            att: att
                        },
                        {where: {id_user: r.id}}
                    )
                        .then(task => {
                            //res.send("Add info is successful")
                            res.redirect('/belstu_fit/userinfo')
                        })
                        .catch(err => {
                            console.log('Error: ', err.message)
                            res.send("Add info is not successful")
                        })
                })
            // Users_data.create({id_auth: req.payload.id, name: name,  surname:surname, middle_name:middle_name, city:city, address:address, date_of_birth:birthday})
            //     .then(() => res.send("Add info is successful"))
            //     .catch(err =>  res.send(err.message));
            break;
        // res.status(200).send("Eee");
        // break;
        default:
            res.statusCode = 405;
            res.messageerror = "Method not allowed";
            res.end();
    }
}

exports.checkFiling = async (req, res, next) => {
    switch (req.method) {
        case "GET":
            //let mess = ""

            if (req.ability.can(rule.enrol)) {
                let id = parseInt(req.payload.id)
                let mess = true

                let userDataMarks = await Users_data.findOne({
                    where: {
                        id_auth: id
                    },
                    include: [{
                        model: Users_marks,
                        required: true
                    }]
                })
                if(userDataMarks === null){
                    res.status(200).json({"status":"Not info about user"})
                    mess = false
                }
                else{
                    console.log(userDataMarks)
                    userDataMarks.Users_marks.forEach(m => {
                        if(m.math === 0 || m.phys === 0 || m.lang === 0 || m.att === 0){
                            //mess = "Not all CT"
                            res.status(200).json({"status":"Not all CT"})
                            mess = false
                        }
                    })
                }

                if(mess){
                    Users_data.findOne({
                        where: {
                            id_auth: id
                        },
                        include: [{
                            model: Overall_rating,
                            required: true
                        }]
                    })
                        .then(r => {
                            if (r.length === 0) {
                                res.status(200).json({"status":"OK"})
                                //mess = "OK"
                            }
                            else{
                                res.status(200).json({"status":"Has already"})
                                //mess = "Has already"
                            }
                        })
                        .catch(() => {
                            res.status(200).json({"status":"OK"})
                            //mess = "OK"
                        })
                }

                //res.status(200).json({"status":mess})
                break

            }
            else{
                res.status(200).json({"status":"Not authorized"})
                //mess = "Not authorized"
                break
            }
        default:
            res.statusCode = 405;
            res.messageerror = "Method not allowed";
            res.end();
    }
}

exports.filing = async (req, res, next) => {
    switch (req.method) {
        case "GET":
            if (req.ability.can(rule.enrol)) {
                res.render(
                    'fitApplications',
                    {
                        title: "AddApplication",
                        css: ['priority'],
                        auth: true,
                        new: true
                    }
                );
                break
            }
            else{
                res.redirect('/auth/login')
                break
            }
        case "POST":
            let poit = req.body.priority_poit
            let isit = req.body.priority_isit
            let poibms = req.body.priority_poibms
            let deivi = req.body.priority_deivi
            let contract = req.body.contact
            let id_auth = parseInt(req.payload.id)
            let id_user = 0
            let math = 0
            let phys = 0
            let lang = 0
            let att = 0
            let sum = 0
            Users_data.findOne({
                where: {
                    id_auth: id_auth
                },
                attributes:["id"],
                include: [{
                    model: Users_marks,
                    required: true,
                    attributes:["math","phys","lang","att"]
                }]}).then(r => {
                r.Users_marks.forEach(m => {
                    math = m.math
                    phys = m.phys
                    lang = m.lang
                    att = m.att

                    sum += m.math + m.phys + m.lang + m.att
                })
                id_user = r.id
                //console.log(sum + " " + id_user)
                Overall_rating.create({
                    id_user:id_user,
                    file_number:"no number",
                    math:math,
                    phys:phys,
                    lang:lang,
                    att:att,
                    sum:sum,
                    POIT:poit,
                    ISIT:isit,
                    POIBMS:poibms,
                    DEIVI:deivi,
                    contract:contract,
                    confirm:false
                })
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

exports.changeFiling = async (req, res, next) => {
    switch (req.method) {
        case "GET":
            if (req.ability.can(rule.enrol)){
                 res.render(
                     'fitApplications',
                     {
                         title: "AddApplication",
                         css: ['priority'],
                         new: false
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
                attributes:["id"]
            }).then(r => {
                id_user = r.id
                //console.log(sum + " " + id_user)
                Overall_rating.update({
                        POIT:poit,
                        ISIT:isit,
                        POIBMS:poibms,
                        DEIVI:deivi,
                        contract: contract,
                        confirm:false
                    },
                    {where: {id_user: r.id}
                    })
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

exports.getrating = async (req, res, next) => {
    switch (req.method) {
        case "POST":
            let contract = req.body.contract
            Overall_rating.findAll({

                where:[{contract:contract, confirm:true}],
                attributes:['sum','POIT','ISIT','POIBMS','DEIVI']
            })
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
