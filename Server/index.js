//require('dotenv').config()
const app = require('express')()
// const cors = require('cors')
// const parser = require('cookie-parser')
const Sequelize = require('sequelize')

const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const {accessKey} = require("./security/jwtKeys");
const {Guest} = require("./security/roles");
const {GetAbilityFor} = require("./security/privilegies");

//const apiController = require("./route/api");
const express = require("express");
const authRouter = require("./route/auth");
const univRouter = require("./route/univ");
//const adminRouter = require("./route/admin");

const PORT = process.env.PORT || 5000;

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



/***
 * роуты все ниже остального кода, никуда не пересноси
 * специфичные адреса выше чем менее специфичные то есть:
 *  /api/users
 *  /api
 *  /login
 *  /
 *  ^^^ так, надеюсь знаешь
 */

// app.use("/user", userRouter);
// app.use("/admin", adminRouter);
// app.use("/home", homeRouter);
app.use("/auth", authRouter);
app.use("/univers", univRouter);


app.listen(PORT, ()=>{
    console.log(`Server listening http://localhost:${PORT}/auth/login`);
})
    .on('Error', (err) => {
        console.log(`Error: ${err.code}`);
    })
