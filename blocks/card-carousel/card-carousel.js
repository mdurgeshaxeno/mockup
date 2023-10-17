import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  /* change to div */
  const div = document.createElement('div');
  div.classList.add('owl-carousel', 'owl-theme', 'card-carousel-list');
  [...block.children].forEach((row) => {
    const childDiv = document.createElement('div');
    childDiv.classList.add('banner-carousel-item');
    childDiv.innerHTML = row.innerHTML;
    [...childDiv.children].forEach((innerDiv) => {
      if (innerDiv.children.length === 1 && innerDiv.querySelector('picture')) innerDiv.className = 'cards-card-image';
      else innerDiv.className = 'cards-card-body';
    });
    div.append(childDiv);
  });
  div.querySelectorAll('img').forEach((img) => img.closest('picture').replaceWith(createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }])));
  block.textContent = '';
  block.append(div);

  // Add the owl carousel script here
  $(document).ready(function() {
    var owl = $('.card-carousel-list');
    owl.owlCarousel({
      loop: true,
      margin: 10,
      dots: false,
      nav: true,
      autoplay: false,
      responsiveClass: true,
      responsive: {
        0: {
          items: 1
        },
        600: {
          items: 2
        },
        1000: {
          items: 4
        }
      }
    });
  });
}
