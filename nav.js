// ==================== Cursor ====================
const cursorDot = document.querySelector('.cursor-dot');
const cursorRing = document.querySelector('.cursor-ring');
let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;

document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursorDot.style.left = mouseX + 'px';
    cursorDot.style.top = mouseY + 'px';
});

function animateRing() {
    ringX += (mouseX - ringX) * 0.1;
    ringY += (mouseY - ringY) * 0.1;
    cursorRing.style.left = ringX + 'px';
    cursorRing.style.top = ringY + 'px';
    requestAnimationFrame(animateRing);
}
animateRing();

document.addEventListener('mouseover', e => {
    if (e.target.matches('.nav-item, .page-btn, button, a, .sidebar-toggle')) {
        cursorRing.style.width = '60px';
        cursorRing.style.height = '60px';
        cursorRing.style.borderColor = 'rgba(255,255,255,0.6)';
    }
});
document.addEventListener('mouseout', e => {
    if (e.target.matches('.nav-item, .page-btn, button, a, .sidebar-toggle')) {
        cursorRing.style.width = '40px';
        cursorRing.style.height = '40px';
        cursorRing.style.borderColor = 'rgba(255,255,255,0.4)';
    }
});

// ==================== Sidebar Toggle ====================
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
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeSidebar(); });

// ==================== Page Manager ====================
function getPageFromUrl() {
    const params = new URLSearchParams(window.location.search);
    const p = (params.get("page") || "").toLowerCase();
    return (p === "home" || p === "board") ? p : "home";
}

class PageManager {
    constructor() {
        this.currentPage = null;
        this.transition = document.querySelector(".transition");
        this.transitionText = document.querySelector(".transition-text");
        this.contentContainer = document.getElementById("content-container");
        this.init();
    }

    init() {
        const pageToLoad = getPageFromUrl();
        this.loadPage(pageToLoad);
        this.updateNavigation(pageToLoad);

        this.setupNavigation();
        setTimeout(() => document.body.classList.add("loaded"), 300);

        // back/forward
        window.addEventListener("popstate", () => {
            const page = getPageFromUrl();
            this.loadPage(page, false);
            this.updateNavigation(page);
        });
    }

    setupNavigation() {
        document.querySelectorAll(".nav-item").forEach(link => {
            link.addEventListener("click", (e) => {
                e.preventDefault();
                const page = (link.getAttribute("data-page") || "").toLowerCase();
                if (!page || page === this.currentPage) return;

                closeSidebar();
                this.navigateTo(page);
            });
        });
    }

    async navigateTo(page) {
        this.startTransition(page);
        await this.delay(300);
        await this.loadPage(page);
        this.updateNavigation(page);
        await this.delay(80);
        this.endTransition();

        history.pushState(null, "", `index.php?page=${page}`);
    }

    startTransition(page) {
        const pageNames = { home: "Loading Home", board: "Loading Board" };
        this.transitionText.textContent = pageNames[page] || "Loading";
        this.transition.style.left = "0";
    }

    endTransition() {
        this.transition.style.left = "100%";
    }

    async loadPage(page, updateCurrent = true) {
        try {
            const res = await fetch(`index.php?page=${page}&partial=1`, {
                headers: { "X-Requested-With": "fetch" }
            });
            const html = await res.text();

            // To inject the page
            this.contentContainer.innerHTML = html;
            if (updateCurrent) this.currentPage = page;

            // To execute the scripts
            const scripts = Array.from(this.contentContainer.querySelectorAll("script"));
            const external = scripts.filter(s => s.src);
            const inline = scripts.filter(s => !s.src);

            // External scripts: load + await
            for (const oldScript of external) {
                await new Promise((resolve, reject) => {
                    const s = document.createElement("script");
                    s.src = oldScript.src;
                    s.onload = resolve;
                    s.onerror = reject;
                    this.contentContainer.appendChild(s);
                });
                oldScript.remove();
            }

            // Inline scripts: run after externals
            for (const oldScript of inline) {
                const s = document.createElement("script");
                s.textContent = oldScript.textContent;
                document.body.appendChild(s);
                oldScript.remove();
            }

        } catch (err) {
            console.error("Error loading page:", err);
            this.contentContainer.innerHTML =
                `<p style="color:red;">Failed to load view: ${page}</p>`;
        }
    }

    updateNavigation(page) {
        document.querySelectorAll(".nav-item").forEach(link => {
            link.classList.toggle("active", link.getAttribute("data-page") === page);
        });
    }

    delay(ms) {
        return new Promise(r => setTimeout(r, ms));
    }
}

// ==================== Initialize ====================
window.pageManager = new PageManager();
// Fix click events
document.addEventListener('click', e => {
    console.log('Click detected at:', e.clientX, e.clientY);
});

// Enable all interactive elements
document.querySelectorAll('button, a, .nav-item, .sidebar-toggle').forEach(el => {
    el.style.pointerEvents = 'auto';
    el.style.cursor = 'pointer';
});

