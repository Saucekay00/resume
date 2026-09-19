const year = document.querySelector("#year");
if (year) year.textContent = new Date().getFullYear();

const items = document.querySelectorAll(".reveal");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (reducedMotion || !("IntersectionObserver" in window)) {
  items.forEach((item) => item.classList.add("visible"));
} else {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.12 }
  );
  items.forEach((item) => revealObserver.observe(item));
}

const links = [...document.querySelectorAll('nav a[href^="#"]')];
const sections = links.map((link) => document.querySelector(link.getAttribute("href"))).filter(Boolean);

if ("IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      const visible = entries.find((entry) => entry.isIntersecting);
      if (!visible) return;
      links.forEach((link) =>
        link.toggleAttribute("aria-current", link.getAttribute("href") === `#${visible.target.id}`)
      );
    },
    { rootMargin: "-30% 0px -60% 0px" }
  );
  sections.forEach((section) => sectionObserver.observe(section));
}
