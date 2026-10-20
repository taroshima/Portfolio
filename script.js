// Preserve links to sections from the previous single-page portfolio.
const legacyPages = {
  '#work': 'projects.html',
  '#project-lab': 'projects.html',
  '#experience': 'experience.html',
  '#about': 'education.html',
  '#education': 'education.html'
};
const isHome = /\/(?:index\.html)?$/.test(window.location.pathname);
if (isHome && legacyPages[window.location.hash]) {
  window.location.replace(legacyPages[window.location.hash]);
}

// Animate the actual disclosure height in both directions. Native details remain
// available without JS; interrupted transitions restart from the visible height.
const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
if (typeof Element.prototype.animate === 'function') {
  document.querySelectorAll('details').forEach((details) => {
    const summary = details.querySelector('summary');
    let animation = null;
    let expanded = details.open;

    const finish = () => {
      details.open = expanded;
      animation = null;
      details.classList.remove('is-animating', 'is-closing');
      summary.setAttribute('aria-expanded', String(expanded));
    };
    const settle = () => {
      if (animation) {
        animation.cancel();
        finish();
      }
    };

    summary.addEventListener('click', (event) => {
      event.preventDefault();
      const startHeight = details.getBoundingClientRect().height;
      if (animation) animation.cancel();
      expanded = !expanded;
      summary.setAttribute('aria-expanded', String(expanded));
      if (motionPreference.matches) {
        finish();
        return;
      }

      // Measure the native destination, then keep content rendered while closing.
      details.classList.remove('is-animating', 'is-closing');
      details.open = expanded;
      const endHeight = details.getBoundingClientRect().height;
      details.open = true;
      details.classList.add('is-animating');
      details.classList.toggle('is-closing', !expanded);
      animation = details.animate(
        { height: [`${startHeight}px`, `${endHeight}px`] },
        { duration: 320, easing: 'cubic-bezier(0.22, 1, 0.36, 1)' }
      );
      animation.onfinish = finish;
    });
    window.addEventListener('resize', settle);
    motionPreference.addEventListener('change', settle);
  });
}
