import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  /* change to div */
  const div = document.createElement('div');
  div.classList.add('owl-carousel', 'owl-theme', 'tabs-carousel-list');
  [...block.children].forEach((row, index) => { // Add an index parameter to track the slide number
    const childDiv = document.createElement('div');
    childDiv.classList.add('tabs-carousel-item');
    childDiv.innerHTML = row.innerHTML;
    const firstColumnTitle = row.querySelector('.your-first-column-selector').innerText; // Replace with your first column selector
    [...childDiv.children].forEach((innerDiv) => {
      if (innerDiv.children.length === 1 && innerDiv.querySelector('picture')) innerDiv.className = 'tabs-image';
      else innerDiv.className = 'tabs-body';
    });

    // Set the data-dot attribute of the slide with the first column title
    if (index === 0) {
      childDiv.setAttribute('data-dot', firstColumnTitle);
    }
    div.append(childDiv);
  });
  div.querySelectorAll('img').forEach((img) => img.closest('picture').replaceWith(createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }])));
  block.textContent = '';
  block.append(div);

  // Add the owl carousel script here
  $(document).ready(function() {
    var owl = $('.tabs-carousel-list');
    owl.owlCarousel({
      loop: false,
      margin: 10,
      dots: true,
      dotsData: true,
      nav: false,
      autoplay: false,
      responsiveClass: true,
      responsive: {
        0: {
          items: 1
        },
        600: {
          items: 1
        },
        1000: {
          items: 1
        }
      }
    });
  });
}
