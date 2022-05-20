const jwt = require("jsonwebtoken");
const path = __dirname.split('\\');
const Authorization_data = require("../model/users").Authorization_data;
const {accessKey, refreshKey} = require("../security/jwtKeys");
const {Sequelize} = require("../model/contextDB");
const fs = require('fs')
const crypto = require('crypto')

path.pop();

exports.login = async (req, res, next) => {
    switch (req.method) {
        case "GET":
            res.render(
                'belstuFitAuthorization',
                {
                    title: "Authorization",
                    css: `<link rel='stylesheet' href='/css/authorization.css'>`,//TODO CSS
                    auth: false

                });
            //res.sendFile(path.join("\\") + "\\views\\index.html");
            //fs.createReadStream("\\views\\login.txt").pipe(res)
            //res.sendFile(path.join("\\") + "\\views\\login.txt")
            break;
        case "POST":
            if(req.body.login && req.body.password) {
                try {
                    let login = req.body.login
                    let password = req.body.password
                    let hashPassword = crypto.createHash('md5').update(password).digest('hex')
                    const auth = await Authorization_data.findOne(
                        {
                            where:{
                                [Sequelize.Op.and]:[{ login: login, password: hashPassword }]
                            }
                        })//.then(r => Console.log(r))
                    //.catch(r => Console.log(` жопа ${r}`));

                    const accessToken = jwt.sign({
                        id: auth.id,
                        login: auth.login,
                        role: auth.role
                    }, accessKey, {expiresIn: 3600});

                    const refreshToken = jwt.sign({
                        id: auth.id,
                        login: auth.login,
                        role: auth.role
                    }, refreshKey, {expiresIn: 24 * 3600});

                    res.cookie('accessToken', accessToken, {
                        httpOnly: true,
                        sameSite: 'strict'
                    });
                    res.cookie('refreshToken', refreshToken, {
                        httpOnly: true,
                        sameSite: 'strict'
                    });
                    //res.redirect('/belstu_fit');
                    res.status(200).json({status: "ok"})
                }
                catch (e) {
                    //res.redirect('/auth/login')
                    res.status(200).json({status: "not ok"})
                    //document.getElementById("errorInput").innerHTML = "дщдщд";
                }
            }
            break;
        default:
            res.statusCode = 405;
            res.messageerror = "Method not allowed";
            res.end();
    }
}

exports.register = (req, res, next) => {
    switch (req.method) {
        case "GET":
            res.render(
                'belstuFitRegistration',
                {
                    title: "Registration",
                    css: `<link rel='stylesheet' href='/css/registration.css'>`,//TODO CSS
                    auth: false
                });
            //res.sendFile(path.join("\\") + "\\views\\register.html");
            break;
        case "POST":
            let login = req.body.login
            let password = req.body.password
            let hashPassword = crypto.createHash('md5').update(password).digest('hex')
            //bcrypt.hash(password, 5).then(r => {
            //     hashPassword = r
            // });
            Authorization_data.create({login: login,  password: hashPassword, role: 'ENROLLEE'})
                .then(() =>  res.status(200).json({status: "ok"})/*res.redirect('/auth/login')*/)
                .catch(err => {
                    res.status(200).json({status: "not ok"})
                })

        // } =>  res.send(err.message));
            break;
        default:
            res.statusCode = 405;
            res.messageerror = "Method not allowed";
            res.end();
    }
}

exports.logout = (req, res) =>
{
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    res.redirect('/belstu_fit');
};

exports.ability = (req, res) => {
    res.status(200).send(req.rules);
}
