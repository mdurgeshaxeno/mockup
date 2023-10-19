import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  /* change to div */
const div = document.createElement('div');
div.classList.add('owl-carousel', 'owl-theme', 'tabs-carousel-list');

const dataDotValues = []; // Store data-dot values

[...block.children].forEach((row) => {
  const childDiv = document.createElement('div');
  childDiv.classList.add('tabs-carousel-item');
  childDiv.innerHTML = row.innerHTML;

  const titleElements = [...childDiv.querySelectorAll('.tabs-title')];
  
  if (titleElements.length > 0) {
    const dataDotValue = titleElements.map((titleElement) => titleElement.textContent).join(' '); // Concatenate the content of all 'tabs-title' elements
    dataDotValues.push(dataDotValue);
  }

  [...childDiv.children].forEach((innerDiv, index) => {
    if (index === 0) {
      innerDiv.className = 'tabs-title';
    } else {
      innerDiv.className = 'tabs-body';
    }
  });

  div.append(childDiv);
});

// Set the 'data-dot' attribute to the concatenated values
div.setAttribute('data-dot', dataDotValues.join(' '));

div.querySelectorAll('img').forEach((img) => img.closest('picture').replaceWith(createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]));

block.textContent = '';
block.append(div);


  // Add the owl carousel script here
  $(document).ready(function () {
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
          items: 1,
        },
        600: {
          items: 1,
        },
        1000: {
          items: 1,
        },
      },
    });
  });
}
