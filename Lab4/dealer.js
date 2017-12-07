// https://stackoverflow.com/questions/10058226/send-response-to-all-clients-except-sender/10099325#10099325

let app = require('http').createServer(); // create HTTP server
let io = require('socket.io')(app, {path: '/socket.io'}); // bind Socket to HTTP server
app.listen(3000); // listen on port 3000

let cards = [ // Sp = Spades, H = Hearts, St = Stars, D = Diamonds
    'SpA', 'Sp1', 'Sp2', 'Sp3', 'Sp4', 'Sp5', 'Sp6', 'Sp7', 'Sp8', 'Sp9', 'Sp10', 'SpJ', 'SpQ', 'SpK',
    'HA', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'H7', 'H8', 'H9', 'H10', 'HJ', 'HQ', 'HK',
    'StA', 'St1', 'St2', 'St3', 'St4', 'St5', 'St6', 'St7', 'St8', 'St9', 'St10', 'StJ', 'StQ', 'StK',
    'DA', 'D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'D7', 'D8', 'D9', 'D10', 'DJ', 'DQ', 'DK'
];

let online = 1; // number of active players
let player1 = null;
let player2 = null;

console.log('Listening for connections on port 3000');

var clients = [];

io.on('connection', function(socket) {
    if( clients.length != 2 ){
        clients.push(socket.id);
        socket.on('disconnect', function(){
            var a = clients.indexOf(socket.id);
            clients.splice(a, 1);
        });

        for( var i = 0; i < clients.length; i++){
            console.log(clients[i]);
            io.to(clients[i]).send('Hello');      
        }
        console.log('----------');

        var a = clients.indexOf(socket.id);
        io.sockets.connected[socket.id].emit('id', {id: socket.id});
    }
    else{
        io.sockets.connected[socket.id].emit('id', {id: 'null'});        
    }
});

/*
io.on('connection', function(socket) {
    socket.join('room'); // join the socket into the room called 'my-room'
        
    // user connected
    // console.log( 'user connected');
    online++;
    console.log(online);
    socket.in('room').emit('fromServer', {online: online}); // send to all other room clients    
    
    // user disconnected
    socket.on('disconnect', function(){
        // console.log('user disconnected');
        online--;
        console.log(online);
    });
*/
    /*
    socket.emit('fromServer', {id: 'foo'}); // send message fromServer to client
    socket.on('fromClient', function(data) { // listen for fromClient message
        console.log('Received ' + data.id + ' from client');
     }); 
    
    socket.in('room').emit('fromServer', {id: 'foo'}); // send to all other room clients
    
    
    socket.on('fromClient', function(data) { // listen for fromClient message
       console.log('Received ' + data.id + ' from client'); // single client
    });
    */
// });

