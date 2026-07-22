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
  return `<a class="prod-card" href="#/productos?fam=${f.slug}">
    <div class="prod-top">
      <div class="prod-code">${esc(f.codigo)}</div>
      <h3 class="prod-name">${esc(f.nombre)}</h3>
      <p class="prod-desc">${esc(f.resumen)}</p>
      <div class="prod-brands">
        ${f.marcas.map(m=>`<span class="prod-brand">${esc(m.n)}</span>`).join('')}
      </div>
    </div>
    <div class="prod-img" style="background-image:url('${window.__IMG__?.[f.img]||f.img}')"></div>
    <span class="prod-cta">Ver productos ›</span>
  </a>`;
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
    <a class="prod-card" href="#/productos?fam=${f.slug}">
      <div class="prod-top">
        <div class="prod-code">${esc(f.codigo)}</div>
        <h3 class="prod-name">${esc(f.nombre)}</h3>
        <p class="prod-desc">${esc(f.resumen)}</p>
        <div class="prod-brands">
          ${f.marcas.map(m=>`<span class="prod-brand">${esc(m.n)}</span>`).join('')}
        </div>
      </div>
      <div class="prod-img" style="background-image:url('${window.__IMG__?.[f.img]||f.img}')"></div>
      <span class="prod-cta">Ver productos ›</span>
    </a>`).join('');

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
        // Clave de la imagen mejorada para el lightbox (se resuelve dentro de openLightbox)
        const lbKey = p.img ? (window.__IMG__?.['lb-'+p.img] ? 'lb-'+p.img : p.img) : '';
        const ficha = p.ficha || f.ficha;
        const nombreJs = esc(p.nombre).replace(/'/g,"\\'");
        return `<div class="card" style="cursor:default"><div class="spine" style="background:${f.accent}"></div>
        ${p.img?`<div class="prod-img prod-img-click" style="height:180px;background-image:url('${src}')" onclick="openLightbox('${lbKey}','${nombreJs}')" title="Ampliar imagen">
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
          <p style="margin-bottom:18px">${esc(CONTACT.ciudad)}</p>
          <a class="btn btn-wa btn-block" href="https://wa.me/message/M7GSQHV3ECSRJ1" target="_blank" rel="noopener">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true"><path d="M17.5 14.4c-.3-.2-1.7-.8-2-.9-.3-.1-.5-.2-.7.2-.2.3-.7.9-.9 1.1-.2.2-.3.2-.6.1-.3-.2-1.2-.5-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5 0-.1-.7-1.7-1-2.3-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.2.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.7-.7 2-1.4.2-.7.2-1.2.2-1.4-.1-.1-.3-.2-.6-.3zM12 2C6.5 2 2 6.5 2 12c0 1.8.5 3.4 1.3 4.9L2 22l5.3-1.4c1.4.8 3 1.2 4.7 1.2 5.5 0 10-4.5 10-10S17.5 2 12 2zm0 18c-1.5 0-3-.4-4.3-1.2l-.3-.2-3.1.8.8-3-.2-.3C4.4 15.4 4 13.7 4 12c0-4.4 3.6-8 8-8s8 3.6 8 8-3.6 8-8 8z"/></svg>
            Escríbenos por WhatsApp
          </a>
          <div class="social" style="margin-top:16px">${socialLinks()}</div>
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
function openLightbox(key, titulo){
  // key puede ser una clave de __IMG__ (ej. 'lb-prod-chd.jpg') o una URL directa
  const src = (window.__IMG__ && window.__IMG__[key]) ? window.__IMG__[key] : key;

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
      <div class="foot-brand"><img src="${LOGO_WHITE}" alt="EBIME Colombia"><p>Soluciones de acceso vascular para instituciones de salud en Colombia.</p>
        <div class="social">${socialLinks()}</div>
      </div>
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

/* Íconos de redes sociales — WhatsApp, Instagram, TikTok */
function socialLinks(){
  const wa = `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.5 14.4c-.3-.2-1.7-.8-2-.9-.3-.1-.5-.2-.7.2-.2.3-.7.9-.9 1.1-.2.2-.3.2-.6.1-.3-.2-1.2-.5-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5 0-.1-.7-1.7-1-2.3-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.2.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.7-.7 2-1.4.2-.7.2-1.2.2-1.4-.1-.1-.3-.2-.6-.3zM12 2C6.5 2 2 6.5 2 12c0 1.8.5 3.4 1.3 4.9L2 22l5.3-1.4c1.4.8 3 1.2 4.7 1.2 5.5 0 10-4.5 10-10S17.5 2 12 2z"/></svg>`;
  const ig = `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2.2c3.2 0 3.6 0 4.9.1 1.2.1 1.8.3 2.2.4.6.2 1 .5 1.4.9.4.4.7.8.9 1.4.2.4.4 1 .4 2.2.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c-.1 1.2-.3 1.8-.4 2.2-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.4.2-1 .4-2.2.4-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2-.1-1.8-.3-2.2-.4-.6-.2-1-.5-1.4-.9-.4-.4-.7-.8-.9-1.4-.2-.4-.4-1-.4-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.9c.1-1.2.3-1.8.4-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.2 1-.4 2.2-.4C8.4 2.2 8.8 2.2 12 2.2zm0 1.8c-3.1 0-3.5 0-4.7.1-1.1.1-1.7.2-2.1.4-.5.2-.9.4-1.3.8-.4.4-.6.8-.8 1.3-.2.4-.3 1-.4 2.1-.1 1.2-.1 1.6-.1 4.7s0 3.5.1 4.7c.1 1.1.2 1.7.4 2.1.2.5.4.9.8 1.3.4.4.8.6 1.3.8.4.2 1 .3 2.1.4 1.2.1 1.6.1 4.7.1s3.5 0 4.7-.1c1.1-.1 1.7-.2 2.1-.4.5-.2.9-.4 1.3-.8.4-.4.6-.8.8-1.3.2-.4.3-1 .4-2.1.1-1.2.1-1.6.1-4.7s0-3.5-.1-4.7c-.1-1.1-.2-1.7-.4-2.1-.2-.5-.4-.9-.8-1.3-.4-.4-.8-.6-1.3-.8-.4-.2-1-.3-2.1-.4-1.2-.1-1.6-.1-4.7-.1zm0 3.1a4.9 4.9 0 1 1 0 9.8 4.9 4.9 0 0 1 0-9.8zm0 8a3.1 3.1 0 1 0 0-6.2 3.1 3.1 0 0 0 0 6.2zm6.3-8.2a1.15 1.15 0 1 1-2.3 0 1.15 1.15 0 0 1 2.3 0z"/></svg>`;
  const tt = `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M16.6 5.8c-.9-1-1.4-2.3-1.4-3.8h-3.1v12.4c0 1.5-1.2 2.7-2.7 2.7a2.7 2.7 0 0 1 0-5.4c.3 0 .6 0 .8.1V8.6c-.3 0-.5-.1-.8-.1a5.8 5.8 0 1 0 5.8 5.8V8.2c1.2.9 2.6 1.4 4.2 1.4V6.5c-1 0-2-.3-2.8-.7z"/></svg>`;
  return `
    <a href="${CONTACT.whatsapp}" target="_blank" rel="noopener" aria-label="WhatsApp" class="social-ico">${wa}</a>
    <a href="${CONTACT.instagram}" target="_blank" rel="noopener" aria-label="Instagram" class="social-ico">${ig}</a>
    <a href="${CONTACT.tiktok}" target="_blank" rel="noopener" aria-label="TikTok" class="social-ico">${tt}</a>`;
}

function toggleMenu(){ $('#mmenu').classList.toggle('open'); }
function closeMenu(){ $('#mmenu')?.classList.remove('open'); }

window.addEventListener('hashchange',render);
window.addEventListener('DOMContentLoaded',render);
render();
