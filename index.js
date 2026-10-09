const header = document.querySelector(".site-header");
const toggle = document.querySelector(".nav-toggle");
const nav = document.getElementById("site-nav");
const hero = document.getElementById("home");

// Mobile menu
const setMenu = (open) => {
    toggle.setAttribute("aria-expanded", String(open));
    nav.classList.toggle("open", open);
    header.classList.toggle("menu-open", open);
};

toggle.addEventListener("click", () => setMenu(toggle.getAttribute("aria-expanded") !== "true"));
nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => setMenu(false)));

// Nav is see-through over the header photo, solid once you scroll past it
const onScroll = () => header.classList.toggle("opaque", window.scrollY > hero.offsetHeight - 80);
window.addEventListener("scroll", onScroll, { passive: true });
window.addEventListener("resize", onScroll);
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
