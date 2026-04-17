const cache = {};

const BASE = window.location.hostname.includes('github.io')
    ? '/Camel-eComSite'
    : '';

function loadComponent(el, path) {
    fetch(BASE + path)
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
            const BASE = window.location.hostname.includes('github.io')
                ? ''
                : '/main';

            loadComponent(this, `${BASE}/components/${name}.html`);
        }
    });
});