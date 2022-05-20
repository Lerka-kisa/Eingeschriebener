const jwt = require("jsonwebtoken");
const server = require('../index').server
const WebSocket = require('ws').Server;
const wsServer = new WebSocket({server:server});

let chats = [];
let manager = null;
let online = false;

class chat {
    messages = [];
    constructor(login, message, socket) {
        this.login = login;
        this.messages.push(message);
        this.socket = socket;
    }
}

class message {
    constructor(login, message) {
        this.login = login;
        this.message = message;
    }
}

wsServer.on('connection', (socket, request, response) => {

    socket.send(JSON.stringify({online : online}));

    socket.on('close', (status) => {
        const accessToken = getCookies(request)
        console.log(status)
        if(accessToken) {
            let payload = getPayload(socket, {jwt: accessToken});

            if(payload.role === "ADMIN") {
                online = false;
                manager = null

                for (const chat of chats) {
                    chat.socket.send(JSON.stringify({online : online}));
                }

            }
        }

    });

    socket.on('message', (mes) => {
        const accessToken = getCookies(request);
        mes.json = JSON.parse(mes)

        if(accessToken) {
            mes.jwt = accessToken;
            mes.payload = getPayload(socket, mes);

            if(mes.payload.role === "ADMIN") {
                switch (mes.json.action) {
                    case "online":
                        //console.log("online")
                        online = true;
                        manager = socket;

                        chats.forEach(chat => {
                            chat.socket.send(JSON.stringify({online : online}));
                            manager.send(
                                JSON.stringify({
                                data : chat.messages
                                }))
                        })
                        break;
                    case "response":
                        chats.forEach(chat => {
                            if (chat.login === mes.json.login) {

                                chat.messages.push(new message(mes.payload.login, mes.json.message));


                                chat.socket.send(
                                    JSON.stringify({data: [{
                                    message: [mes.json.message],
                                    login: mes.payload.login,
                                    online: online
                                }]}))

                                socket.send(
                                    JSON.stringify({data: [{
                                        message: [mes.json.message],
                                        login: mes.json.login,
                                        admin: mes.payload.login,
                                        online: online
                                    }]}));
                            }
                        })
                        break;
                }
            }

            if(mes.payload.role === "ENROLLEE") {

                let exist = false;

                switch (mes.json.action) {
                    case "message":
                        chats.forEach(chat => {
                            if (chat.login === mes.payload.login) {
                                let newMessage = new message(mes.payload.login, mes.json.message);
                                chat.messages.push(newMessage);

                                socket.send(JSON.stringify({
                                    data: [{
                                        message: [mes.json.message],
                                        login: mes.payload.login,
                                        online: online
                                    }]
                                }));

                                exist = true;
                            }
                        })

                        if (exist === false) {
                            let newMessage = new message(mes.payload.login, mes.json.message);
                            let createChat = new chat(mes.payload.login, newMessage, socket)

                            chats.push(createChat);

                            socket.send(JSON.stringify({
                                data: [{
                                    message: [mes.json.message],
                                    login: mes.payload.login,
                                    online: online
                                }]
                            }));

                        }

                        if (manager !== null)
                            if (manager.readyState === 1)
                                manager.send(JSON.stringify({
                                    data: [{
                                        message: [mes.json.message],
                                        login: mes.payload.login
                                    }]
                                }))
                        break;
                    case "online":
                        chats.forEach(chat => {
                            if (chat.login === mes.payload.login) {
                                chat.socket = socket;
                                socket.send(JSON.stringify({
                                    data: chat.messages
                                }))
                            }
                        })

                        // if (manager !== null)
                        //     if (manager.readyState === 1)
                        //         manager.send(JSON.stringify({
                        //             data: [{
                        //                 message: [mes.json.message],
                        //                 login: mes.payload.login,
                        //             }]
                        //         }))
                        break;
                }

            }
        }

    });

});


const getCookies = (request) => {
    let cookies = {};
    if(request.headers.cookie) request.headers.cookie.split(';').forEach((cookie)=>
    {
        let parts = cookie.match(/(.*?)=(.*)$/);
        let name = parts[1].trim();
        cookies[ name ] = (parts[2] || '').trim();
    });
    return cookies.accessToken;
}

const getPayload = (socket, message) => {
    return jwt.decode(message.jwt, {complete: true}).payload;
}

module.exports = {wsServer};

/**
 * {
 *   id: 1,
 *   login: 'user',
 *   role: 'ENROLLEE',
 *   iat: 1652398380,
 *   exp: 1652401980
 * }
 */
