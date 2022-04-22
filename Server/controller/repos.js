// const {Repos, Users} = require("../DB(init)");
// const Error  = require("../Error");
// const access = require("../security/defines").access;
// const entity = require("../security/defines").entity;
// const admin = require("../security/defines").admin;
//
// exports.Repos = async (req, res) => {
//     switch (req.method) {
//         case "GET":
//             try
//             {
//                 let repos = undefined;
//                 if(req.ability.can(access.read, entity.repos)){
//                     repos = await Repos.findAll();
//                 }else{
//                     Error.Error404(res);
//                 }
//                 if (repos)
//                     res.status(200).json(repos);
//
//             }
//             catch(err)
//             {
//                 Error.Error500(res, err);
//             }
//             break;
//         case "POST":
//             try
//             {
//                 if(req.ability.can(access.create,entity.repos)){
//                     Repos.create({
//                         name: req.body.name,
//                         authorid: req.payload.id
//                     }).then(r =>  res.status(200).json(r));
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
//
//
// exports.ReposById = async (req, res) => {
//     switch (req.method) {
//         case "GET":
//             try
//             {
//                 let repos = undefined;
//                 if(req.ability.can(access.read, entity.repos)){
//                     repos = await Repos.findOne({
//                         where : {id : req.params.id}
//                     })
//                 }else{
//                     Error.Error404(res);
//                 }
//                 if (repos)
//                     res.status(200).json(repos);
//                 else{
//                     Error.Error404(res);
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
//                 Repos.findOne({where: {id: req.params.id}})
//                     .then(r => {
//                             if (req.ability.can(access.update, new Repos({authorid: r.authorid}))) {
//                                 Repos.update(
//                                     {name: req.body.name},
//                                     {where: {id: req.params.id}}
//                                 ).then(r => res.status(200).json(r));
//                             } else {
//                                 Error.Error401(res);
//                             }
//                         }
//                     )
//                     .catch(() => {
//                         Error.Error404(res);
//                     })
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
//                     Repos.destroy(
//                         {where: {id : req.params.id}}
//                     ).then(r => {
//                         if(r===0){
//                             Error.Error404(res);
//                         }
//                         else{
//                             res.status(200).json(r)
//                         }
//                     });
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