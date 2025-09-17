function getPartialPath(partial) {
  // Nếu nằm trong pages, đi lên 1 cấp
  if (window.location.pathname.includes("/pages/")) {
    return `../partials/${partial}`;
  }
  return `partials/${partial}`;
}

async function loadPart(target, file, position = "beforeend") {
  let response = await fetch(file);
  let html = await response.text();
  document.body.insertAdjacentHTML(position, html);
}

document.addEventListener("DOMContentLoaded", () => {
  loadPart(document.body, getPartialPath("header.html"), "afterbegin");
  loadPart(document.body, getPartialPath("footer.html"), "beforeend");
});