// server side
let app = require('http').createServer();

let io = require('socket.io')(app, {path: '/socket.io'});

app.listen(3000);

console.log('Listening for connections on port 3000');

io.on('connection', function(socket) {

    // client connected
    console.log('Client connected');

    // send greeting 'Hello.' message to client
    socket.emit('message1FromServer', {greeting: 'Hello.'});

    
    // receive 'Hi there.' message from client
    socket.on('message1FromClient', function(data) {
        console.log( data.greeting );
        socket.emit('message2FromServer', {message: 'How are you?'}); // send 'How are you?' to client
    });

    // receive 'Great! How are you?' message from client
    socket.on('message2FromClient', function(data) {
        console.log( data.message );
        socket.emit('message3FromServer', {message: 'Im good!'}); // send 'Im good!' to client
    });

    // receive 'Thats awesome' message from client
    socket.on('message3FromClient', function(data) {
        console.log( data.message );
        socket.emit('message4FromServer', {message: 'See you later!'}); // send 'Nice talking to you!' to client
    });

    // receive 'Goodbye!' message from client
    socket.on('message4FromClient', function(data) {
        console.log( data.message );
    });

    // client disconnected
    socket.on('disconnect', function() {
        console.log('Client disconnected.');
    });
});
