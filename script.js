// MODIFICA QUI I DATI AZIENDALI: si aggiornano in tutte le pagine.
const COMPANY = {
  name: 'IDRAULICA G.B. DI GIORGIO BONADDIO',
  brand: 'Idraulica G.B.',
  phone: '+39 071 960 6446',
  address: 'Via Cascina Costa 6, Samarate (VA)',
  vat: '04085880120',
  email: 'info@idraulicagb.xyz'
};

document.querySelectorAll('[data-company]').forEach(el => {
  el.textContent = COMPANY[el.dataset.company] ?? '';
});
const phone = COMPANY.phone.replace(/[^+\d]/g, '');
document.querySelectorAll('[data-call]').forEach(link => { link.href = `tel:${phone}`; });
document.querySelectorAll('[data-email]').forEach(link => {
  link.hidden = !COMPANY.email;
  link.href = COMPANY.email ? `mailto:${COMPANY.email}` : '#';
  link.textContent = COMPANY.email;
  if (link.closest('.email-row')) link.closest('.email-row').hidden = !COMPANY.email;
});
document.querySelectorAll('[data-map]').forEach(link => { link.href = 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(COMPANY.address); });
document.querySelectorAll('[data-year]').forEach(el => { el.textContent = new Date().getFullYear(); });
document.title = `${document.body.dataset.pageTitle} | ${COMPANY.brand}`;
document.querySelector('meta[property="og:title"]').content = document.title;
const menu = document.querySelector('.menu-toggle');
const header = document.querySelector('header');
function closeMenu() { header.classList.remove('menu-open'); menu.setAttribute('aria-expanded','false'); menu.setAttribute('aria-label','Apri menu'); }
menu.addEventListener('click', () => {
  const open = menu.getAttribute('aria-expanded') !== 'true';
  header.classList.toggle('menu-open',open);
  menu.setAttribute('aria-expanded', String(open));
  menu.setAttribute('aria-label', open ? 'Chiudi menu' : 'Apri menu');
});
document.querySelectorAll('nav a').forEach(link => link.addEventListener('click',closeMenu));
document.addEventListener('keydown',event => { if(event.key === 'Escape') closeMenu(); });
document.addEventListener('click',event => { if(!header.contains(event.target)) closeMenu(); });

// Search and social metadata stay aligned with shared company contact settings.
const SEO_PAGES = {"index.html":{"title":"Riscaldamento e idraulica a Samarate | Idraulica G.B.","description":"Impianti idraulici e riscaldamento a Samarate e in provincia di Varese. Caldaie, pompe di calore, bagni e climatizzazione. Contatta Idraulica G.B."},"installazione-caldaie.html":{"title":"Installazione caldaie a Samarate | Idraulica G.B.","description":"Installazione e sostituzione caldaie a Samarate e in provincia di Varese. Contatta Idraulica G.B. per valutare il tuo impianto e concordare un intervento."},"pompe-di-calore.html":{"title":"Pompe di calore a Samarate e Varese | Idraulica G.B.","description":"Installazione pompe di calore a Samarate e in provincia di Varese. Valutazione della compatibilità con il tuo immobile e il tuo impianto. Chiamaci."},"ristrutturazione-bagno.html":{"title":"Ristrutturazione bagno a Samarate | Idraulica G.B.","description":"Impianti idraulici, sanitari e rubinetteria per il tuo bagno a Samarate e in provincia di Varese. Contatta Idraulica G.B. per parlare del tuo progetto."},"climatizzazione.html":{"title":"Climatizzazione a Samarate e Varese | Idraulica G.B.","description":"Installazione e manutenzione climatizzatori a Samarate e in provincia di Varese, per casa e ambienti professionali. Contatta Idraulica G.B."},"contatti.html":{"title":"Contatti e telefono | Idraulica G.B. Samarate","description":"Contatta Idraulica G.B. di Giorgio Bonaddio: +39 071 960 6446. Via Cascina Costa 6, Samarate (VA). Informazioni sui servizi e disponibilità."},"privacy.html":{"title":"Privacy e cookie | Idraulica G.B.","description":"Informazioni sulla privacy, sulla navigazione e sui collegamenti esterni del sito di Idraulica G.B. di Giorgio Bonaddio, a Samarate."}};
const pageFile = location.pathname.split('/').pop() || 'index.html';
const pageSEO = SEO_PAGES[pageFile] || SEO_PAGES['index.html'];
document.title = pageSEO.title;
document.querySelector('meta[name="description"]').content = pageSEO.description;
const structuredData = document.getElementById('business-schema');
if (structuredData) {
 const schema = JSON.parse(structuredData.textContent);
 const business = schema['@graph'].find(item => item['@type'] === 'Plumber');
 business.name = COMPANY.name;
 business.telephone = COMPANY.phone.replace(/[^+\d]/g, '').replace(/^0/, '+44');
 business.email = COMPANY.email;
 business.vatID = COMPANY.vat;
 structuredData.textContent = JSON.stringify(schema);
}
