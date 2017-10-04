// jquery

var misses = 0;

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
                
        $(this).css('visibility', 'hidden');
        c++;
        //console.log(c);
        
        if( c == 26 ){
            $('#startbtn').css('visibility', 'visible');
            s = true;
            c = 0;
        }
        
        console.log(wordDisplay);
        for( var i = 0; i < randWord.length; i++ ){
            if($(this).text() == randWord[i]){
                console.log('same');
                wordDisplay=$('#word').text();
                wordDisplay[i] = randWord[i];
                
                console.log(wordDisplay);
                //wordDisplay=wordDisplay.join();
                $('#word').text(wordDisplay);
                console.log('#word').text();
                wordDisplay=wordDisplay.split(' ');
            }
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

var randomize = function(){
    randWord = words[Math.floor(Math.random()*words.length)];
    
    for( var i = 0; i < randWord.length; i++ ){
        wordDisplay[i] = '_';
    }
    // $('#word').html('<div>'+randWord+'</div>');
    
    wordDisplay=wordDisplay.join(' ');
    $('#word').append('<div>'+wordDisplay+'</div>');
    wordDisplay=wordDisplay.split(' ');
}
