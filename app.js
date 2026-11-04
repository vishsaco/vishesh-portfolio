(() => {
  const printButton = document.querySelector("#printResume");
  printButton?.addEventListener("click", () => window.print());

  const revealItems = document.querySelectorAll(
    ".identity, .portrait-sticker, .bio-block, .tools-block, .resume-section, .timeline-item, .bilingual-skills li, .software, .work-card"
  );

  if (!("IntersectionObserver" in window) ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    revealItems.forEach(item => item.classList.add("is-visible"));
    document.querySelectorAll(".timeline").forEach(item => item.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.14, rootMargin: "0px 0px -20px 0px" });

  revealItems.forEach((item, index) => {
    item.style.transitionDelay = `${Math.min(index % 7, 6) * 65}ms`;
    observer.observe(item);
  });

  document.querySelectorAll(".timeline").forEach(item => observer.observe(item));

  const labels = document.querySelectorAll(".note-label");
  labels.forEach((label, index) => {
    label.style.animation = "noteIn .72s cubic-bezier(.2,.8,.2,1) both";
    label.style.animationDelay = `${180 + index * 110}ms`;
  });
})();