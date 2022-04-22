const { AbilityBuilder, Ability } = require("@casl/ability");
const {Admin, Enrollee} = require("./roles")

const admin = require("./defines").admin;
const enrollee = require("./defines").admin;
const guest = require("./defines").admin;

exports.GetAbilityFor = (req) => {
    const {rules, can, cannot} = new AbilityBuilder(Ability);
    switch (req.payload.role) {
        case Admin:
            can(admin.manage, admin.all);
            break;
        case Enrollee:
            can(enrollee.manage, enrollee.all);
            // can(
            //     [access.read, access.create, access.update],
            //     [entity.repos, entity.commits],
            //     {authorid: req.payload.id}
            // );
            break;
        default:
            can(guest.manage, guest.all);
            // can(
            //     access.read,
            //     [entity.repos, entity.commits]
            // );
            break;
    }
    req.rules = rules;
    return new Ability(rules);
}