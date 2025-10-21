document.querySelectorAll(".time").forEach((element) => {
  const milliiseconds = Date.now();
  element.textContent = `Current time: ${milliiseconds}`;
});

const inputs = Array.from(document.querySelectorAll("input"));
const small = Array.from(document.querySelectorAll("small"));
const textarea = document.querySelector("textarea");
const success = document.querySelector(".success");
const form = document.getElementById("contactForm");

const errormessges = ["name", "email", "subject", "textarea"];

form.addEventListener("submit", (e) => {
  e.preventDefault();
  isvalid = true;
  let firstInvalid = null;
  inputs.forEach((input, index) => {
    if (input.id == errormessges[index] && input.value == "") {
      small[
        index
      ].textContent = `*missing ${errormessges[index]} input required`;
      input.setAttribute("aria-invalid", "true");
      if (!firstInvalid) firstInvalid = input;
      isvalid = false;
    } else if (input.value.length < 10) {
      small[
        index
      ].textContent = `*${errormessges[index]} must be at least 10 characters`;
      input.setAttribute("aria-invalid", "true");
      if (!firstInvalid) firstInvalid = input;
      isvalid = false;
    } else {
      small[index].textContent = "";
      input.removeAttribute("aria-invalid");
    }
  });

  if (textarea.value.trim() == "") {
    small[inputs.length].textContent = `*missing message input required`;
    textarea.setAttribute("aria-invalid", "true");
    if (!firstInvalid) firstInvalid = textarea;
    isvalid = false;
  } else if (textarea.value.length < 10) {
    small[
      inputs.length
    ].textContent = `*message must be at least 10 characters`;
    textarea.setAttribute("aria-invalid", "true");
    if (!firstInvalid) firstInvalid = textarea;
    isvalid = false;
  } else {
    small[inputs.length].textContent = "";
    textarea.removeAttribute("aria-invalid");
  }

  if (firstInvalid) {
    firstInvalid.focus();
  }

  if (!isvalid) return;
  success.classList.add("add");

  inputs.forEach((input) => {
    input.value = "";
    input.style.borderColor = "#e6e9ef";
  });
  textarea.value = "";
  textarea.style.borderColor = "#e6e9ef";

  setTimeout(() => {
    success.classList.remove("add");
  }, 1200);
});

inputs.forEach((input, index) => {
  input.addEventListener("keyup", (e) => {
    if (input.value.length < 10) {
      input.style.borderColor = "rgb(231, 127, 127)";
      small[
        index
      ].textContent = `*Input ${errormessges[index]} requires at least 10 characters`;
    } else {
      input.style.borderColor = "rgba(160, 219, 136, 1)";
      small[index].textContent = "";
    }

    if (input.id == "email") {
      if (
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
          input.value.trim()
        )
      ) {
        input.style.borderColor = "rgba(160, 219, 136, 1)";
      } else {
        input.style.borderColor = "rgb(231, 127, 127)";
        small[index].textContent = `*Please enter a valid email address`;
      }
    }
  });
});

textarea.addEventListener("keyup", (e) => {
  console.log(textarea);
  console.log(textarea.value.length);
  if (textarea.value.trim() == "") {
    console.log(textarea.value);
    textarea.style.borderColor = "rgb(231, 127, 127)";
  } else if (textarea.value.length < 10) {
    textarea.style.borderColor = "rgb(231, 127, 127)";
    small[
      inputs.length
    ].textContent = `*message must be at least 10 characters`;
  } else {
    textarea.style.borderColor = "rgba(160, 219, 136, 1)";
    small[inputs.length].textContent = "";
  }
});
