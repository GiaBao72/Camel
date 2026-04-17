const cache = {};

function getRepoBase() {
    if (!window.location.hostname.includes('github.io')) return '';
    const parts = window.location.pathname.split('/').filter(Boolean);
    return parts.length ? `/${parts[0]}` : '';
}

function loadComponent(el, path) {
    fetch(path)
        .then(res => {
            if (!res.ok) throw new Error('Failed: ' + path);
            return res.text();
        })
        .then(data => el.innerHTML = data)
        .catch(err => console.error(err));
}

// Define components
const components = [
    'header',
    'header-en',
    'header-cn',
    'top',
    'bot',
    'footer',
    'footer-en',
    'footer-cn',
    // 'mobile-menu',
    // 'banner',
    // 'featured',
    // 'category',
    // 'products',
    // 'clients',
    // 'cta',
    // 'news',
];

components.forEach(name => {
    customElements.define(`site-${name}`, class extends HTMLElement {

        connectedCallback() {
            const repoBase = getRepoBase();
            const rootPath = `${repoBase}/components/${name}.html`;
            const legacyPath = `${repoBase}/main/components/${name}.html`;

            // Try root first (gh-pages subtree), fallback to /main/ (legacy).
            fetch(rootPath)
                .then(res => {
                    if (!res.ok) throw new Error('Root path failed');
                    return res.text();
                })
                .then(data => this.innerHTML = data)
                .catch(() => loadComponent(this, legacyPath));
        }
    });
});