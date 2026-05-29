document.addEventListener("DOMContentLoaded", function() {
  const lazyBackgrounds = [].slice.call(document.querySelectorAll('.slide[data-bg]'));

  if ("IntersectionObserver" in window) {
    let lazyBackgroundObserver = new IntersectionObserver(function(entries, observer) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          let slide = entry.target;
          let bg = slide.getAttribute('data-bg');
          if (bg) {
            slide.style.backgroundImage = "url('" + bg + "')";
            slide.removeAttribute('data-bg');
          }
          lazyBackgroundObserver.unobserve(slide);
        }
      });
    }, {
      rootMargin: "200px" // start loading a bit before visible
    });

    lazyBackgrounds.forEach(function(slide) {
      lazyBackgroundObserver.observe(slide);
    });
  } else {
    // Fallback for browsers without IntersectionObserver
    lazyBackgrounds.forEach(function(slide) {
      let bg = slide.getAttribute('data-bg');
      if (bg) {
        slide.style.backgroundImage = "url('" + bg + "')";
        slide.removeAttribute('data-bg');
      }
    });
  }
});