var checkArrayCount = 0;
var misses = 0;
var randWord;
var wordDisplay = [];
var startVisible = false;

var lettersRevealed = 0;

var lastTrue = false; // last letter to choose that's correct
var lastFalse = false; // last letter to choose that's incorrect

var totalDifferentLetters = 0;
var currentDifferentLetters = 0;

var done = false; // game over

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
    distinctLetters();
    
    console.log("word: " + randWord);
    console.log("distinct: " + totalDifferentLetters);
    
    // blank hangman image
    $('#hangmanBody').html('<img src="images/0.png">');
    
    // add alphabet buttons to html
    addLetters();
    
    // add hidden start button to html
    $('#start').append('<btn id="startbtn" style="visibility: hidden;" class="btn-danger h3">Start New Game</btn>\n');
    
    // letter button is clicked
    $('.letter').click( function(){
        if( lastFalse == true && !done ){
            // hide letter buttons
            $(this).css('visibility', 'hidden');
            
            // check and reveal letter
            var letter = $(this).text();
            var rightLetter = checkLetterReveal(letter);
            if( rightLetter != true ){ // last false attempt
                misses++;
                $('#hangmanBody').html('<img src="images/'+misses+'.png">');
                $('#misses').text = $('#misses').text(misses);
                
                // lost
                $('#win_lose').text("You lost. The word was '" + randWord + "'. Select New Game to play again.");
                $('#win_lose').css('color', 'red');
                
                // show start button
                $('#startbtn').css('visibility', 'visible');
                startVisible = true;
                
                // game over
                done = true;
            }
            else{
                // correct letter
                wordDisplay=wordDisplay.join(' ');
                $('#word').text = $('#word').text(wordDisplay);
                wordDisplay=wordDisplay.split(' ');
                currentDifferentLetters++;
            }
        }
        else if( lastTrue == true && !done ){
            // hide letter buttons
            $(this).css('visibility', 'hidden');
            
            // check and reveal letter
            var letter = $(this).text();
            var rightLetter = checkLetterReveal(letter);
            if( rightLetter == true ){
                
                // correct letter;
                wordDisplay=wordDisplay.join(' ');
                $('#word').text = $('#word').text(wordDisplay);
                wordDisplay=wordDisplay.split(' ');
                
                // win
                $('#win_lose').text('YOU WON! Select New Game to play again.');
                $('#win_lose').css('color', 'green');
                
                // show start button
                $('#startbtn').css('visibility', 'visible');
                startVisible = true;
                
                // game over
                done = true;
                currentDifferentLetters++;
            }
            else{
                // wrong letter
                misses++;
                $('#hangmanBody').html('<img src="images/'+misses+'.png">');
                $('#misses').text = $('#misses').text(misses);
            }
        }
        
        else if( (misses < 7) && (lettersRevealed < randWord.length) && !done ){
            
            // hide letter buttons
            $(this).css('visibility', 'hidden');
            
            // check and reveal letter
            var letter = $(this).text();
            var rightLetter = checkLetterReveal(letter);
            if( rightLetter != true ){
                misses++;
                $('#hangmanBody').html('<img src="images/'+misses+'.png">');
                $('#misses').text = $('#misses').text(misses);
            }
            else{
                wordDisplay=wordDisplay.join(' ');
                $('#word').text = $('#word').text(wordDisplay);
                wordDisplay=wordDisplay.split(' ');
                currentDifferentLetters++;
            }
            
            
            if( misses + 1 == 7){
                lastFalse = true;
            }
            
            if( currentDifferentLetters + 1 == totalDifferentLetters ){
                lastTrue = true;
            }
        }
    });
    
    // start button is clicked
    $('#startbtn').click( function(){
        // get another random word from array
        wordDisplay.splice(0,wordDisplay.length);
        randomizeHTML();
        totalDifferentLetters = 0;
        distinctLetters();
        currentDifferentLetters = 0;
        
        console.log("word: " + randWord);
        console.log("word: " + wordDisplay);
        
        // show all letters
        showLetters();
        
        // hide start button
        $(this).css('visibility', 'hidden');
        startVisible = false;
        
        // change misses to 0
        misses = 0;
        $('#misses').text = $('#misses').text(misses);
        
        $('#hangmanBody').html('<img src="images/0.png">');
        
        lettersRevealed = 0;
        
        $('#win_lose').text('');
        $('#win_lose').css('color', 'black');
        
        lastTrue = false;
        lastFalse = false;
        done = false;
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

var randomizeHTML = function(){
    randWord = words[Math.floor(Math.random()*words.length)];
    
    for( var i = 0; i < randWord.length; i++ ){
        wordDisplay[i] = '_';
    }
    
    wordDisplay=wordDisplay.join(' ');
    $('#word').empty();
    $('#word').text(wordDisplay);
    wordDisplay=wordDisplay.split(' ');
}

var checkLetterReveal = function( letter ){
    var count = 0;
    for( var i = 0; i < randWord.length; i++ ){
        if( letter == randWord[i] ){
            count++;
            wordDisplay[i] = letter;
            lettersRevealed++;
        }
    }
    if( count > 0 ){
        return true;
    }
    else{
        return false;
    }
}

var distinctLetters = function(){
    for( var i = 0; i < randWord.length; i++ ){
        for( var j = 0; j < i; j++ ){
            if (randWord[i] == randWord[j]){
                break;
            }
        }
        if(j==i){
            totalDifferentLetters++;
        }
    }
}
