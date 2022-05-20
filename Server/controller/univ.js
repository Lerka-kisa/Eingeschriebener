const jwt = require("jsonwebtoken");
const path = __dirname.split('\\');
const {University_data, Entry_threshold, Faculty_data, Speciality_data} = require("../model/universities");
const {accessKey, refreshKey} = require("../security/jwtKeys");
const {Sequelize} = require("../model/contextDB");

path.pop();

exports.startpage = async (req, res, next) => {
    switch (req.method) {
        case "GET":
            res.render(
                'kudapostupatMain',
                {
                    title: "Search univers",
                    css: `<link rel='stylesheet' href='/css/search.css'>`
                });
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
            //GetAllUnivers()
            University_data.findAll({
                attributes:["id","full_name"],
                include:[{
                    model: Faculty_data,
                    required: true,
                    attributes:["name"]
                }]
            })
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

            if(req.body.contact === "budgetary"){
                University_data.findAll({
                    attributes:["id","full_name"],
                    include:[{
                        model: Faculty_data,
                        required: true,
                        attributes:["name"],
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
                        if (r.length === 0){
                            res.status(200).send({error: "Возможно в этом году, у тебя не выйдет поступить в IT на бюджетной основе, либо рассмотри вариант платного обучения, либо ждём тебя в следующем году)))"});
                        }
                        else{
                            res.status(200).json(r);
                        }
                    })
            }
            else{
                University_data.findAll({
                    attributes:["id","full_name"],
                    include:[{
                        model: Faculty_data,
                        required: true,
                        attributes:["name"],
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
                //GetAllUnivers_paid(total)
                    .then(r => {
                        if (r.length == 0){
                            res.status(200).send({error: "Возможно в этом году, у тебя не выйдет поступить в IT на платной основе, ждём тебя в следующем году)))"});
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
            let id = parseInt(req.params.id)
            University_data.findAll({
                where: {id: id},
                attributes:["full_name", "link"],
                include:[{
                    model: Faculty_data,
                    required: true,
                    attributes:["name"],
                    include: [{
                        model: Speciality_data,
                        required: true,
                        attributes:["full_name","specification"],
                        include: [{
                            model: Entry_threshold,
                            attributes:["budgetary2020","paid2020","budgetary2021","paid2021"],
                            required: true
                        }]
                    }]
                }]
            })
                .then(r => {
                    if (r.length === 0){
                        res.status(200).json({error: "Data not found"})
/*                        res.statusCode = 404;
                        res.messageerror = "Data not found";
                        res.end();*/
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
