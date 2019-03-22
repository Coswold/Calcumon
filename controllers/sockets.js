module.exports = (app, io) => {

    var rooms = 0;

    io.on('connection', function(socket) {

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
