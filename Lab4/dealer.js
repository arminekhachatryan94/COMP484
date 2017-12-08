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

let cards2 = [ // Sp = Spades, H = Hearts, St = Stars, D = Diamonds
    ['Sp', 'A'] , ['Sp', '1'] , ['Sp', '2'] , ['Sp', '3'] , ['Sp', '4'] , ['Sp', '5'] , ['Sp', '6'] ,
    ['Sp', '7'] , ['Sp', '8'] , ['Sp', '9'] , ['Sp', '10'] , ['Sp', 'J'] , ['Sp', 'Q'] , ['Sp', 'K'] ,
    ['H', 'A'] , ['H', '1'] , ['H', '2'] , ['H', '3'] , ['H', '4'] , ['H', '5'] , ['H', '6'] ,
    ['H', '7'] , ['H', '8'] , ['H', '9'] , ['H', '10'] , ['H', 'J'] , ['H', 'Q'] , ['H', 'K'] ,
    ['St', 'A'] , ['St', '1'] , ['St', '2'] , ['St', '3'] , ['St', '4'] , ['St', '5'] , ['St', '6'] ,
    ['St', '7'] , ['St', '8'] , ['St', '9'] , ['St', '10'] , ['St', 'J'] , ['St', 'Q'] , ['St', 'K'] ,
    ['D', 'A'] , ['D', '1'] , ['D', '2'] , ['D', '3'] , ['D', '4'] , ['D', '5'] , ['D', '6'] ,
    ['D', '7'] , ['D', '8'] , ['D', '9'] , ['D', '10'] , ['D', 'J'] , ['D', 'Q'] , ['D', 'K']
];

let player1 = null;
let player2 = null;
let started = false;
let started_users = 0;

console.log('Listening for connections on port 3000');

var clients = [];
var all_users = [];

var myCards = [];
var mySum = 0;

io.on('connection', function(socket) {
    all_users.push(socket.id);

    if( clients.length != 2 && !started){
        clients.push(socket.id);

        for( var i = 0; i < clients.length; i++){
            console.log(clients[i]);
        }
        console.log('----------');

        var a = clients.indexOf(socket.id);
        io.sockets.connected[socket.id].emit('id', {id: socket.id});
    }
    else{
        io.sockets.connected[socket.id].emit('id', {id: 'null'});        
    }
    
    socket.on('start', function(data) {
        if( data.start == 'true' ){
            started = true;
            started_users++;
        }

        if( started ){
            if( started_users == clients.length ){
                console.log('game started! Have fun!');

                // Game
                shuffle(cards2); // randomize array

                // initialize dealer cards
                var card1 = cards2[0];
                var card2 = cards2[1];
                myCards.push(card1);
                myCards.push(card2);
                mySum += parseInt(card1[1]);
                mySum += parseInt(card2[1]);
                console.log(card1);
                console.log(card2);
                console.log(mySum);
            }
            else{
                console.log('Waiting for other component...');
            }
        }
    });

    socket.on('disconnect', function(){
        var a = all_users.indexOf(socket.id);
        all_users.splice(a, 1);
        var b = clients.indexOf(socket.id);
        if( b != -1 ){
            clients.splice(b, 1);
        }
    });

    if( clients.length == 0 ){
        started = false;
        started_users = 0;
    }

});

function shuffle(array) {
    for( var i = array.length - 1; i >= 1; i-- ) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}
