function greeter2(person) {
    return "Hello," + person.firstName + " " + person.lastName;
}
var user2 = { firstName: "Jane", lastName: "user" };
document.body.innerHTML = greeter2(user2);
