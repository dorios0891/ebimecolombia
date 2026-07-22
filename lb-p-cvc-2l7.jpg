/* ==========================================================================
   EBIME COLOMBIA — sitio corporativo
   Router por hash, multi-página, un solo despliegue estático.
   Mismo sistema visual que EBIME Lab, contenido de empresa.
   ========================================================================== */

const LOGO_COLOR = window.__LOGO_COLOR__;
const LOGO_WHITE = window.__LOGO_WHITE__;

const $ = (s, el = document) => el.querySelector(s);
const family = (slug) => FAMILIES.find((f) => f.slug === slug);
const esc = (s) => String(s).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));

function toast(msg){
  const t=$('#toast'); t.textContent=msg; t.classList.add('show');
  clearTimeout(t._t); t._t=setTimeout(()=>t.classList.remove('show'),2600);
}

/* Iconos de servicio */
const SVC_ICON = {
  device:'<path d="M4 7h16M4 7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2M4 7v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7M9 11h6"/>',
  training:'<path d="M22 10L12 5 2 10l10 5 10-5zM6 12v5c0 1 2.5 3 6 3s6-2 6-3v-5"/>',
  support:'<path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zM9 9a3 3 0 1 1 4 2.8c-.7.4-1 .7-1 1.7M12 17h.01"/>',
  chart:'<path d="M3 3v18h18M7 15l3-4 3 2 4-6"/>',
};

/* ==========================================================================
   VISTAS
   ========================================================================== */

function viewHome(){
  return `
  ${hero()}

  <div class="pillars"><div class="wrap pillar-grid">
    ${VALUES.map((v,i)=>`<div class="pillar"><h3>${esc(v.t)}</h3><p>${esc(v.d)}</p></div>`).join('')}
  </div></div>

  <section class="block"><div class="wrap">
    <div class="sec-head" style="display:flex;justify-content:space-between;align-items:flex-end;flex-wrap:wrap;gap:16px">
      <div><div class="eyebrow">Portafolio</div><h2>Soluciones de acceso vascular</h2></div>
      <p style="margin:0">Cinco líneas de catéteres que cubren el acceso venoso central, oncológico y de reemplazo renal.</p>
    </div>
    <div class="prod-grid">${FAMILIES.map(familyCard).join('')}</div>
  </div></section>

  <section class="block" style="background:#fff;border-top:1px solid var(--line)"><div class="wrap">
    <div class="sec-head"><div class="eyebrow">Qué hacemos</div><h2>Más que un proveedor</h2>
      <p>No solo entregamos dispositivos: acompañamos su uso correcto al lado del paciente.</p></div>
    <div class="cards" style="grid-template-columns:repeat(auto-fit,minmax(260px,1fr))">
      ${SERVICES.map(serviceCard).join('')}
    </div>
  </div></section>

  <section class="block"><div class="wrap">
    <div class="stats">
      ${STATS.map(s=>`<div class="stat"><b>${esc(s.n)}</b><span>${esc(s.l)}</span></div>`).join('')}
    </div>
  </div></section>

  ${ctaBand()}`;
}

function hero(){
  return `<section class="hero"><div class="wrap" style="padding-top:80px;padding-bottom:92px">
    <div style="max-width:64ch">
      <div class="eyebrow">Acceso vascular · Colombia</div>
      <h1>Dispositivos que<br>cuidan el acceso.<b>Soporte que cuida al paciente.</b></h1>
      <p class="lead" style="max-width:56ch">Proveemos a IPS y hospitales catéteres venosos centrales, puertos implantables y catéteres de reemplazo renal, con formación y acompañamiento clínico basado en evidencia.</p>
      <div class="hero-cta">
        <a class="btn btn-cyan btn-lg" href="#/productos">Ver productos</a>
        <a class="btn btn-outline btn-lg" href="#/contacto">Hablar con un asesor</a>
      </div>
      <div class="trust">
        ${STATS.slice(0,3).map(s=>`<div><b>${esc(s.n)}</b><span>${esc(s.l)}</span></div>`).join('')}
      </div>
    </div>
  </div><div class="rule"><span class="a"></span><span class="b"></span><span class="c"></span><span class="d"></span></div></section>`;
}

function familyCard(f){
  return `<article class="prod-card">
    <div class="prod-top">
      <div class="prod-code">${esc(f.codigo)}</div>
      <h3 class="prod-name">${esc(f.nombre)}</h3>
      <p class="prod-desc">${esc(f.resumen)}</p>
      <div class="prod-brands">
        ${f.marcas.map(m=>`<a class="prod-brand" href="#/productos?fam=${f.slug}">${esc(m.n)}</a>`).join('')}
      </div>
    </div>
    <div class="prod-img" style="background-image:url('${window.__IMG__?.[f.img]||f.img}')"></div>
    <a class="prod-cta" href="#/productos?fam=${f.slug}">Ver productos ›</a>
  </article>`;
}

function serviceCard(s){
  return `<div class="card" style="cursor:default"><div class="card-body">
    <svg viewBox="0 0 24 24" fill="none" stroke="var(--navy)" stroke-width="1.6" style="width:38px;height:38px;margin-bottom:14px">${SVC_ICON[s.icon]||''}</svg>
    <h3>${esc(s.titulo)}</h3><p>${esc(s.desc)}</p>
    ${s.cta?`<a class="prev" style="cursor:pointer;font-weight:700;color:var(--cyan)" href="${s.cta.href}" target="_blank" rel="noopener">${esc(s.cta.label)} →</a>`:''}
  </div></div>`;
}

function ctaBand(){
  return `<div class="cta-band">
    <h2>¿Tu institución necesita un aliado en acceso vascular?</h2>
    <p>Cuéntanos qué requieres y te contactamos con una propuesta a la medida de tu servicio.</p>
    <a class="btn btn-cyan btn-lg" href="#/contacto">Solicitar información</a>
  </div>`;
}

/* ---------- Productos ---------- */
function viewProductos(params){
  const detalle = params.fam ? family(params.fam) : null;
  if(detalle) return viewFamiliaDetalle(detalle);

  // Vista de catálogo: tarjetas estilo ebime.com.mx
  const tarjetas = FAMILIES.map(f=>`
    <article class="prod-card">
      <div class="prod-top">
        <div class="prod-code">${esc(f.codigo)}</div>
        <h3 class="prod-name">${esc(f.nombre)}</h3>
        <p class="prod-desc">${esc(f.resumen)}</p>
        <div class="prod-brands">
          ${f.marcas.map(m=>`<a class="prod-brand" href="#/productos?fam=${f.slug}">${esc(m.n)}</a>`).join('')}
        </div>
      </div>
      <div class="prod-img" style="background-image:url('${window.__IMG__?.[f.img]||f.img}')"></div>
      <a class="prod-cta" href="#/productos?fam=${f.slug}">Ver productos ›</a>
    </article>`).join('');

  return `<section class="block"><div class="wrap">
    <div class="sec-head"><div class="eyebrow">Portafolio</div><h1 style="font-size:40px;font-weight:900;color:var(--navy)">Productos</h1>
      <p>Catéteres de acceso vascular para cada terapia. Todos con registro sanitario y trazabilidad.</p></div>
    <div class="prod-grid">${tarjetas}</div>
  </div></section>${ctaBand()}`;
}

/* ---------- Detalle de familia ---------- */
function viewFamiliaDetalle(f){
  return `<section class="detail-hero"><div class="wrap" style="display:block;padding-top:44px;padding-bottom:44px">
    <a class="prev" style="cursor:pointer;color:#C9D6F0;font-weight:600;display:inline-block;margin-bottom:16px" href="#/productos">← Todos los productos</a>
    <div class="prod-code" style="color:rgba(255,255,255,.5)">${esc(f.codigo)}</div>
    <h1 style="font-size:clamp(28px,4vw,42px);font-weight:900;margin:4px 0 14px">${esc(f.nombre)}</h1>
    <p class="lead" style="color:#C9D6F0;max-width:60ch;font-size:18px;font-weight:300">${esc(f.resumen)}</p>
    ${f.material?`<p style="color:#C9D6F0;font-size:14px;margin-top:10px"><b>Material:</b> ${esc(f.material)}</p>`:''}
  </div><div class="rule"><span class="a"></span><span class="b"></span><span class="c"></span><span class="d"></span></div></section>

  <section class="block"><div class="wrap">
    <div style="display:flex;align-items:center;gap:12px;margin-bottom:20px">
      <h2 style="font-size:22px;font-weight:900;color:var(--navy)">Referencias disponibles</h2>
      <div style="display:flex;gap:6px">${f.marcas.map(m=>`<span class="brand-pill" style="color:${f.accent};border-color:${f.accent}">${esc(m.n)}</span>`).join('')}</div>
    </div>
    <div class="cards">
      ${f.productos.map(p=>{
        const src = p.img ? (window.__IMG__?.[p.img]||p.img) : '';
        // Imagen mejorada para el lightbox: 'lb-<img>' si existe, si no la misma
        const lbKey = p.img ? ('lb-'+p.img) : '';
        const lbSrc = (window.__IMG__?.[lbKey]) || src;
        const ficha = p.ficha || f.ficha;
        return `<div class="card" style="cursor:default"><div class="spine" style="background:${f.accent}"></div>
        ${p.img?`<div class="prod-img prod-img-click" style="height:180px;background-image:url('${src}')" onclick="openLightbox('${lbSrc}','${esc(p.nombre)}')" title="Ampliar imagen">
          <span class="zoom-badge">⤢</span>
        </div>`:''}
        <div class="card-body">
          <h3 style="margin-bottom:6px">${esc(p.nombre)}</h3>
          <div class="ref">Ref. ${esc(p.ref)}</div>
          <p>${esc(p.desc)}</p>
          <div class="meta" style="border:0;padding-top:0;flex-wrap:wrap;gap:6px;margin-bottom:16px">
            ${(p.tags||[]).map(t=>`<span class="ptag" style="border-color:${f.accent};color:${f.accent}">${esc(t)}</span>`).join('')}
          </div>
          <div class="prod-actions">
            ${p.img?`<button class="btn btn-ghost btn-sm" onclick="openLightbox('${lbSrc}','${esc(p.nombre)}')">Ver imagen</button>`:''}
            ${ficha?`<a class="btn btn-ghost btn-sm" href="${ficha}" target="_blank" rel="noopener">Ficha técnica</a>`:''}
            ${p.folleto?`<a class="btn btn-cyan btn-sm" href="${p.folleto}" target="_blank" rel="noopener">Folleto</a>`:''}
          </div>
        </div></div>`;
      }).join('')}
    </div>
    <div style="margin-top:24px" class="glass" >
      <div style="padding:20px 24px"><p style="color:var(--gray);font-size:14px">Cada referencia tiene su <b>Ficha técnica</b> y su <b>Folleto</b> descargables, y su imagen ampliable. Para presentaciones, registro sanitario y cotización, escríbenos.</p></div>
    </div>
  </div></section>
  <div style="text-align:center;padding-bottom:60px"><a class="btn btn-solid" href="#/contacto">Solicitar información</a></div>`;
}

/* ---------- Servicios ---------- */
function viewServicios(){
  return `
  <section class="hero"><div class="wrap" style="padding-top:60px;padding-bottom:60px">
    <div class="eyebrow" style="color:var(--cyan);margin-bottom:16px">Servicios</div>
    <h1 style="font-weight:300;font-size:clamp(32px,4.5vw,50px);max-width:22ch;margin-bottom:18px">Un proveedor que se queda al lado de la práctica.</h1>
    <p class="lead" style="max-width:60ch">Acompañamos a las instituciones más allá de la entrega del dispositivo: en la formación de su personal, en la implementación de equipos de acceso vascular y en la medición de resultados.</p>
  </div><div class="rule"><span class="a"></span><span class="b"></span><span class="c"></span><span class="d"></span></div></section>

  <section class="block"><div class="wrap">
    <div class="services-list">
      ${SERVICES.map((s,i)=>`
        <div class="service-row">
          <div class="service-ico" style="background:${['#16A3C4','#902D8E','#54B24C','#F19F2C'][i%4]}1a">
            <svg viewBox="0 0 24 24" fill="none" stroke="${['#16A3C4','#902D8E','#54B24C','#F19F2C'][i%4]}" stroke-width="1.7">${SVC_ICON[s.icon]||''}</svg>
          </div>
          <div>
            <h3>${esc(s.titulo)}</h3>
            <p>${esc(s.desc)}</p>
            ${s.cta?`<a class="prev" style="cursor:pointer;font-weight:700;color:var(--cyan)" href="${s.cta.href}" target="_blank" rel="noopener">${esc(s.cta.label)} →</a>`:''}
          </div>
        </div>`).join('')}
    </div>
  </div></section>${ctaBand()}`;
}

/* ---------- Nosotros ---------- */
function viewNosotros(){
  return `
  <section class="hero"><div class="wrap" style="padding-top:60px;padding-bottom:60px">
    <div class="eyebrow" style="color:var(--cyan);margin-bottom:16px">Nosotros</div>
    <h1 style="font-weight:300;font-size:clamp(32px,4.5vw,50px);max-width:24ch;margin-bottom:18px">Acceso vascular con criterio clínico.</h1>
    <p class="lead" style="max-width:62ch">EBIME Colombia provee dispositivos de acceso vascular a instituciones de salud, con un enfoque que va más allá del suministro: la selección correcta del dispositivo, su inserción segura y su mantenimiento basado en evidencia.</p>
  </div><div class="rule"><span class="a"></span><span class="b"></span><span class="c"></span><span class="d"></span></div></section>

  <section class="block"><div class="wrap" style="max-width:760px">
    <h2 style="font-size:26px;font-weight:900;color:var(--navy);margin-bottom:12px">Quiénes somos</h2>
    <p style="font-size:17px;line-height:1.7;color:var(--gray);margin-bottom:20px">Somos una empresa dedicada al acceso vascular en Colombia. Acercamos a las IPS y hospitales catéteres venosos centrales de inserción central y periférica, puertos implantables y catéteres de hemodiálisis y diálisis peritoneal, junto con la formación y el acompañamiento necesarios para usarlos bien.</p>
    <p style="font-size:17px;line-height:1.7;color:var(--gray);margin-bottom:36px">Nuestra convicción es sencilla: la mayoría de las complicaciones del acceso vascular se previenen con una decisión correcta antes de puncionar. Por eso combinamos producto, formación y soporte clínico.</p>

    <div class="np-grid">
      <div class="np"><div class="np-b" style="background:#16A3C41a;color:#16A3C4">M</div><div><h3>Misión</h3><p>Mejorar la seguridad del acceso vascular en Colombia, entregando dispositivos de calidad y el conocimiento para usarlos correctamente.</p></div></div>
      <div class="np"><div class="np-b" style="background:#902D8E1a;color:#902D8E">V</div><div><h3>Visión</h3><p>Ser el aliado de referencia en acceso vascular para las instituciones de salud del país.</p></div></div>
    </div>

    <h2 style="font-size:26px;font-weight:900;color:var(--navy);margin:40px 0 16px">Nuestros valores</h2>
    <div class="cards" style="grid-template-columns:repeat(auto-fit,minmax(220px,1fr))">
      ${VALUES.map((v,i)=>`<div class="card" style="cursor:default"><div class="spine" style="background:${['#16A3C4','#902D8E','#54B24C'][i%3]}"></div><div class="card-body"><h3>${esc(v.t)}</h3><p>${esc(v.d)}</p></div></div>`).join('')}
    </div>
  </div></section>${ctaBand()}`;
}

/* ---------- Contacto ---------- */
function viewContacto(){
  return `<section class="block"><div class="wrap">
    <div class="sec-head"><div class="eyebrow">Contacto</div><h1 style="font-size:40px;font-weight:900;color:var(--navy)">Hablemos</h1>
      <p>Cuéntanos sobre tu institución y te contactamos con una propuesta a la medida.</p></div>

    <div class="contact-grid">
      <form onsubmit="return doContact(event)" style="background:#fff;border:1px solid var(--line);border-radius:4px;padding:28px">
        <div class="grid2">
          <div class="field-group"><label class="lb">Nombre</label><input class="inp" required></div>
          <div class="field-group"><label class="lb">Institución</label><input class="inp" required></div>
        </div>
        <div class="grid2">
          <div class="field-group"><label class="lb">Correo</label><input class="inp" type="email" required></div>
          <div class="field-group"><label class="lb">Teléfono</label><input class="inp"></div>
        </div>
        <div class="field-group"><label class="lb">¿En qué te podemos ayudar?</label><textarea class="inp" rows="4"></textarea></div>
        <button class="btn btn-solid" type="submit">Enviar mensaje</button>
      </form>

      <aside>
        <div class="aside-card"><h3>Escríbenos</h3>
          <p style="margin-bottom:14px"><a href="mailto:${CONTACT.email}" style="color:var(--navy);font-weight:600">${CONTACT.email}</a></p>
          <h3>Llámanos</h3>
          <p style="margin-bottom:14px"><a href="tel:${CONTACT.telefono.replace(/ /g,'')}" style="color:var(--navy);font-weight:600">${CONTACT.telefono}</a></p>
          <h3>Ubicación</h3>
          <p>${esc(CONTACT.ciudad)}</p>
        </div>
        <div class="aside-card" style="background:var(--navy);color:#fff;border:0">
          <h3 style="color:#fff">Formación clínica</h3>
          <p style="color:#C9D6F0">¿Buscas capacitar a tu equipo en acceso vascular? Conoce EBIME Lab, nuestra escuela.</p>
          <a class="btn btn-cyan" style="margin-top:12px" href="https://eblab.ebime.com.mx/" target="_blank" rel="noopener">Ir a Plataforma clínica de acceso vascular</a>
        </div>
      </aside>
    </div>
  </div></section>`;
}

function notFound(){
  return `<section class="block"><div class="wrap" style="text-align:center;padding-top:60px;padding-bottom:60px">
    <div class="eyebrow" style="color:var(--cyan)">Error 404</div>
    <h1 style="font-size:38px;font-weight:900;color:var(--navy);margin:10px 0">No encontramos esa página</h1>
    <a class="btn btn-cyan" href="#/">Volver al inicio</a>
  </div></section>`;
}

/* ---------- Acciones ---------- */
function doContact(e){ e.preventDefault(); toast('Mensaje enviado (demostración)'); e.target.reset(); return false; }

/* ---------- Lightbox de imagen ---------- */
function openLightbox(src, titulo){
  let lb = document.getElementById('lightbox');
  if(!lb){
    lb = document.createElement('div');
    lb.id = 'lightbox';
    lb.className = 'lightbox';
    lb.innerHTML = `<button class="lb-close" aria-label="Cerrar">✕</button>
      <figure class="lb-fig"><img class="lb-img" alt=""><figcaption class="lb-cap"></figcaption></figure>`;
    document.body.appendChild(lb);
    lb.addEventListener('click', e => { if(e.target === lb || e.target.classList.contains('lb-close')) closeLightbox(); });
    document.addEventListener('keydown', e => { if(e.key === 'Escape') closeLightbox(); });
  }
  lb.querySelector('.lb-img').src = src;
  lb.querySelector('.lb-cap').textContent = titulo || '';
  requestAnimationFrame(()=> lb.classList.add('show'));
  document.body.style.overflow = 'hidden';
}
function closeLightbox(){
  const lb = document.getElementById('lightbox');
  if(lb){ lb.classList.remove('show'); document.body.style.overflow=''; }
}

/* ==========================================================================
   ROUTER
   ========================================================================== */
function parseHash(){
  const raw=location.hash.replace(/^#\/?/,''); const [path,qs]=raw.split('?');
  const parts=path.split('/').filter(Boolean);
  const params={}; if(qs) qs.split('&').forEach(kv=>{const[k,v]=kv.split('=');params[k]=decodeURIComponent(v||'');});
  return {parts,params};
}

function render(){
  const {parts,params}=parseHash();
  const p0=parts[0]||'';
  let html, active=p0;
  switch(p0){
    case '': html=viewHome(); active=''; break;
    case 'productos': html=viewProductos(params); break;
    case 'servicios': html=viewServicios(); break;
    case 'nosotros': html=viewNosotros(); break;
    case 'contacto': html=viewContacto(); break;
    default: html=notFound();
  }
  $('#app').innerHTML=chrome(active,html);
  window.scrollTo(0,0);
}

function chrome(active,inner){
  const links=[['','Inicio'],['productos','Productos'],['servicios','Servicios'],['nosotros','Nosotros'],['contacto','Contacto']];
  const navlinks=links.map(([h,t])=>`<a class="${active===h?'active':''}" href="#/${h}">${t}</a>`).join('');
  const mlinks=links.map(([h,t])=>`<a onclick="closeMenu()" href="#/${h}">${t}</a>`).join('');

  return `
  <div class="rule"><span class="a"></span><span class="b"></span><span class="c"></span><span class="d"></span></div>
  <header>
    <div class="header-inner">
      <div class="wrap nav">
        <a class="logo" href="#/"><img src="${LOGO_COLOR}" alt="EBIME Colombia"></a>
        <ul class="nav-links">${navlinks}</ul>
        <div class="nav-actions">
          <a class="btn btn-solid" href="#/contacto">Contáctanos</a>
          <button class="menu-btn" onclick="toggleMenu()" aria-label="Menú">☰</button>
        </div>
      </div>
      <div class="mobile-menu" id="mmenu">
        ${mlinks}
        <a class="btn btn-solid mm-cta" href="#/contacto" onclick="closeMenu()">Contáctanos</a>
      </div>
    </div>
  </header>
  <main>${inner}</main>
  <footer><div class="wrap">
    <div class="foot-grid">
      <div class="foot-brand"><img src="${LOGO_WHITE}" alt="EBIME Colombia"><p>Soluciones de acceso vascular para instituciones de salud en Colombia.</p></div>
      <div><h4>Portafolio</h4><ul>${FAMILIES.map(f=>`<li><a href="#/productos?fam=${f.slug}">${esc(f.nombre)}</a></li>`).join('')}</ul></div>
      <div><h4>Empresa</h4><ul><li><a href="#/nosotros">Nosotros</a></li><li><a href="#/servicios">Servicios</a></li><li><a href="#/contacto">Contacto</a></li></ul></div>
      <div><h4>Contacto</h4><ul>
        <li><a href="mailto:${CONTACT.email}">${CONTACT.email}</a></li>
        <li><a href="tel:${CONTACT.telefono.replace(/ /g,'')}">${CONTACT.telefono}</a></li>
        <li>${esc(CONTACT.ciudad)}</li>
      </ul></div>
    </div>
    <div class="foot-bottom"><span>© ${new Date().getFullYear()} EBIME Colombia. Todos los derechos reservados.</span><span>Dispositivos de acceso vascular</span></div>
  </div><div class="rule"><span class="a"></span><span class="b"></span><span class="c"></span><span class="d"></span></div></footer>`;
}

function toggleMenu(){ $('#mmenu').classList.toggle('open'); }
function closeMenu(){ $('#mmenu')?.classList.remove('open'); }

window.addEventListener('hashchange',render);
window.addEventListener('DOMContentLoaded',render);
render();
