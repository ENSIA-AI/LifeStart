
// Cursor
const cursorDot = document.querySelector('.cursor-dot');
const cursorRing = document.querySelector('.cursor-ring');
let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX; mouseY = e.clientY;
    cursorDot.style.left = mouseX + 'px'; cursorDot.style.top = mouseY + 'px';
});

function animateRing() { ringX += (mouseX - ringX) * 0.1; ringY += (mouseY - ringY) * 0.1; cursorRing.style.left = ringX + 'px'; cursorRing.style.top = ringY + 'px'; requestAnimationFrame(animateRing); } animateRing();

document.addEventListener('mouseover', (e) => {
    if (e.target.matches('.nav-item, .page-btn, button, a, .sidebar-toggle')) {
        cursorRing.style.width = '60px';
        cursorRing.style.height = '60px';
        cursorRing.style.borderColor = 'rgba(255,255,255,0.6)';
    }
});
document.addEventListener('mouseout', (e) => {
    if (e.target.matches('.nav-item, .page-btn, button, a, .sidebar-toggle')) {
        cursorRing.style.width = '40px';
         cursorRing.style.height = '40px';
          cursorRing.style.borderColor = 'rgba(255,255,255,0.4)';
    }
});

// Sidebar Toggle Functionality
const sidebarToggle = document.querySelector('.sidebar-toggle');
const sidebar = document.querySelector('.dia');
const overlay = document.querySelector('.sidebar-overlay');

function toggleSidebar() {
    sidebar.classList.toggle('active');
    sidebarToggle.classList.toggle('active');
    overlay.classList.toggle('active');
}

function closeSidebar() {
    sidebar.classList.remove('active');
    sidebarToggle.classList.remove('active');
    overlay.classList.remove('active');
}

sidebarToggle.addEventListener('click', toggleSidebar);
overlay.addEventListener('click', closeSidebar);

// Close sidebar when pressing Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeSidebar();
    }
});

// Page System
class PageManager {
    constructor() {
        this.currentPage = 'home';
        this.transition = document.querySelector('.transition');
        this.transitionText = document.querySelector('.transition-text');
        this.contentContainer = document.getElementById('content-container');
        this.init();
    }

    init() {
        this.loadPage('home');
        this.setupNavigation();
        setTimeout(() => { document.body.classList.add('loaded'); }, 500);
    }

    setupNavigation() {
        document.querySelectorAll('.nav-item').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const page = link.getAttribute('data-page');
                if (page !== this.currentPage) {
                    closeSidebar();
                    this.navigateTo(page);
                }
            });
        });
    }

    async navigateTo(page) {
        this.startTransition(page);
        await this.delay(900);
        await this.loadPage(page);
        this.updateNavigation(page);
        await this.delay(100);
        this.endTransition();
    }

    startTransition(page) {
        const pageNames = {
            'home': 'Loading Home',
            'board': 'Loading Board',
            'wlc': 'Loading Welcome'
        };
        this.transitionText.textContent = pageNames[page] || 'Loading';
        this.transition.style.left = '0';
    }

    endTransition() { this.transition.style.left = '100%'; }

    async loadPage(page) {
        try {
            // 🚀 IMPORTANT: UPDATE THESE PATHS BASED ON YOUR GITHUB FOLDER STRUCTURE
            const pagePaths = {
                'home': 'home.html',                   
                'board': 'board/board.html',         
                'wlc': 'Courses/welcoming-page.htm'         
            };
            
            const response = await fetch(pagePaths[page]);
            const content = await response.text();
            this.contentContainer.innerHTML = content;
            this.currentPage = page;

            // Load CSS and JS from same folder as HTML
            const basePath = pagePaths[page].replace('.html', '');
            this.loadCSS(`${basePath}.css`);
            this.loadJS(`${basePath}.js`);

        } catch (error) {
            console.error('Error loading page:', error);
            this.contentContainer.innerHTML = `
            <div style="display: flex; justify-content: center; align-items: center; height: 100%; flex-direction: column; text-align: center; padding: 20px;">
              <h1 style="font-size: clamp(2rem, 5vw, 3rem); margin-bottom: 1rem;">${page.charAt(0).toUpperCase() + page.slice(1)}</h1>
              <p style="font-size: clamp(1rem, 3vw, 1.2rem); opacity: 0.8; margin-bottom: 2rem;">Welcome to the ${page} page</p>
              <p style="color: #ff6b6b; margin-bottom: 1rem;">File not found: ${pagePaths[page]}</p>
              <button onclick="pageManager.navigateTo('home')" style="padding: 12px 30px; background: #667eea; border: none; border-radius: 25px; color: white; cursor: pointer; font-size: clamp(0.8rem, 2vw, 1rem);">Return Home</button>
            </div>
          `;
        }
    }

    loadCSS(href) {
        document.querySelectorAll('link[data-page-specific]').forEach(link => link.remove());
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = href;
        link.setAttribute('data-page-specific', 'true');
        document.head.appendChild(link);
    }

    loadJS(src) {
        document.querySelectorAll('script[data-page-specific]').forEach(script => script.remove());
        const script = document.createElement('script');
        script.src = src;
        script.setAttribute('data-page-specific', 'true');
        document.body.appendChild(script);
    }

    updateNavigation(page) {
        document.querySelectorAll('.nav-item').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-page') === page) {
                link.classList.add('active');
            }
        });
    }

    delay(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }
}

// Make pageManager globally accessible
const pageManager = new PageManager();
window.pageManager = pageManager;

// Fix click events
document.addEventListener('click', function (e) {
    console.log('Click detected at:', e.clientX, e.clientY);
});

// Enable all interactive elements
document.querySelectorAll('button, a, .nav-item, .sidebar-toggle').forEach(element => {
    element.style.pointerEvents = 'auto';
    element.style.cursor = 'pointer';
});

// Touch device optimizations
if ('ontouchstart' in window) {
    document.body.classList.add('touch-device');
}
