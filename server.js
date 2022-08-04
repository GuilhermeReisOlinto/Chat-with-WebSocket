const express = require('express')
const app = express()
app.use(express.static('public'))

const http = require('http').Server(app)
const serverSocket = require('socket.io')(http)

const porta = 8000
http.listen(porta, function() {
    console.log("server start", porta)
})

app.get('/', function(req, resp) {
    resp.sendFile(__dirname + '/index.html')
})

serverSocket.on('connection', function(socket) {

    socket.on('login', function(nickname) {
        serverSocket.emit('chat msg', `Usúario ${nickname} conectou.`)
        socket.nickname = nickname
    })

    socket.on('chat msg', function(msg) {
        serverSocket.emit('chat msg', `${socket.nickname}: ${msg}`)
    })

    socket.on('status', function(msg) {
        socket.broadcast.emit('status', msg)
    })

})