var id = 'null';
var busy;
var socket = io('http://localhost:3000', {path: '/socket.io'}); // connect to server

socket.on('id', function(data) { // listen for fromServer message
    id = data.id;
    console.log('My id: ' + id);

    if( id == 'null' ){
        $('#game').html(
            '<br><br><div class="display-1 col-md-6 text-white" style="margin-left:50px;">Sorry, game is full. Please try again later.</div>');        
    }
    else{
        $('#game-btn').html('<button class="display-4 btn-success text-center">Start Game</button>');        
    }
});

$(document).ready(function(){
    $('#game-btn').click( function(){
        // hide start button
        $(this).css('visibility', 'hidden');
    });
});
