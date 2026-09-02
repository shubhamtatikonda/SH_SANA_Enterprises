const nav=document.getElementById('nav'),hamb=document.getElementById('hamb');
hamb.addEventListener('click',()=>nav.classList.toggle('open'));
document.querySelectorAll('#nav a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));

const observer=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target)}})
},{threshold:.12});
document.querySelectorAll('.reveal').forEach((el,i)=>{el.style.transitionDelay=(i%4)*70+'ms';observer.observe(el)});

const counterObserver=new IntersectionObserver(entries=>{
 entries.forEach(e=>{
  if(!e.isIntersecting)return;
  const el=e.target,target=Number(el.dataset.count),start=performance.now(),duration=1400;
  function tick(now){const p=Math.min((now-start)/duration,1),q=1-Math.pow(1-p,3);el.textContent=Math.floor(target*q).toLocaleString('en-IN');if(p<1)requestAnimationFrame(tick)}
  requestAnimationFrame(tick);counterObserver.unobserve(el);
 })
},{threshold:.5});
document.querySelectorAll('[data-count]').forEach(x=>counterObserver.observe(x));

const pointer=document.querySelector('.pointer');
window.addEventListener('mousemove',e=>{if(pointer){pointer.style.left=e.clientX+'px';pointer.style.top=e.clientY+'px'}});

const form=document.getElementById('quoteForm');
form.addEventListener('submit',e=>{
 e.preventDefault();
 const d=new FormData(form);
 const subject=encodeURIComponent('New website enquiry - '+d.get('name'));
 const body=encodeURIComponent(`Name: ${d.get('name')}
Email: ${d.get('email')}
Phone: ${d.get('phone')||''}
Company: ${d.get('company')||''}

Project requirement:
${d.get('message')}`);
 document.getElementById('note').textContent='Opening your email client…';
 location.href=`mailto:info@shsanaenterprises.com?subject=${subject}&body=${body}`;
});

const header=document.getElementById('header');
window.addEventListener('scroll',()=>header.style.boxShadow=scrollY>20?'0 8px 30px rgba(0,0,0,.25)':'none');
