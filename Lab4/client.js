var id = 'null';
var busy;
var socket = io('http://localhost:3000', {path: '/socket.io'}); // connect to server

var cards = [];
socket.on('id', function(data) { // listen for fromServer message
    id = data.id;
    console.log('My id: ' + id);

    if( id == 'null' ){
        $('#game').append(
            '<br><br><div class="display-1 col-md-6 text-white" style="margin-left:50px;">Sorry, game is full. Please try again later.</div>');        
    }
    else{
        $('#game-btn').html('<br><br><button class="display-1 btn-success text-center" style="margin-left:50px;">Start Game</button>');        
    }
});

socket.on('cards', function(data) {
    let card1 = data.card1;
    let card2 = data.card2;
    cards.push(card1);
    cards.push(card2);
    console.log(card1);
    console.log(card2);
    $('#my-cards').append('<img src="images/' + card1[0] + card1[1] + '.png">');
    $('#my-cards').append('<img src="images/' + card2[0] + card2[1] + '.png">');    
    console.log('executed');
});

$(document).ready(function(){
    $('#game-btn').click( function(){
        // hide start button
        $(this).css('visibility', 'hidden');
        socket.emit('start', {start: 'true'});
    });

    /*
    // click hit
    socket.on('card', function(data) {
        card = data.card;
    });
    */
});
