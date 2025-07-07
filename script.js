const submitButton = document.querySelector("#submitButton");
submitButton.addEventListener("onClick", (e) => {
  console.log("hello");
});

// function introduction(name, major) {
//   console.log(
//     "Hello there, \n" +
//       "My name is: " +
//       name +
//       "," +
//       " I go to NYIT, and my major is: " +
//       major
//   );
// }

// introduction("Sebastian", "computer science");

// let str = "4893428.8949";
// console.log(parseInt(str));
// console.log(parseFloat(str));

// let str2 = "I love tech class";
// console.log(str2.toUpperCase());
// console.log(str2.toLowerCase());
// console.log(str2.slice(5, 9));
// console.log(str.indexOf("c"));

var variable1 = "32";
let variable2 = "903";
const Variable = "Hello";

let array = [
  "car",
  "tree",
  "pigeon",
  "ninja",
  "T-rex",
  "Butterfly",
  "rock",
  "truck",
  "plane",
  "fruit",
];

// console.log(array.length);
// console.log(array[3]);
// console.log(array.indexOf("ninja"));

// function determineStatus(grade) {
//   if (grade >= 90) {
//     return "Great work";
//   }
//   if (grade >= 80) {
//     return "Good work";
//   }
//   if (grade > 68) {
//     return "You passed! Do better";
//   } else {
//     return "womp womp";
//   }
// }

// console.log(determineStatus(80));

// let arr = [
//   "lion",
//   "elephant",
//   "tiger",
//   "giraffe",
//   "zebra",
//   "monkey",
//   "bison",
//   "bear",
// ];

// for (i = 0; i < arr.length; i++) {
//   console.log(arr[i]);
// }

// console.log("\n\n");

// for (i = 1; i < arr.length; i += 2) {
//   console.log(arr[i]);
// }

arr2 = ["one", "two", "three", "four", "five"];

for (i = 0; i < arr2.length; i++) {
  let ans = arr2[i].toUpperCase();
  console.log(ans);
}

console.log("\n\n");

for (i = 0; i < arr2.length; i++) {
  if (i + 1 < arr2.length) {
    console.log(arr2[i] + arr2[i + 1]);
  } else {
    console.log(arr2[i] + arr2[0]);
  }
}

// ("Base Url");
// ("endpoint");
// ("parameters");
