const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");
const navAnchors = document.querySelectorAll("#navLinks a");
const navItems = document.querySelectorAll(".nav-item.has-mega");
const contactForm = document.getElementById("contactForm");
const contactStatus = document.getElementById("contactStatus");
const companyEmail = "sales@srilee.com";

if (menuBtn && navLinks) {
  menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("open");
  });
}

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(contactForm);
    const payload = Object.fromEntries(formData.entries());

    if (contactStatus) {
      contactStatus.textContent = "Sending your message...";
      contactStatus.classList.remove("is-error", "is-success");
    }

    fetch(contactForm.action, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to send message");
        }
        return response.json();
      })
      .then(() => {
        contactForm.reset();
        if (contactStatus) {
          contactStatus.textContent = "Message sent successfully. We will get back to you soon.";
          contactStatus.classList.add("is-success");
        }
      })
      .catch(() => {
        const mailSubject = encodeURIComponent("Contact form inquiry from website visitor");
        const mailBody = encodeURIComponent(
          [
            `Name: ${(payload.name || "").toString().trim() || "Not provided"}`,
            `Email: ${(payload.email || "").toString().trim() || "Not provided"}`,
            `Phone: ${(payload.phone || "").toString().trim() || "Not provided"}`,
            `Company: ${(payload.company || "").toString().trim() || "Not provided"}`,
            "",
            "Message:",
            (payload.message || "").toString().trim() || "Not provided",
          ].join("\n")
        );

        if (contactStatus) {
          contactStatus.textContent = "Something went wrong. Opening your email app instead.";
          contactStatus.classList.add("is-error");
        }

        window.location.href = `mailto:${companyEmail}?subject=${mailSubject}&body=${mailBody}`;
      });
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

const acceleratorGrid = document.querySelector("#accelerators .grid-3");

if (acceleratorGrid) {
  const cards = Array.from(acceleratorGrid.querySelectorAll(".feature-card"));
  if (cards.length > 1) {
    acceleratorGrid.classList.add("accelerator-carousel");

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!prefersReduced) {
      let intervalId = null;
      let index = 0;
      let step = 0;

      const computeStep = () => {
        if (!cards[0]) {
          return;
        }
        const gap = parseFloat(getComputedStyle(acceleratorGrid).gap) || 0;
        step = cards[0].offsetWidth + gap;
      };

      const scrollToIndex = () => {
        acceleratorGrid.scrollTo({
          left: step * index,
          behavior: "smooth",
        });
      };

      const startRotation = () => {
        intervalId = setInterval(() => {
          index = (index + 1) % cards.length;
          scrollToIndex();
        }, 4000);
      };

      const stopRotation = () => {
        if (intervalId) {
          clearInterval(intervalId);
          intervalId = null;
        }
      };

      computeStep();
      scrollToIndex();
      startRotation();

      acceleratorGrid.addEventListener("mouseenter", stopRotation);
      acceleratorGrid.addEventListener("mouseleave", startRotation);
      window.addEventListener("resize", () => {
        computeStep();
        scrollToIndex();
      });
    }
  }
}

const platformGrid = document.querySelector("#platform .dual-grid");

if (platformGrid) {
  const baseCards = Array.from(platformGrid.querySelectorAll(".feature-card"));
  if (baseCards.length > 1) {
    platformGrid.classList.add("platform-carousel");
  }
}

const homeHeroRotator = document.querySelector(".home-page .hero-image-rotator");

if (homeHeroRotator) {
  const track = homeHeroRotator.querySelector(".hero-image-track");
  const slides = track ? Array.from(track.querySelectorAll("img")) : [];
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (slides.length > 1 && !prefersReduced) {
    let current = 0;
    let intervalId = null;
    let pause = false;
    let observer = null;

    const setActive = (index) => {
      if (!track) {
        return;
      }
      track.style.transform = `translateX(-${index * 100}%)`;
    };

    const advance = () => {
      current = (current + 1) % slides.length;
      setActive(current);
    };

    const startRotation = () => {
      intervalId = window.setInterval(() => {
        if (!pause) {
          advance();
        }
      }, 3500);
    };

    const stopRotation = () => {
      if (intervalId) {
        window.clearInterval(intervalId);
        intervalId = null;
      }
    };

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          pause = !entry.isIntersecting;
        });
      },
      { threshold: 0.25 }
    );

    setActive(current);
    observer.observe(homeHeroRotator);
    startRotation();

    homeHeroRotator.addEventListener("mouseenter", () => {
      pause = true;
    });

    homeHeroRotator.addEventListener("mouseleave", () => {
      pause = false;
    });

    window.addEventListener("beforeunload", () => {
      stopRotation();
      observer.disconnect();
    });
  }
}
