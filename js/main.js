document.addEventListener('DOMContentLoaded', () => {
  const slides = document.querySelectorAll('.slide');
  const contents = document.querySelectorAll('.content');
  const dots = document.querySelectorAll('.dot');
  
  let currentIndex = 0;
  let autoPlayInterval;
  const autoPlayDelay = 5000; // 5 seconds

  function updateSlider(index) {
      // Remove all classes first
      slides.forEach(slide => {
          slide.classList.remove('active', 'prev', 'next');
      });
      contents.forEach(content => content.classList.remove('active'));
      dots.forEach(dot => dot.classList.remove('active'));

      // Calculate prev and next indices
      const prevIndex = (index - 1 + slides.length) % slides.length;
      const nextIndex = (index + 1) % slides.length;

      // Add appropriate classes
      slides[index].classList.add('active');
      slides[prevIndex].classList.add('prev');
      slides[nextIndex].classList.add('next');
      
      contents[index].classList.add('active');
      dots[index].classList.add('active');
  }

  function nextSlide() {
      currentIndex = (currentIndex + 1) % slides.length;
      updateSlider(currentIndex);
  }

  function startAutoPlay() {
      stopAutoPlay();
      autoPlayInterval = setInterval(nextSlide, autoPlayDelay);
  }

  function stopAutoPlay() {
      if (autoPlayInterval) {
          clearInterval(autoPlayInterval);
      }
  }

  // Event Listeners
  slides.forEach((slide, index) => {
      slide.addEventListener('click', () => {
          if (slide.classList.contains('prev')) {
              currentIndex = (currentIndex - 1 + slides.length) % slides.length;
          } else if (slide.classList.contains('next')) {
              currentIndex = (currentIndex + 1) % slides.length;
          } else {
              currentIndex = index;
          }
          updateSlider(currentIndex);
          startAutoPlay();
      });
  });

  dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
          currentIndex = index;
          updateSlider(currentIndex);
          startAutoPlay();
      });
  });

  // Start autoplay when page loads
  updateSlider(currentIndex);
  startAutoPlay();

  // Pause autoplay when hovering over slider
  document.querySelector('.slider-container').addEventListener('mouseenter', stopAutoPlay);
  document.querySelector('.slider-container').addEventListener('mouseleave', startAutoPlay);
});