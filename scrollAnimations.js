const background = document.getElementById("scrollable-background");
const prog1 = document.getElementById("progress-1");
const prog2 = document.getElementById("progress-2");
const prog3 = document.getElementById("progress-3");
const prog4 = document.getElementById("progress-4");

const prog_bub1 = document.getElementById("prog-bubble-1");
const prog_bub2 = document.getElementById("prog-bubble-2");
const prog_bub3 = document.getElementById("prog-bubble-3");

console.log("connected");

background.addEventListener("scroll", () => {
  const scrollY = background.scrollTop;
  console.log("Scroll Y: ", scrollY);
  if (scrollY < 500) {
    prog1.style.borderLeftStyle = "dashed";
    prog_bub1.style.backgroundColor = "transparent";
    prog2.style.borderLeftStyle = "dashed";
    prog3.style.borderLeftStyle = "dashed";
    prog4.style.borderLeftStyle = "dashed";
  }

  if (scrollY > 500 && scrollY < 1300) {
    prog1.style.borderLeftStyle = "solid";
    prog_bub1.style.backgroundColor = "#8E518D"; //Secondary background color

    prog_bub2.style.backgroundColor = "transparent"; //Secondary background color
    prog2.style.borderLeftStyle = "dashed";
    prog3.style.borderLeftStyle = "dashed";
    prog4.style.borderLeftStyle = "dashed";
  }

  if (scrollY > 1500 && scrollY < 1700) {
    prog2.style.borderLeftStyle = "solid";
    prog_bub2.style.backgroundColor = "#8E518D"; //Secondary background color

    prog_bub3.style.backgroundColor = "transparent"; //Secondary background color
    prog3.style.borderLeftStyle = "dashed";
    prog4.style.borderLeftStyle = "dashed";
  }

  if (scrollY > 1700) {
    prog3.style.borderLeftStyle = "solid";
    prog4.style.borderLeftStyle = "solid";
    prog_bub3.style.backgroundColor = "#8E518D"; //Secondary background color
  }
});

//WORD ANIMATIONS
const word1 = document.getElementById("highLigh(1)");
const word2 = document.getElementById("highLigh(2)");
const word3 = document.getElementById("highLigh(3)");
const word4 = document.getElementById("highLigh(4)");

const lstOfWords = [word1, word2, word3, word4];
let indexOfWord = 0;

setInterval(() => {
  for (let i = 0; i < lstOfWords.length; i++) {
    if (i != indexOfWord) {
      lstOfWords[i].style.color = "black";
    }
  }
  lstOfWords[indexOfWord].style.color = "#8E518D";
  indexOfWord = (indexOfWord + 1) % lstOfWords.length;
}, 1000); // Executes every 1 second
