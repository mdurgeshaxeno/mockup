import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  /* change to div */
  const div = document.createElement('div');
  div.classList.add('owl-carousel', 'owl-theme', 'banner-carousel-list');
  [...block.children].forEach((row) => {
    const childDiv = document.createElement('div');
    childDiv.innerHTML = row.innerHTML;
    [...childDiv.children].forEach((innerDiv) => {
      if (innerDiv.children.length === 1 && innerDiv.querySelector('picture')) innerDiv.className = 'banner-image';
      else innerDiv.className = 'banner-body';
    });
    div.append(childDiv);
  });
  div.querySelectorAll('img').forEach((img) => img.closest('picture').replaceWith(createOptimizedPicture(img.src, img.alt, false, [{ width: '1024' }])));
  block.textContent = '';
  block.append(div);

  // Add the owl carousel script here
  $(document).ready(function() {
    var owl = $('.banner-carousel-list');
    owl.owlCarousel({
      loop: true,
      margin: 0,
      items: 1,
      dots: true,
      nav: false,
      autoplay: true,
      autoplayTimeout: 5000,
      autoplayHoverPause: true
    });
  });
}
