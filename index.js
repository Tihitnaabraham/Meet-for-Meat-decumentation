document.addEventListener('DOMContentLoaded', () => {
    initTabs();
    initHeroScreenshotBtn();
    initModal();
    initSmoothScroll();
    initActiveNav();
    initNotification();
    initHamburgerMenu();
    initImagePopup();
});
function initTabs() {
    document.querySelectorAll('.tabs').forEach(group => {
        const tabs = group.querySelectorAll('.tab');
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const targetId = tab.dataset.tab;
                if (!targetId) return;
                const section = tab.closest('section');
                section.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
                section.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
                tab.classList.add('active');
                const content = document.getElementById(targetId);
                if (content) content.classList.add('active');
            });
        });
    });
}

function initHeroScreenshotBtn() {
    const container = document.querySelector('.hero-buttons');
    if (!container || container.querySelector('.js-screenshot-btn')) return;
    const btn = document.createElement('button');
    btn.className = 'btn btn-outline js-screenshot-btn';
    btn.textContent = 'View Screenshots';
    btn.addEventListener('click', openModal);
    container.appendChild(btn);
}

const modal = document.getElementById('screenshotModal');
function openModal() {
    if (modal) modal.style.display = 'flex';
}
function closeModal() {
    if (modal) modal.style.display = 'none';
}
function initModal() {
    const closeBtn = document.querySelector('.close-modal');
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    window.addEventListener('click', e => {
        if (e.target === modal) closeModal();
    });
}

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', e => {
            const href = a.getAttribute('href');
            if (!href || href === '#') return;
            e.preventDefault();
            document.querySelector(href).scrollIntoView({ behavior: 'smooth' });
            const nav = document.querySelector('.nav-menu');
            const ham = document.querySelector('.hamburger');
            if (nav && nav.classList.contains('active')) {
                nav.classList.remove('active');
                ham.classList.remove('active');
                ham.setAttribute('aria-expanded', 'false');
            }
        });
    });
}

function initActiveNav() {
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section[id]');
        const links = document.querySelectorAll('nav a');
        let current = '';
        sections.forEach(s => {
            if (pageYOffset >= s.offsetTop - 150) current = s.id;
        });
        links.forEach(l => {
            l.classList.remove('active');
            if (l.getAttribute('href') === `#${current}`) l.classList.add('active');
        });
    });
}
function initNotification() {
    setTimeout(() => {
        const n = document.getElementById('notification');
        if (n) {
            n.classList.add('show');
            setTimeout(() => n.classList.remove('show'), 5000);
        }
    }, 5000);
}

function initHamburgerMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (!hamburger || !navMenu) return;

    hamburger.addEventListener('click', () => {
        const expanded = hamburger.getAttribute('aria-expanded') === 'true';
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        hamburger.setAttribute('aria-expanded', !expanded);
    });

    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
        });
    });
}
function initImagePopup() {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const closeBtn = modal.querySelector('.close-popup');

    document.querySelectorAll('img').forEach(img => {
        img.style.cursor = 'pointer';
        img.addEventListener('click', function() {
            modal.style.display = 'flex';
            modalImg.src = this.src;
            modalImg.alt = this.alt || '';
        });
    });

    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
        modalImg.src = '';
    });

    modal.addEventListener('click', e => {
        if (e.target === modal) {
            modal.style.display = 'none';
            modalImg.src = '';
        }
    });
}