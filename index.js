const header = document.querySelector(".site-header");
const toggle = document.querySelector(".nav-toggle");
const nav = document.getElementById("site-nav");

// Mobile menu
toggle.addEventListener("click", () => {
    const open = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!open));
    toggle.setAttribute("aria-label", open ? "Open menu" : "Close menu");
    nav.classList.toggle("open", !open);
});

nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Open menu");
        nav.classList.remove("open");
    });
});

// Header border once the page scrolls
const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 8);
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

// Highlight the nav link for the section in view
const links = [...nav.querySelectorAll('a[href^="#"]')];
const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            links.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === `#${entry.target.id}`));
        });
    },
    { rootMargin: "-45% 0px -50% 0px" }
);
links.forEach((a) => {
    const section = document.querySelector(a.getAttribute("href"));
    if (section) observer.observe(section);
});

document.getElementById("year").textContent = new Date().getFullYear();
