var id = 'null';
var busy;
var socket = io('http://localhost:3000', {path: '/socket.io'}); // connect to server

var cards = [];
var mySum = 0;
var partnerSum = 0;

var i_lost = false;

socket.on('id', function(data) { // listen for fromServer message
    id = data.id;
    console.log('My id: ' + id);

    if( id == 'null' ){
        $('#game-btn').append(
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
            mySum += translateCard(players[i].card[1], mySum);
        }
        else{
            $('#other-cards').css('visibility', 'visible');
            $('#other-cards').append('<img style="padding:2px;" src="images/' + players[i].card[0] + players[i].card[1] + '.png">');
            partnerSum += translateCard(players[i].card[1], partnerSum);
        }
    }
    $('#myHand').text(mySum);
    $('#partnerHand').text(partnerSum);

    winner = data.winner;
    losers = data.losers;

    if( winner.length > 0 ){ // if there's a winner
        if( winner == 'dealer' ){ // dealer wins
            // alert("Game over. Dealer won!");
            $('#winner').text('Game over. Dealer won!');
        } else if( winner == id ){ // user wins
            // alert("Game over. You won!");
            $('#winner').text('Game over. You won!');
        } else{ // partner wins
            // alert("Game over. Your partner won!");
            $('#winner').text('Game over. Your partner won!');
        }
    }
    else if( losers.length > 0 ){ // busting
        for( let i = 0; i < losers.length; i++ ){
            if( losers[i] == 'dealer'){
                // alert("You busted");
                $('#loser').append('Dealer busted!');
                i_lost = true;
            }
            else if( losers[i] == id ){
                // alert("Your partner busted" );
                $('#loser').append('You busted!');
            }
            else{
                $('#loser').append('Your partner busted!');
            }
        }
    } else{
        // continue game
        // show hit and stand buttons
        if( data.turn.id == id ){
            $('#buttons').css('visibility', 'visible');
        }
    }
});

// click hit
socket.on('card', function(data) {
    if( typeof data.card !== 'undefined' && typeof data.turn !== 'undefined' ){
        let card = data.card;
        let turn = data.turn;
        console.log('Type: ' + card[0] + ', Value: ' + card[1]);
        console.log('card id: ' + data.id);
        console.log('next id: ' + turn.id);
        console.log('my id: ' + id);

        if( data.id == 'dealer' ){
            $('#dealer-cards').append('<img style="padding:2px;" src="images/' + card[0] + card[1] + '.png">');
        }
        else if( data.id == id ){
            $('#my-cards').append('<img style="padding:2px;" src="images/' + card[0] + card[1] + '.png">');
            mySum += translateCard(card[1], mySum);
            $('#myHand').text(mySum);
        }
        else{
            $('#other-cards').append('<img style="padding:2px;" src="images/' + card[0] + card[1] + '.png">');
            partnerSum += translateCard(card[1], partnerSum);
            $('#partnerHand').text(partnerSum);
        }

        if( turn.id == id ){
            $('#buttons').css('visibility', 'visible');
        }
    }
});

$(document).ready(function(){
    $('#game-btn').click( function(){
        // hide start button
        $(this).css('visibility', 'hidden');
        $('#game').css('visibility', 'visible');
        socket.emit('start', {start: 'true'});
    });

    $('#hit').click( function(){
        $('#buttons').css('visibility', 'hidden');
        socket.emit('hit', {id: id});
    });

    $('#stand').click( function(){
        $('#buttons').css('visibility', 'hidden');        
        socket.emit('stand', {id: id});
    });

});

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