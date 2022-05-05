const jwt = require("jsonwebtoken");
const path = __dirname.split('\\');
const {University_data, Entry_threshold, Faculty_data, Speciality_data} = require("../model/universities");
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
            //res.send("Тут будет сендфайл")
            //res.sendFile(path.join("\\") + "\\views\\register.html");

            University_data.findAll()
                .then(r => {
                    res.status(200).json(r);
                })
            break;
        case "POST":
            let math = parseInt(req.body.math)
            let phys = parseInt(req.body.physics)
            let lan = parseInt(req.body.language)
            let att = parseInt(req.body.certificate)

            let total = math + phys + lan + att + 15

            //
            if(req.body.contact === "budgetary"){
                University_data.findAll({
                    attributes:["name", "full_name", "link"],
                    include:[{
                        model: Faculty_data,
                        required: true,
                        attributes:[],
                        include: [{
                            model: Speciality_data,
                            required: true,
                            attributes:[],
                            include: [{
                                model: Entry_threshold,
                                attributes:[],
                                required: true,
                                where: {
                                    budgetary2021: {[Sequelize.Op.lte]:total}
                                }
                            }]
                        }]
                    }]
                })
                    .then(r => {
                        if (r.length == 0){
                            res.status(200).send("Возможно в этом году, у тебя не выйдет поступить в IT на бюджетной основе, либо рассмотри вариант платного обучения, либо ждём тебя в следующем году)))");
                        }
                        else{
                            // let k =""
                            // for(let i = 0; i<r.length;i++){
                            //     console.log(r[i])
                            //     let univer = JSON.parse(JSON.stringify(r[i]))
                            //     k = k + univer.link + "\n"
                            //     console.log("----------------")
                            // }

                            res.status(200).json(r);
                            //res.status(200).send(k);
                        }
                    })
            }
            else{
                University_data.findAll({
                    attributes:["name", "full_name", "link"],
                    include:[{
                        model: Faculty_data,
                        required: true,
                        attributes:[],
                        include: [{
                            model: Speciality_data,
                            required: true,
                            attributes:[],
                            include: [{
                                model: Entry_threshold,
                                attributes:[],
                                required: true,
                                where: {
                                    paid2021: {[Sequelize.Op.lte]:total}
                                }
                            }]
                        }]
                    }]
                })
                    .then(r => {
                        if (r.length == 0){
                            res.status(200).send("Возможно в этом году, у тебя не выйдет поступить в IT на платной основе, ждём тебя в следующем году)))");
                        }
                        else{
                            res.status(200).json(r);
                        }
                    })
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
            //нужно тут проверять на отсутствие на какой-либо параметр
            let id = parseInt(req.params.id)
            University_data.findByPk(id)
                .then(r => {
                    if (r == null){
                        res.statusCode = 404;
                        res.messageerror = "Data not found";
                        res.end();
                    }
                    else{
                        res.status(200).json(r);
                    }
                })
                .catch(err =>  res.send(err.message));
            break;
        default:
            res.statusCode = 405;
            res.messageerror = "Method not allowed";
            res.end();
    }
}