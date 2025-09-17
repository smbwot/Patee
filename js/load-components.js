async function loadPart(target, file, position = "beforeend") {
  let response = await fetch(file);
  let html = await response.text();
  document.body.insertAdjacentHTML(position, html);
}

document.addEventListener("DOMContentLoaded", () => {
  loadPart(document.body, "./partials/header.html", "afterbegin"); // top of <body>
  loadPart(document.body, "./partials/footer.html", "beforeend");  // bottom of <body>
});