async function loadPart(target, file, position = "beforeend") {
  const response = await fetch(file);
  target.insertAdjacentHTML(position, await response.text());
}

document.addEventListener("DOMContentLoaded", () => {
  loadPart(document.body, "./partials/header.html", "afterbegin")
    .then(() => {
      if (typeof updateCartCount === 'function') {
        updateCartCount();
      }
    });
  loadPart(document.body, "./partials/footer.html", "beforeend");
});

window.loadComponents = { loadPart };