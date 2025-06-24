let score = prompt("what is your current grade? ");

function gradeStudent(score) {
  if (score >= 90) {
    return "A";
  } else if (score >= 80) {
    return "- B";
  } else if (score >= 70) {
    return "- C";
  } else {
    return "Failed, Womp Womp";
  }
}
console.log(gradeStudent(score));
