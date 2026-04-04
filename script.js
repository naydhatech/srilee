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

window.toggleHsys = (header) => {
  const card = header?.closest(".hsys");
  if (!card) return;

  const wasOpen = card.classList.contains("open");
  card.parentElement?.querySelectorAll(".hsys").forEach((node) => node.classList.remove("open"));
  if (!wasOpen) card.classList.add("open");
};

const renewableRoot = document.getElementById("renewableRoot");

const renewableSolarTabs = {
  monitoring: {
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=700&q=80",
    title: "Plant Monitoring",
    intro: "Live string, inverter, and plant-level monitoring with alarms and weather inputs.",
    cards: [
      ["String current monitoring", "Spot underperformance early."],
      ["Inverter fleet SCADA", "Coordinate fleets with Modbus or SunSpec."],
      ["Weather station integration", "Use irradiance and temperature data."],
      ["Alarm and event tracking", "Keep faults and warnings in one feed."],
    ],
  },
  remote: {
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=700&q=80",
    title: "Remote Monitoring",
    intro: "Secure cloud or VPN access for multi-site visibility and faster O&M response.",
    cards: [
      ["Live alarm feed", "Push active alarms to operations teams."],
      ["Remote diagnostics", "Review device faults without a site visit."],
      ["Mobile alerts", "Send key events to engineers and owners."],
      ["Multi-site visibility", "Track a full solar portfolio."],
    ],
  },
  ppc: {
    image: "https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=700&q=80",
    title: "PPC / Grid Control",
    intro: "Control active power, reactive power, ramp rates, and frequency response.",
    cards: [
      ["Active power curtailment", "Dispatch inverter fleets quickly."],
      ["Reactive power control", "Support Q/V regulation at POI."],
      ["Ramp rate control", "Limit power swings in clouds."],
      ["Grid protection", "Handle ride-through and anti-islanding."],
    ],
  },
  analytics: {
    image: "https://images.unsplash.com/photo-1556740749-887f6717d7e4?w=700&q=80",
    title: "Analytics & Reports",
    intro: "Convert operational data into KPIs, reports, and improvement actions.",
    cards: [
      ["Performance ratio", "Track PR, CUF, and specific yield."],
      ["Loss analysis", "Break down generation losses."],
      ["Automated reporting", "Generate shift, daily, and monthly reports."],
      ["Forecast support", "Use weather and irradiance inputs."],
    ],
  },
};

if (renewableRoot) {
  const renderItems = (items, className) => items.map((item) => `<div class="${className}">${item}</div>`).join("");
  const renderChips = (items, className) => items.map((item) => `<span class="${className}">${item}</span>`).join("");

  const hydroSystemData = [
    [
      "Governor Control System",
      "PLC-based digital governor for turbine speed, load regulation, droop control, isochronous mode, and load sharing.",
      ["Speed regulation", "Load-frequency control", "Droop / Isochronous", "Guide vane actuator", "Pelton needle control", "Auto start/stop"],
      "circle",
    ],
    [
      "AVR & Excitation",
      "Static excitation with digital AVR for generator voltage control, reactive power regulation, and PSS.",
      ["Voltage regulation", "Reactive power", "Power factor control", "PSS function", "Field current limit", "Ceiling voltage"],
      "bolt",
    ],
    [
      "Turbine-Generator Protection",
      "Numerical relay protection for overspeed, differential, overcurrent, earth fault, loss-of-field, and out-of-step faults.",
      ["Over-speed trip", "Differential protection", "Earth fault relay", "Loss-of-field", "Reverse power", "Thermal monitoring"],
      "shield",
    ],
    [
      "Gate & Valve Automation",
      "Intake gates, penstock valves, radial gates, and spillway gates with position feedback and interlocks.",
      ["Intake gate control", "Penstock valve", "Radial gate automation", "Spillway control", "Position feedback", "Flood emergency logic"],
      "flow",
    ],
    [
      "Hydro Plant SCADA & HMI",
      "Plant-wide SCADA with mimic displays, alarms, historian, reports, and secure VPN access.",
      ["Plant mimic display", "Alarm & event log", "Generation historian", "Remote access VPN", "Shift reports", "IEC 60870-5-104"],
      "screen",
    ],
    [
      "Auxiliary Controls",
      "Cooling water, lubrication, drainage, UPS, DC systems, and fire detection integrated into one network.",
      ["Cooling water pumps", "Lubrication oil system", "Drainage & dewatering", "DC/UPS system", "Battery charger monitoring", "Fire & gas detection"],
      "aux",
    ],
  ];

  const hydroLayers = [
    ["Field Layer (Level 0)", ["Turbine-generator unit", "Guide vane / needle actuators", "Gate & valve actuators", "Sensors & transmitters", "Protection relays"]],
    ["Unit Control (Level 1)", ["Unit Control Board (UCB)", "Governor PLC", "AVR / Excitation panel", "Protection relay panel", "Local HMI touchscreen"]],
    ["Station Control (Level 2)", ["Station control PLC / DCS", "Plant-level SCADA server", "Operator workstations", "Data historian", "Synchronisation panel"]],
    ["Remote / Grid (Level 3)", ["Grid control center (SCADA)", "IEC 60870-5-104 / DNP3", "Remote SCADA via VPN", "Energy metering (ABT)", "CMMS integration"]],
  ];

  const solarTypes = [
    ["Utility Scale", "utility", "Utility-Scale Ground-Mounted", "Complete SCADA for large grid-tied solar farms with inverter fleet management, SMB monitoring, and PPC.", ["String-level current monitoring", "Inverter fleet SCADA", "Power Plant Controller", "Weather station integration", "Grid protection"]],
    ["Commercial", "rooftop", "Commercial & Industrial (C&I)", "SCADA for rooftop and ground-mounted C&I plants with self-consumption tracking and energy reporting.", ["Self-consumption vs export", "Net metering integration", "Load vs generation dashboards", "Mobile app alerts", "Multi-tenant support"]],
    ["Hybrid", "hybrid", "Hybrid Solar + Hydro Plants", "Unified SCADA for hybrid plants with coordinated dispatch, BESS integration, and grid export control.", ["Coordinated dispatch", "Solar + hydro + BESS", "Ramp rate smoothing", "Grid code compliance", "Single pane of glass"]],
  ];

  const ppcFeatures = [
    ["Active Power Curtailment (APC)", "Remote and scheduled curtailment commands dispatched to inverter fleets quickly."],
    ["Reactive Power Control (Q/V)", "Voltage regulation at the point of interconnection."],
    ["Ramp Rate Control", "Limit power ramp-up and ramp-down rates during transients."],
    ["Frequency Response (LFSM / FSM)", "Provide grid frequency support services."],
    ["Grid Protection & Anti-Islanding", "Automatic disconnection with ride-through settings."],
  ];

  const hybridCards = [
    ["Unified SCADA Dashboard", "One interface for solar, hydro, and BESS with generation and state-of-charge visibility."],
    ["Coordinated Dispatch EMS", "Optimise dispatch across sources to maximise revenue and reduce curtailment."],
    ["BESS Integration & SOC Control", "Monitor battery state-of-charge, thermal conditions, and schedules."],
    ["Ramp Rate Smoothing", "Use hydro or BESS to smooth solar intermittency."],
    ["Grid Code Compliance", "Meet LVRT/HVRT, fault current, and frequency response requirements."],
    ["Scheduled Generation & Forecasting", "Support day-ahead scheduling with weather and irradiance inputs."],
  ];

  const platformCards = [
    ["01", "h", "Multi-Plant Monitoring", "Monitor all solar and hydro assets from a central dashboard.", ["Portfolio view", "Site comparison", "Fleet alarms"]],
    ["02", "s", "Performance Analytics", "Track PR, CUF, availability, specific yield, and losses.", ["PR tracking", "Loss waterfall", "Benchmarking"]],
    ["03", "g", "Remote Monitoring & Diagnostics", "Keep 24/7 cloud-based remote access with live alarms.", ["Cloud SCADA", "Mobile alerts", "VPN access"]],
    ["04", "h", "Data Historian & Reporting", "Store long-term process data and generate reports.", ["OSIsoft PI", "Ignition Historian", "Custom reports"]],
    ["05", "s", "Alarm Management", "Prioritise alarms with filtering, suppression, and escalation.", ["ISA-18.2 alarms", "SMS/email alerts", "Escalation rules"]],
    ["06", "g", "Cyber Security", "IEC 62351 and NERC CIP-aligned security with audit logging.", ["IEC 62351", "RBAC", "Audit log"]],
  ];

  const techCards = [
    ["PLC / DCS Platforms", ["Siemens S7-300/400/1500", "Allen Bradley ControlLogix", "Schneider Modicon M580", "ABB AC500 / System 800xA", "GE Mark VI Turbine Control"]],
    ["SCADA Software", ["Siemens WinCC / SIMATIC", "Inductive Automation Ignition", "AVEVA Wonderware", "Rockwell FactoryTalk View", "OSIsoft PI / AVEVA PI"]],
    ["Communication Protocols", ["Modbus RTU / TCP", "IEC 60870-5-101 / 104", "IEC 61850 GOOSE / MMS", "DNP3 / OPC-UA", "SunSpec / Profinet"]],
    ["Networking & IoT", ["Industrial Ethernet / Fiber", "4G/LTE / MPLS WAN", "Cloud SCADA (AWS/Azure)", "MQTT / REST API", "Cybersecurity firewalls"]],
  ];

  const whyCards = [
    ["Hydro Automation Specialists", "Deep expertise in governor control, excitation, protection, and SCADA for hydro plants.", "#0ea5e9"],
    ["Solar SCADA Expertise", "String to plant-level solar SCADA with PPC, analytics, and remote monitoring.", "#eab308"],
    ["Standards-Aligned", "IEC 60870, IEC 61850, IEC 61968, ISA-18.2, and grid code compliant engineering.", "#10b981"],
    ["24/7 Remote Support", "Continuous remote monitoring with secure VPN access and rapid fault response.", "#0ea5e9"],
    ["End-to-End Delivery", "Design, engineering, manufacturing, commissioning, and AMC through one team.", "#eab308"],
    ["Scalable & Future-Ready", "Cloud-native and on-premise SCADA from a single unit to a multi-GW portfolio.", "#10b981"],
  ];

  renewableRoot.innerHTML = `
    <section class="hero">
      <div class="hero-bg"></div><div class="hero-grid"></div>
      <div class="hero-left">
        <div class="hero-eyebrow">
          <span class="badge badge-hydro"><span class="badge-dot"></span>Hydro Automation</span>
          <span class="badge badge-solar"><span class="badge-dot"></span>Solar SCADA</span>
        </div>
        <h1 class="hero-title">Intelligent<br/><span class="th">Hydro</span> &amp;<br/><span class="ts">Solar</span><br/>Automation</h1>
        <p class="hero-desc">End-to-end SCADA, control, and monitoring for hydro power plants, solar farms, and hybrid renewable projects - from governor controls to plant performance controllers.</p>
        <div class="hero-pills">${["Governor Control","Excitation System","Gate Automation","Plant PPC","Remote Monitoring","Hybrid Plants"].map((pill) => `<span class="hpill">${pill}</span>`).join("")}</div>
        <div class="hero-acts"><a href="contact.html" class="btn btn-hydro">Discuss your project</a><a href="#hydro" class="btn btn-ghost">Explore solutions ?</a></div>
      </div>
      <div class="hero-right">
        <div class="hi tall hydro-tint"><img src="images/energy.png" alt="Hydro plant" /></div>
        <div class="hi solar-tint"><img src="images/industrial.png" alt="Solar farm" /></div>
        <div class="hi"><img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&q=80" alt="SCADA monitoring" /></div>
      </div>
    </section>

    <div class="stats">${[
      ["30+", "Hydro plants automated", "h"],
      ["200+", "MW solar plants monitored", "s"],
      ["IEC", "60870 / 61850 compliant", "g"],
      ["24/7", "Remote support coverage", "h"],
    ].map(([value, label, tone]) => `<div class="stat reveal"><div class="stat-n ${tone}">${value}</div><div class="stat-l">${label}</div></div>`).join("")}</div>

    <section class="section hydro-section" id="hydro">
      <div class="s-label h">01 - Hydro Power Plant Automation</div>
      <h2 class="s-title">Complete Automation for<br/>Hydro Power Plants</h2>
      <p class="s-desc">From governor controls and excitation systems to turbine protection, gate automation, and full SCADA integration.</p>
      <div class="hydro-grid">
        <div class="hydro-visual reveal">
          <div class="hv-main"><img src="https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=800&q=80" alt="Hydro plant control room" /></div>
          <div class="hv-row">
            <div class="hv-sm"><img src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&q=80" alt="Turbine" /></div>
            <div class="hv-sm"><img src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400&q=80" alt="Gate control" /></div>
          </div>
        </div>
        <div class="hydro-systems reveal">${hydroSystemData.map(([title, desc, chips], index) => `<div class="hsys${index === 0 ? " open" : ""}"><div class="hsys-header" onclick="toggleHsys(this)"><div class="hsys-icon"><svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="#0ea5e9">${index === 0 ? '<circle cx="12" cy="12" r="3"/>' : '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>'}</svg></div><div class="hsys-title">${title}</div><div class="hsys-arrow">�</div></div><div class="hsys-body"><div class="hsys-desc">${desc}</div><div class="hsys-chips">${renderChips(chips, "hchip")}</div></div></div>`).join("")}</div>
      </div>
    </section>

    <div class="divider"></div>

    <section class="section solar-section" id="solar">
      <div class="s-label s">02 - Solar Power Plant SCADA</div>
      <h2 class="s-title">Solar SCADA with<br/>Advanced Plant Intelligence</h2>
      <p class="s-desc">String to plant-level monitoring, real-time performance analytics, PPC for grid compliance, remote diagnostics, and multi-site visibility.</p>
      <div class="solar-tab-nav" id="solarTabs">${Object.entries(renewableSolarTabs).map(([key, tab], index) => `<button class="stab${index === 0 ? " active" : ""}" data-tab="${key}">${tab.title}</button>`).join("")}</div>
      <div class="solar-content">
        <div class="solar-img reveal"><img id="solarImg" src="${renewableSolarTabs.monitoring.image}" alt="Solar SCADA" style="width:100%;height:100%;object-fit:cover" /></div>
        <div id="solarFeatureBody" class="solar-features reveal"></div>
      </div>
      <div class="solar-types">${solarTypes.map(([badge, badgeClass, title, desc, features]) => `<div class="stype-card reveal"><div class="stype-img"><div class="stype-badge ${badgeClass}">${badge}</div><img src="${badgeClass === "utility" ? "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=500&q=80" : badgeClass === "rooftop" ? "https://images.unsplash.com/photo-1559302504-64aae6ca6b6d?w=500&q=80" : "https://images.unsplash.com/photo-1623177628701-3b5e88440d23?w=500&q=80"}" alt="${title}" /></div><div class="stype-body"><div class="stype-title">${title}</div><div class="stype-desc">${desc}</div><div class="stype-features">${renderItems(features, "stf")}</div></div></div>`).join("")}</div>
    </section>

    <div class="divider"></div>

    <section class="section ppc-section">
      <div class="s-label g">03 - Power Plant Controller</div>
      <h2 class="s-title">PPC - Active Power,<br/>Reactive Power &amp; Grid Compliance</h2>
      <div class="ppc-grid">
        <div class="ppc-content reveal">
          <p class="ppc-intro">Our Power Plant Controller (PPC) enables solar and hydro plants to meet grid operator requirements for active power curtailment, reactive power regulation, ramp rate control, and frequency response.</p>
          <div class="ppc-feats">${ppcFeatures.map(([title, desc]) => `<div class="pf-item"><div class="pf-dot"><svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="#10b981"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg></div><div><div class="pf-title">${title}</div><div class="pf-desc">${desc}</div></div></div>`).join("")}</div>
        </div>
        <div class="ppc-visual reveal">
          <div class="ppc-img"><img src="https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=600&q=80" alt="PPC system" style="width:100%;height:100%;object-fit:cover" /></div>
          <div class="ppc-stat-row"><div class="ppc-stat"><div class="ppc-stat-val">&lt;1s</div><div class="ppc-stat-lbl">PPC dispatch response</div></div><div class="ppc-stat"><div class="ppc-stat-val">&plusmn;0.5%</div><div class="ppc-stat-lbl">Voltage regulation accuracy</div></div></div>
        </div>
      </div>
    </section>

    <div class="divider"></div>

    <section class="section hybrid-section">
      <div class="s-label g">04 - Hybrid Plant Automation</div>
      <h2 class="s-title">Solar + Hydro + BESS<br/>Hybrid Plants</h2>
      <p class="s-desc">Unified energy management and control for hybrid renewable plants - coordinating multiple generation sources and storage for optimal dispatch.</p>
      <div class="hybrid-layout">
        <div class="hybrid-img reveal"><img src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=700&q=80" alt="Hybrid plant" /></div>
        <div class="hybrid-features reveal">${hybridCards.map(([title, desc]) => `<div class="hf-card"><div class="hf-icon" style="background:rgba(14,165,233,.1);border:1px solid rgba(14,165,233,.2)"><svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="#0ea5e9"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zm0 8a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zm12 0a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"/></svg></div><div class="hf-title">${title}</div><div class="hf-desc">${desc}</div></div>`).join("")}</div>
      </div>
    </section>

    <div class="divider"></div>

    <section class="section platform-section">
      <div class="s-label h">05 - Integrated SCADA Platform</div>
      <h2 class="s-title">One Platform. All<br/>Renewable Assets.</h2>
      <p class="s-desc">Centralised monitoring and control across solar farms, hydro plants, and hybrid assets on a single, scalable SCADA and IoT platform.</p>
      <div class="platform-grid">${platformCards.map(([num, tone, title, desc, chips]) => `<div class="plat-card ${tone === "s" ? "solar-card-v" : ""} reveal"><div class="plat-num ${tone}">${num}</div><div class="plat-icon" style="background:${tone === "s" ? "rgba(234,179,8,.1);border:1px solid rgba(234,179,8,.2)" : tone === "g" ? "rgba(16,185,129,.1);border:1px solid rgba(16,185,129,.2)" : "rgba(14,165,233,.1);border:1px solid rgba(14,165,233,.2)"}"><svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="${tone === "s" ? "#eab308" : tone === "g" ? "#10b981" : "#0ea5e9"}">${num === "01" ? '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"/>' : num === "02" ? '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>' : num === "03" ? '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0"/>' : num === "04" ? '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>' : num === "05" ? '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>' : '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>'}</svg></div><div class="plat-title">${title}</div><div class="plat-desc">${desc}</div><div class="plat-chips">${chips.map((chip) => `<span class="pc-${tone}">${chip}</span>`).join("")}</div></div>`).join("")}</div>
    </section>

    <div class="divider"></div>

    <section class="section tech-section">
      <div class="s-label h">Technologies We Work With</div>
      <h2 class="s-title">Platform &amp; Protocol<br/>Expertise</h2>
      <p class="s-desc">We work with all major PLC, SCADA, and communication platforms - ensuring seamless integration with your existing plant infrastructure.</p>
      <div class="tech-grid">${techCards.map(([label, items]) => `<div class="tech-card reveal"><div class="tc-label">${label}</div><div class="tc-items">${items.map((item) => `<div class="tc-item ${label.includes("Software") ? "sc" : label.includes("Protocols") ? "gc" : "hc"}">${item}</div>`).join("")}</div></div>`).join("")}</div>
    </section>

    <section class="section why-section">
      <div class="s-label g">Why Srilee IoT</div>
      <h2 class="s-title">Renewable Energy<br/>Domain Expertise</h2>
      <p class="s-desc">Field-tested engineers with hands-on experience in hydro and solar automation - not generalists, specialists.</p>
      <div class="why-grid renewable-why-grid">${whyCards.map(([title, desc, color]) => `<div class="wy-card reveal"><div class="wy-icon" style="background:${color}1a;border:1px solid ${color}33"><svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="${color}">${color === "#eab308" ? '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/>' : color === "#10b981" ? '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/>' : '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>'}</svg></div><div class="wy-title">${title}</div><div class="wy-desc">${desc}</div></div>`).join("")}</div>
    </section>

    <section class="cta cta-section">
      <div class="cta-glow"></div><div class="cta-solar-glow"></div>
      <div class="cta-title">Talk About Your<br/><span class="ch">Hydro</span> or <span class="cs">Solar</span><br/>Project</div>
      <p class="cta-desc">Whether you're building a new plant, upgrading an existing system, or looking for ongoing O&amp;M support - we're ready to help.</p>
      <div class="cta-acts"><a href="contact.html" class="btn btn-hydro btn-lg">Contact us</a><a href="mailto:sales@srilee.com" class="btn btn-ghost btn-lg">Email us -&gt;</a></div>
    </section>
  `;

  const solarTabsEl = document.getElementById("solarTabs");
  const solarFeatureBody = document.getElementById("solarFeatureBody");
  const solarImg = document.getElementById("solarImg");
  const renderSolarTab = (tabName) => {
    const data = renewableSolarTabs[tabName] || renewableSolarTabs.monitoring;
    if (solarImg) solarImg.src = data.image;
    if (solarFeatureBody) solarFeatureBody.innerHTML = `<div class="solar-feature-shell"><div class="solar-feature-kicker">${data.title}</div><div class="solar-feature-media">${(data.gallery || []).map((src, index) => `<div class="solar-feature-shot solar-shot-${index + 1}"><img src="${src}" alt="${data.title} view ${index + 1}" /></div>`).join("")}</div><p class="solar-feature-intro">${data.intro}</p><div class="solar-feature-grid">${data.cards.map(([title, desc]) => `<div class="solar-feature-card"><div class="solar-feature-title">${title}</div><div class="solar-feature-desc">${desc}</div></div>`).join("")}</div></div>`;
    solarTabsEl?.querySelectorAll(".stab").forEach((button) => {
      const active = button.dataset.tab === tabName;
      button.classList.toggle("active", active);
      button.setAttribute("aria-pressed", active ? "true" : "false");
    });
  };
  solarTabsEl?.querySelectorAll(".stab").forEach((button) => button.addEventListener("click", () => renderSolarTab(button.dataset.tab || "monitoring")));
  renderSolarTab(solarTabsEl?.querySelector(".stab.active")?.dataset.tab || "monitoring");

}

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
  ".feature-card, .resource-card, .price-card, .section, .logos, .cta, .reveal"
);

revealTargets.forEach((target) => {
  target.classList.add("fade");
  observer.observe(target);
});

const industrialTrainingTabs = document.getElementById("trainingTabs");

if (industrialTrainingTabs) {
  const trainingImg = document.getElementById("trainingImg");
  const trainingPoints = document.getElementById("trainingPoints");
  const trainingPills = document.getElementById("trainingPills");
  const trainingContent = {
    maintenance: {
      image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&q=80",
      points: [
        ["01", "Fault Diagnosis & Troubleshooting", "Practical techniques to identify root causes quickly using signal tracing and structured fault trees."],
        ["02", "Preventive Maintenance Planning", "Build inspection routines, lubrication schedules, and calibration cycles that extend equipment life."],
        ["03", "Rapid System Recovery", "Structured recovery playbooks to restore systems to operational state with minimum downtime."],
      ],
      pills: ["Daily checks", "Fault isolation", "CMMS basics"],
    },
    technical: {
      image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800&q=80",
      points: [
        ["01", "PLC / SCADA Basics", "Strengthen engineering know-how for daily control, logic, and upgrade work."],
        ["02", "System Modification", "Learn safe change handling for upgrades, alarms, and control logic revisions."],
        ["03", "Fault Review", "Use structured review methods to isolate issues faster and document fixes."],
      ],
      pills: ["PLC hands-on", "SCADA logic", "Loop checks"],
    },
    management: {
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80",
      points: [
        ["01", "System Overview", "Understand plant operation, reporting flows, and the operational picture at a glance."],
        ["02", "Data and Reporting", "Use data acquisition outputs and reports to support decisions and escalation."],
        ["03", "Shift Handover", "Improve coordination between shifts with clearer records and accountability."],
      ],
      pills: ["Shift readiness", "Operations view", "Escalation"],
    },
  };

  const setTrainingTab = (tabName) => {
    const data = trainingContent[tabName] || trainingContent.maintenance;
    industrialTrainingTabs.querySelectorAll(".training-tab").forEach((button) => {
      const active = button.dataset.tab === tabName;
      button.classList.toggle("active", active);
      button.setAttribute("aria-pressed", active ? "true" : "false");
    });

    if (trainingImg) {
      trainingImg.src = data.image;
    }

    if (trainingPoints) {
      trainingPoints.innerHTML = data.points
        .map(
          ([num, title, desc]) => `
              <div class="tp-item"><div class="tp-num">${num}</div><div><div class="tp-title">${title}</div><div class="tp-desc">${desc}</div></div></div>`
        )
        .join("");
    }

    if (trainingPills) {
      trainingPills.innerHTML = data.pills.map((pill) => `<span class="pill">${pill}</span>`).join("");
    }
  };

  industrialTrainingTabs.querySelectorAll(".training-tab").forEach((button) => {
    button.addEventListener("click", () => setTrainingTab(button.dataset.tab || "maintenance"));
  });

  setTrainingTab(industrialTrainingTabs.querySelector(".training-tab.active")?.dataset.tab || "maintenance");
}

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

