const model=document.getElementById("modelRotator");
const toggle=document.getElementById("toggleSpin");
const icon=document.getElementById("spinIcon");
const label=document.getElementById("spinLabel");
const left=document.getElementById("turnLeft");
const right=document.getElementById("turnRight");
if(model&&toggle){
  toggle.addEventListener("click",()=>{
    const paused=model.classList.toggle("paused");
    icon.textContent=paused?"▶":"Ⅱ";
    label.textContent=paused?"PAUSED":"360° VIEW";
    toggle.setAttribute("aria-pressed",String(paused));
  });
}
if(left&&model)left.addEventListener("click",()=>{model.style.animationDirection="reverse";model.classList.remove("paused");});
if(right&&model)right.addEventListener("click",()=>{model.style.animationDirection="normal";model.classList.remove("paused");});
