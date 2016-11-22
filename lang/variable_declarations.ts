// oldschool available but discouraged
var a = 10;
// then 30 paragraphs of why function/"var"-scoping is terrible

// *****
// ***** let
let syntax = "unchanged";
// uses lexical (block) scoping

// can't use before declared
// a++ //=> error
// let a;

// you can however use shadowing with let (if you want to for some reason)
function f(condition, x) {
    if (condition) {
        let x = 100;
        return x;
    }

    return x;
}

f(false, 0); //=> 0
f(true, 0);  //=> 100

// *****
// ***** const
const unchanging = "THIS WILL NEVER CHANGE GIVEN ALL THE SANDS OF TIME";
// unchanging = "lol"; //=> error
// while the variable can't be reassigned, it's contents are still mutable
const derp = { a: 5 };
// derp = { a : 6 } //=> error
// this fine though
derp.a = 6;
// readonly is a thing though, refer to interfaces

// *****
// ***** destructuring
// arrays
let input = ['first', 'second'];
let [rad, yo] = input;
console.log(rad); //=> 'first';
console.log(yo); //=> 'second';

// in function params
function lol([dat, ting]: [string, string]) {
    console.log(dat);
    console.log(ting);
}
lol(input);

// sweet list destructuring
let [first, ...rest] = [1, 2, 3, 4];
let [a, b,, d] = ['a', 'b', 'totally thrown away :(', 'd', 'me too :sob:', 'everything else too'];

// objects
let o = {
    a: "foo",
    b: 12,
    c: "bar"
}
let {a, b} = o;
console.log(a); //=> 'foo'
console.log(b); //=> 12

let {a: aNewName, b: loloLOloLol} = o;
console.log(aNewName); //=> 'foo'
console.log(loloLOloLol); //=> 12

// type declaration post destructuring if needed
let {a: a2, b: b2}: {a2: string, b2: number} = o;

// default values
function keepWholeObject(wholeObject: {a: string, b?: number}) {
    let {a, b = 1001} = wholeObject;
}
// keepWholeObject now has a variable for wholeObject as well as the properties a and b, even if b is undefined.

// function declarations
// simple
type C = {a: string, b?: number}
function f({a, b}: C): void {
    // ...
}

// with defaults
function f({a, b} = {a: "", b: 0}): void {
    // ...
}
f(); // ok, default to {a: "", b: 0}

function f({a, b = 0} = {a: ""}): void {
    // ...
}
f({a: "yes"}) // ok, default b = 0
f() // ok, default to {a: ""}, which then defaults b = 0
f({}) // error, 'a' is required if you supply an argument

// destructuring seems like a double edged sword