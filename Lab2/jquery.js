// jquery

var startVisible = false;
var misses = 0;
var count = 0;
var randWord;
var wordDisplay=[];
var s = false;
var c = 0;

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

// initially
$(document).ready(function(){
    randomize();
    
    addLetters();
    
    $('#start').append('<btn id="startbtn" style="visibility: hidden;" class="btn-danger h3">Start New Game</btn>\n');
    
    $('.letter').click( function(){
        if( startVisible != true ){
            $(this).css('visibility', 'hidden');
        }
        c++;
        //console.log(c);
        
        if( misses == 7 ){
            $('#startbtn').css('visibility', 'visible');
            startVisible = true;
            s = true;
            c = 0;
        }
                
        wordDisplay = $('#word').text();
        wordDisplay=wordDisplay.split(' ');
        for( var i = 0; i < randWord.length; i++ ){
            if( randWord[i] == $(this).text() ){
                console.log('same');
                wordDisplay[i] = randWord[i];
            }
            else{
                count++;
            }
        }
        wordDisplay=wordDisplay.join(' ');
        $('#word').text = $('#word').text(wordDisplay);
        wordDisplay=wordDisplay.split(' ');
        
        if( count == randWord.length){
            misses++;
            $('#misses').text = $('#misses').text(misses);
        }
        count=0;
    });
    
    $('#startbtn').click( function(){
        $(this).css('visibility', 'hidden');
        startVisible = false;
        showLetters();
        s = false;
        c = 0;
        randomize();
        misses=0;
        $('#misses').text = $('#misses').text(misses);
        // change misses to zero;
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
