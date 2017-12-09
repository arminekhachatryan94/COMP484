var id = 'null';
var busy;
var socket = io('http://localhost:3000', {path: '/socket.io'}); // connect to server

var cards = [];
socket.on('id', function(data) { // listen for fromServer message
    id = data.id;
    console.log('My id: ' + id);

    if( id == 'null' ){
        $('#game').append(
            '<div class="display-1 col-md-6 text-white" style="margin-left:50px;">Sorry, game is full. Please try again later.</div>');        
    }
    else{
        $('#game-btn').html('<button class="display-1 btn-success text-center" style="margin-left:50px;">Start Game</button>');        
    }
});

socket.on('cards', function(data) {
    dealer = data.dealer;
    players = data.clients;

    for( let i = 0; i < dealer.length; i++ ){
        console.log('dealer: ' + dealer[i][0]);
        console.log('dealer: ' + dealer[i][1]);        
        $('#dealer-cards').append('<img style="padding:2px;" src="images/' + dealer[i][0] + dealer[i][1] + '.png">');        
    }

    for( let i = 0; i < players.length; i++ ){
        console.log(players[i]);
        if( players[i].id == id ){
            $('#my-cards').append('<img style="padding:2px;" src="images/' + players[i].card[0] + players[i].card[1] + '.png">');                    
        }
        else{
            $('#other-cards').append('<img style="padding:2px;" src="images/' + players[i].card[0] + players[i].card[1] + '.png">');                    
        }
    }

    /*
    let card1 = data.card1;
    let card2 = data.card2;
    cards.push(card1);
    cards.push(card2);
    console.log(card1);
    console.log(card2);
    $('#my-cards').append('<img style="padding:2px;" src="images/' + card1[0] + card1[1] + '.png">');
    $('#my-cards').append('<img style="padding:2px;"src="images/' + card2[0] + card2[1] + '.png">');    
    console.log('executed');
    */
});

$(document).ready(function(){
    $('#game-btn').click( function(){
        // hide start button
        $(this).css('visibility', 'hidden');
        $('#game').css('visibility', 'visible');
        socket.emit('start', {start: 'true'});
    });

    /*
    // click hit
    socket.on('card', function(data) {
        card = data.card;
    });
    */
});
