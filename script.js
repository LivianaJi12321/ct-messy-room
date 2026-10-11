const $=id=>document.getElementById(id);
const paths=Array.from({length:12},()=>{const p=document.createElementNS('http://www.w3.org/2000/svg','path');$('staff').appendChild(p);return p;});
const shadows=paths.map(()=>{const p=document.createElementNS('http://www.w3.org/2000/svg','path');$('stringShadows').appendChild(p);return p;});
const highlights=paths.map(()=>{const p=document.createElementNS('http://www.w3.org/2000/svg','path');$('stringHighlights').appendChild(p);return p;});
let points=0,threshold=100,actions=0,cycles=0,last='—',busy=false,visual=0,animation=0;
const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
let currentJolt=0;
function draw(disorder,jolt=0){
 currentJolt=jolt;
 const time=reduced?0:performance.now()/1000,rotation=time*Math.PI/18;
 paths.forEach((path,i)=>{let d='',ground='';const radius=43+i*9,phase=i*.49;
 for(let j=0;j<=240;j++){const angle=j/240*Math.PI*2;
 // Shared traveling folds make an airy sheet; phase offsets weave adjacent threads.
 const fold=angle*2+phase-time*.65;
 const lift=disorder*(28+105*Math.pow(.5+.5*Math.sin(fold),2)+25*Math.sin(angle*3-phase+time*.8));
 const r=radius+disorder*(17*Math.sin(angle*3+phase-time*.35)+12*Math.sin(angle*2-phase));
 const theta=angle+rotation+disorder*.15*Math.sin(fold);
 const x=250+r*Math.cos(theta)+disorder*12*Math.sin(fold);
 const baseY=230+r*Math.sin(theta),y=baseY-lift;
 d+=(j?'L':'M')+x.toFixed(2)+','+y.toFixed(2);
 ground+=(j?'L':'M')+x.toFixed(2)+','+baseY.toFixed(2);}
 path.setAttribute('d',d+'Z');shadows[i].setAttribute('d',ground+'Z');});
 $('jolt').setAttribute('transform',`translate(${jolt*12} ${-jolt*7})`);
}
function render(){ $('progressFill').setAttribute('width',String(490*Math.min(points/100,1)));$('buildup').setAttribute('aria-label',points===0?'Accumulation: empty':points>=100?'Accumulation: full. Move the tonearm to tidy up.':'Accumulation is growing.'); $('add').disabled=busy;$('tonearm').setAttribute('aria-disabled',String(busy||points===0)); }
function tween(from,to,duration,done){cancelAnimationFrame(animation);const start=performance.now();function frame(now){const t=Math.min(1,(now-start)/duration);visual=from+(to-from)*(1-Math.pow(1-t,3));
 const jolt=reduced?0:Math.sin(t*Math.PI*5)*Math.pow(1-t,2)*2;
 draw(visual,jolt);if(t<1)animation=requestAnimationFrame(frame);else if(done)done();}animation=requestAnimationFrame(frame);}
function clean(){
 if(busy||points===0)return;
 busy=true;render();document.querySelector('.stage').classList.add('cleaning');
 $('status').textContent='Untangling the strings.';
 const start=performance.now(),from=visual,duration=reduced?120:3000;
 function frame(now){const t=Math.min(1,(now-start)/duration);visual=from*(1-t*t*(3-2*t));draw(visual);
 if(t<1)animation=requestAnimationFrame(frame);else{document.querySelector('.stage').classList.remove('cleaning');points=0;visual=0;busy=false;draw(0);render();$('status').textContent='Strings restored. Leave something out to begin again.';}}
 animation=requestAnimationFrame(frame);
}
$('add').addEventListener('click',()=>{if(busy)return;points+=Math.floor(Math.random()*11)+5;busy=true;render();$('status').textContent=points>=100?'It has piled up. Move the tonearm when you’re ready.':'A little left out. A little more tangled.';
 // A soft limit keeps every click meaningful without lifting lines off the stage.
 tween(visual,1-Math.exp(-points/75),reduced?30:650,()=>{busy=false;render();});});
const arm=$('tonearm');let drag=null,suppressClick=false;
arm.addEventListener('pointerdown',e=>{if(busy||points===0)return;drag={x:e.clientX,y:e.clientY,moved:false};arm.setPointerCapture(e.pointerId);});
arm.addEventListener('pointermove',e=>{if(!drag)return;const dx=drag.x-e.clientX;drag.moved=drag.moved||Math.hypot(dx,e.clientY-drag.y)>8;if(drag.moved){arm.style.transition='none';arm.style.transform=`rotate(${Math.max(0,Math.min(36,dx*.45))}deg)`;}});
function release(e){if(!drag)return;const inward=drag.x-e.clientX>22,moved=drag.moved;drag=null;arm.style.transition='';arm.style.transform='';suppressClick=moved;if(inward)clean();}
arm.addEventListener('pointerup',release);
arm.addEventListener('pointercancel',()=>{drag=null;arm.style.transition='';arm.style.transform='';});
arm.addEventListener('click',()=>{if(suppressClick){suppressClick=false;return;}clean();});
arm.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();clean();}});
draw(0);render();
function windFrame(){draw(visual,currentJolt);requestAnimationFrame(windFrame);}
requestAnimationFrame(windFrame);
