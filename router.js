window.addEventListener('load', () => {
    const currentPage = window.location.href.split('/').pop();
    switch (currentPage) {
        case 'page1.html':
            loadPage('./js/dropHeart.js');
            break;
        case 'page2.html':
            loadPage('./js/firework.js');
            break;
        default:
            loadPage('js/home.js');
            break;
    }
});

function loadPage(scriptPath) {
    const script = document.createElement('script');
    script.src = scriptPath;
    document.head.appendChild(script);
}
