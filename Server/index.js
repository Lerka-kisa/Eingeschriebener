//require('dotenv').config()
const {engine} = require('express-handlebars');
// const cors = require('cors')
// const parser = require('cookie-parser')
const Sequelize = require('sequelize')
const https = require('https')
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const {accessKey} = require("./security/jwtKeys");
const {Guest} = require("./security/roles");
const {GetAbilityFor} = require("./security/privilegies");

const express = require("express");
const app = express()
const authRouter = require("./route/auth");
const univRouter = require("./route/univ");
const fitRouter = require("./route/fit");
const fs = require("fs");

//const adminRouter = require("./route/admin");

const PORT = process.env.PORT || 5000;
//const PORT = process.env.PORT || 443; //TODO https

let options = {
    key: fs.readFileSync('./security/certificate/RS-Eingeschriebener-RSA.key').toString(),
    cert: fs.readFileSync('./security/certificate/RS-Eingeschriebener.crt').toString()
};

app.engine('handlebars', engine( {
    extname: 'hbs',
    defaultLayout: 'main',
    layoutsDir: __dirname + '/views/layouts/',
    partialsDir: __dirname + '/views/partials/'
} ));
app.set('view engine', 'handlebars');

app.use(express.static("public"));
app.use(cookieParser("cookie_key"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.use((req, res, next) => {
    if (req.cookies.accessToken) {
        jwt.verify(req.cookies.accessToken, accessKey, (err, payload) => {
            if (err) {
                res.clearCookie('accessToken');
                res.redirect('/auth/login');
            }
            req.payload = payload;
        });
    }else {
        req.payload = {role : Guest};
    }

    req.ability = GetAbilityFor(req);
    next();
});

app.get('/resource', (req, res) =>
{
    if (req.payload)
        res.status(200).send(`Resource ${req.payload.id}-${req.payload.login}-${req.payload.role}`);
    else
        res.status(401).send('To access the resource, you need to log in');
});

// app.use("/user", userRouter);
// app.use("/admin", adminRouter);
// app.use("/home", homeRouter);
app.use("/auth", authRouter);
app.use("/univers", univRouter);
app.use("/belstu_fit", fitRouter);



/*https.createServer(options, app).listen(PORT, ()=>{
    console.log(`Server listening http://localhost:${PORT}/belstu_fit`);
})
    .on('Error', (err) => {
        console.log(`Error: ${err.code}`);
    })*/ //TODO https

app.listen(PORT, ()=>{
    //console.log(`Server listening http://localhost:${PORT}/univers/startpage`);
    console.log(`Server listening http://localhost:5000/belstu_fit`);
})
    .on('Error', (err) => {
        console.log(`Error: ${err.code}`);
    })