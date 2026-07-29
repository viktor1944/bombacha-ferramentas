document.addEventListener('DOMContentLoaded',()=>{
  const cfg=window.BOMBACHA_CONFIG||{};
  document.querySelectorAll('[data-version]').forEach(el=>el.textContent=cfg.VERSION||'1.0.4');
  document.querySelectorAll('[data-size]').forEach(el=>el.textContent=cfg.FILE_SIZE||'71,5 MB');
  document.querySelectorAll('[data-updated]').forEach(el=>el.textContent=cfg.UPDATED_AT||'28/07/2026');
  document.querySelectorAll('.download-link').forEach(a=>{
    if(cfg.DOWNLOAD_URL){a.href=cfg.DOWNLOAD_URL;a.target='_blank';a.rel='noopener'}
  });
  const toast=document.querySelector('.toast');
  const showToast=(msg)=>{toast.textContent=msg;toast.classList.add('show');setTimeout(()=>toast.classList.remove('show'),2800)};
  const hashBtn=document.querySelector('[data-hash]');
  hashBtn?.addEventListener('click',async()=>{
    try{await navigator.clipboard.writeText(cfg.SHA256||'');showToast('SHA-256 copiado.')}catch{showToast(cfg.SHA256||'SHA-256 indisponível')}
  });
  const toggle=document.querySelector('.menu-toggle');
  const nav=document.querySelector('#menu-principal');
  toggle?.addEventListener('click',()=>{const open=nav.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open))});
  nav?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');toggle?.setAttribute('aria-expanded','false')}));
  const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target)}}),{threshold:.12});
  document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
});
