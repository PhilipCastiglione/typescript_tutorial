function greeter(person: string) {
    return "Hello, " + person;
}

var user = [1,2,3];
// => greeter.ts(7,35): error TS2345: Argument of type 'number[]' is not assignable to parameter of type 'string'.

document.body.innerHTML = greeter(user); 
