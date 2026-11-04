const model = document.getElementById("modelRotator");
const spinControl = document.getElementById("spinControl");
const printControl = document.getElementById("printResume");

if (model && spinControl) {
  spinControl.addEventListener("click", () => {
    const paused = model.classList.toggle("paused");
    spinControl.innerHTML = paused
      ? '<span>▶</span> RESUME ROTATION'
      : '<span>Ⅱ</span> PAUSE ROTATION';
    spinControl.setAttribute("aria-pressed", String(paused));
  });
}
if (printControl) printControl.addEventListener("click", () => window.print());

const revealTargets = document.querySelectorAll(
  ".about-column, .side-module, .project-card, .approach-steps > div"
);
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealTargets.forEach((item) => {
    item.classList.add("reveal");
    observer.observe(item);
  });
}