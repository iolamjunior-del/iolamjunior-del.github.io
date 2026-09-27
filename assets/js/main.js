/* Iolam Júnior Engenharia — interações leves (sem dependências) */
(function () {
  document.documentElement.classList.add('js');

  // Menu mobile
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  // Revelação suave ao rolar (o conteúdo já nasce visível sem JS)
  var items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && items.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    items.forEach(function (el) {
      var r = el.getBoundingClientRect();
      if (r.top < window.innerHeight) el.classList.add('in'); else io.observe(el);
    });
  } else {
    items.forEach(function (el) { el.classList.add('in'); });
  }

  // Lightbox para galerias
  var links = Array.prototype.slice.call(document.querySelectorAll('.gallery a, .portfolio a'));
  if (links.length) {
    var lb = document.createElement('div');
    lb.className = 'lightbox';
    lb.setAttribute('role', 'dialog');
    lb.setAttribute('aria-label', 'Imagem ampliada');
    lb.innerHTML = '<button type="button" class="close" aria-label="Fechar">&times;</button>' +
      '<button type="button" class="prev" aria-label="Anterior">&#8249;</button>' +
      '<img alt=""><div class="cap"></div>' +
      '<button type="button" class="next" aria-label="Próxima">&#8250;</button>';
    document.body.appendChild(lb);
    var img = lb.querySelector('img'), cap = lb.querySelector('.cap');
    var current = 0;
    function show(i) {
      current = (i + links.length) % links.length;
      var a = links[current];
      img.src = a.getAttribute('href');
      img.alt = a.querySelector('img') ? a.querySelector('img').alt : '';
      cap.textContent = a.getAttribute('data-cap') || img.alt;
      lb.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
    function hide() { lb.classList.remove('open'); document.body.style.overflow = ''; }
    links.forEach(function (a, i) {
      a.addEventListener('click', function (ev) { ev.preventDefault(); show(i); });
    });
    lb.querySelector('.close').addEventListener('click', hide);
    lb.querySelector('.prev').addEventListener('click', function () { show(current - 1); });
    lb.querySelector('.next').addEventListener('click', function () { show(current + 1); });
    lb.addEventListener('click', function (e) { if (e.target === lb) hide(); });
    document.addEventListener('keydown', function (e) {
      if (!lb.classList.contains('open')) return;
      if (e.key === 'Escape') hide();
      if (e.key === 'ArrowLeft') show(current - 1);
      if (e.key === 'ArrowRight') show(current + 1);
    });
  }

  // Formulário de contato → mensagem pronta no WhatsApp (sem servidor)
  var form = document.getElementById('form-contato');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var d = new FormData(form);
      var msg = 'Olá, Iolam Júnior Engenharia!\n' +
        'Nome: ' + (d.get('nome') || '') + '\n' +
        'Cidade: ' + (d.get('cidade') || '') + '\n' +
        'Interesse: ' + (d.get('interesse') || '') + '\n' +
        'Mensagem: ' + (d.get('mensagem') || '');
      var url = 'https://wa.me/5585999283939?text=' + encodeURIComponent(msg);
      window.open(url, '_blank', 'noopener');
      var ok = document.getElementById('form-ok');
      if (ok) ok.hidden = false;
    });
  }
})();
