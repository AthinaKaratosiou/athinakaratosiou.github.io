/* =========================================
   ATHINA KARATOSIOU — PORTFOLIO
   JavaScript
   ========================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================
       1. NAVBAR EFFECT ON SCROLL
       ===================================== */

    const navbar = document.querySelector(".navbar");

    const updateNavbar = () => {
        if (window.scrollY > 20) {
            navbar.style.boxShadow =
                "0 8px 30px rgba(0, 0, 0, 0.06)";
        } else {
            navbar.style.boxShadow = "none";
        }
    };

    updateNavbar();

    window.addEventListener("scroll", updateNavbar);



    /* =====================================
       2. REVEAL ANIMATIONS
       ===================================== */

    const revealElements = document.querySelectorAll(
        ".section, " +
        ".focus-card, " +
        ".project-card, " +
        ".experience-card, " +
        ".skill-group, " +
        ".research-box"
    );

    const prefersReducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

    if (!prefersReducedMotion) {

        const observer = new IntersectionObserver(
            (entries, observerInstance) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {

                        entry.target.animate(
                            [
                                {
                                    opacity: 0,
                                    transform: "translateY(28px)"
                                },
                                {
                                    opacity: 1,
                                    transform: "translateY(0)"
                                }
                            ],
                            {
                                duration: 650,
                                easing: "cubic-bezier(0.22, 1, 0.36, 1)",
                                fill: "both"
                            }
                        );

                        observerInstance.unobserve(
                            entry.target
                        );
                    }

                });

            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -40px 0px"
            }
        );

        revealElements.forEach((element) => {
            observer.observe(element);
        });

    }



    /* =====================================
       3. ACTIVE NAVIGATION SECTION
       ===================================== */

    const sections =
        document.querySelectorAll("main section[id]");

    const navLinks =
        document.querySelectorAll(
            '.nav-links a[href^="#"]'
        );

    const updateActiveNavigation = () => {

        let currentSection = "";

        sections.forEach((section) => {

            const sectionTop =
                section.offsetTop - 160;

            const sectionHeight =
                section.offsetHeight;

            if (
                window.scrollY >= sectionTop &&
                window.scrollY <
                    sectionTop + sectionHeight
            ) {
                currentSection =
                    section.getAttribute("id");
            }

        });

        navLinks.forEach((link) => {

            link.style.fontWeight = "500";
            link.style.color = "";

            if (
                link.getAttribute("href") ===
                `#${currentSection}`
            ) {
                link.style.fontWeight = "700";
                link.style.color = "#21382f";
            }

        });

    };

    window.addEventListener(
        "scroll",
        updateActiveNavigation
    );

    updateActiveNavigation();



    /* =====================================
       4. MOBILE NAVIGATION
       ===================================== */

    const navContainer =
        document.querySelector(".nav-container");

    const navList =
        document.querySelector(".nav-links");

    const mobileButton =
        document.createElement("button");

    mobileButton.className = "mobile-menu-button";

    mobileButton.setAttribute(
        "aria-label",
        "Open navigation menu"
    );

    mobileButton.setAttribute(
        "aria-expanded",
        "false"
    );

    mobileButton.innerHTML = `
        <span></span>
        <span></span>
        <span></span>
    `;

    navContainer.appendChild(mobileButton);


    /* Mobile menu button styles */

    Object.assign(
        mobileButton.style,
        {
            display: "none",
            width: "42px",
            height: "42px",
            padding: "0",
            border: "1px solid #deded7",
            borderRadius: "50%",
            background: "#ffffff",
            cursor: "pointer",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            gap: "4px"
        }
    );

    const buttonLines =
        mobileButton.querySelectorAll("span");

    buttonLines.forEach((line) => {

        Object.assign(
            line.style,
            {
                display: "block",
                width: "17px",
                height: "1.5px",
                background: "#171717",
                transition: "0.3s ease"
            }
        );

    });


    const updateMobileNavigation = () => {

        if (window.innerWidth <= 900) {

            mobileButton.style.display = "flex";

        } else {

            mobileButton.style.display = "none";

            navList.removeAttribute("style");

            mobileButton.setAttribute(
                "aria-expanded",
                "false"
            );

        }

    };

    updateMobileNavigation();

    window.addEventListener(
        "resize",
        updateMobileNavigation
    );


    mobileButton.addEventListener(
        "click",
        () => {

            const expanded =
                mobileButton.getAttribute(
                    "aria-expanded"
                ) === "true";

            mobileButton.setAttribute(
                "aria-expanded",
                String(!expanded)
            );

            if (!expanded) {

                Object.assign(
                    navList.style,
                    {
                        display: "flex",
                        position: "absolute",
                        top: "76px",
                        left: "20px",
                        right: "20px",
                        flexDirection: "column",
                        gap: "5px",
                        padding: "18px",
                        background: "#ffffff",
                        border: "1px solid #deded7",
                        borderRadius: "18px",
                        boxShadow:
                            "0 15px 45px rgba(0,0,0,0.08)"
                    }
                );

                navList
                    .querySelectorAll("a")
                    .forEach((link) => {

                        Object.assign(
                            link.style,
                            {
                                display: "block",
                                padding: "10px 8px"
                            }
                        );

                    });

                buttonLines[0].style.transform =
                    "translateY(5.5px) rotate(45deg)";

                buttonLines[1].style.opacity =
                    "0";

                buttonLines[2].style.transform =
                    "translateY(-5.5px) rotate(-45deg)";

            } else {

                navList.style.display = "none";

                buttonLines[0].style.transform =
                    "none";

                buttonLines[1].style.opacity =
                    "1";

                buttonLines[2].style.transform =
                    "none";

            }

        }
    );


    /* Close mobile menu after selection */

    navLinks.forEach((link) => {

        link.addEventListener("click", () => {

            if (window.innerWidth <= 900) {

                navList.style.display = "none";

                mobileButton.setAttribute(
                    "aria-expanded",
                    "false"
                );

                buttonLines[0].style.transform =
                    "none";

                buttonLines[1].style.opacity =
                    "1";

                buttonLines[2].style.transform =
                    "none";

            }

        });

    });



    /* =====================================
       5. SMOOTH INTERNAL NAVIGATION
       ===================================== */

    document
        .querySelectorAll('a[href^="#"]')
        .forEach((anchor) => {

            anchor.addEventListener(
                "click",
                function (event) {

                    const targetId =
                        this.getAttribute("href");

                    if (
                        !targetId ||
                        targetId === "#"
                    ) {
                        return;
                    }

                    const target =
                        document.querySelector(
                            targetId
                        );

                    if (!target) {
                        return;
                    }

                    event.preventDefault();

                    const navbarHeight = 76;

                    const position =
                        target.getBoundingClientRect().top +
                        window.pageYOffset -
                        navbarHeight;

                    window.scrollTo({
                        top: position,
                        behavior: "smooth"
                    });

                }
            );

        });



    /* =====================================
       6. CURRENT YEAR
       ===================================== */

    const footerParagraph =
        document.querySelector(
            ".footer-container p:first-child"
        );

    if (footerParagraph) {

        const currentYear =
            new Date().getFullYear();

        footerParagraph.textContent =
            `© ${currentYear} Athina Karatosiou`;

    }



    /* =====================================
       7. EXTERNAL LINKS SECURITY
       ===================================== */

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
