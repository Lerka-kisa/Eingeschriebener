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

//https://Eingeschriebener/belstu_fit/admin
exports.admin = async (req, res, next) => {
    switch (req.method) {
        case "GET":
            try {
                if (req.ability.can(rule.admin)) {
                    res.render(
                        'fitAdmin',
                        {
                            title: "Admin",
                            css: `<!--<link rel='stylesheet' href='/css/search.css'>-->
                                    <link rel='stylesheet' href='/css/dialog.css'>`,//TODO CSS
                            auth: true
                        });
                    break
                }
                else{
                    res.redirect('/auth/login')
                    break
                }
                // else {
                //     Error.Error401(res);
                // }
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

//https://Eingeschriebener/belstu_fit/admin/all_good_application
exports.allGoodApplication = async (req, res, next) => {
    switch (req.method) {
        case "POST":
            try {
                if (req.ability.can(rule.admin)) {
                    let contract = req.body.contract
                    Users_data.findAll({
                        attributes:["surname", "name", "middle_name"],
                        include: [{
                            model: Overall_rating,
                            required: true,
                            attributes: ["file_number", "math", "phys", "lang", "att", "sum", "POIT", "ISIT", "POIBMS", "DEIVI"],
                            where:[{contract:contract, confirm:true}]
                        }]
                    }).then(r => {
                        res.status(200).json(r)
                    })
                        .catch(err =>  {
                            res.status(200).json({error:"No data"})
                        });
                }
                else{
                    res.redirect('/auth/login')
                }
                break
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

exports.allBadApplication = async (req, res, next) => {
    switch (req.method) {
        case "POST":
            try {
                if (req.ability.can(rule.admin)) {
                    let contract = req.body.contract
                    Users_data.findAll({
                        attributes:["surname", "name", "middle_name"],
                        include: [{
                            model: Overall_rating,
                            required: true,
                            attributes: ["id","math", "phys", "lang", "att", "sum", "POIT", "ISIT", "POIBMS", "DEIVI"],
                            where:[{contract:contract, confirm:false}]
                        }]
                    }).then(r => {
                        res.status(200).json(r)
                    })
                        .catch(err =>  {
                            res.status(200).json({error:"No data"})
                        });
                }
                else{
                    res.redirect('/auth/login')
                }
                break
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

//https://Eingeschriebener/belstu_fit/admin/all_bad_application/approve
exports.approveBadApplication = (req, res, next) => {
    switch (req.method) {
        case "POST":
            let id = req.body.id_app
            let file_number = req.body.file_number
            //console.log(id + file_number)
            Overall_rating.update({
                    file_number:file_number,
                    confirm:true
                },
                {where: {id: id}
                })
                .then(() => {
                    res.redirect('/belstu_fit/admin');
                })
                .catch(err => {
                    res.send("Add info is not successful")
                })
            //res.status(200).json({"id":id, "name":file_number})
            // University_data.findAll({
            //     where: {id: id},
            //     attributes:["full_name", "link"],
            //     include:[{
            //         model: Faculty_data,
            //         required: true,
            //         attributes:["name"],
            //         include: [{
            //             model: Speciality_data,
            //             required: true,
            //             attributes:["full_name","specification"],
            //             include: [{
            //                 model: Entry_threshold,
            //                 attributes:["budgetary2020","paid2020","budgetary2021","paid2021"],
            //                 required: true
            //             }]
            //         }]
            //     }]
            // })
            //     .then(r => {
            //         if (r.length === 0){
            //             res.status(200).json({error: "Data not found"})
            //             /*                        res.statusCode = 404;
            //                                     res.messageerror = "Data not found";
            //                                     res.end();*/
            //         }
            //         else{
            //             res.status(200).json(r);
            //         }
            //     })
            //     .catch(err =>  res.send(err.message));
            break;
        default:
            res.statusCode = 405;
            res.messageerror = "Method not allowed";
            res.end();
    }
}

//https://Eingeschriebener/belstu_fit/admin/all_bad_application/delete
exports.deleteBadApplication = (req, res, next) => {

    switch (req.method) {
        case "POST":
            try {
                if (req.ability.can(rule.admin)) {
                    let id = req.body.id
                    Overall_rating.destroy({
                        where: {id: id}
                    })
                        .then(() => {
                            //res.redirect('/belstu_fit/admin');
                            res.status(200).json({status: "ok"})
                        })
                        .catch(err => {
                            //res.send("Delete info is not successful")
                            res.status(200).json({status: "not ok"})
                        })
                    break;
                }
                else{
                    res.redirect('/auth/login')
                    break
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
