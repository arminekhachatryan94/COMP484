var id = 'null';
var socket = io('http://localhost:3000', {path: '/socket.io'}); // connect to server

var cards = [];
var mySum = 0;
var partnerSum = 0;

socket.on('id', function(data) { // listen for fromServer message
    id = data.id;
    console.log('My id: ' + id);

    if( id == 'null' ){
        $('#game-btn').append(
            '<div class="display-1 col-md-6 text-white" style="margin-left:50px;">Sorry, game is full. Keep refreshing until the game opens.</div>');        
    }
    else{
        $('#game-btn').html('<button class="display-1 btn-success text-center" style="margin-left:50px;">Start Game</button>');        
    }
});

socket.on('cards', function(data) {
    dealer = data.dealer;
    players = data.clients;

    //for( let i = 0; i < dealer.length; i++ ){
        //console.log('dealer: ' + dealer[i][0]);
        //console.log('dealer: ' + dealer[i][1]);
        $('#dealer-cards').append('<img style="padding:2px;" src="images/' + dealer[0][0] + dealer[0][1] + '.png">');
        $('#dealer-cards').append('<img class="real" style="padding:2px; display:none;" src="images/' + dealer[1][0] + dealer[1][1] + '.png">');
        $('#dealer-cards').append('<img class="fake" style="padding:2px; display:inline;" src="images/unknown.png" height="96" width="71">');
    //}

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

    let blackjack = data.blackjack;
    let bust = data.bust;

    let dealer_wins = false;
    let dealer_lost = false;
    let my_id_found = false;

    if( blackjack.length > 0 || bust.length > 0 ){ // if there's a winner or loser

        for( let i = 0; i < blackjack.length; i++ ){
            if( blackjack[i].id == 'dealer' ){
                $('#winner').append('<div class="text-center">Dealer got blackjack! Game over</div>');
                $('.fake').css('display', 'none');
                $('.real').css('display', 'inline');
                $('#new-game').css('visibility', 'visible');
                dealer_wins = true;
                break;
            }
        }
        for( let i = 0; i < bust.length; i++ ){
            if( bust[i].id == 'dealer' ){
                $('#loser').append('<div class="text-center">Dealer busted!</div>');
                $('.fake').css('display', 'none');
                $('.real').css('display', 'inline');
                $('#new-game').css('visibility', 'visible');
                dealer_lost = true;
                break;
            }
        }
        if( !dealer_wins ){
            for( var i = 0; i < blackjack.length; i++ ){
                if( blackjack[i].id == id ){
                    $('#winner').append('<div class="text-center">You got blackjack!</div>');
                    $('.fake').css('display', 'none');
                    $('.real').css('display', 'inline');    
                    $('#new-game').css('visibility', 'visible');
                    my_id_found = true;
                }
                /*else{
                    $('#winner').append('<div>Your partner got blackjack!</div>');
                }*/
            }
        }
        if( !dealer_lost ){
            for( var i = 0; i < bust.length; i++ ){
                if( bust[i].id == id ){
                    $('#loser').append('<div class="text-center">You busted</div>');
                    $('.fake').css('display', 'none');
                    $('.real').css('display', 'inline');    
                    $('#new-game').css('visibility', 'visible');
                    my_id_found = true;
                }
                /*else{
                    $('#loser').append('<div>Your partner busted</div>');
                }*/
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
            $('#dealer-cards').append('<img class="real" style="padding:2px; display:none;" src="images/' + card.card[0] + cards.card[1] + '.png">');
            $('#dealer-cards').append('<img class="fake" style="padding:2px; display:inline;" src="images/unknown.png" height="96" width="71">');    
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
                $('#loser').append('<div class="text-center">You busted</div>');
                $('.fake').css('display', 'none');
                $('.real').css('display', 'inline');
                $('#new-game').css('visibility', 'visible');
            }
            else if( data.id == 'dealer' ){ // game over
                $('#buttons').css('visibility', 'hidden');
                $('#loser').append('<div class="text-center">Dealer busted</div>');
                $('.fake').css('display', 'none');
                $('.real').css('display', 'inline');
                $('#new-game').css('visibility', 'visible');
            }
            /*else if( typeof data.turns.id !== 'undefined' ){
                // $('#buttons').css('visibility', 'visible');
                $('#loser').append('<div>Your partner busted</div>');
            }*/
        }
        else if( blackjack ){
            if( data.id == id ){
                $('#buttons').css('visibility', 'hidden');
                $('#winner').append('<div class="text-center">You got blackjack</div>');
                $('.fake').css('display', 'none');
                $('.real').css('display', 'inline');
                $('#new-game').css('visibility', 'visible');
            }
            else if( data.id == 'dealer' ){ // game over
                $('#buttons').css('visibility', 'hidden');
                $('#winner').append('<div class="text-center">Dealer got blackjack</div>');
                $('.fake').css('display', 'none');
                $('.real').css('display', 'inline');
                $('#new-game').css('visibility', 'visible');
            }
            /*else if( typeof data.turns.id !== 'undefined' ){
                // $('#buttons').css('visibility', 'visible');
                $('#winner').append('<div>Your partner got blackjack</div>');
            }*/
        }
        if( typeof data.turns.id !== 'undefined' ){
            if( data.turns.id == id ){
                $('#buttons').css('visibility', 'visible');
            }
        }
    }
});

socket.on('stand', function(data) {
    if( typeof data.id !== 'undefined' && typeof data.next !== 'undefined' ){
        console.log('stand: ' + data.id);
        console.log('next: ' + data.next.id);
    }
    if( data.next.id == id ){
        $('#buttons').css('visibility', 'visible');
    }
});


socket.on('dealer', function(data) {
    if( typeof data.card !== 'undefined' ){
        console.log(data.card.card[0] + data.card.card[1]);
        $('#dealer-cards').append('<img class="real" style="padding:2px; display:none;" src="images/' + data.card.card[0] + data.card.card[1] + '.png">');
        $('#dealer-cards').append('<img class="fake" style="padding:2px; display:inline;" src="images/unknown.png" height="96" width="71">');
    }
});

socket.on('compare', function(data) {
    if( typeof data.id !== 'undefined'
    && typeof data.win !== 'undefined'
    && typeof data.lose !== 'undefined'
    && typeof data.push !== 'undefined' ){

        let id = data.id;
        let win = data.win;
        let lose = data.lose;
        let push = data.push;
        let bust = data.bust;
        let blackjack = data.blackjack;

        if( bust ){
            $('#loser').append('<div class="text-center">Dealer busted. You won!</div>');
            $('.fake').css('display', 'none');
            $('.real').css('display', 'inline');
            $('#new-game').css('visibility', 'visible');
        }
        else if( blackjack ){
            $('#winner').append('<div class="text-center">Dealer got blackjack</div>');
            $('.fake').css('display', 'none');
            $('.real').css('display', 'inline');
            $('#new-game').css('visibility', 'visible');
        }
        else if( win == true && lose == false && push == false ){
            $('#winner').append('<div class="text-center">You won against the dealer</div>');
            $('.fake').css('display', 'none');
            $('.real').css('display', 'inline');
            $('#new-game').css('visibility', 'visible');
        }
        else if( win == false && lose == true && push == false ){
            $('#loser').append('<div class="text-center">The dealer won</div>');
            $('.fake').css('display', 'none');
            $('.real').css('display', 'inline');
            $('#new-game').css('visibility', 'visible');
        }
        else if( win == false && lose == false && push == true ){
            $('.fake').css('display', 'none');
            $('.real').css('display', 'inline');
            $('#tie').css('visibility', 'visible');
            $('#push').css('visibility', 'visible');
        }
    }
});


$(document).ready(function(){
    $('#game-btn').click( function() {
        // hide start button
        $(this).css('visibility', 'hidden');
        $('#game').css('visibility', 'visible');
        socket.emit('start', {start: 'true'});
    });

    $('#hit').click( function() {
        // $('#buttons').css('visibility', 'hidden');
        socket.emit('hit', {id: id});
    });

    $('#stand').click( function() {
        $('#buttons').css('visibility', 'hidden');        
        socket.emit('stand', {id: id});
    });

    $('#push').click( function() {
        $(this).css('visibility', 'hidden');
        $('#tie').css('visibility', 'hidden');
        // reset html page
        $('#new-game').css('visibility', 'visible');
    });

    $('#new-game').click( function() {
        location.reload();
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

/*
function resetHTML() {
    $('#dealer-cards').html('<div class="' + 'text-white font-weight-bold">Dealer' + "'" + 's cards</div>');
    $('#my-cards').html(
        '<div class="font-weight-bold">My Cards</div>'
        + '<div id="myHand"></div>'
    );
    // $('#myHand').html();
    $('#other-cards').html(
        '<div class="font-weight-bold">Other Player' + "'" + 's Cards</div>'
        + '<div id="partnerHand"></div>'
    );
    // $('#partnerHand').html();

    $('#game-btn').css('visibility', 'visible');
    $('#game').css('visibility', 'hidden');

    $('#winner').html('');
    $('#loser').html('');
    $('#tie').html('');
    $('#push').css('visibility', 'hidden');
    $('#buttons').css('visibility', 'hidden');

    cards = [];
    mySum = 0;
    partnerSum = 0;

}
*/
