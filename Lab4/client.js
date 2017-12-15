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

    blackjack = data.blackjack;
    bust = data.bust;

    let dealer_wins = false;
    let dealer_lost = false;
    let my_id_found = false;
    if( blackjack.length > 0 || bust.length > 0 ){ // if there's a winner or loser

        for( let i = 0; i < blackjack.length; i++ ){
            if( blackjack[i].id == 'dealer' ){
                $('#winner').append('Dealer got blackjack! Game over');
                dealer_wins = true;
                break;
            }
        }
        for( let i = 0; i < bust.length; i++ ){
            if( bust[i].id == 'dealer' ){
                $('#loser').append('You and your partner won against the dealer!');
                dealer_lost = true;
                break;
            }
        }
        if( !dealer_wins ){
            for( var i = 0; i < blackjack.length; i++ ){
                if( blackjack[i].id == id ){
                    $('#winner').append('You got blackjack!');
                    my_id_found = true;
                }
                else{
                    $('#winner').append('Your partner got blackjack!');
                }
            }
        }
        if( !dealer_lost ){
            for( var i = 0; i < bust.length; i++ ){
                if( bust[i].id == id ){
                    $('#loser').append('You busted');
                    my_id_found = true;
                }
                else{
                    $('#loser').append('Your partner busted');
                }
            }
        }
    }
    else if( !dealer_wins && !dealer_lost && (blackjack.length != players.length) && (bust.length != players.length)){
        console.log('here');
        // continue game
        // show hit and stand buttons
        if( data.turn.id == id && !my_id_found ){
            $('#buttons').css('visibility', 'visible');
        }
    }
});

// click hit
socket.on('card', function(data) {
    
    console.log('id: ' + data.id);
    console.log('card: ' + data.card.card[0] + data.card.card[1]);
    console.log('bust: ' + data.bust);
    console.log('blackjack: ' + data.blackjack);

    if( typeof data.id !== 'undefined'
    && typeof data.card !== 'undefined'
    && typeof data.blackjack !== 'undefined'
    && typeof data.bust !== 'undefined' ){

        let card = data.card;
        let blackjack = data.blackjack;
        let bust = data.bust;

        if( data.id == 'dealer' ){
            $('#dealer-cards').append('<img style="padding:2px;" src="images/' + card.card[0] + card.card[1] + '.png">');
        }
        else if( data.id == id ){
            $('#my-cards').append('<img style="padding:2px;" src="images/' + card.card[0] + card.card[1] + '.png">');
            mySum += translateCard(card.card[1], mySum);
            $('#myHand').text(mySum);
        }
        else{
            $('#other-cards').append('<img style="padding:2px;" src="images/' + card.card[0] + card.card[1] + '.png">');
            partnerSum += translateCard(card.card[1], partnerSum);
            $('#partnerHand').text(partnerSum);
        }

        if( bust ){
            if( data.id == id ){
                $('#buttons').css('visibility', 'hidden');
                $('#loser').append('You busted');
            }
            else if( data.id == 'dealer' ){ // game over
                $('#buttons').css('visibility', 'hidden');
                $('#loser').append('Dealer busted');
            }
            else if( data.turns.id == id ){
                $('#game').css('visibility', 'visible');
                $('#loser').append('Your partner busted');
            }
        }
        else if( blackjack ){
            if( data.id == id ){
                $('#game').css('visibility', 'hidden');
                $('#winner').append('You got blackjack');
            }
            else if( data.id == 'dealer' ){ // game over
                $('#game').css('visibility', 'hidden');
                $('#winner').append('Dealer got blackjack');
            }
            else if( data.turns.id == id ){
                $('#game').css('visibility', 'visible');
                $('#winner').append('Your partner got blackjack');
            }
        }
        else{
            $('#game').css('visibility', 'visible');
        }
    }
});

/*
socket.on('dealer', function(data) {
    if( typeof data.dealer !== 'undefined' ){
        $('#dealer-cards').append('<img style="padding:2px;" src="images/' + data.card[0] + data.card[1] + '.png">');
    }

    // comparison phase
});
*/

$(document).ready(function(){
    $('#game-btn').click( function(){
        // hide start button
        $(this).css('visibility', 'hidden');
        $('#game').css('visibility', 'visible');
        socket.emit('start', {start: 'true'});
    });

    $('#hit').click( function(){
        // $('#buttons').css('visibility', 'hidden');
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