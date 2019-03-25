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
            console.log(data)
            room = data.room
            roomExists = true
        })
        socket.on('createGame', function(data){
          socket.join('room-' + ++rooms);
          socket.emit('newGame', {name: data.name, room: 'room-'+rooms});
        });

        socket.on('joinGame', function(data){
            var room = io.nsps['/'].adapter.rooms[data.room];
            if( room && room.length == 1){
                socket.join(data.room);
                socket.broadcast.to(data.room).emit('player1', {});
                socket.emit('player2', {name: data.name, room: data.room })
            } else {
                socket.emit('err', {message: 'Sorry, The room is full!'});
            }
        });

        socket.on('solution submitted', function(data) {
            if (data.sol == true) {
                data[3] -= 10;
            } else {
                data[2] -= 10
            }
            socket.broadcast.to(data.room).emit('answer submission', data);
            console.log(data);
        });

        socket.on('chat message', function(data) {
            socket.broadcast.to(data.room).emit('health update', msg);
            console.log(msg)
        });
    });

}
