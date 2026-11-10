const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

if (menuToggle && navMenu) {

    menuToggle.addEventListener("click", () => {
        const isOpen = navMenu.classList.toggle("show");

        menuToggle.setAttribute("aria-expanded", isOpen);
    });

    navMenu.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            navMenu.classList.remove("show");
            menuToggle.setAttribute("aria-expanded", "false");
        });
    });

}



const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll("#navMenu a");

function updateActiveLink() {

    let currentSection = "home";

    const marker = window.scrollY + 140;

    sections.forEach(section => {

        const sectionTop =
            section.getBoundingClientRect().top + window.scrollY;

        if (marker >= sectionTop) {
            currentSection = section.id;
        }

    });

    const pageBottom =
        window.scrollY + window.innerHeight;

    const documentHeight =
        document.documentElement.scrollHeight;

    if (pageBottom >= documentHeight - 5) {
        currentSection = "contact";
    }

    navLinks.forEach(link => {

        const isActive =
            link.getAttribute("href") === `#${currentSection}`;

        link.classList.toggle("active", isActive);

        if (isActive) {
            link.setAttribute("aria-current", "location");
        } else {
            link.removeAttribute("aria-current");
        }

    });

}


window.addEventListener("scroll", updateActiveLink, {
    passive: true
});

window.addEventListener("load", updateActiveLink);

window.addEventListener("resize", updateActiveLink);

updateActiveLink();



const portfolioImages = document.querySelectorAll(
    ".about-photo, .project-image, .achievement-card img, .certificate-card img"
);

const lightbox = document.createElement("div");

lightbox.className = "lightbox";
lightbox.setAttribute("role", "dialog");
lightbox.setAttribute("aria-modal", "true");
lightbox.setAttribute("aria-label", "Enlarged image");

lightbox.innerHTML = `
    <button class="lightbox-close" aria-label="Close enlarged image">
        &times;
    </button>
    <img class="lightbox-image" src="" alt="">
`;

document.body.appendChild(lightbox);

const lightboxImage = lightbox.querySelector(".lightbox-image");
const lightboxClose = lightbox.querySelector(".lightbox-close");

portfolioImages.forEach(image => {

    image.addEventListener("click", () => {

        lightboxImage.src = image.src;
        lightboxImage.alt = image.alt;

        lightbox.classList.add("show");
        document.body.style.overflow = "hidden";

        lightboxClose.focus();

    });

});

function closeLightbox() {

    lightbox.classList.remove("show");
    lightboxImage.src = "";
    document.body.style.overflow = "";

}

lightboxClose.addEventListener("click", closeLightbox);

lightbox.addEventListener("click", event => {

    if (event.target === lightbox) {
        closeLightbox();
    }

});

document.addEventListener("keydown", event => {

    if (event.key === "Escape" && lightbox.classList.contains("show")) {
        closeLightbox();
    }

});
