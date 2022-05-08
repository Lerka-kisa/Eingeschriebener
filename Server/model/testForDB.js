const  {Sequelize, Model, sequelize} = require('./contextDB')
const {log} = require("nodemon/lib/utils");
const Console = require("console");
const {University_data, Faculty_data, Speciality_data, Entry_threshold} = require("../model/universities");

const Authorization_data = require("./users").Authorization_data;

const print = (p) => {
    let k = 0;
    console.log('---------------------');
    p.forEach(el => {console.log(++k, el.dataValues);});
}

sequelize.authenticate()
    .then(() => {console.log('Hurray!!! You are connected)))');})
    .then(() => {
        //Faculty.findAll({raw:true}).then(faculties => console.log(faculties));
        //Faculty.findAll().then(faculties => print(faculties));
        //Pulpit.findAll().then(pulpits => print(pulpits));
        //Teacher.findAll().then(teachers => print(teachers));
        //Subject.findAll().then(subjects => print(subjects));
        //Auditorium_type.findAll().then(aud_types => print(aud_types));
        //Auditorium.findAll().then(aud => print(aud));

        // Authorization_data.findOne(
        //     {
        //         where: {
        //             [Sequelize.Op.and]: [{login: "Lera2", password: "zxcvbnm,"}]
        //         }
        //     }).then(r => Console.log(r))
        //     .catch(r => Console.log(` жопа ${r}`));
        //
        // University_data.findAll()
        //     .then(r => {
        //         console.log(r);
        //     })
        //
        //     .catch(r => Console.log(` жопа ${r}`));
        //
        University_data.findByPk(5)
            .then(r => {
                console.log(r);
            })

            .catch(r => Console.log(` жопа ${r}`));

        ///univers/offer
        // University_data.findAll({
        //     include:[{
        //         model: Faculty_data,
        //         required: true,
        //         include: [{
        //             model: Speciality_data,
        //             required: true,
        //             include: [{
        //                 model: Entry_threshold,
        //                 required: true,
        //                 where: {
        //                     budgetary2021: {[Sequelize.Op.lte]:293}
        //                 }
        //             }]
        //         }]
        //     }]
        // }).then(faculties => print(faculties));

        // Faculty.findAll({attributes:['faculty', ['faculty_name', 'Наименование факультета']]})
        //     .then(faculties => print(faculties));

        // Teacher.findAll({
        //     attributes:[
        //         [sequelize.fn('COUNT', sequelize.col('pulpit')),'count_pulpit'],
        //     ]
        // }).then(p => print(p));

        // Teacher.findAll({
        //     where:{pulpit:'ИСиТ'},
        //     attributes:[
        //         ['teacher_name', 'Преподаватель'],
        //         ['pulpit', 'Кафедра']
        //     ]
        // }).then(p => print(p));

        // Teacher.findAll({
        //     where:{pulpit:'ИСиТ', teacher:'БРКВЧ'},
        //     attributes:[
        //         ['teacher_name', 'Преподаватель'],
        //         ['pulpit', 'Кафедра']
        //     ]
        // }).then(p => print(p));

        // Teacher.findAll({
        //     where: {
        //         [Sequelize.Op.or]: [{pulpit: 'ИСиТ', pulpit: 'ЛВ'}]
        //     },
        //     attributes:[
        //         ['teacher_name', 'Преподаватель'],
        //         ['pulpit', 'Кафедра']
        //     ]
        // }).then(p => print(p));

        ///insert
        // Faculty.create({faculty:'УМllhj[', faculty_name:'Убейте меня'})
        //     .then(task => console.log(task.dataValue))
        //     .catch(err => console.log(err.message))

        //Faculty.findAll({raw:true}).then(faculties => console.log(faculties));
        //update
        // Faculty.update(
        //     {faculty_name: 'Програмное обеспечение информационных технологий'},
        //     {where: {faculty: 'УМ'}}
        // )
        // .then(task => console.log('Result: ', task))
        // .catch(err => console.log('Error: ', err.message));

        //delete
        // Faculty.destroy({where:{faculty:'УМllhj['}})
        //     .then(task => console.log('Result: ', task))
        //     .catch(err=>console.log('Error: ',err.message));

        // sequelize.query('select pulpit, faculty from Pulpit')
        // .then((pulpits)=>{
        //     console.log(pulpits)})

        // sequelize.query('select Pulpit.pulpit, Pulpit.faculty, Subject.subject_name from Pulpit join Subject on Pulpit.pulpit = Subject.pulpit order by Pulpit.faculty')
        // .then((pulpits)=>{
        //     console.log(pulpits)})

        // sequelize.query('select Pulpit.pulpit, Pulpit.faculty, Subject.subject_name from Pulpit join Subject'
        //     + ' on Pulpit.pulpit = Subject.pulpit where Pulpit.faculty = :faculty',
        //     {replacements: { faculty: 'ИДиП'}}
        //     )
        // .then((pulpits)=>{
        //     console.log(pulpits)})

        // Faculty.findAll({where: {faculty: 'ИДиП'},
        //     include: [{model: Pulpit, as:'faculty_pulpits'}]
        // }).then(res => console.log(res));

        // Faculty.findAll({where: {faculty: "ИДиП"},
        //     include:[{model: Pulpit, as: 'faculty_pulpits',required: true,
        //          include:[{model: Teacher, as: 'pulpit_teachers',required: true}]
        //          }]
        // })
        // .then(res => console.log(res));

        // return sequelize.transaction({isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.READ_COMMITTED})
        //     .then (t => {
        //         return Faculty.create({faculty: 'СеШ', faculty_name: 'Средняя Школа'}, {transaction: t})
        //             .then((r) => {
        //                 return Pulpit.create({pulpit:'АСеВ', pulpit_name:'адам Серг Влад', faculty:'СШ'},
        //                     {transaction:t}
        //                 )
        //             })
        //             .then((r)=>{console.log('---commit'); return t.commit();})
        //             .catch((e)=>{console.error('---rollback', e.name); return t.rollback();});
        //     })
        //     return sequelize.transaction({isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.READ_UNCOMMITTED})
        //         .then(t => {
        //             return Pulpit.create({pulpit: 'CC', pulpit_name: 'qe', faculty: 'ЛХФ       '}, {transaction: t})
        //                 .then((r) => {
        //                     setTimeout(() => {
        //                         console.log('rollback', r);
        //                         return t.rollback();
        //                     }, 10000);
        //                 })
        //         })

        // return sequelize.transaction({isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.READ_UNCOMMITTED})
        //     .then(t => {
        //         return Auditorium.update({auditorium_capacity: 10},{where: {auditorium_capacity: {[Sequelize.Op.gte]: 0}}, transaction: t})
        //             .then((r) => {
        //                 setTimeout(() => {
        //                     console.log('rollback', r);
        //                     return t.rollback();
        //                 }, 20000);
        //             })
        //     })

        // Auditorium.update(
        //     {auditorium_capacity: 0},
        //     {where: {auditorium_name: '103-4'}}
        // )
        // .then(task => console.log('Result: ', task))
        // .catch(err => console.log('Error: ', err.message));

    })
    .catch(err => {console.log('Error!!!!DB is not connect(((:',err.message);});