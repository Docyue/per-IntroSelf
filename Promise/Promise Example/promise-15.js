 // const f = ()=> {
 // 	return new Promise((resolve, reject) => {
 // 		setTimeout(() =>{
 // 			resolve(123)
 // 		},2000)
 // 	});
 // }
 // const testAsync = async () =>{
 // 	const t = await f();
 // 	console.log(t);
 // }
 // testAsync();

 const f1 = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(111);
    }, 2000);
  });
};

const f2 = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(222);
    }, 3000);
  });
};

const testAsync = async() => {
  try {
    const t1 = await f1()
    console.log(t1);
    const t2 = await f2()
    console.log(t2);
  } catch (err) {
    console.log(err);
  }
};

testAsync();