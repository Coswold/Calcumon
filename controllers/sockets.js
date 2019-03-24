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

        socket.on('createGame', function(data){
            let player1 = 100;
            let player2 = 100;
            socket.join('room-' + ++rooms);
            socket.emit('newGame', {'player1': player1, 'player2': player2, room: 'room-'+rooms});
        });

        socket.on('answer submission', function(data) {
            if (data.player == "player1") {
                player1 -= 10;
            }
            if (data.player == "player2") {
                player2 -= 10;
            }
            socket.broadcast.to(data.room).emit('answer submission',
            {'player1': player1, 'player2': player2});
            console.log('player1 health: ' + player1);
        });

        socket.on('chat message', function(data) {
            socket.broadcast.to(data.room).emit('chat message', msg);
            console.log(msg)
        });
    });

}
