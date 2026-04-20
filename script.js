document.addEventListener("DOMContentLoaded", () => {
    if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const techMeta = {
        python: {
            title: "PYTHON",
            where: "Used in EV anomaly detection, LLM data auditor, and voice-to-data assistant backends.",
            focus: "Role: Core language for ML pipelines and backend logic."
        },
        azureml: {
            title: "AZURE ML",
            where: "Used in the Canary AI predictive analytics deployment workflow.",
            focus: "Role: Experiment tracking, model packaging, and cloud deployment."
        },
        pandas: {
            title: "PANDAS",
            where: "Used for tabular preprocessing, exploratory analysis, and dataset shaping.",
            focus: "Role: Data cleaning, wrangling, and analysis workflows."
        },
        pytorch: {
            title: "PYTORCH",
            where: "Used for GRU autoencoder training on electric two-wheeler telemetry.",
            focus: "Role: Deep learning model development and validation."
        },
        rag: {
            title: "RAG",
            where: "Used inside the automated data auditor to ground checks on source context.",
            focus: "Role: Retrieval layer for reliable LLM outputs."
        },
        llm: {
            title: "LLM ORCHESTRATION",
            where: "Used in both the LLM auditor and voice command structuring assistant.",
            focus: "Role: Prompt workflows and inference routing."
        },
        streamlit: {
            title: "STREAMLIT",
            where: "Used for internal analytics demos and quick operator-facing interfaces.",
            focus: "Role: Fast UI layer for AI and data tools."
        },
        sql: {
            title: "SQL",
            where: "Used in telemetry analysis and structured validation routines.",
            focus: "Role: Querying, filtering, and shaping relational data."
        }
    };

    initCustomCursor();
    initHeroInteractions();
    initExperienceHorizontalScroll();
    initSectionModeSignals();
    initMetricInteractions();
    initInnovationHint();
    initProjectInteractions();
    initScrollVelocityAwareness();
    initTechStackCubes();
    initEducationBoot();
    initFooterInteractions();

    function initCustomCursor() {
        const supportsFinePointer = window.matchMedia("(pointer: fine)").matches;
        if (!supportsFinePointer) return;

        const dot = document.querySelector("#customCursorDot");
        const ring = document.querySelector("#customCursorRing");
        if (!dot || !ring) return;

        document.body.classList.add("customCursorOn");

        let mouseX = window.innerWidth * 0.5;
        let mouseY = window.innerHeight * 0.5;
        let ringX = mouseX;
        let ringY = mouseY;
        let cursorRaf = null;

        const moveCursor = () => {
            ringX += (mouseX - ringX) * 0.18;
            ringY += (mouseY - ringY) * 0.18;
            dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
            ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
            cursorRaf = window.requestAnimationFrame(moveCursor);
        };

        cursorRaf = window.requestAnimationFrame(moveCursor);

        const interactiveSelector = "a, button, .techCube, .projectCard, [role='button']";
        const interactiveElements = document.querySelectorAll(interactiveSelector);

        const activate = () => document.body.classList.add("cursorActive");
        const deactivate = () => document.body.classList.remove("cursorActive");

        interactiveElements.forEach((element) => {
            element.addEventListener("mouseenter", activate);
            element.addEventListener("mouseleave", deactivate);
            element.addEventListener("focus", activate);
            element.addEventListener("blur", deactivate);
        });

        document.addEventListener("mousemove", (event) => {
            mouseX = event.clientX;
            mouseY = event.clientY;
        });

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

    function initTechStackCubes() {
        const cubes = document.querySelectorAll(".techCube[data-tech]");
        const dialogue = document.querySelector("#techDialogue");
        const title = document.querySelector("#techDialogueTitle");
        const where = document.querySelector("#techDialogueWhere");
        const focus = document.querySelector("#techDialogueFocus");
        if (cubes.length === 0 || !dialogue || !title || !where || !focus) return;

        const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

        const cubeStates = [...cubes].map((cube) => {
            const body = cube.querySelector(".techCubeBody");
            if (!body) return null;
            const logo = cube.dataset.logo || "";
            const label = cube.dataset.label || "";

            cube.setAttribute("aria-label", `${label} technology cube`);

            cube.querySelectorAll(".cubeFace").forEach((face) => {
                face.innerHTML = `<span class="cubeContent"><img src="${logo}" alt=""><span class="mono">${label}</span></span>`;
            });

            const delay = Number.parseFloat(getComputedStyle(cube).getPropertyValue("--cube-delay")) || 0;
            return {
                cube,
                body,
                baseX: -16,
                baseY: 18 + delay * 12,
                baseZ: 0,
                baseMoveX: 0,
                baseMoveY: 0,
                spinSpeed: 0.05 + Math.random() * 0.03,
                dragRotateX: 0,
                dragRotateY: 0,
                dragMoveX: 0,
                dragMoveY: 0,
                dragging: false,
                hovered: false,
                pointerStartX: 0,
                pointerStartY: 0
            };
        }).filter(Boolean);

        const setDialoguePosition = (x, y) => {
            const pad = 14;
            const maxLeft = window.innerWidth - dialogue.offsetWidth - 8;
            const maxTop = window.innerHeight - dialogue.offsetHeight - 8;
            dialogue.style.left = `${clamp(x + pad, 8, maxLeft)}px`;
            dialogue.style.top = `${clamp(y + pad, 8, maxTop)}px`;
        };

        const showDialogue = (cube, clientX, clientY) => {
            const data = techMeta[cube.dataset.tech];
            if (!data) return;
            title.textContent = data.title;
            where.textContent = data.where;
            focus.textContent = data.focus;
            dialogue.style.display = "block";
            dialogue.setAttribute("aria-hidden", "false");
            setDialoguePosition(clientX, clientY);
        };

        const hideDialogue = () => {
            dialogue.style.display = "none";
            dialogue.setAttribute("aria-hidden", "true");
        };

        cubeStates.forEach((state) => {
            const { cube } = state;
            cube.addEventListener("mouseenter", (event) => {
                state.hovered = true;
                showDialogue(cube, event.clientX, event.clientY);
            });

            cube.addEventListener("mousemove", (event) => {
                setDialoguePosition(event.clientX, event.clientY);
            });

            cube.addEventListener("mouseleave", () => {
                state.hovered = false;
                hideDialogue();
            });

            cube.addEventListener("focus", () => {
                const rect = cube.getBoundingClientRect();
                showDialogue(cube, rect.right - 10, rect.top + 12);
            });

            cube.addEventListener("blur", hideDialogue);

            cube.addEventListener("pointerdown", (event) => {
                state.dragging = true;
                state.pointerStartX = event.clientX;
                state.pointerStartY = event.clientY;
                cube.classList.add("isDragging");
                cube.setPointerCapture(event.pointerId);
            });

            cube.addEventListener("pointermove", (event) => {
                if (!state.dragging) return;
                const dx = event.clientX - state.pointerStartX;
                const dy = event.clientY - state.pointerStartY;

                state.dragMoveX = clamp(dx * 0.16, -18, 18);
                state.dragMoveY = clamp(dy * 0.16, -18, 18);
                state.dragRotateY = clamp(dx * 0.28, -42, 42);
                state.dragRotateX = clamp(-dy * 0.24, -36, 36);

                setDialoguePosition(event.clientX, event.clientY);
            });

            const endDrag = (event) => {
                if (!state.dragging) return;
                state.dragging = false;
                cube.classList.remove("isDragging");
                if (event.pointerId !== undefined && cube.hasPointerCapture(event.pointerId)) {
                    cube.releasePointerCapture(event.pointerId);
                }

                // Keep the user-edited orientation and drag offset as the new resting state.
                state.baseX += state.dragRotateX;
                state.baseY += state.dragRotateY;
                state.baseMoveX = clamp(state.baseMoveX + state.dragMoveX, -22, 22);
                state.baseMoveY = clamp(state.baseMoveY + state.dragMoveY, -22, 22);
                state.dragRotateX = 0;
                state.dragRotateY = 0;
                state.dragMoveX = 0;
                state.dragMoveY = 0;
                if (!state.hovered) hideDialogue();
            };

            cube.addEventListener("pointerup", endDrag);
            cube.addEventListener("pointercancel", endDrag);
        });

        let rafId = null;
        let lastTime = performance.now();

        const animateCubes = (now) => {
            const dt = Math.max(now - lastTime, 16);
            lastTime = now;

            cubeStates.forEach((state) => {
                if (!state.hovered && !state.dragging && !reduceMotion) {
                    state.baseY += state.spinSpeed * (dt / 16);
                }

                state.body.style.transform = `translate3d(${state.baseMoveX + state.dragMoveX}px, ${state.baseMoveY + state.dragMoveY}px, 0px) rotateX(${state.baseX + state.dragRotateX}deg) rotateY(${state.baseY + state.dragRotateY}deg) rotateZ(${state.baseZ}deg)`;
            });

            rafId = window.requestAnimationFrame(animateCubes);
        };

        rafId = window.requestAnimationFrame(animateCubes);
        window.addEventListener("beforeunload", () => {
            if (rafId) window.cancelAnimationFrame(rafId);
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
