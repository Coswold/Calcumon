const Room = require('../models/room.js')

module.exports = (app, io) => {

    var rooms = 0;

    io.on('connection', function(socket) {
        // NOTE: cleint side sends in username when game is initialized using
                    // 'socket.emit('add user', username)'
        // I believe this can be accessed as data.username
        // reference: https://github.com/socketio/socket.io/blob/master/examples/chat/public/main.js

        // NOTE: client side sends in a bool value when solution is submitted using:
                    // socket.emit('solution submitted', [sol, username])

        // NOTE: client side EXPECTS server side to send health updates as [username, health]. Accessed as follows :
                    // socket.on('health update', function(msg) {...})
        let roomExists = false
        let room = ''
        socket.on('find opponent', function(data) {
            // console.log(data)
            room = data.room
            roomExists = true
        })

        socket.on('createGame', function(data){
            let newRoom = new Room({ name: "placeholder", players: [data.username]})
            let newRoomName = 'room-' + newRoom._id.toString()
            newRoom.name = newRoomName
            newRoom.lastping = new Date(Date.now())
            newRoom.save()

            socket.join(newRoomName);
            socket.emit('newGame', {name: data.name, room: newRoomName});
        });

        socket.on('joinGame', function(data){
            console.log("TRYING TO FIND A GAME TO JOIN")
            let room = undefined

            Room.find({})
            .then(activeRoomList => {
                if (activeRoomList.length > 0) {
                    let eligibleRoomList = activeRoomList.map(entry => {
                        let roomAge = Date.now() - entry.lastping
                        if (entry.players.length == 1) {
                            return entry
                        }
                    })
                    let luckyRoom = eligibleRoomList[Math.round(Math.random() * eligibleRoomList.length)]
                    //console.log(luckyRoom)
                    room = luckyRoom
                }

                if (room) {
                socket.join(room.name)
                room.players.push(data.username)
                console.log(room)
                socket.broadcast.to(room.name).emit(data.username, {})
                socket.emit(data.username, { name: room.players[0], room: room.name, success: true })
                } else {
                    socket.emit(data.username, { success: false })
                }
            })
            .catch(error => {
                console.log(error)
                socket.emit(data.username, { success: false, message: error })
            })
            // var room = io.nsps['/'].adapter.rooms[data.room];
            // if( room && room.length == 1){
            //     socket.join(data.room);
            //     socket.broadcast.to(data.room).emit('player1', {});
            //     socket.emit('player2', {name: data.name, room: data.room })
            // } else {
            //     socket.emit('err', {message: 'Sorry, The room is full!'});
            // }
        });

        socket.on('solutionSubmitted', function(data) {
            console.log("UPDATING HEALTH VALUES IN SERVER") // NOTE: THIS IS NEVER PRINTING, HEALTH NEVER UPDATES
            if (data[0] == true) {
                data[3] -= 10;
            } else {
                data[2] -= 10
            }
            socket.emit('answer submission', data);
            socket.emit('health update', data);
            console.log(data);
        });

        socket.on('chat message', function(data) {
            socket.broadcast.to(data.room).emit('health update', msg);
            console.log(msg)
        });

        socket.on('keepalive', function(data) {
            // console.log(`We were pinged with: ${data}`)
            if (data.room == '') {
                return
            }
            let query = {
                name: data.room
            }
            Room.findOne(query)
            .then(roomEntry => {
                // console.log(roomEntry)
                roomEntry.lastping = new Date(Date.now())
                roomEntry.save()
                // console.log(`Updated ${data.room} last ping to: ${roomEntry.lastping}`)
            })
            .catch(error => {
                console.log(error)
            })
        });

        socket.on('test', function(data) {
            console.log(`We were pinged with: ${data}`)
        });
    });

}
