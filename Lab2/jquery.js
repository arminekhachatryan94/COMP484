// jquery

var s = false;
var c = 0;
// initially
$(document).ready(function(){
    addLetters();
    
    $('#start').append('<btn id="startbtn" style="visibility: hidden;" class="btn-danger h3">Start New Game</btn>\n');
    
    $('.letter').click( function(){
        $(this).css('visibility', 'hidden');
        c++;
        console.log(c);
        
        if( c == 26 ){
            $('#startbtn').css('visibility', 'visible');
            s = true;
            c = 0;
        }
    });
    
    $('#startbtn').click( function(){
        $(this).css('visibility', 'hidden');
        showLetters();
        s = false;
        c = 0;
    });
});

// add letters to html page
var addLetters = function(){
    var x = '65';
    for( var i = 0; i < 26; i++ ){
        $('#letters').append('<btn style="padding-right: 5px; padding-left: 5px; visibility: visible;" class="btn-warning h3 letter">&#'+x+';</btn>\n');
        x++;
    }
}

// make letters visible
var showLetters = function(){
    $('.letter.letter').css('visibility', 'visible');
}
