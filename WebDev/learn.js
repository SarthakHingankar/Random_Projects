const prompt = require("prompt-sync")();

// // Print
// console.log("Hello world!");

// //Input
// let name = prompt("hey what's your name: ");
// console.log("hello " + name);

// // Conversion
// // String()
// // Number()
// let age = Number(prompt("what's your age: "));
// console.log("your age: " + age + " " + typeof age);

// // Array
// const cars = ["honda", "hero", "tata"];
// console.log(typeof cars); //it says object
// console.log(cars);
// console.log(cars[0]);
// cars[0] = "mg";
// console.log(cars);
// console.log(cars.length);
// console.log(cars.sort());
// console.log(cars.reverse());
// console.log(cars); //even .sort() and .reverse() in console.log() will sort the original list
// const sortedCars = cars.toSorted(); //.toSorted() and .toReverse() will create a new list
// console.log(sortedCars);
// // When sorting numbers
// const numbers = [0, 5, 10, 15, 20, 30];
// console.log(numbers.sort((a, b) => a - b)); // to sort numbers in ascending order
// console.log(numbers.sort((a, b) => b - a)); // to sort numbers in decending order
// cars.pop();
// cars.push("suzuki");
// console.log(cars);
// console.log(String(cars));
// console.log(cars.join(", ")); //can use anything else instead of ", "
// cars.splice(1, 0, "tata"); // **arg (index to be added at, elements that will be removed after index, element to add)

// // Operators
// // arethmatic: +, -, *, **, /, %, ++, --
// // comparison: ==, ===, !=, !==, >, <, >=, <=
// // logical: &&, ||, !

// // conditions
// let age = Number(prompt("what's your age? "));

// if (age < 13) {
//   // if statemets for broad conditions
//   console.log("you are old enough");
// } else if (age < 18) {
//   console.log("you are a teenager");
// } else {
//   console.log("you can drive");
// }

// let grade = prompt("What grade did you get? ");

// switch (grade) {
//   // switch statements for specific conditionds
//   case "a":
//     console.log("Excellent!");
//     break;
//   case "b":
//     console.log("Good job!");
//     break;
//   case "c":
//     console.log("You can do better!");
//     break;
//   default:
//     console.log("You failed!");
//     break;
// }

// // loops
// // for loops
// for (let i = 0; i < 5; i++) {
//   console.log(i + 1);
// }

// const fruits = ["Apple", "Banana", "Coconut", "Dragonfruit"];
// // for (let i = 0, len = fruits.length; i < len; i++) {
// //   console.log(fruits[i]);
// // }
// // for (let i in fruits) {
// //   console.log(fruits[i]);
// // }
// for (let i of fruits) {
//   console.log(i);
// }

// // while loops
// let i = 0;
// while (i < 5) {
//   console.log(i + 1);
//   i++;
// }

// // function declaration

// console.log(sum(3, 5)); // don't need to declare func before using
// function sum(a, b) {
//   return a + b;
// }

// // classes and objects
// // objects
// const car = {
//   name: "Tata",
//   color: "black",
//   model: "z+",
//   start: function () {
//     console.log("car started");
//   },
//   stop: function () {
//     console.log("car stopped");
//   },
// };

// console.log(car.name);
// car.start();
// car.stop();
// car.year = "2014";
// console.log(car);
// delete car.model;
// console.log(car);

// // classes
// class Car {
//   constructor(name, color, model) {
//     this.name = name;
//     this.color = color;
//     this.model = model;
//     this.start = function () {
//       console.log(`${this.name} started`);
//     };
//     this.stop = function () {
//       console.log(`${this.name} stopped`);
//     };
//   }
// }

// const car1 = new Car("ford", "white", "Y");
// console.log(car1);
// car1.start();

//events and html stuff
// figure on the way
