// ----------函数调用
// function Person(name) {
//     if (this instanceof Person) {
//         this.name = name;   // using new
//     } else {
//         throw new Error("You must use new with Person.")
//     }
// }

// var person = new Person("Nicholas");
// var notAPerson = Person.call(person, "Michael");    // works!

// ---------new.target MetaProperty
// function Person(name) {
//     if (typeof new.target !== "undefined") {
//         this.name = name;   // using new
//     } else {
//         throw new Error("You must use new with Person.")
//     }
// }

// var person = new Person("Nicholas");
// var notAPerson = Person.call(person, "Michael");    // error!

function Person(name) {
    if (new.target === Person) {
        this.name = name;   // using new
    } else {
        throw new Error("You must use new with Person.")
    }
}

function AnotherPerson(name) {
    Person.call(this, name);
}

var person = new Person("Nicholas");
var anotherPerson = new AnotherPerson("Nicholas");  // error!



















