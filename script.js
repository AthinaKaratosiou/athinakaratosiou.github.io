/* =========================================================
   ATHINA KARATOSIOU
   EDITORIAL PORTFOLIO — INTERACTIONS
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const prefersReducedMotion =
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const header =
        document.querySelector(".site-header");

    const navLinks =
        document.querySelectorAll('.nav-links a[href^="#"]');

    const sections =
        document.querySelectorAll("main section[id]");


    /* =====================================================
       1. CURRENT YEAR
    ===================================================== */

    const year =
        document.getElementById("year");

    if (year) {
        year.textContent =
            new Date().getFullYear();
    }


    /* =====================================================
       2. HERO ENTRANCE
    ===================================================== */

    if (!prefersReducedMotion) {

        const heroMeta =
            document.querySelector(".hero-meta");

        const heroTitle =
            document.querySelector(".hero h1");

        const heroBottom =
            document.querySelector(".hero-bottom");

        const heroLinks =
            document.querySelector(".hero-links");


        const animateIn = (
            element,
            delay = 0,
            distance = 24
        ) => {

            if (!element) return;

            element.animate(
                [
                    {
                        opacity: 0,
                        transform:
                            `translateY(${distance}px)`
                    },
                    {
                        opacity: 1,
                        transform:
                            "translateY(0)"
                    }
                ],
                {
                    duration: 900,
                    delay,
                    easing:
                        "cubic-bezier(.22,1,.36,1)",
                    fill: "both"
                }
            );
        };


        animateIn(heroMeta, 100, 12);
        animateIn(heroTitle, 180, 30);
        animateIn(heroBottom, 350, 24);
        animateIn(heroLinks, 500, 18);

    }


    /* =====================================================
       3. REVEAL ON SCROLL
    ===================================================== */

    const revealElements =
        document.querySelectorAll(
            `
            .section-heading,
            .project-row,
            .profile-large,
            .profile-columns,
            .thesis-layout,
            .research-intro,
            .journal-row,
            .timeline-row,
            .skills-header,
            .skill-row,
            .credential,
            .languages-list > div
            `
        );


    if (!prefersReducedMotion) {

        revealElements.forEach((element) => {

            element.style.opacity = "0";

            element.style.transform =
                "translateY(28px)";
        });


        const observer =
            new IntersectionObserver(
                (entries, observerInstance) => {

                    entries.forEach((entry) => {

                        if (!entry.isIntersecting) {
                            return;
                        }

                        entry.target.animate(
                            [
                                {
                                    opacity: 0,
                                    transform:
                                        "translateY(28px)"
                                },
                                {
                                    opacity: 1,
                                    transform:
                                        "translateY(0)"
                                }
                            ],
                            {
                                duration: 760,
                                easing:
                                    "cubic-bezier(.22,1,.36,1)",
                                fill: "forwards"
                            }
                        );

                        observerInstance.unobserve(
                            entry.target
                        );

                    });

                },
                {
                    threshold: 0.12,
                    rootMargin:
                        "0px 0px -45px 0px"
                }
            );


        revealElements.forEach((element) => {
            observer.observe(element);
        });

    } else {

        revealElements.forEach((element) => {

            element.style.opacity = "1";
            element.style.transform = "none";

        });

    }


    /* =====================================================
       4. SMOOTH INTERNAL LINKS
    ===================================================== */

    document
        .querySelectorAll('a[href^="#"]')
        .forEach((link) => {

            link.addEventListener(
                "click",
                function (event) {

                    const href =
                        this.getAttribute("href");

                    if (
                        !href ||
                        href === "#"
                    ) {
                        return;
                    }

                    const target =
                        document.querySelector(href);

                    if (!target) {
                        return;
                    }

                    event.preventDefault();

                    const headerHeight =
                        header
                            ? header.offsetHeight
                            : 0;

                    const targetPosition =
                        target
                            .getBoundingClientRect()
                            .top +
                        window.scrollY -
                        headerHeight -
                        18;


                    window.scrollTo({
                        top: targetPosition,
                        behavior:
                            prefersReducedMotion
                                ? "auto"
                                : "smooth"
                    });

                }
            );

        });


    /* =====================================================
       5. HEADER SCROLL EFFECT
    ===================================================== */

    let lastScrollY =
        window.scrollY;


    const updateHeader = () => {

        if (!header) return;

        const currentScrollY =
            window.scrollY;


        if (currentScrollY > 80) {

            header.style.boxShadow =
                "0 8px 35px rgba(17,19,15,.045)";

        } else {

            header.style.boxShadow =
                "none";

        }


        /*
         Slight hide/reveal behaviour,
         only after user has scrolled down.
        */

        if (
            currentScrollY > lastScrollY &&
            currentScrollY > 180 &&
            window.innerWidth > 900
        ) {

            header.style.transform =
                "translateY(-100%)";

        } else {

            header.style.transform =
                "translateY(0)";

        }


        header.style.transition =
            "transform .45s cubic-bezier(.22,1,.36,1), box-shadow .3s ease";


        lastScrollY =
            currentScrollY;

    };


    window.addEventListener(
        "scroll",
        updateHeader,
        { passive: true }
    );


    /* =====================================================
       6. ACTIVE NAVIGATION
    ===================================================== */

    const updateActiveNavigation = () => {

        let activeId = "";


        sections.forEach((section) => {

            const rect =
                section.getBoundingClientRect();

            if (
                rect.top <= 170 &&
                rect.bottom >= 170
            ) {

                activeId =
                    section.id;

            }

        });


        navLinks.forEach((link) => {

            const href =
                link.getAttribute("href");

            if (
                activeId &&
                href === `#${activeId}`
            ) {

                link.style.opacity = "1";
                link.style.fontWeight = "600";

            } else {

                link.style.opacity = ".62";
                link.style.fontWeight = "400";

            }

        });

    };


    window.addEventListener(
        "scroll",
        updateActiveNavigation,
        { passive: true }
    );

    updateActiveNavigation();


    /* =====================================================
       7. MOBILE MENU
    ===================================================== */

    const navContainer =
        document.querySelector(".nav-container");

    const navList =
        document.querySelector(".nav-links");


    if (
        navContainer &&
        navList
    ) {

        const menuButton =
            document.createElement("button");


        menuButton.className =
            "editorial-menu-button";

        menuButton.type =
            "button";

        menuButton.setAttribute(
            "aria-label",
            "Open navigation"
        );

        menuButton.setAttribute(
            "aria-expanded",
            "false"
        );


        menuButton.innerHTML = `
            <span></span>
            <span></span>
        `;


        navContainer.appendChild(
            menuButton
        );


        Object.assign(
            menuButton.style,
            {
                display: "none",
                position: "absolute",
                right: "0",
                width: "42px",
                height: "42px",
                padding: "0",
                border: "1px solid rgba(17,19,15,.24)",
                borderRadius: "50%",
                background: "#f2f0e9",
                cursor: "pointer",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                gap: "6px",
                zIndex: "1100"
            }
        );


        const lines =
            menuButton.querySelectorAll("span");


        lines.forEach((line) => {

            Object.assign(
                line.style,
                {
                    display: "block",
                    width: "16px",
                    height: "1px",
                    background: "#11130f",
                    transition:
                        "transform .35s cubic-bezier(.22,1,.36,1)"
                }
            );

        });


        const closeMenu = () => {

            menuButton.setAttribute(
                "aria-expanded",
                "false"
            );

            navList.removeAttribute(
                "data-mobile-open"
            );


            if (
                window.innerWidth <= 900
            ) {

                navList.style.display =
                    "none";

            }


            lines[0].style.transform =
                "none";

            lines[1].style.transform =
                "none";

        };


        const openMenu = () => {

            menuButton.setAttribute(
                "aria-expanded",
                "true"
            );

            navList.setAttribute(
                "data-mobile-open",
                "true"
            );


            Object.assign(
                navList.style,
                {
                    display: "flex",
                    position: "fixed",
                    inset: "70px 0 auto 0",
                    minHeight:
                        "calc(100vh - 70px)",
                    padding:
                        "65px 24px 45px",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    gap: "6px",
                    background: "#f2f0e9",
                    borderTop:
                        "1px solid rgba(17,19,15,.14)",
                    zIndex: "999"
                }
            );


            navList
                .querySelectorAll("a")
                .forEach((link) => {

                    Object.assign(
                        link.style,
                        {
                            display: "block",
                            padding:
                                "9px 0",
                            fontFamily:
                                '"Instrument Serif", Georgia, serif',
                            fontSize:
                                "clamp(2.5rem, 12vw, 4rem)",
                            lineHeight:
                                "1",
                            fontWeight:
                                "400",
                            opacity:
                                "1"
                        }
                    );

                });


            lines[0].style.transform =
                "translateY(3.5px) rotate(45deg)";

            lines[1].style.transform =
                "translateY(-3.5px) rotate(-45deg)";

        };


        menuButton.addEventListener(
            "click",
            () => {

                const expanded =
                    menuButton.getAttribute(
                        "aria-expanded"
                    ) === "true";


                if (expanded) {

                    closeMenu();

                } else {

                    openMenu();

                }

            }
        );


        navList
            .querySelectorAll("a")
            .forEach((link) => {

                link.addEventListener(
                    "click",
                    () => {

                        if (
                            window.innerWidth <= 900
                        ) {

                            closeMenu();

                        }

                    }
                );

            });


        const updateMobileMenu =
            () => {

                if (
                    window.innerWidth <= 900
                ) {

                    menuButton.style.display =
                        "flex";


                    if (
                        menuButton.getAttribute(
                            "aria-expanded"
                        ) !== "true"
                    ) {

                        navList.style.display =
                            "none";

                    }

                } else {

                    menuButton.style.display =
                        "none";

                    navList.removeAttribute(
                        "style"
                    );

                    navList
                        .querySelectorAll("a")
                        .forEach((link) => {
                            link.removeAttribute(
                                "style"
                            );
                        });

                    menuButton.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                    lines[0].style.transform =
                        "none";

                    lines[1].style.transform =
                        "none";

                }

            };


        updateMobileMenu();


        window.addEventListener(
            "resize",
            updateMobileMenu
        );

    }


    /* =====================================================
       8. SUBTLE PROJECT INTERACTION
    ===================================================== */

    const projectRows =
        document.querySelectorAll(
            ".project-row"
        );


    projectRows.forEach((row) => {

        const number =
            row.querySelector(
                ".project-number"
            );


        if (!number) return;


        row.addEventListener(
            "mouseenter",
            () => {

                if (
                    prefersReducedMotion
                ) {
                    return;
                }

                number.animate(
                    [
                        {
                            transform:
                                "translateY(0)",
                            opacity: 0.55
                        },
                        {
                            transform:
                                "translateY(-4px)",
                            opacity: 1
                        }
                    ],
                    {
                        duration: 350,
                        easing:
                            "cubic-bezier(.22,1,.36,1)",
                        fill: "forwards"
                    }
                );

            }
        );


        row.addEventListener(
            "mouseleave",
            () => {

                number.style.transform =
                    "translateY(0)";

                number.style.opacity =
                    "";

            }
        );

    });


    /* =====================================================
       9. EXTERNAL LINK SECURITY
    ===================================================== */

    document
        .querySelectorAll(
            'a[target="_blank"]'
        )
        .forEach((link) => {

            link.setAttribute(
                "rel",
                "noopener noreferrer"
            );

        });

});
