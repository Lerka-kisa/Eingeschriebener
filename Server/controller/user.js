// const path = __dirname.split('\\');
// const {Users} = require("../DB(init)");
// const Error  = require("../Error");
// const access = require("../security/defines").access;
// const admin = require("../security/defines").admin;
// path.pop();
//
// exports.listUsers = async (req, res) => {
//     switch (req.method) {
//         case "GET":
//             try
//             {
//                 if(req.ability.can(admin.manage, admin.all)) {
//                     Users.findAll({
//                         attributes: ['id', 'username', 'email', 'role']
//                     }).then(r => {
//                         res.status(200).json(r);
//                     })
//
//                 }else
//                     Error.Error401(res);
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
// exports.infoByUserId = async (req, res) => {
//     switch (req.method) {
//         case "GET":
//             try
//             {
//                 if(req.ability.can(access.read, new Users({id: Number.parseInt(req.params.id)}))){
//                     Users.findOne({
//                         where:
//                             {
//                                 id: req.params.id
//                             },
//                         attributes: ['id', 'username', 'email', 'role']
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
//         default:
//             Error.Error405(res);
//     }
// }