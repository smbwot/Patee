function getRepoRootInfo() {
  // Determine absolute repo root URL from this script's src
  const thisScript = document.currentScript || Array.from(document.scripts).find(s => (s.src || "").includes("load-components.js"));
  const scriptUrl = new URL(thisScript.src, window.location.href);
  const repoRootUrl = new URL(scriptUrl.href.replace(/\/js\/load-components\.js(?:\?.*)?$/, "/"));

  // Compute relative prefix from current page to repo root (for rewriting href/src)
  const repoPath = repoRootUrl.pathname; // e.g. "/" or "/Patee/"
  const pagePath = window.location.pathname; // e.g. "/Patee/MyLinh/page.html"
  const remainder = pagePath.startsWith(repoPath) ? pagePath.slice(repoPath.length) : pagePath.replace(/^\//, "");
  const parts = remainder.split("/").filter(Boolean);
  const directoriesDeep = Math.max(0, parts.length - 1);
  const prefix = directoriesDeep === 0 ? "" : Array(directoriesDeep).fill("..").join("/") + "/";

  return { repoRootUrl, prefix };
}

async function loadPart(target, fileUrl, position = "beforeend", prefix = "") {
  const response = await fetch(fileUrl);
  const rawHtml = await response.text();

  function isRelativeUrl(url) {
    if (!url) return false;
    const trimmed = url.trim();
    return !/^(?:[a-z]+:)?\/\//i.test(trimmed) // not http(s): or protocol-relative
      && !trimmed.startsWith("/") // not root-absolute
      && !trimmed.startsWith("#")
      && !trimmed.startsWith("mailto:")
      && !trimmed.startsWith("tel:")
      && !trimmed.startsWith("javascript:");
  }

  function extractBody(html) {
    const match = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
    return match ? match[1] : html;
  }

  function rewriteUrls(html, prefix) {
    return html
      .replace(/\s(href|src)=("|')([^"']+)(\2)/gi, (m, attr, quote, url, endQuote) => {
        if (isRelativeUrl(url)) {
          return ` ${attr}=${quote}${prefix}${url}${endQuote}`;
        }
        return m;
      });
  }

  const bodyHtml = extractBody(rawHtml);
  const rewritten = rewriteUrls(bodyHtml, prefix);
  document.body.insertAdjacentHTML(position, rewritten);
}

document.addEventListener("DOMContentLoaded", () => {
  const { repoRootUrl, prefix } = getRepoRootInfo();
  const headerUrl = new URL("header.html", repoRootUrl).href;
  const footerUrl = new URL("footer.html", repoRootUrl).href;
  loadPart(document.body, headerUrl, "afterbegin", prefix);
  loadPart(document.body, footerUrl, "beforeend", prefix);
});