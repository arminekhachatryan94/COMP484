var checkArrayCount = 0;
var misses = 0;
var randWord;
var wordDisplay;

var words = [
    'PROGRAMMING',
    'INHERITANCE',
    'WEBSITES',
    'JAVASCRIPT',
    'NETWORKS',
    'SECURITY',
    'COMPUTERS',
    'INTERNET',
    'SOFTWARE',
    'ENGINEERING',
];

$(document).ready(function(){
    // get random hangman word
    randomize();
    
    // add alphabet buttons to html
    addLetters();
    
    // add hidden start button to html
    $('#start').append('<btn id="startbtn" style="visibility: hidden;" class="btn-danger h3">Start New Game</btn>\n');
    
    // letter button is clicked
    $('#letter').click( function(){
        
    });
    
    // start button is clicked
    $('#startbtn').click( function(){
        // get another random word from array
        randomize();
    });
});

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

// get random word from list
var randomize = function(){
    randWord = words[Math.floor(Math.random()*words.length)];
    
    for( var i = 0; i < randWord.length; i++ ){
        wordDisplay[i] = '_';
    }
    // $('#word').html('<div>'+randWord+'</div>');
    
    wordDisplay=wordDisplay.join(' ');
    $('#word').text(wordDisplay);
    wordDisplay=wordDisplay.split(' ');
}