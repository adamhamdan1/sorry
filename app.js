const revealButton = document.querySelector("#revealButton");
const hiddenLine = document.querySelector("#hiddenLine");
const softenButton = document.querySelector("#softenButton");
const responseOutput = document.querySelector("#responseOutput");
const responseButtons = document.querySelectorAll("[data-response]");

revealButton.addEventListener("click", () => {
  hiddenLine.classList.toggle("show");
  revealButton.textContent = hiddenLine.classList.contains("show")
    ? "أخفي السطر"
    : "كملي قراءة";
});

softenButton.addEventListener("click", () => {
  document.body.classList.toggle("soft-mode");
  softenButton.textContent = document.body.classList.contains("soft-mode")
    ? "رجعي الهدوء"
    : "لمسة حنية";
});

responseButtons.forEach((button) => {
  button.addEventListener("click", () => {
    responseOutput.textContent = button.dataset.response;
    responseButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
  });
});
