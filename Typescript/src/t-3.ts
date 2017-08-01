// 类
class Student {
	fullName: string;
	constructor(public firstName, public middleInitial, public lastName) {
		this.fullName = firstName + " " + middleInitial + " " + lastName
	}
}
interface Person3 {
	firstName: string;
	lastName: string;
}
function greeter3(person : Person3) {
	return "Hello," + person.firstName + " " + person.lastName
}
var user3 = new Student("jane", "M.", "User");
document.body.innerHTML = greeter3(user3);