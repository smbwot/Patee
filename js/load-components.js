function getBasePath() {
  // Simple rule: on GitHub Pages (username.github.io), project sites have first path segment as repo
  // On localhost or custom domains, serve from root '/'
  const host = window.location.hostname;
  const parts = window.location.pathname.split('/').filter(Boolean);
  if (host.endsWith('github.io')) {
    return parts.length > 0 ? `/${parts[0]}/` : '/';
  }
  return '/';
}

function ensureBaseTag(baseHref) {
  const head = document.head || document.getElementsByTagName('head')[0];
  let base = head.querySelector('base');
  if (!base) {
    base = document.createElement('base');
    head.prepend(base);
  }
  base.setAttribute('href', baseHref);
}

async function loadPart(target, fileUrl, position = 'beforeend') {
  const response = await fetch(fileUrl);
  const html = await response.text();
  const match = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  const content = match ? match[1] : html;
  document.body.insertAdjacentHTML(position, content);
}

document.addEventListener('DOMContentLoaded', () => {
  const basePath = getBasePath();
  ensureBaseTag(basePath);
  loadPart(document.body, `${basePath}header.html`, 'afterbegin');
  loadPart(document.body, `${basePath}footer.html`, 'beforeend');
});