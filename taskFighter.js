const tableOfContents = document.getElementById("table-of-contents");

const contentsLst = [
  "Project Overview",
  "Design",
  "Competition",
  "Conflict analysis",
  "Conclusion",
];
contentsLst.map((content, i) => {
  const contentItem = document.createElement("div");
  contentItem.innerHTML = ` <div class="flex ml-auto mr-auto justify-between items-center w-2/3 "> <div class="w-14 h-14 bg-[#8E518D] text-white flex justify-center items-center">${
    i + 1
  }</div><div class="mr-5">${content}</div></div>`;
  tableOfContents.appendChild(contentItem);
});

let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides((slideIndex += n));
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides((slideIndex = n));
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
}
