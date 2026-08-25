const sidebar=document.getElementById('sidebar');
const overlay=document.getElementById('overlay');
const menu=document.getElementById('menuButton');
const close=document.getElementById('closeButton');
function toggle(open){sidebar.classList.toggle('open',open);overlay.classList.toggle('open',open)}
menu?.addEventListener('click',()=>toggle(true));
close?.addEventListener('click',()=>toggle(false));
overlay?.addEventListener('click',()=>toggle(false));
document.addEventListener('keydown',e=>{if(e.key==='Escape')toggle(false)});
