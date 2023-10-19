import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  /* change to div */
  const div = document.createElement('div');
div.classList.add('owl-carousel', 'owl-theme', 'tabs-carousel-list');

[...block.children].forEach((row) => {
  const childDiv = document.createElement('div');
  childDiv.classList.add('tabs-carousel-item');
  
  // Generate a random number and add it to 'your-value-here'
  const randomNumber = Math.floor(Math.random() * 1000); // You can adjust the range as needed
  const dataDotValue = `tab-${randomNumber}`;
  
  childDiv.setAttribute('data-dot', dataDotValue);
  childDiv.innerHTML = row.innerHTML;

  [...childDiv.children].forEach((innerDiv, index) => {
    if (index === 0) {
      innerDiv.className = 'tabs-title';
    } else {
      innerDiv.className = 'tabs-body';
    }
  });

  div.append(childDiv);
});
  div.querySelectorAll('img').forEach((img) => img.closest('picture').replaceWith(createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }])));
  block.textContent = '';
  block.append(div);

  // Add the owl carousel script here
  $(document).ready(function () {
    var owl = $('.tabs-carousel-list');
    owl.owlCarousel({
      autoplay: false,
      dots: true,
      dotsData:true,
      loop: false,
      margin: 0,
      nav: false,
      autoHeight:true,
      items: 1
    });
    $('.owl-dot').click(function() {
      $('.owl-dot').trigger('to.owl.carousel', [$(this).index(), 1000]);
    });
  });
}
