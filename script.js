document.addEventListener("DOMContentLoaded", () => {
    if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const techMeta = {
        python: { title: "PYTHON", systems: ["EV Anomaly Detection", "LLM Data Auditor"], focus: "ML pipelines, backend logic" },
        azureml: { title: "AZURE ML", systems: ["Predictive analytics deployment", "Experiment flow"], focus: "Model deployment and tracking" },
        pytorch: { title: "PYTORCH", systems: ["GRU autoencoder research", "Telemetry behavior modeling"], focus: "Deep learning experimentation" },
        rag: { title: "RAG", systems: ["Retrieval context layering", "Validation augmentation"], focus: "Contextual validation pipeline" },
        llm: { title: "LLM ORCHESTRATION", systems: ["Document inconsistency detection", "Voice-to-data transformation"], focus: "Prompt pipelines and orchestration" },
        streamlit: { title: "STREAMLIT", systems: ["Interactive analytics interfaces", "Rapid model demos"], focus: "Operational UI for data tools" },
        sql: { title: "SQL", systems: ["Telemetry querying", "Structured validation workflows"], focus: "Data shaping and querying" }
    };

    initHeroInteractions();
    initExperienceHorizontalScroll();
    initSectionModeSignals();
    initMetricInteractions();
    initInnovationHint();
    initProjectInteractions();
    initScrollVelocityAwareness();
    initTechStackRunway();
    initTechStackContextCard();
    initFloatingTechTerminal();
    initEducationBoot();
    initFooterInteractions();

    function initHeroInteractions() {
        const heroTitle = document.querySelector("#heroTitle");
        const heroRole = document.querySelector("#heroRole");
        const cue = document.querySelector("#heroScrollCue");
        const titleText = heroTitle?.textContent || "";

        if (heroTitle && titleText) {
            heroTitle.innerHTML = "";
            [...titleText].forEach((char) => {
                const span = document.createElement("span");
                span.className = "letter";
                span.textContent = char === " " ? "\u00A0" : char;
                heroTitle.appendChild(span);
            });
            gsap.to(heroTitle.querySelectorAll(".letter"), {
                opacity: 1,
                y: 0,
                stagger: 0.02,
                duration: 0.28
            });
        }
        if (heroRole) window.setTimeout(() => heroRole.classList.add("flicker"), 550);
        if (cue) {
            window.setTimeout(() => cue.classList.add("visible"), 1500);
            window.addEventListener("scroll", () => cue.classList.remove("visible"), { once: true });
        }
    }

    function initExperienceHorizontalScroll() {
        const section = document.querySelector("#experience");
        const track = document.querySelector(".experienceTrack");
        const panels = gsap.utils.toArray(".experiencePanel");
        const progress = document.querySelector("#experienceProgress");
        if (!section || !track || panels.length < 2 || reduceMotion || window.innerWidth <= 768) return;

        gsap.registerPlugin(ScrollTrigger);
        gsap.to(track, {
            x: () => -(track.scrollWidth - window.innerWidth),
            ease: "none",
            scrollTrigger: {
                trigger: section,
                pin: true,
                scrub: 1,
                anticipatePin: 1,
                start: "top top",
                end: () => `+=${track.scrollWidth - window.innerWidth}`,
                invalidateOnRefresh: true,
                onEnter: () => document.body.classList.add("inWorkHistory"),
                onLeave: () => document.body.classList.remove("inWorkHistory"),
                onEnterBack: () => document.body.classList.add("inWorkHistory"),
                onLeaveBack: () => document.body.classList.remove("inWorkHistory"),
                onUpdate: (self) => {
                    const idx = self.progress < 0.5 ? 1 : 2;
                    const bar = idx === 1 ? "██████░░░░░░" : "████████████";
                    if (progress) progress.textContent = `[ ${bar} ] 0${idx} / 02`;
                }
            }
        });
    }

    function initSectionModeSignals() {
        const techSection = document.querySelector("#tech-stack");
        const educationSection = document.querySelector("#education");
        gsap.registerPlugin(ScrollTrigger);
        if (techSection) {
            ScrollTrigger.create({
                trigger: techSection,
                start: "top 70%",
                end: "bottom 30%",
                onEnter: () => document.body.classList.add("inTechStack"),
                onEnterBack: () => document.body.classList.add("inTechStack"),
                onLeave: () => document.body.classList.remove("inTechStack"),
                onLeaveBack: () => document.body.classList.remove("inTechStack")
            });
        }
        if (educationSection) {
            ScrollTrigger.create({
                trigger: educationSection,
                start: "top 75%",
                end: "bottom 20%",
                onEnter: () => document.body.classList.add("inEducation"),
                onEnterBack: () => document.body.classList.add("inEducation"),
                onLeave: () => document.body.classList.remove("inEducation"),
                onLeaveBack: () => document.body.classList.remove("inEducation"),
                onUpdate: (self) => document.body.style.setProperty("--grid-shift", `${self.progress * -16}px`)
            });
        }
    }

    function initMetricInteractions() {
        document.querySelectorAll(".metricHighlight").forEach((metric) => {
            metric.title = metric.dataset.tip || "";
            if (!reduceMotion) {
                ScrollTrigger.create({
                    trigger: metric,
                    start: "top 82%",
                    once: true,
                    onEnter: () => gsap.fromTo(metric, { scale: 1 }, { scale: 1.06, duration: 0.22, yoyo: true, repeat: 1 })
                });
            }
        });
    }

    function initInnovationHint() {
        const hint = document.querySelector("#innovationHint");
        const triggers = document.querySelectorAll("#innovation .hintTrigger");
        if (!hint || triggers.length === 0) return;
        triggers.forEach((trigger) => {
            trigger.addEventListener("mouseenter", () => { hint.textContent = trigger.dataset.hint || ""; });
            trigger.addEventListener("mouseleave", () => { hint.textContent = ""; });
        });
    }

    function initProjectInteractions() {
        const target = document.querySelector("#projectTypingTarget");
        const expand = document.querySelector(".expandProject");
        const card = expand?.closest(".projectCard");
        const text = "Engineered an automated auditing system using LLM-driven evaluation pipelines to detect inconsistencies in complex datasets and documents.";
        if (target) {
            let i = 0;
            const type = () => {
                target.textContent = text.slice(0, i);
                i += 2;
                if (i <= text.length) window.setTimeout(type, 20);
            };
            type();
        }
        if (expand && card) expand.addEventListener("click", () => card.classList.toggle("expanded"));
    }

    function initTechStackRunway() {
        const runwayShell = document.querySelector("#runwayShell");
        const runway = document.querySelector("#logoRunway");
        const firstLane = document.querySelector(".logoLane");
        if (!runwayShell || !runway || !firstLane) return;

        let animationFrame = null;
        let offset = 0;
        let velocity = 0.45;
        let isPaused = false;
        let isDragging = false;
        let dragStartX = 0;
        let offsetAtDragStart = 0;
        const laneWidth = () => firstLane.getBoundingClientRect().width;

        function normalizeOffset() {
            const width = laneWidth();
            if (!width) return;
            offset = ((offset % width) + width) % width;
            offset = offset === 0 ? 0 : offset - width;
        }

        function step() {
            if (!isPaused && !isDragging && !reduceMotion) {
                offset -= velocity;
                normalizeOffset();
                runway.style.transform = `translate3d(${offset}px,0,0)`;
            }
            animationFrame = window.requestAnimationFrame(step);
        }

        runwayShell.addEventListener("mouseenter", () => { isPaused = true; });
        runwayShell.addEventListener("mouseleave", () => {
            isPaused = false;
            runwayShell.classList.remove("isDragging");
            isDragging = false;
        });
        runwayShell.addEventListener("pointerdown", (event) => {
            isDragging = true;
            isPaused = true;
            dragStartX = event.clientX;
            offsetAtDragStart = offset;
            runwayShell.classList.add("isDragging");
            runwayShell.setPointerCapture(event.pointerId);
        });
        runwayShell.addEventListener("pointermove", (event) => {
            if (!isDragging) return;
            offset = offsetAtDragStart + (event.clientX - dragStartX);
            normalizeOffset();
            runway.style.transform = `translate3d(${offset}px,0,0)`;
        });
        runwayShell.addEventListener("pointerup", (event) => {
            if (!isDragging) return;
            runwayShell.releasePointerCapture(event.pointerId);
            runwayShell.classList.remove("isDragging");
            isDragging = false;
            isPaused = false;
            normalizeOffset();
        });

        if (!reduceMotion) animationFrame = window.requestAnimationFrame(step);
        window.addEventListener("beforeunload", () => animationFrame && window.cancelAnimationFrame(animationFrame));
    }

    function initTechStackContextCard() {
        const title = document.querySelector("#contextTitle");
        const systems = document.querySelector("#contextSystems");
        const focus = document.querySelector("#contextFocus");
        const logoItems = document.querySelectorAll(".logoItem[data-tech]");
        if (!title || !systems || !focus || logoItems.length === 0) return;

        function updateContext(techKey) {
            const data = techMeta[techKey];
            if (!data) return;
            title.textContent = data.title;
            systems.innerHTML = data.systems.map((item) => `<li>${item}</li>`).join("");
            focus.textContent = `> Usage: ${data.focus}`;
        }

        logoItems.forEach((item) => {
            item.addEventListener("mouseenter", () => {
                logoItems.forEach((logo) => logo.classList.remove("isActive"));
                item.classList.add("isActive");
                updateContext(item.dataset.tech);
            });
            item.addEventListener("pointerdown", () => {
                logoItems.forEach((logo) => logo.classList.remove("isActive"));
                item.classList.add("isActive");
                updateContext(item.dataset.tech);
            });
        });
    }

    function initFloatingTechTerminal() {
        const floating = document.querySelector("#floatingTerminal");
        const items = document.querySelectorAll(".logoItem[data-tech]");
        if (!floating || items.length === 0) return;
        items.forEach((item) => {
            item.addEventListener("mouseenter", (event) => {
                const data = techMeta[item.dataset.tech];
                if (!data) return;
                floating.style.display = "block";
                floating.innerHTML = `<strong>${data.title}</strong><br><br>&gt; Systems:<br>${data.systems.join("<br>")}<br><br>&gt; Usage:<br>${data.focus}`;
                floating.style.left = `${event.clientX + 14}px`;
                floating.style.top = `${event.clientY + 14}px`;
            });
            item.addEventListener("mousemove", (event) => {
                floating.style.left = `${event.clientX + 14}px`;
                floating.style.top = `${event.clientY + 14}px`;
            });
            item.addEventListener("mouseleave", () => { floating.style.display = "none"; });
        });
    }

    function initEducationBoot() {
        const boot = document.querySelector("#educationBoot");
        if (!boot) return;
        const text = "INITIALIZING...\nLOADING ACADEMIC RECORDS...";
        let i = 0;
        boot.textContent = "";
        const type = () => {
            boot.textContent = text.slice(0, i);
            i += 1;
            if (i <= text.length) window.setTimeout(type, 28);
        };
        type();
    }

    function initFooterInteractions() {
        const email = document.querySelector("#footerEmail");
        const github = document.querySelector("#footerGithub");
        const signal = document.querySelector("#footerSignal");
        if (!email || !signal) return;
        email.addEventListener("mouseenter", () => { signal.textContent = "CLICK TO INITIATE CONTACT"; });
        email.addEventListener("mouseleave", () => { signal.textContent = ""; });
        email.addEventListener("click", (event) => {
            event.preventDefault();
            navigator.clipboard.writeText("jtarosh@gmail.com").then(() => {
                signal.textContent = "EMAIL COPIED TO CLIPBOARD";
                window.setTimeout(() => {
                    signal.textContent = "";
                    window.location.href = "mailto:jtarosh@gmail.com";
                }, 800);
            });
        });

        if (github) {
            github.addEventListener("mouseenter", () => {
                signal.textContent = "VIEW SOURCE CODE";
            });
            github.addEventListener("mouseleave", () => {
                signal.textContent = "";
            });
            github.addEventListener("click", (event) => {
                event.preventDefault();
                document.body.classList.add("redirecting");
                window.setTimeout(() => {
                    window.open(github.href, "_blank", "noopener");
                    document.body.classList.remove("redirecting");
                }, 220);
            });
        }
    }

    function initScrollVelocityAwareness() {
        let timer = null;
        window.addEventListener("wheel", (event) => {
            if (Math.abs(event.deltaY) > 55) {
                document.body.classList.add("fastScroll");
            } else {
                document.body.classList.remove("fastScroll");
            }
            if (timer) window.clearTimeout(timer);
            timer = window.setTimeout(() => {
                document.body.classList.remove("fastScroll");
            }, 200);
        }, { passive: true });
    }
});
