const menuToggle=document.querySelector('.menu-toggle');
const mobileNav=document.querySelector('#mobile-nav');

menuToggle.addEventListener('click',()=>{
 const open=mobileNav.classList.toggle('open');
 menuToggle.classList.toggle('open',open);
 menuToggle.setAttribute('aria-expanded',String(open));
 menuToggle.setAttribute('aria-label',open?'Close navigation':'Open navigation');
});

mobileNav.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{
 mobileNav.classList.remove('open');
 menuToggle.classList.remove('open');
 menuToggle.setAttribute('aria-expanded','false');
 menuToggle.setAttribute('aria-label','Open navigation');
}));