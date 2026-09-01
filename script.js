const navbar = document.getElementById("navbar");
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const backTop = document.getElementById("backTop");
const progressBar = document.getElementById("progressBar");

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", isOpen);
});

document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

function updateScrollUI() {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

  progressBar.style.width = `${progress}%`;
  navbar.classList.toggle("scrolled", scrollTop > 15);
  backTop.classList.toggle("show", scrollTop > 600);
}

window.addEventListener("scroll", updateScrollUI, { passive: true });
updateScrollUI();

backTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

document.getElementById("year").textContent = new Date().getFullYear();

/* =========================================
   CERTIFICATE LIGHTBOX
   ========================================= */

function openCertificate(button) {
  const image = button.getAttribute("data-image");
  const title = button.getAttribute("data-title");

  const lightbox = document.getElementById("certificateLightbox");
  const lightboxImage = document.getElementById("lightboxImage");
  const lightboxTitle = document.getElementById("lightboxTitle");

  lightboxImage.src = image;
  lightboxImage.alt = title;
  lightboxTitle.textContent = title;

  lightbox.classList.add("active");

  document.body.style.overflow = "hidden";
}


function closeCertificate() {
  const lightbox = document.getElementById("certificateLightbox");

  lightbox.classList.remove("active");

  document.body.style.overflow = "";

  setTimeout(() => {
    document.getElementById("lightboxImage").src = "";
  }, 300);
}


/* CLOSE WHEN CLICKING OUTSIDE */

document.getElementById("certificateLightbox").addEventListener("click", function(event) {

  if (event.target === this) {
    closeCertificate();
  }

});


/* CLOSE WITH ESC KEY */

document.addEventListener("keydown", function(event) {

  if (event.key === "Escape") {
    closeCertificate();
  }

});