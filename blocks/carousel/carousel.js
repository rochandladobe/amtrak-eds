export default function decorate(block) {
  const slides = [...block.children];
  const wrapper = document.createElement('div');
  wrapper.className = 'carousel-wrapper';

  const track = document.createElement('div');
  track.className = 'carousel-track';

  slides.forEach((slide, i) => {
    slide.className = 'carousel-slide';
    slide.dataset.index = i;

    // Extract background image from any img/picture in the slide
    const img = slide.querySelector('img');
    if (img) {
      const src = img.src || img.dataset.src;
      if (src) {
        slide.style.backgroundImage = `url('${src}')`;
      }
      img.closest('picture')?.remove() || img.remove();
    }

    track.append(slide);
  });

  const prevBtn = document.createElement('button');
  prevBtn.className = 'carousel-btn carousel-btn-prev';
  prevBtn.setAttribute('aria-label', 'Previous slide');
  prevBtn.innerHTML = '&#8249;';

  const nextBtn = document.createElement('button');
  nextBtn.className = 'carousel-btn carousel-btn-next';
  nextBtn.setAttribute('aria-label', 'Next slide');
  nextBtn.innerHTML = '&#8250;';

  const dots = document.createElement('div');
  dots.className = 'carousel-dots';
  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'carousel-dot';
    dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goTo(i));
    dots.append(dot);
  });

  let current = 0;

  function goTo(index) {
    current = (index + slides.length) % slides.length;
    track.style.transform = `translateX(-${current * 100}%)`;
    dots.querySelectorAll('.carousel-dot').forEach((d, i) => {
      d.classList.toggle('active', i === current);
    });
  }

  prevBtn.addEventListener('click', () => goTo(current - 1));
  nextBtn.addEventListener('click', () => goTo(current + 1));

  wrapper.append(prevBtn, track, nextBtn);
  block.innerHTML = '';
  block.append(wrapper, dots);
}
