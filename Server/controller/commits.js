// const {Commits, Users, Repos} = require("../DB(init)");
// const Error  = require("../Error");
// const access = require("../security/defines").access;
// const entity = require("../security/defines").entity;
// const admin = require("../security/defines").admin;
//
// exports.Commits = async (req, res) => {
//     switch (req.method) {
//         case "GET":
//             try {
//                 if (req.ability.can(access.read, entity.commits)) {
//                     Commits.findAll({
//                         where:
//                             {
//                                 repoid: Number.parseInt(req.params.id)
//                             }
//                     }).then(r => {
//                         res.status(200).json(r);
//                     })
//                 } else {
//                     Error.Error401(res);
//                 }
//             } catch (err) {
//                 Error.Error500(res, err);
//             }
//             break;
//         case "POST":
//             try
//             {
//                 if(req.ability.can(access.create, entity.commits)){
//                 Repos.findOne({where: {id: req.params.id}})
//                     .then(r => {
//                         if (req.ability.can(access.read, new Repos({authorid: r.authorid})) && r) {
//                             Commits.create({
//                                 message: req.body.message,
//                                 repoid: req.params.id
//                             }).then(s => res.status(200).json(s))
//                         } else {
//                             Error.Error401(res);
//                         }
//             })}else {
//                     Error.Error401(res);
//                 }
//             }
//             catch(err)
//             {
//                 Error.Error500(res, err);
//             }
//             break;
//         default:
//             Error.Error405(res);
//     }
// }
//
// exports.CommitsById = async (req, res) => {
//     switch (req.method) {
//         case "GET":
//             try
//             {
//                 if(req.ability.can(access.read, entity.repos)){
//                     Commits.findOne({
//                         where : {repoid : req.params.id, id : req.params.commitId }
//                     }).then(r => {
//                         res.status(200).json(r);
//                     })
//                 }else{
//                     Error.Error401(res);
//                 }
//             }
//             catch(err)
//             {
//                 Error.Error500(res, err);
//             }
//             break;
//         case "PUT":
//             try
//             {
//                 if(req.ability.can(access.update, entity.commits)){
//                     Repos.findOne({where: {id: req.params.id}})
//                         .then(r => {
//                             if (req.ability.can(access.read, new Repos({authorid: r.authorid})) && r) {
//                                 Commits.update(
//                                 {message: req.body.message},
//                                     {where: {id : req.params.commitId}}
//                                 ).then(s => res.status(200).json(s))
//                             } else {
//                                 Error.Error401(res);
//                             }
//                         })}else {
//                     Error.Error401(res);
//                 }
//             }
//             catch(err)
//             {
//                 Error.Error500(res, err);
//             }
//             break
//         case "DELETE":
//             try
//             {
//                 if(req.ability.can(admin.manage, admin.all)){
//                     Repos.findOne({where: {id: req.params.id}})
//                         .then(r => {
//                             if(r) {
//                                 Commits.destroy(
//                                     {where: {id: req.params.commitId}}
//                                 ).then(r => res.status(200).json(r));
//                             }else{
//                                res.status(200).json({repos : "not exist"})
//                             }
//                         })
//                 }else{
//                     Error.Error401(res);
//                 }
//             }
//             catch(err)
//             {
//                 Error.Error500(res, err);
//             }
//             break;
//         default:
//             Error.Error405(res);
//     }
// }
