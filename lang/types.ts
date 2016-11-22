// *****
// ***** booleans
let isDone: boolean = false;

// *****
// ***** numbers
let decimal: number = 6;
let hex: number = 0xf00d;
let binary: number = 0b1010;
let octal: number = 0o744;

// *****
// ***** strings
// typescript doesn't care about double " or single ' quotes
let color: string = "blue";

let fullName: string = `Bob Bobbington`;
let age: number = 37;
// template strings, also note multiline
let sentence: string = `Hello, my name is ${ fullName }.

I'll be ${ age + 1 } years old next month.`
// the same as
// let sentence: string = "Hello, my name is " + fullName + ".\n\n" +
//  "I'll be " + (age + 1) + " years old next month."

// *****
// ***** arrays
let list: number[] = [1, 2, 3];
// or
let list: Array<number> = [1, 2, 3];

// *****
// ***** tuples (cool)
let x: [string, number];

x = ["hello", 10];
// x = [10, "hello"]; // => error

// fetching recognises type:
console.log(x[0].substr(1));
// console.log(x[1].substr(1)); // => error

// note that beyond the known range, union type string | number will be used

// *****
// ***** enums (also cool)
enum Color {Red, Green, Blue};
let c: Color = Color.Green;

// by number is also sweet
c = Color[2];

// default enum indexing from 0 can be overridden
enum Color {Red = 1, Green, Blue};
let c: Color = Color.Green;
// also fine
enum Color {Red = 1, Green = 2, Blue = 4};
let c: Color = Color.Green;

// *****
// ***** any
let notSure: any = 4;
notSure = "maybe a string instead";
notSure = false; // okay, definitely a boolean

// lets you do stuff that may or may not exist at runtime, ie you might be
// pulling from an external library
notSure.ifItExists(); // okay, ifItExists might exist at runtime
notSure.toFixed(); // okay, toFixed exists (but the compiler doesn't check)

// ps, object is not this flexible. sure you can use whatever value, but you
// can't just add new methods or whatever
let prettySure: Object = 4;
// prettySure.toFixed(); // => Error: Property 'toFixed' doesn't exist on type 'Object'.

// can also use any for a crazy (normal) arrays
let thing: any[] = [1, true, 'lol'];
thing[1] = 'foo';

// *****
// ***** void, null, undefined
// note no return value
function warnUser(): void {
    alert("This is my warning message");
}
// this is a silly thing, why would anyone do this
let unusable: void = undefined;

// Not much else we can assign to these variables!
let u: undefined = undefined;
let n: null = null;
// will be useful as union types though
// must use --strictNullChecks

// *****
// ***** never
// this should only be a guard basically. not good if you're using this much
// Function returning never must have unreachable end point
function error(message: string): never {
    throw new Error(message);
}

// Inferred return type is never
function fail() {
    return error("Something failed");
}

// Function returning never must have unreachable end point
function infiniteLoop(): never {
    while (true) {
    }
}


// *****
// ***** type assertions
let someValue: any = "this is a string";

let strLength: number = (<string>someValue).length;
// this is the same as the above and REQURIED in jsx
let strLength: number = (someValue as string).length;
