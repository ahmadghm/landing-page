/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

/**
 * Define Global Variables
 *
 */
const sectionsOfPage = document.querySelectorAll("section");
const navbar = document.querySelector("#navbar__list");
const mybutton = document.getElementById("myBtn");

/**
 * End Global Variables
 * Start Helper Functions
 *
 */
function viewPort(sect) {
    const bounding = sect.getBoundingClientRect();
    return bounding.top >= 0 && bounding.left >= 0 && bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) && bounding.right <= (window.innerWidth || document.documentElement.clientWidth);
}

/**
 * End Helper Functions
 * Begin Main Functions
 *
 */

// build the nav
function addnavs() {
    for (let index of sectionsOfPage) {
        let builder = document.createElement("li");
        builder.className = "menu__link";
        builder.dataset.nav = index.id;
        builder.innerText = index.dataset.nav;
        navbar.appendChild(builder);
    }
}

// Add class 'active' to section when near top of viewport

function activeSection() {
    for (let c = 0; c < sectionsOfPage.length; c++) {
        if (viewPort(sectionsOfPage[c])) {
            sectionsOfPage[c].classList.add("your-active-class");
        } else {
            sectionsOfPage[c].classList.remove("your-active-class");
        }
    }
}

// Scroll to anchor ID using scrollTO event
function clickScroll() {
    navbar.addEventListener("click", function (scrolling) {
        const whenClick = document.querySelector("#" + scrolling.target.dataset.nav);
        whenClick.scrollIntoView({ block: "start", behavior: "smooth" });
    });
}

//button
//Get the button

// When the user scrolls down
window.onscroll = function () {
    scrollFunction();
};

function scrollFunction() {
    if (document.body.scrollTop > 10 || document.documentElement.scrollTop > 10) {
        mybutton.style.display = "block";
    } else {
        mybutton.style.display = "none";
    }
}

//scroll to the top of the document
function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

//navbar hide when scrolling down and show again in top of the page

function hide() {
    const currentScroll = window.pageYOffset;
    let lastScroll = 0;
    //show in position top
    if (currentScroll <= 0) {
        navbar.classList.remove("hide");
        return;
    }

    if (currentScroll > lastScroll && !navbar.classList.contains("hide")) {
        // when scrollin is down
        navbar.classList.add("hide");
    }
    lastScroll = currentScroll;
}

/**
 * End Main Functions
 * Begin Events
 *
 */

// Build menu
addnavs();
// Scroll to section on link click
clickScroll();
// Set sections as active
document.addEventListener("scroll", function () {
    activeSection();
    hide();
});
