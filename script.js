// Edited From Github User: 

let slideIndex = 1;
showSlides(slideIndex);

setInterval(() => {
    showSlides(++slideIndex);
}, 5000);

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    const slides = document.getElementsByClassName("slide");
    const dots = document.getElementsByClassName("dot");

    if (n > slides.length) slideIndex = 1;
    if (n < 1) slideIndex = slides.length;

    Array.from(slides).forEach(slide => {
        slide.classList.remove("active");

        const text = slide.querySelector(".slide-text p");
        if (text) {
            text.style.animation = "none";
            text.classList.remove("animate__fadeInUp");
        }

        const img = slide.querySelector("img");
        if (img) {
            img.classList.remove("animate__zoomIn");
        }
    });

    Array.from(dots).forEach(dot => dot.classList.remove("active"));

    const activeSlide = slides[slideIndex - 1];
    const activeDot = dots[slideIndex - 1];
    activeSlide.classList.add("active");
    activeDot.classList.add("active");

    const activeText = activeSlide.querySelector(".slide-text p");
    if (activeText) {
        activeText.style.animation = "textSlideUp 0.5s ease-in-out forwards";
        activeText.classList.add("animate__animated", "animate__fadeInUp");
    }

    const activeImg = activeSlide.querySelector("img");
    if (activeImg) {
        activeImg.classList.add("animate__animated", "animate__zoomIn");
    }
}
function startCountdown() {
    const eventDate = new Date("2025-09-09T00:00:00").getTime();
    const daysEl = document.getElementById("days");
    const hoursEl = document.getElementById("hours");
    const minutesEl = document.getElementById("minutes");
    const secondsEl = document.getElementById("seconds");
    const statusEl = document.getElementById("event-status");

    const countdown = setInterval(() => {
        const now = Date.now();
        const distance = eventDate - now;

        if (distance < 0) {
            clearInterval(countdown);
            daysEl.textContent = hoursEl.textContent =
            minutesEl.textContent = secondsEl.textContent = "00";
            statusEl.textContent = "Event Started!";
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        daysEl.textContent = String(days).padStart(2, "0");
        hoursEl.textContent = String(hours).padStart(2, "0");
        minutesEl.textContent = String(minutes).padStart(2, "0");
        secondsEl.textContent = String(seconds).padStart(2, "0");
    }, 1000);
}
document.addEventListener("DOMContentLoaded", () => {
    startCountdown();

    const animatedElements = document.querySelectorAll("[data-animate]");
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const animation = entry.target.getAttribute("data-animate");
                entry.target.classList.add("animate__animated", `animate__${animation}`);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    animatedElements.forEach(el => observer.observe(el));
});
