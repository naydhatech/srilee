const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");
const navAnchors = document.querySelectorAll("#navLinks a");
const navItems = document.querySelectorAll(".nav-item.has-mega");

if (menuBtn && navLinks) {
  menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("open");
  });
}

navAnchors.forEach((anchor) => {
  anchor.addEventListener("click", () => {
    navAnchors.forEach((item) => item.classList.remove("active"));
    anchor.classList.add("active");
    navLinks.classList.remove("open");
  });
});

document.documentElement.style.scrollBehavior = "smooth";

navItems.forEach((item) => {
  const trigger = item.querySelector(".nav-trigger");
  if (!trigger) {
    return;
  }
  trigger.addEventListener("click", (event) => {
    const isMobile = window.matchMedia("(max-width: 920px)").matches;
    if (!isMobile) {
      return;
    }
    event.preventDefault();
    const isOpen = item.classList.contains("open");
    navItems.forEach((node) => node.classList.remove("open"));
    if (!isOpen) {
      item.classList.add("open");
      trigger.setAttribute("aria-expanded", "true");
    } else {
      trigger.setAttribute("aria-expanded", "false");
    }
  });
});

document.addEventListener("click", (event) => {
  if (!event.target.closest(".nav-item")) {
    navItems.forEach((node) => node.classList.remove("open"));
  }
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("reveal");
      }
    });
  },
  { threshold: 0.1 }
);

const revealTargets = document.querySelectorAll(
  ".feature-card, .resource-card, .price-card, .section, .logos, .cta"
);

revealTargets.forEach((target) => {
  target.classList.add("fade");
  observer.observe(target);
});
