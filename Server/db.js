const {University_data, Faculty_data, Speciality_data, Entry_threshold} = require("./model/universities");
const {Sequelize} = require("./model/contextDB");


exports.GetAllUnivers_paid = (sum) => {
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
                        paid2021: {[Sequelize.Op.lte]:sum}
                    }
                }]
            }]
        }]
    })
}
exports.GetAllUnivers = () => {
    University_data.findAll({
        attributes:["id","full_name"],
        include:[{
            model: Faculty_data,
            required: true,
            attributes:["name"]
        }]
    })
}