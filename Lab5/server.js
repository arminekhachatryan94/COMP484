// server side
let app = require('http').createServer();

let io = require('socket.io')(app, {path: '/socket.io'});

app.listen(3000);

console.log('Listening for connections on port 3000');

io.on('connection', function(socket) {

    // client connected
    console.log('Client connected');

    // send greeting 'Hello.' message to client
    socket.emit('fromServer', {greeting: 'Hello.'});

    
    // receive 'Hi there.' message from client
    socket.on('fromClient', function(data) {
        console.log( data.greeting );
        socket.emit('messageFromServer', {message: 'How are you?'}); // send 'How are you?' to client
    });

    // receive 'Great!' message from client
    socket.on('messageFromClient', function(data) {
        console.log( data.message );
    });

    // client disconnected
    socket.on('disconnect', function(){
        console.log('Client disconnected.');
    });
});
