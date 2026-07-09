document.querySelectorAll('.project-gallery').forEach(function (gallery) {
  var slides = gallery.querySelectorAll('.gallery-slide');
  var thumbs = gallery.querySelectorAll('.gallery-thumb');
  var interval = parseInt(gallery.getAttribute('data-interval') || '5000', 10);
  var current = 0;
  var timer;

  function show(index) {
    current = (index + slides.length) % slides.length;
    slides.forEach(function (s, i) { s.classList.toggle('active', i === current); });
    thumbs.forEach(function (t, i) { t.classList.toggle('active', i === current); });
  }

  function next() { show(current + 1); }
  function prev() { show(current - 1); }

  function resetTimer() {
    clearInterval(timer);
    if (slides.length > 1) timer = setInterval(next, interval);
  }

  var prevBtn = gallery.querySelector('.gallery-prev');
  var nextBtn = gallery.querySelector('.gallery-next');
  if (prevBtn) prevBtn.addEventListener('click', function () { prev(); resetTimer(); });
  if (nextBtn) nextBtn.addEventListener('click', function () { next(); resetTimer(); });
  thumbs.forEach(function (t, i) {
    t.addEventListener('click', function () { show(i); resetTimer(); });
  });

  show(0);
  resetTimer();
});

document.querySelectorAll('.filmstrip-gallery').forEach(function (gallery) {
  var track = gallery.querySelector('.filmstrip-track');
  var header = gallery.previousElementSibling;
  var prevBtn = header && header.querySelector('.filmstrip-prev');
  var nextBtn = header && header.querySelector('.filmstrip-next');
  if (!track) return;

  var interval = 5000;
  var timer;

  function atEnd() {
    return track.scrollLeft + track.clientWidth >= track.scrollWidth - 1;
  }

  function advance() {
    if (atEnd()) {
      track.scrollTo({ left: 0, behavior: 'smooth' });
    } else {
      track.scrollBy({ left: track.clientWidth, behavior: 'smooth' });
    }
  }

  function retreat() {
    track.scrollBy({ left: -track.clientWidth, behavior: 'smooth' });
  }

  function resetTimer() {
    clearInterval(timer);
    if (track.scrollWidth > track.clientWidth) timer = setInterval(advance, interval);
  }

  if (prevBtn) prevBtn.addEventListener('click', function () { retreat(); resetTimer(); });
  if (nextBtn) nextBtn.addEventListener('click', function () { advance(); resetTimer(); });

  resetTimer();
});
