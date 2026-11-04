import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.170.0/build/three.module.js";
const canvas=document.querySelector("#avatar3d"),frame=document.querySelector(".model-frame"),fallback=document.querySelector(".model-fallback");
const toggleButton=document.querySelector("#toggleSpin"),leftButton=document.querySelector("#turnLeft"),rightButton=document.querySelector("#turnRight");
const spinIcon=document.querySelector("#spinIcon"),spinLabel=document.querySelector("#spinLabel");
let renderer,scene,camera,avatar,paused=false,last=0,impulse=0;
const mat=(color,roughness=.85,metalness=0)=>new THREE.MeshStandardMaterial({color,roughness,metalness});
const M={skin:mat("#b97861"),skin2:mat("#c98970"),hair:mat("#211b1a"),hair2:mat("#302522"),pink:mat("#ef91aa"),pinkLight:mat("#f4a8b9"),pinkDark:mat("#c96683"),black:mat("#1d1d20"),pants:mat("#28282a"),pants2:mat("#3b3a3b"),shoe:mat("#f1f0eb"),sole:mat("#b6b6b5")};
function ball(g,p,s,m,n=28){const o=new THREE.Mesh(new THREE.SphereGeometry(1,n,Math.max(12,n>>1)),m);o.position.set(...p);o.scale.set(...s);o.castShadow=true;o.receiveShadow=true;g.add(o);return o;}
function limb(g,a,b,rt,rb,m){const A=new THREE.Vector3(...a),B=new THREE.Vector3(...b),v=B.clone().sub(A);const o=new THREE.Mesh(new THREE.CylinderGeometry(rt,rb,v.length(),20,1),m);o.position.copy(A).add(B).multiplyScalar(.5);o.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),v.normalize());o.castShadow=true;o.receiveShadow=true;g.add(o);ball(g,a,[rb,rb,rb],m,16);ball(g,b,[rt,rt,rt],m,16);return o;}
function box(g,p,s,m){const o=new THREE.Mesh(new THREE.BoxGeometry(...s),m);o.position.set(...p);o.castShadow=true;o.receiveShadow=true;g.add(o);return o;}
function labelTexture(top,big,colour="#111"){const c=document.createElement("canvas");c.width=c.height=512;const x=c.getContext("2d");x.fillStyle=colour;x.textAlign="center";x.font="900 48px Arial";x.fillText(top,256,120);x.font="900 235px Arial";x.fillText(big,256,390);const t=new THREE.CanvasTexture(c);t.colorSpace=THREE.SRGBColorSpace;return t;}
function createAvatar(){
 const root=new THREE.Group(),g=new THREE.Group();root.add(g);
 // Baggy charcoal cargo pants, individually modelled legs and utility pockets
 ball(g,[0,1.76,0],[.43,.30,.29],M.pants);
 for(const s of [-1,1]){
  const hip=[s*.205,1.68,0],knee=[s*.225,.98,.015],ankle=[s*.235,.34,.025];
  limb(g,hip,knee,.17,.205,M.pants);limb(g,knee,ankle,.145,.17,M.pants);
  ball(g,[s*.235,.32,.02],[.16,.13,.17],M.pants2);
  box(g,[s*.355,1.18,.07],[.105,.28,.18],M.pants2);box(g,[s*.358,1.18,.165],[.11,.035,.012],M.pants);
  box(g,[s*.355,1.34,.168],[.11,.055,.015],M.pants2);
  ball(g,[s*.235,.145,.15],[.22,.105,.34],M.shoe);ball(g,[s*.235,.085,.17],[.225,.045,.34],M.sole);ball(g,[s*.235,.19,.005],[.15,.085,.20],M.shoe);
 }
 // Pink football jersey with a shaped torso and short sleeves
 const prof=[[.33,-.57],[.35,-.48],[.31,-.24],[.32,.06],[.38,.36],[.45,.51],[.44,.59],[.33,.64],[.25,.57]].map(([r,y])=>new THREE.Vector2(r,y));
 const shirt=new THREE.Mesh(new THREE.LatheGeometry(prof,48),M.pink);shirt.position.y=2.55;shirt.castShadow=true;g.add(shirt);
 ball(g,[0,2.02,0],[.34,.055,.255],M.pinkDark,24);
 limb(g,[-.43,2.94,0],[-.52,2.67,.005],.17,.18,M.pinkLight);limb(g,[.43,2.94,0],[.52,2.67,.005],.17,.18,M.pinkLight);
 limb(g,[-.52,2.68,.005],[-.535,2.635,.006],.167,.167,M.black);limb(g,[.52,2.68,.005],[.535,2.635,.006],.167,.167,M.black);
 limb(g,[-.54,2.62,.005],[-.57,2.28,.07],.095,.105,M.skin2);limb(g,[.54,2.62,.005],[.56,2.27,.075],.095,.105,M.skin2);
 limb(g,[-.57,2.28,.07],[-.47,1.83,.16],.075,.09,M.skin);limb(g,[.56,2.27,.075],[.46,1.83,.16],.075,.09,M.skin);
 ball(g,[-.47,1.79,.16],[.08,.12,.075],M.skin,20);ball(g,[.46,1.79,.16],[.08,.12,.075],M.skin,20);
 ball(g,[0,3.13,0],[.14,.16,.14],M.skin2);ball(g,[0,3.12,.01],[.18,.055,.17],M.black);
 // 3D head and ears; actual portrait sits on a curved mesh surface, not a flat rotating card
 const hy=3.48;ball(g,[0,hy,0],[.305,.39,.275],M.skin2,36);
 ball(g,[-.302,3.48,0],[.07,.105,.07],M.skin,20);ball(g,[.302,3.48,0],[.07,.105,.07],M.skin,20);
 ball(g,[0,3.70,-.025],[.324,.245,.29],M.hair,32);ball(g,[0,3.77,.105],[.27,.17,.20],M.hair2,28);
 for(let i=0;i<38;i++){const a=i*2.399963,u=((i*17)%37)/37;ball(g,[Math.cos(a)*(.22+u*.07),3.76+Math.sin(i*1.7)*.05,Math.sin(a)*(.18+u*.07)],[.045,.04,.045],i%4===0?M.hair2:M.hair,12);}
 const photo=new Image();photo.onload=()=>{const c=document.createElement("canvas");c.width=c.height=512;const x=c.getContext("2d");x.drawImage(photo,0,0,photo.width,photo.height*.78,0,0,512,512);const tex=new THREE.CanvasTexture(c);tex.colorSpace=THREE.SRGBColorSpace;tex.anisotropy=8;
  const geo=new THREE.PlaneGeometry(.49,.70,20,24),p=geo.attributes.position;for(let i=0;i<p.count;i++){const xx=p.getX(i);p.setZ(i,.055*(1-(xx/.245)**2));}geo.computeVertexNormals();
  const face=new THREE.Mesh(geo,new THREE.MeshStandardMaterial({map:tex,transparent:true,alphaTest:.04,roughness:1,side:THREE.DoubleSide,depthWrite:false}));face.position.set(0,hy-.005,.252);face.renderOrder=3;g.add(face);
 };photo.src="./portrait.webp";
 const back=new THREE.Mesh(new THREE.PlaneGeometry(.53,.52),new THREE.MeshBasicMaterial({map:labelTexture("VISHESH","07"),transparent:true,side:THREE.DoubleSide}));back.position.set(0,2.55,-.315);back.rotation.y=Math.PI;g.add(back);
 const front=new THREE.Mesh(new THREE.PlaneGeometry(.17,.12),new THREE.MeshBasicMaterial({map:labelTexture("","VS","#fff0f3"),transparent:true,side:THREE.DoubleSide}));front.position.set(-.19,2.72,.302);g.add(front);
 return root;
}
function start(){
 if(!canvas||!window.WebGLRenderingContext)throw new Error("WebGL unavailable");
 renderer=new THREE.WebGLRenderer({canvas,alpha:true,antialias:true,powerPreference:"high-performance"});renderer.setPixelRatio(Math.min(devicePixelRatio||1,2));renderer.setClearColor(0,0);renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.2;
 scene=new THREE.Scene();camera=new THREE.PerspectiveCamera(34,1,.1,100);camera.position.set(3.4,2.55,7.1);camera.lookAt(0,1.95,0);
 scene.add(new THREE.HemisphereLight(0xffe5ed,0x35323b,2.1));
 const key=new THREE.DirectionalLight(0xffe3e9,3.1);key.position.set(-3,7,5);scene.add(key);
 const fill=new THREE.DirectionalLight(0x9caeff,1.25);fill.position.set(4,3,-4);scene.add(fill);
 const rim=new THREE.PointLight(0xff3f89,2,8);rim.position.set(-2,2.8,-2);scene.add(rim);
 avatar=createAvatar();avatar.position.y=-.08;scene.add(avatar);
 const resize=()=>{const w=frame.clientWidth,h=frame.clientHeight;if(!w||!h)return;renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix();};
 new ResizeObserver(resize).observe(frame);resize();if(fallback)fallback.style.display="none";canvas.classList.add("webgl-ready");
 paused=matchMedia("(prefers-reduced-motion: reduce)").matches;if(paused){spinIcon.textContent="▶";spinLabel.textContent="AUTO PAUSED";}
 const tick=t=>{requestAnimationFrame(tick);const dt=Math.min((t-last)/1000,.05)||0;last=t;if(!paused)avatar.rotation.y+=dt*.53;avatar.rotation.y+=impulse;impulse*=.84;renderer.render(scene,camera);};requestAnimationFrame(tick);
 window.visheshAvatar={toggle(){paused=!paused;return paused;},rotate(a){impulse+=a;}};
}
try{start();}catch(e){console.error("3D scene unavailable",e);if(fallback)fallback.style.display="block";}
toggleButton?.addEventListener("click",()=>{if(!window.visheshAvatar)return;const p=window.visheshAvatar.toggle();spinIcon.textContent=p?"▶":"Ⅱ";spinLabel.textContent=p?"PAUSED":"360° VIEW";toggleButton.setAttribute("aria-pressed",String(p));});
leftButton?.addEventListener("click",()=>window.visheshAvatar?.rotate(-Math.PI/2));
rightButton?.addEventListener("click",()=>window.visheshAvatar?.rotate(Math.PI/2));
