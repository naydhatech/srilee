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

const whatsTabs = document.querySelector(".whats-tabs");

if (whatsTabs) {
  const tabButtons = Array.from(whatsTabs.querySelectorAll(".tab"));
  const tabPanels = Array.from(document.querySelectorAll(".whats-panel"));

  const setActiveTab = (index) => {
    tabButtons.forEach((button, buttonIndex) => {
      const isActive = buttonIndex === index;
      button.classList.toggle("active", isActive);
      button.setAttribute("aria-pressed", isActive ? "true" : "false");
    });

    tabPanels.forEach((panel, panelIndex) => {
      panel.classList.toggle("active", panelIndex === index);
    });
  };

  const initialIndex = Math.max(0, tabButtons.findIndex((button) => button.classList.contains("active")));
  setActiveTab(initialIndex >= 0 ? initialIndex : 0);

  tabButtons.forEach((button, index) => {
    button.addEventListener("click", () => setActiveTab(index));
  });
}

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

const homeHeroTrack = document.getElementById("homeHeroTrack");

if (homeHeroTrack) {
  const heroTemplate = homeHeroTrack.querySelector(".hero-slide-template");
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const heroSlides = [
    {
      title: "Boost operations with IoT for standout efficiency and customer experience.",
      lead:
        "Your all-in-one destination for IoT. Use our platform to create custom applications and combine them with ready-made solutions across multiple industries to unlock new revenue and operational outcomes.",
      cta: "Demo",
      href: "demo.html",
      header: "IoT command center",
      images: [
        { src: "images/hero.png", alt: "Srilee IoT overview" },
        { src: "images/industrial.png", alt: "Industrial IoT dashboard overview" },
        { src: "images/energy.png", alt: "Energy management overview" },
      ],
      stats: [
        ["98.7%", "asset uptime"],
        ["12 sec", "alert response"],
        ["4.8M", "events/day"],
        ["31%", "energy savings"],
      ],
      chips: ["Device health", "AI analytics", "Remote control", "Security"],
    },
    {
      title: "Automation that streamlines industrial work and improves response time.",
      lead:
        "Build safer, faster workflows with industrial automation designed for control, visibility, and consistent performance across operations.",
      cta: "Automation",
      href: "industrial-automation.html",
      header: "Automation overview",
      images: [
        { src: "images/industrial.png", alt: "Automation dashboard overview" },
        { src: "images/hero.png", alt: "Automation operations overview" },
        { src: "images/energy.png", alt: "Automation monitoring overview" },
      ],
      stats: [
        ["64%", "faster cycles"],
        ["24/7", "system control"],
        ["18", "critical alerts"],
        ["8", "connected lines"],
      ],
      chips: ["PLC", "SCADA", "HMI", "Controls"],
    },
    {
      title: "Manufacturing visibility that keeps production steady and efficient.",
      lead:
        "Improve plant performance with connected manufacturing insights, quality tracking, and operational control that keeps every line moving.",
      cta: "Manufacturing",
      href: "manufacturing.html",
      header: "Manufacturing view",
      images: [
        { src: "images/manufacturing-1.jpeg", alt: "Manufacturing preview" },
        { src: "images/manufacturing-2.jpeg", alt: "Manufacturing operations preview" },
        { src: "images/manufacturing-3.jpeg", alt: "Manufacturing plant preview" },
      ],
      stats: [
        ["92%", "line efficiency"],
        ["14", "quality checks"],
        ["3.2M", "units tracked"],
        ["11%", "waste reduction"],
      ],
      chips: ["OEE", "Traceability", "Quality", "Output"],
    },
    {
      title: "Industrial services that keep projects, plants, and support on track.",
      lead:
        "Deliver dependable engineering, commissioning, and maintenance support for industrial environments that need practical execution.",
      cta: "Industrial Services",
      href: "industrial-services.html",
      header: "Service operations",
      images: [
        { src: "images/industrial-services-1.jpeg", alt: "Industrial services preview" },
        { src: "images/industrial-services-2.jpeg", alt: "Industrial services operations preview" },
        { src: "images/industrial-services-3.png", alt: "Industrial services engineering preview" },
      ],
      stats: [
        ["36", "site visits"],
        ["9", "active teams"],
        ["7", "open work fronts"],
        ["99%", "completion rate"],
      ],
      chips: ["Commissioning", "Maintenance", "E&I", "Support"],
    },
    {
      title: "Renewable systems monitored with clear data and responsive control.",
      lead:
        "Track solar and hydro assets with automation-ready monitoring that helps you manage generation, alarms, and performance in one place.",
      cta: "Renewable",
      href: "renewable-automation.html",
      header: "Renewable monitoring",
      images: [
        { src: "images/energy.png", alt: "Renewable automation preview" },
        { src: "images/industrial.png", alt: "Renewable monitoring preview" },
        { src: "images/hero.png", alt: "Renewable operations preview" },
      ],
      stats: [
        ["154.5", "kWh per module"],
        ["271", "active alarms"],
        ["127", "work orders"],
        ["3.96", "grid score"],
      ],
      chips: ["Solar", "Hydro", "SCADA", "Energy"],
    },
  ];

  const fillSlide = (slide, data, isClone = false) => {
    const heading = slide.querySelector("h1");
    const lead = slide.querySelector(".lead");
    const cta = slide.querySelector(".cta-row .primary-btn");
    const header = slide.querySelector(".card-header span:first-child");
    const images = Array.from(slide.querySelectorAll(".hero-image-track img"));
    const statTiles = Array.from(slide.querySelectorAll(".stat-tile"));
    const chips = Array.from(slide.querySelectorAll(".stacked .chip"));

    if (heading) heading.textContent = data.title;
    if (lead) lead.textContent = data.lead;
    if (cta) {
      cta.textContent = data.cta;
      cta.href = data.href;
      if (isClone) cta.setAttribute("tabindex", "-1");
      else cta.removeAttribute("tabindex");
    }
    if (header) header.textContent = data.header;

    images.forEach((img, index) => {
      const source = data.images[index] || data.images[0];
      img.src = source.src;
      img.alt = source.alt;
    });

    statTiles.forEach((tile, index) => {
      const stat = data.stats[index];
      const value = tile.querySelector("h3");
      const label = tile.querySelector("p");
      if (stat && value) value.textContent = stat[0];
      if (stat && label) label.textContent = stat[1];
    });

    chips.forEach((chip, index) => {
      chip.textContent = data.chips[index] || chip.textContent;
    });

    slide.setAttribute("aria-hidden", isClone ? "true" : "false");
  };

  if (heroTemplate) {
    fillSlide(heroTemplate, heroSlides[0], false);
    heroSlides.slice(1).forEach((data) => {
      const clone = heroTemplate.cloneNode(true);
      clone.classList.remove("hero-slide-template");
      fillSlide(clone, data, true);
      homeHeroTrack.appendChild(clone);
    });

    const loopSlide = heroTemplate.cloneNode(true);
    loopSlide.classList.remove("hero-slide-template");
    fillSlide(loopSlide, heroSlides[0], true);
    homeHeroTrack.appendChild(loopSlide);
  }

  const slideElements = Array.from(homeHeroTrack.querySelectorAll(".hero-slide"));
  const visibleCount = heroSlides.length;
  const mobileQuery = window.matchMedia("(max-width: 720px)");

  if (slideElements.length && !prefersReduced) {
    let currentIndex = 0;
    let intervalId = null;
    let isPaused = false;
    let slideWidth = 0;
    const heroViewport = document.querySelector(".hero-marquee-viewport");

    const measureSlideWidth = () => {
      slideWidth = heroViewport ? heroViewport.getBoundingClientRect().width : 0;
    };

    const setPosition = (index, animate = true) => {
      if (!slideWidth) {
        measureSlideWidth();
      }
      homeHeroTrack.style.transition = animate ? "transform 0.75s ease" : "none";
      homeHeroTrack.style.transform = `translateX(-${slideWidth * index}px)`;
      if (!animate) {
        window.requestAnimationFrame(() => {
          homeHeroTrack.style.transition = "transform 0.75s ease";
        });
      }
    };

    const advance = () => {
      currentIndex += 1;
      setPosition(currentIndex, true);
    };

    const startRotation = () => {
      if (intervalId) {
        return;
      }
      intervalId = window.setInterval(() => {
        if (!isPaused) {
          advance();
        }
      }, 4200);
    };

    const stopRotation = () => {
      if (intervalId) {
        window.clearInterval(intervalId);
        intervalId = null;
      }
    };

    const applyMobileState = () => {
      if (mobileQuery.matches) {
        stopRotation();
        currentIndex = 0;
        homeHeroTrack.style.transition = "none";
        homeHeroTrack.style.transform = "translateX(0)";
      } else {
        setPosition(currentIndex, false);
        startRotation();
      }
    };

    homeHeroTrack.addEventListener("transitionend", (event) => {
      if (event.target !== homeHeroTrack) {
        return;
      }

      if (currentIndex >= visibleCount) {
        currentIndex = 0;
        setPosition(0, false);
      }
    });

    if (heroViewport) {
      const visibilityObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            isPaused = !entry.isIntersecting;
          });
        },
        { threshold: 0.25 }
      );
      visibilityObserver.observe(heroViewport);

      heroViewport.addEventListener("mouseenter", () => {
        isPaused = true;
      });

      heroViewport.addEventListener("mouseleave", () => {
        isPaused = false;
      });

      window.addEventListener("beforeunload", () => {
        stopRotation();
        visibilityObserver.disconnect();
      });
    }

    measureSlideWidth();
    setPosition(0, false);
    applyMobileState();

    window.addEventListener("resize", () => {
      measureSlideWidth();
      applyMobileState();
    });
  } else {
    measureSlideWidth = null;
    homeHeroTrack.style.transform = "translateX(0)";
  }
}
