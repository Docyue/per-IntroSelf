// 接口 interface
interface Person2 {
	firstName: string;
	lastName: string;
}
function greeter2(person: Person2) {
	return "Hello,"+person.firstName+" " + person.lastName;
}
var user2= {firstName: "Jane", lastName: "user"};
document.body.innerHTML = greeter2(user2);