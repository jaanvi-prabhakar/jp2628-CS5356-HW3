document.addEventListener("DOMContentLoaded", function () {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll(".nav-links a");
    navLinks.forEach(link => {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            const targetId = this.getAttribute("href").substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 50,
                    behavior: "smooth"
                });
            }
        });
    });

    // Add animation to project cards on hover
    const projectCards = document.querySelectorAll(".project");
    projectCards.forEach(card => {
        card.addEventListener("mouseover", function () {
            this.style.transform = "scale(1.05)";
            this.style.boxShadow = "0 6px 15px rgba(0, 170, 255, 0.3)";
        });
        card.addEventListener("mouseout", function () {
            this.style.transform = "scale(1)";
            this.style.boxShadow = "0 4px 10px rgba(0, 0, 0, 0.3)";
        });
    });

    // Form submission handling
    const contactForm = document.querySelector(".contact form");
    if (contactForm) {
        contactForm.addEventListener("submit", function (e) {
            e.preventDefault();
            alert("Thank you for reaching out! I'll get back to you soon.");
            contactForm.reset();
        });
    }
});
