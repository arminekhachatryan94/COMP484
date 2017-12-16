
// https://stackoverflow.com/questions/10058226/send-response-to-all-clients-except-sender/10099325#10099325

let app = require('http').createServer(); // create HTTP server
let io = require('socket.io')(app, {path: '/socket.io'}); // bind Socket to HTTP server
app.listen(3000); // listen on port 3000

/*
let cards = [ // S = Spades, H = Hearts, C = Clubs, D = Diamonds
    'SA', 'S1', 'S2', 'S3', 'S4', 'S5', 'S6', 'S7', 'S8', 'S9', 'S10', 'SJ', 'SQ', 'SK',
    'HA', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'H7', 'H8', 'H9', 'H10', 'HJ', 'HQ', 'HK',
    'CA', 'C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8', 'C9', 'C10', 'CJ', 'CQ', 'CK',
    'DA', 'D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'D7', 'D8', 'D9', 'D10', 'DJ', 'DQ', 'DK'
];
*/

let temp = [ // Sp = Spades, H = Hearts, C = Clubs, D = Diamonds
    ['S', 'A'] , ['S', '2'] , ['S', '3'] , ['S', '4'] , ['S', '5'] , ['S', '6'] ,
    ['S', '7'] , ['S', '8'] , ['S', '9'] , ['S', '10'] , ['S', 'J'] , ['S', 'Q'] , ['S', 'K'] ,
    ['H', 'A'] , ['H', '2'] , ['H', '3'] , ['H', '4'] , ['H', '5'] , ['H', '6'] ,
    ['H', '7'] , ['H', '8'] , ['H', '9'] , ['H', '10'] , ['H', 'J'] , ['H', 'Q'] , ['H', 'K'] ,
    ['C', 'A'] , ['C', '2'] , ['C', '3'] , ['C', '4'] , ['C', '5'] , ['C', '6'] ,
    ['C', '7'] , ['C', '8'] , ['C', '9'] , ['C', '10'] , ['C', 'J'] , ['C', 'Q'] , ['C', 'K'] ,
    ['D', 'A'] , ['D', '2'] , ['D', '3'] , ['D', '4'] , ['D', '5'] , ['D', '6'] ,
    ['D', '7'] , ['D', '8'] , ['D', '9'] , ['D', '10'] , ['D', 'J'] , ['D', 'Q'] , ['D', 'K']
];

let cards2 = [];

let player1 = null;
let player2 = null;
let started = false;
let started_users = 0;

let turns = [];
let stand = [];
let bust = [];
let blackjack = [];

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
                cards2 = temp.slice(); // copy temp content into cards2
                shuffle(cards2); // randomize array
                
                send = []; // temp client cards to send
                if( clients.length == 1 ){
                    turns[0] = {
                        id: '',
                        sum: 0
                    }
                    turns[1] = {
                        id: 'dealer',
                        sum: 0
                    }
                }
                else{
                    turns[0] = {
                        id: '',
                        sum: 0
                    }

                    turns[1] = {
                        id: '',
                        sum: 0
                    }
                    turns[2] = {
                        id: 'dealer',
                        sum: 0
                    }
                }

                // initialize clients cards
                let i = 0;
                for( i = 0; i < clients.length; i++ ){
                    let c_card1 = { 
                        card: cards2[0],
                        id: clients[i]
                    };
                    let c_card2 = {
                        card: cards2[1],
                        id: clients[i]
                    };

                    // add card values to sum
                    turns[i].id = clients[i];
                    turns[i].sum += translateCard(c_card1.card[1], turns[i].sum);
                    turns[i].sum += translateCard(c_card2.card[1], turns[i].sum);
                    
                    send.push(c_card1);
                    send.push(c_card2);
                    
                    cards2.splice(0, 2);
                    
                    //console.log(c_card1);
                    //console.log(c_card2);
                    //console.log('client: ' + clients[i]);
                    //console.log('Sum: ' + turns[i].sum);

                    if( turns[i].sum == 21 ){ // if client wins
                        let n = turns.splice(i, 1);
                        blackjack.push(n);
                    }
                    if( turns[i].sum > 21 ){ // if client busts
                        let n = turns.splice(i, 1);
                        losers.push(n);
                        bust.push(n);
                    }

                }

                // initialize dealer cards
                let d_card1 = cards2[0];
                let d_card2 = cards2[1];
                myCards.push(d_card1);
                myCards.push(d_card2);
                cards2.splice(0, 2);
                mySum += translateCard(d_card1[1], mySum);
                mySum += translateCard(d_card2[1], mySum);

                //console.log(d_card1);
                //console.log(d_card2);
                //console.log('dealer sum: ' + mySum);
                
                turns[i].id = 'dealer';
                turns[i].sum = mySum;

                if( mySum == 21 ){ // if dealer wins
                    blackjack.push(turns[i]);
                }
                else if( mySum > 21 ){ // if dealer busts
                    bust.push(turns[i]);
                }

                //console.log('next: ' + turns[0]);
                
                for( let i = 0; i < clients.length; i++ ){
                    io.sockets.connected[clients[i]].emit('cards', {dealer: myCards, clients: send, blackjack: blackjack, bust: bust, turn: turns[0]});
                }
            }
            else{
                console.log('Waiting for other component...');
            }
        }
    });


    socket.on('hit', function(data){
        if( typeof data.id !== 'undefined' && data.id != 'dealer' ){

            let c_card = { 
                card: cards2[0],
                id: data.id
            };

            turns[0].sum += translateCard(c_card.card[1], turns[0].sum);
            console.log('sum of ' + turns[0].id + ':' + turns[0].sum);
            console.log('hit: ' + data.id);
            
            let m = {
                id: turns[0].id,
                sum: turns[0].sum
            };

            cards2.splice(0, 1);

            if( turns[0].sum == 21 ){
                for( let i = 0; i < clients.length; i++ ){
                    io.sockets.connected[clients[i]].emit('card', {id: turns[0].id, card: c_card, blackjack: true, bust: false, turns: turns[1] });
                }
                let n = turns.splice(0, 1);
                blackjack.push(n);

                if( turns[0].id == 'dealer' ){
                    drawDealer();
                }
            }
            else if( turns[0].sum > 21 ){
                for( let i = 0; i < clients.length; i++ ){
                    io.sockets.connected[clients[i]].emit('card', {id: turns[0].id, card: c_card, blackjack: false, bust: true, turns: turns[1] });
                }
                let n = turns.splice(0, 1);
                bust.push(n);

                if( turns[0].id == 'dealer' ){
                    drawDealer();
                }
            } else{
                for( let i = 0; i < clients.length; i++ ){
                    io.sockets.connected[clients[i]].emit('card', {id: turns[0].id, card: c_card, blackjack: false, bust: false });
                }
            }
        }
    });

    socket.on('stand', function(data){
        let n = {
            id: turns[0].id,
            sum: turns[0].sum
        };
        
        turns.splice(0, 1);
        stand.push(n);
        console.log('id: ' + data.id);
        console.log('turns[0]: ' + turns[0]);
        console.log('stand[0]: ' + stand[0]);

        for( let i = 0; i < clients.length; i++ ){
            io.sockets.connected[clients[i]].emit('stand', {id: data.id, next: turns[0] });
        }

        if( turns[0].id == 'dealer'){
            drawDealer();
        }
    });

    socket.on('disconnect', function(){
        var a = all_users.indexOf(socket.id);
        all_users.splice(a, 1);
        var b = clients.indexOf(socket.id);
        if( b != -1 ){
            clients.splice(b, 1);
        }
        if( clients.length == 0 ){
            started = false;
            started_users = 0;
            mySum = 0;
            cards2 = temp.slice(); // copy temp content into cards2
            myCards = [];
            turns = [];
            stand = [];
            blackjack = [];
            bust = [];
        }
    });
});

function shuffle(array) {
    for( var i = array.length - 1; i >= 1; i-- ) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

function translateCard(num, mySum){
    if( parseInt(num) >= 1 && parseInt(num) <= 10 ){
        return parseInt(num);
    }
    else if( num == 'K' || num == 'Q' || num == 'J' ){
        return 10;
    }
    else{ // if card is A
        if( mySum < 11 ){
            return 11;
        }
        else{
            return 1;
        }
    }
}

/*
function checkWinnersLosers( winner, loser){
    for( var i = 0; i < turns.length; i++ ){
        if( turns[i].sum > 21 ){
            let push = turns.splice(i, 1);
            stand.push(push);
            loser.push(push);
            lost.push(push);
        }
        else if( turns[i] == 21 ){
            let push = turns[i].splice(i, 1);
            stand.push(push);
            winner.push(push);
        }
    }
}
*/

function drawDealer(){
    while( mySum < 17 ){
        c_card = {
            card: cards2[0],
            id: 'dealer'
        }
        cards2.splice(0, 1);
        myCards.push(c_card);
        mySum += translateCard(c_card.card[1]);
        for( let i = 0; i < turns.length; i++ ){
            if( turns[i].id != 'dealer' ){
                io.sockets.connected[turns[i].id].emit('dealer', { card: c_card });
            }
        }
        for( let i = 0; i < stand.length; i++ ){
            console.log('stand id: ' + stand[i].id);
            io.sockets.connected[stand[i].id].emit('dealer', { card: c_card });
        }
    }

    console.log('hello');

    let _bust = false;
    let _blackjack = false;

    if( mySum > 21 ){
        _bust = true;
    }
    else if( mySum == 21 ){
        _blackjack = true;
    }

    // comparison
    for( let i = 0; i < stand.length; i++ ){
        if( stand[i].sum > mySum ){
            // client wins
            io.sockets.connected[stand[i].id].emit('compare', { id: stand[i].id, win: true, lose: false, push: false, bust: _bust, blackjack: _blackjack});
        }
        else if( stand[i].sum < mySum ){
            // dealer wins
            io.sockets.connected[stand[i].id].emit('compare', { id: stand[i].id, win: false, lose: true, push: false, bust: _bust, blackjack: _blackjack });
        }
        else if( stand[i].sum == mySum ){
            // push "tie"
            io.sockets.connected[stand[i].id].emit('compare', { id: stand[i].id, win: false, lose: false, push: true, bust: _bust, blackjack: _blackjack });
        }
    }

    // reset game
    
}
