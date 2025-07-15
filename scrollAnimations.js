const background = document.getElementById("scrollable-background");
const prog1 = document.getElementById("progress-1");
const prog2 = document.getElementById("progress-2");
const prog3 = document.getElementById("progress-3");
const prog4 = document.getElementById("progress-4");
console.log("connected");

background.addEventListener("scroll", () => {
  const scrollY = background.scrollTop;
  console.log("Scroll Y: ", scrollY);
  if (scrollY < 500) {
    prog1.style.borderLeftStyle = "dashed";
    prog2.style.borderLeftStyle = "dashed";
    prog3.style.borderLeftStyle = "dashed";
    prog4.style.borderLeftStyle = "dashed";
  }

  if (scrollY > 500 && scrollY < 1300) {
    prog1.style.borderLeftStyle = "solid";

    prog2.style.borderLeftStyle = "dashed";
    prog3.style.borderLeftStyle = "dashed";
    prog4.style.borderLeftStyle = "dashed";
  }

  if (scrollY > 1500 && scrollY < 2000) {
    prog2.style.borderLeftStyle = "solid";
    prog3.style.borderLeftStyle = "dashed";
    prog4.style.borderLeftStyle = "dashed";
  }

  if (scrollY > 3000) {
    prog3.style.borderLeftStyle = "solid";
    prog4.style.borderLeftStyle = "solid";
  }
  //   if (scrollY < 2000) {
  //   prog1.style.borderLeftStyle = "dashed";
  // }

  // if (scrollY > 500) {
  //   prog1.style.borderLeftStyle = "solid";
  // }
});
