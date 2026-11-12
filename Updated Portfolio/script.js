/* =========================================
   MOBILE NAVIGATION
========================================= */

const menuToggle = document.getElementById("menu-toggle");
const mainNav = document.getElementById("main-nav");

if (menuToggle && mainNav) {

    // Open and close the mobile menu
    menuToggle.addEventListener("click", () => {

        const isOpen = mainNav.classList.toggle("active");

        menuToggle.setAttribute("aria-expanded", String(isOpen));

        const menuIcon = menuToggle.querySelector("ion-icon");

        if (menuIcon) {
            menuIcon.setAttribute(
                "name",
                isOpen ? "close-outline" : "menu-outline"
            );
        }
    });

    // Close the mobile menu after clicking a link
    mainNav.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", () => {

            mainNav.classList.remove("active");

            menuToggle.setAttribute("aria-expanded", "false");

            const menuIcon = menuToggle.querySelector("ion-icon");

            if (menuIcon) {
                menuIcon.setAttribute("name", "menu-outline");
            }
        });
    });
}
// Words that will be typed in the home section
const words = ["Student", "Developer", "Gamer"];

// The empty <span> inside <h3 class="typing-text">
const typingSpan = document.querySelector(".typing-text span");

let wordIndex = 0;      // which word we're on
let letterIndex = 0;    // how many letters are showing
let isDeleting = false; // are we typing or erasing?

function typeNextLetter() {
    const currentWord = words[wordIndex];

    // Add or remove one letter
    if (isDeleting) {
        letterIndex--;
    } else {
        letterIndex++;
    }

    // Show the letters typed so far
    typingSpan.textContent = currentWord.substring(0, letterIndex);

    let speed = isDeleting ? 60 : 120; // erasing is faster than typing

    if (!isDeleting && letterIndex === currentWord.length) {
        // Finished typing the word: pause, then start erasing
        isDeleting = true;
        speed = 1500;
    } else if (isDeleting && letterIndex === 0) {
        // Finished erasing: move on to the next word
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        speed = 400;
    }

    setTimeout(typeNextLetter, speed);
}

typeNextLetter();

/* =========================================
   ACTIVE SIDEBAR HIGHLIGHTING
========================================= */

const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll("#main-nav a");


// Function to highlight the active navigation link
function setActiveLink(sectionId) {

    navLinks.forEach(link => {

        const href = link.getAttribute("href");

        const targetId = href.includes("#")
            ? href.split("#").pop()
            : "home";

        link.classList.toggle("active", targetId === sectionId);
    });
}


// Highlight the clicked navigation link immediately
navLinks.forEach(link => {

    link.addEventListener("click", () => {

        const href = link.getAttribute("href");

        const targetId = href.includes("#")
            ? href.split("#").pop()
            : "home";

        setActiveLink(targetId);
    });
});


// Automatically update the active link while scrolling
const sectionObserver = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {
            setActiveLink(entry.target.id);
        }

    });

}, {
    rootMargin: "-25% 0px -55% 0px",
    threshold: 0
});


// Observe every section
sections.forEach(section => {
    sectionObserver.observe(section);
});


// Set the initial active link
if (window.location.hash) {

    setActiveLink(window.location.hash.substring(1));

} else {

    setActiveLink("home");
}


/* =========================================
   AUTOMATIC FOOTER YEAR
========================================= */

const footerYear = document.getElementById("current-year");

if (footerYear) {
    footerYear.textContent = new Date().getFullYear();
}