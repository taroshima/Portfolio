document.addEventListener("DOMContentLoaded", () => {
    if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    initCustomCursor();
    initHeroInteractions();
    initExperienceTimeline();
    initSectionModeSignals();
    initMetricInteractions();
    initInnovationHint();
    initProjectInteractions();
    initScrollVelocityAwareness();
    initEducationBoot();
    initFooterInteractions();

    function initCustomCursor() {
        const supportsFinePointer = window.matchMedia("(pointer: fine)").matches;
        if (!supportsFinePointer) return;

        const dot = document.querySelector("#customCursorDot");
        const ring = document.querySelector("#customCursorRing");
        const grid = document.querySelector(".grid-layer");
        if (!dot || !ring) return;

        document.documentElement.classList.add("customCursorOn");
        document.body.classList.add("customCursorOn");
        document.documentElement.style.cursor = "none";
        document.body.style.cursor = "none";

        let mouseX = window.innerWidth * 0.5;
        let mouseY = window.innerHeight * 0.5;
        let dotX = mouseX;
        let dotY = mouseY;
        let ringX = mouseX;
        let ringY = mouseY;
        let ringScale = 1;
        let cursorRaf = null;
        let lastGridCell = "";
        let lastGridPoint = null;

        const moveCursor = () => {
            const dotEase = reduceMotion ? 1 : 0.72;
            const ringEase = reduceMotion ? 1 : 0.36;
            const targetScale = document.body.classList.contains("cursorDown")
                ? 0.82
                : document.body.classList.contains("cursorActive")
                    ? 1.3
                    : 1;

            dotX += (mouseX - dotX) * dotEase;
            dotY += (mouseY - dotY) * dotEase;
            ringX += (mouseX - ringX) * ringEase;
            ringY += (mouseY - ringY) * ringEase;
            ringScale += (targetScale - ringScale) * 0.35;

            if (Math.abs(mouseX - dotX) < 0.1) dotX = mouseX;
            if (Math.abs(mouseY - dotY) < 0.1) dotY = mouseY;
            if (Math.abs(mouseX - ringX) < 0.1) ringX = mouseX;
            if (Math.abs(mouseY - ringY) < 0.1) ringY = mouseY;
            if (Math.abs(targetScale - ringScale) < 0.01) ringScale = targetScale;

            dot.style.transform = `translate3d(${dotX}px, ${dotY}px, 0)`;
            ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) scale(${ringScale})`;
            cursorRaf = window.requestAnimationFrame(moveCursor);
        };

        cursorRaf = window.requestAnimationFrame(moveCursor);

        const interactiveSelector = "a, button, .projectCard, [role='button']";
        const interactiveElements = document.querySelectorAll(interactiveSelector);

        const activate = () => document.body.classList.add("cursorActive");
        const deactivate = () => document.body.classList.remove("cursorActive");

        const updateGridHover = () => {
            if (!grid) return;

            const styles = window.getComputedStyle(grid);
            const gridSize = Number.parseFloat(styles.backgroundSize) || 56;
            const gridShift = Number.parseFloat(window.getComputedStyle(document.body).getPropertyValue("--grid-shift")) || 0;
            const gridX = Math.floor(mouseX / gridSize) * gridSize;
            const gridY = Math.floor((mouseY - gridShift) / gridSize) * gridSize;
            const gridCell = `${gridX}:${gridY}:${gridSize}`;

            grid.style.setProperty("--grid-hover-size", `${gridSize}px`);

            if (gridCell === lastGridCell || reduceMotion) return;

            const addTrailCell = (x, y) => {
                const cell = `${x}:${y}:${gridSize}`;
                if (cell === lastGridCell) return;
                lastGridCell = cell;

                const trail = document.createElement("span");
                trail.className = "gridTrailCell";
                trail.style.left = `${x}px`;
                trail.style.top = `${y + gridShift}px`;
                trail.style.width = `${gridSize}px`;
                trail.style.height = `${gridSize}px`;
                grid.appendChild(trail);

                trail.addEventListener("animationend", () => trail.remove(), { once: true });
            };

            if (!lastGridPoint) {
                addTrailCell(gridX, gridY);
                lastGridPoint = { x: gridX, y: gridY };
                return;
            }

            const dx = gridX - lastGridPoint.x;
            const dy = gridY - lastGridPoint.y;
            const steps = Math.max(Math.abs(dx), Math.abs(dy)) / gridSize;

            for (let step = 1; step <= steps; step += 1) {
                const x = Math.round((lastGridPoint.x + (dx * step) / steps) / gridSize) * gridSize;
                const y = Math.round((lastGridPoint.y + (dy * step) / steps) / gridSize) * gridSize;
                addTrailCell(x, y);
            }

            lastGridPoint = { x: gridX, y: gridY };
        };

        interactiveElements.forEach((element) => {
            element.addEventListener("mouseenter", activate);
            element.addEventListener("mouseleave", deactivate);
            element.addEventListener("focus", activate);
            element.addEventListener("blur", deactivate);
        });

        document.addEventListener("pointermove", (event) => {
            mouseX = event.clientX;
            mouseY = event.clientY;
            updateGridHover();
            document.body.classList.add("cursorVisible");
        }, { passive: true });

        document.addEventListener("mouseenter", () => {
            document.body.classList.add("cursorVisible");
        });

        document.addEventListener("mouseleave", () => {
            document.body.classList.remove("cursorVisible");
            document.body.classList.remove("cursorActive");
        });

        document.addEventListener("mousedown", () => {
            document.body.classList.add("cursorDown");
        });

        document.addEventListener("mouseup", () => {
            document.body.classList.remove("cursorDown");
        });

        window.addEventListener("beforeunload", () => {
            if (cursorRaf) window.cancelAnimationFrame(cursorRaf);
        });
    }

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

    function initExperienceTimeline() {
        const section = document.querySelector("#experience");
        if (!section) return;

        gsap.registerPlugin(ScrollTrigger);
        ScrollTrigger.create({
            trigger: section,
            start: "top 70%",
            end: "bottom 30%",
            onEnter: () => document.body.classList.add("inWorkHistory"),
            onLeave: () => document.body.classList.remove("inWorkHistory"),
            onEnterBack: () => document.body.classList.add("inWorkHistory"),
            onLeaveBack: () => document.body.classList.remove("inWorkHistory")
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
