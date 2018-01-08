// 类
var Student = (function () {
    function Student(firstName, middleInitial, lastName) {
        this.firstName = firstName;
        this.middleInitial = middleInitial;
        this.lastName = lastName;
        this.fullName = firstName + " " + middleInitial + " " + lastName;
    }
    return Student;
}());
function greeter3(person) {
    return "Hello," + person.firstName + " " + person.lastName;
}
var user3 = new Student("jane", "M.", "User");
document.body.innerHTML = greeter3(user3);
