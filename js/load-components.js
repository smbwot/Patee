async function loadPart(target, file, position = "beforeend") {
  let response = await fetch(file);
  let html = await response.text();
  target.insertAdjacentHTML(position, html);
}

document.addEventListener("DOMContentLoaded", () => {
  // Load header and footer
  loadPart(document.body, "./partials/header.html", "afterbegin"); // top of <body>
  loadPart(document.body, "./partials/footer.html", "beforeend");  // bottom of <body>

  // Load cart
  if (window.cartFunctions && window.cartFunctions.loadCartPanel) {
    window.cartFunctions.loadCartPanel();
  }
});

// Export loadPart function for external use
window.loadComponents = {
  loadPart
};