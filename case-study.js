(() => {
const studies = {
  watch: {
    name:"TOO MUCH TO WATCH", eyebrow:"01 / EDITORIAL IDENTITY", subtitle:"A festival identity for the age of endless watching.",
    intro:"A self-initiated concept for an independent film, streaming and screen-culture festival. The visual system turns the feeling of having too much to watch into something energetic, playful and easy to recognise.",
    type:"Festival identity / concept study", role:"Art direction, graphic design", scope:"Print, social, event touchpoints",
    image:"project-1.svg",alt:"Too Much To Watch concept board showing the festival poster, ticket, programme booklet, social tiles, tote and wayfinding.",caption:"THE IDENTITY IN USE / CONCEPT APPLICATION BOARD",
    briefTitle:"Make the overload feel exciting.",
    brief:"The creative challenge was to build a recognisable festival world around a familiar screen-culture feeling: too many films, shows and things competing for our attention. Instead of treating that overload as a problem, the concept embraces it with oversized lettering, playful shapes and a vivid colour contrast.",
    solution:"The identity pairs an expressive, inflated display style with compact supporting information. A deep teal ground gives the system structure, while saturated pink shapes bring movement and personality. The same language is carried across the main poster, ticket, programme booklet, social tiles, tote and directional signage.",
    visualTitle:"A loud display voice. A quiet information layer.",
    visual:"The concept uses chunky, rounded display lettering for the festival name, supported by a clean sans-serif for dates, categories and practical information. The contrast keeps the identity expressive without sacrificing legibility.",
    palette:[["Electric Pink","#F34E91"],["Deep Teal","#073B37"],["Warm Paper","#F4EEE7"]],
    thinking:"Large-scale typography does most of the brand recognition work. Organic forms act as a flexible graphic device, while the information layer stays consistent so the system can scale from a poster to a narrow ticket or a small social tile.",
    deliver:["Festival poster","Event ticket","Programme booklet","Social media tiles","Merchandise / tote","Wayfinding / screen graphics"],
    takeaway:"A concept identity built to feel recognisable at a distance and coherent across multiple event touchpoints."
  },
  kiln: {
    name:"KILN", eyebrow:"02 / BRAND SYSTEM", subtitle:"A contemporary identity for ceramics and everyday objects.",
    intro:"A self-initiated concept brand system for a small ceramics and homeware studio. The direction balances the irregular beauty of handmade objects with a confident, contemporary visual identity.",
    type:"Lifestyle / product branding", role:"Brand identity, art direction", scope:"Packaging, print, digital",
    image:"project-2.svg",alt:"KILN ceramics concept board showing wordmark, clay objects, packaging, tissue, stationery, tote, website and social applications.",caption:"BRAND SYSTEM / PACKAGING AND DIGITAL APPLICATIONS",
    briefTitle:"Give a handmade studio a distinct voice.",
    brief:"The goal was to create a brand that could sit naturally beside sculptural ceramics and useful home objects. It needed to feel tactile and crafted, but not rustic or overly delicate. The identity had to work at small sizes on product labels as well as across larger packaging and digital surfaces.",
    solution:"A strong rounded wordmark is paired with a small maker's-mark symbol. Acid lime brings a recognisable flash of energy, while forest green and warm chalk keep the system grounded. Kraft textures and simple layouts let the products remain the hero.",
    visualTitle:"A distinctive wordmark with restrained editorial support.",
    visual:"The primary wordmark is bold, compact and custom-feeling. A refined serif provides a softer counterpoint for product stories and longer digital copy; a clean sans-serif handles labels and practical information.",
    palette:[["Acid Lime","#D8F000"],["Forest Green","#0F3022"],["Chalk White","#F5F0E5"],["Ink Black","#10120F"]],
    thinking:"The visual system is designed to be modular: the wordmark, maker's mark, colour blocks and packaging pattern can work independently or together. Contrast and material choice help maintain consistency across digital and physical applications.",
    deliver:["Primary wordmark","Maker's-mark symbol","Kraft packaging","Tissue / wrapping pattern","Business stationery","Website and social templates"],
    takeaway:"A tactile, adaptable brand language designed to make a small product studio feel considered and memorable."
  },
  afterhours: {
    name:"AFTERHOURS", eyebrow:"03 / CULTURE & LIFESTYLE", subtitle:"A listening-bar identity built around music, ritual and atmosphere.",
    intro:"A self-initiated concept identity for a late-night vinyl listening bar. It uses a restrained, atmospheric direction to balance the energy of nightlife with the ritual and intimacy of listening to records.",
    type:"Hospitality / culture branding", role:"Art direction, identity design", scope:"Campaign, print, merchandise",
    image:"project-3.svg",alt:"AFTERHOURS concept board showing record sleeves, membership card, wristband, menu, tote, event poster and signage.",caption:"IDENTITY APPLICATIONS / VINYL, MEMBERSHIP AND ENVIRONMENT",
    briefTitle:"Design for a place people want to return to.",
    brief:"The brief was to imagine a listening space where records, drinks and conversation are equally important. The identity needed to feel distinctive after dark, but still refined enough to work on menus, membership materials and everyday brand touchpoints.",
    solution:"A midnight-navy and tangerine palette creates a cinematic contrast against warm cream. A crescent-and-groove inspired mark gives the identity a simple symbol, while condensed typography and a more expressive display serif create a balance between atmosphere and clarity.",
    visualTitle:"Night-time drama with a clear information hierarchy.",
    visual:"Condensed display lettering creates a strong poster voice; a refined serif adds character to record and menu applications. Small mono-style labels organise event details, membership information and navigation.",
    palette:[["Midnight Cobalt","#0B1D5B"],["Electric Tangerine","#FF6A00"],["Warm Cream","#F5E8D6"],["Silver Foil","#C0C2C7"]],
    thinking:"The crescent and repeated groove lines create a recognisable visual cue without relying on literal music imagery. The palette and typography are flexible enough to adapt from a dark event poster to a light menu or membership card.",
    deliver:["Primary symbol and wordmark","Vinyl sleeve and label","Membership card","Event poster series","Menu and bar collateral","Merchandise and signage"],
    takeaway:"A cohesive hospitality identity that carries one atmosphere across print, objects, events and physical space."
  }
};
const id = new URLSearchParams(window.location.search).get("project") || "watch";
const p = studies[id];
if (!p) { window.location.replace("./index.html#selected-work"); return; }
document.title = p.name + " — Vishesh Sachan";
const set = (id,value) => { const node=document.getElementById(id); if(node) node.textContent=value; };
set("eyebrow",p.eyebrow);set("project-title",p.name);set("project-subtitle",p.subtitle);set("project-intro",p.intro);
set("meta-type",p.type);set("meta-role",p.role);set("meta-scope",p.scope);
set("board-caption",p.caption);set("brief-title",p.briefTitle);set("brief-text",p.brief);set("solution-text",p.solution);
set("visual-title",p.visualTitle);set("visual-text",p.visual);set("thinking-text",p.thinking);set("takeaway",p.takeaway);
const image=document.getElementById("board-image");image.src="./"+p.image;image.alt=p.alt;const boardLink=document.getElementById("board-open");if(boardLink)boardLink.href="./"+p.image;
const palette=document.getElementById("palette");
p.palette.forEach(([name,hex])=>{const el=document.createElement("div");el.className="swatch";const swatch=document.createElement("i");swatch.style.backgroundColor=hex;const label=document.createElement("b");label.textContent=name;const code=document.createElement("small");code.textContent=hex;el.append(swatch,label,code);palette.append(el);});
const list=document.getElementById("deliverables");
p.deliver.forEach(item=>{const li=document.createElement("li");li.textContent=item;list.append(li);});
const reveals=document.querySelectorAll(".case-hero,.project-meta,.hero-board,.case-section,.case-end");
if(!("IntersectionObserver" in window)||window.matchMedia("(prefers-reduced-motion: reduce)").matches){reveals.forEach(el=>el.classList.add("is-visible"));return;}
const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add("is-visible");observer.unobserve(entry.target);}}),{threshold:.12,rootMargin:"0px 0px -24px 0px"});
reveals.forEach((el,index)=>{el.style.transitionDelay=Math.min(index%4,3)*80+"ms";observer.observe(el);});
})();