document.querySelectorAll(".time").forEach((element) => {
  const milliiseconds = Date.now();
  element.textContent = `Current time: ${milliiseconds}`;
});
