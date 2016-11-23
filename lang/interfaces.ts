// ***** implied interface
function printLabel(labelledObj: { label: string }) {
    console.log(labelledObj.label);
}

let myObj = {size: 10, label: "Size 10 Object"};
printLabel(myObj);
// ts cares that _at least_ the interface structure is supplied

// on object literals though, typescript helpfully throws
printLabel({size: 10, label: "Size 10 Object"}); //=> error

// ***** explicit interface
interface LabelledValue {
    label: string;
}

function printLabel(labelledObj: LabelledValue) {
    console.log(labelledObj.label);
}

// note no requirement to state myObj implements the interface
let myObj = {size: 10, label: "Size 10 Object"};
printLabel(myObj);

// you can use a type assertion with the interface to permit overloaded
// object literals:
printLabel({size: 10, label: "Size 10 Object"} as LabelledValue);

// ***** optional props
interface SquareConfig {
    color?: string;
    width?: number;
}

function createSquare(config: SquareConfig): {color: string; area: number} {
    let newSquare = {color: "white", area: 100};
    if (config.color) {
        newSquare.color = config.color;
    }
    if (config.width) {
        newSquare.area = config.width * config.width;
    }
    return newSquare;
}

let mySquare = createSquare({color: "black"});

// optional interface props that I don't really like but maybe might need one day
interface SquareConfig {
    color?: string;
    width?: number;
    [propName: string]: any;
}

// ***** immutability!
interface Point {
    readonly x: number;
    readonly y: number;
}

let p1: Point = { x: 10, y: 20 };
p1.x = 5; //=> error

// also for arrays
let a: number[] = [1, 2, 3, 4];
let ro: ReadonlyArray<number> = a;
ro[0] = 12; // error!
ro.push(5); // error!
ro.length = 100; // error!
a = ro; // error!
// override using a ~typecast~ type assertion if you want for some reason
a = ro as number[];

// ***** function prototypes, basically
interface SearchFunc {
    (source: string, subString: string): boolean;
}

let mySearch: SearchFunc;
mySearch = function(source: string, subString: string) {
    let result = source.search(subString);
    if (result == -1) {
        return false;
    }
    else {
        return true;
    }
}

// the shape needs to match but the param names aren't key
// mySearch = function(src: string, sub: string): boolean { // also fine

// this also works, due to inference. note the return types in the
// function. if one was a string (or w/e) the typechecker WOULD warn
let mySearch: SearchFunc;
mySearch = function(src, sub) {
    let result = src.search(sub);
    if (result == -1) {
        return false;
    }
    else {
        return true;
    }
}

// indexable types? cool
// you can index into things in js right?
// like arrays:
['a', 'b', 'c'][1]; //=> 'b'
// and objects
({b: 1, c:2}["b"]); //=> 1

// yep
interface StringArray {
    [index: number]: string;
}

let myArray: StringArray;
myArray = ["Bob", "Fred"];

let myStr: string = myArray[0];
// you can index on number or string, or even both, but that has dragons
// because the number is secretly converted (cast) to a string

// bad:
class Animal {
    name: string;
}
class Dog extends Animal {
    breed: string;
}

// Error: indexing with a 'string' will sometimes get you a Dog!
interface NotOkay {
    [x: number]: Animal;
    [x: string]: Dog;
}

// this also won't work as indexing by string requires all properties to
// have the same return type:
interface NumberDictionary {
    [index: string]: number;
    length: number;    // ok, length is a number
    name: string;      // error, the type of 'name' is not a subtype of the indexer
}

// sweet readonly example
interface ReadonlyStringArray {
    readonly [index: number]: string;
}
let myArray: ReadonlyStringArray = ["Alice", "Bob"];
myArray[2] = "Mallory"; // error!

// *****
// radical (necessarily explicit) class interface implementation
interface ClockInterface {
    currentTime: Date;
    setTime(d: Date);
}

class Clock implements ClockInterface {
    currentTime: Date;
    setTime(d: Date) {
        this.currentTime = d;
    }
    constructor(h: number, m: number) { }
}

// class interfaces check the instance, not the static elements of the class

// relatively more advanced example using constructors
interface ClockConstructor {
    new (hour: number, minute: number): ClockInterface;
}
interface ClockInterface {
    tick();
}

function createClock(ctor: ClockConstructor, hour: number, minute: number): ClockInterface {
    return new ctor(hour, minute);
}

class DigitalClock implements ClockInterface {
    constructor(h: number, m: number) { }
    tick() {
        console.log("beep beep");
    }
}
class AnalogClock implements ClockInterface {
    constructor(h: number, m: number) { }
    tick() {
        console.log("tick tock");
    }
}

let digital = createClock(DigitalClock, 12, 17);
let analog = createClock(AnalogClock, 7, 32);

// ***** extension (inheritance)
interface Shape {
    color: string;
}

interface Square extends Shape {
    sideLength: number;
}

let square = <Square>{};
square.color = "blue";
square.sideLength = 10;

// multiple omg
interface Shape {
    color: string;
}

interface PenStroke {
    penWidth: number;
}

interface Square extends Shape, PenStroke {
    sideLength: number;
}

let square = <Square>{};
square.color = "blue";
square.sideLength = 10;
square.penWidth = 5.0;

// ***** hybrid types (eg object function mashups :tada:)
interface Counter {
    (start: number): string;
    interval: number;
    reset(): void;
}

function getCounter(): Counter {
    let counter = <Counter>function (start: number) { };
    counter.interval = 123;
    counter.reset = function () { };
    return counter;
}

let c = getCounter();
c(10);
c.reset();
c.interval = 5.0;

// you can also inherit from a class in an interface, which kind of seems to
// setup a limited interface that can only be used by subclasses of that class
// and is inferred if they honour the interface. not yet clear on use cases.