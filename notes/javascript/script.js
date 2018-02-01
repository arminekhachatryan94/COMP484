/*
var date = new Date();
document.body.innerHTML = "<h1>Today is: " + date + "</h1>";
*/




// named function
/*
function findBiggestFraction(){
    a > b ? console.log("a: " + a ) : console.log("b: " + b );
}

var a = 3/4;
var b = 5/7;

findBiggestFraction();
*/
/*
function findBiggestFraction(a, b){
    a > b ? console.log("a: " + a ) : console.log("b: " + b );
}

var firstFraction = 3/4;
var secondFraction = 5/7;

findBiggestFraction(firstFraction, secondFraction);
findBiggestFraction(7/16, 13/25);
*/
/*
function findBiggestFraction(a, b){
    var result;
    a > b ? result = ["firstFraction", a] : result = ["secondFraction", b];
    return result;
}

var firstFraction = 3/4;
var secondFraction = 5/7;

var fractionResult = findBiggestFraction(firstFraction, secondFraction);
console.log("First fraction result: " + firstFraction);
console.log("Second fraction result: " + secondFraction);
console.log("Fraction " + fractionResult[0] + " with a value of " + fractionResult[1] + " is the biggest!");
*/




// anonymous function
/*
var a = 3/4;
var b = 5/7;

var theBiggest = function() {
    var result;
    a>b ? result = ["a", a] : result = ["b", b];
    return result;
}
console.log(theBiggest());
*/
/*
var a = 3/4;
var b = 5/7;

var theBiggest = function(a,b) {
    var result;
    a>b ? result = ["a", a] : result = ["b", b];
    return result;
}
console.log(theBiggest(7/9, 13/25));
// console.log(theBiggest);
*/




// immediately invoked functional expression
/*
var a = 3/4;
var b = 5/7;

var theBiggest = (function(a,b) {
    var result;
    a>b ? result = ["a", a] : result = ["b", b];
    return result;
})(7/9, 13/25)
console.log(theBiggest);
*/




// const
/*
const MYCONST = 5;
console.log(MYCONST);
*/




// let
/*
function logScope() {
    var localVar = 2; // this can be var or let
    
    if(localVar){
        let localVar = "I'm different!"; // if you use var instead of let, it'll change both localVars
        console.log("nested localVar: ", localVar);
    }
    console.log("logScope localVar: ", localVar);
}

logScope();
*/




// objects

// var course = new Object();
// course.title = "Javascript Essential Training"
// course.student = "Armine Khachatryan";
// course.level = 1;
// course.published = true;
// course.views = 0;

/*
var course = {
    title: "Javascript Essential Training",
    student: "Armine Khachatryan",
    level: 1,
    published: true,
    views: 0,
    updateViews: function(){ // method (use or change data in object properties)
        return ++course.views;
    }
}
console.log(course);
console.log(course.title);
var a = course.updateViews();
console.log("a: " + a);
console.log("views: " + course.views);
*/


var str = "Mr John Smith    ";
var len = 13;

var output = str.substr(0, len);
output = output.split(' ');
output = output.join('%20');
console.log(output);