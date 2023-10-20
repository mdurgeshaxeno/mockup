import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  /* change to div */
  const div = document.createElement('div');
div.classList.add('owl-carousel', 'owl-theme', 'tabs-carousel-list');

[...block.children].forEach((row) => {
  const childDiv = document.createElement('div');
  childDiv.classList.add('tabs-carousel-item');
  
  // Generate a random number and add it to 'your-value-here'
  const randomNumber = Math.floor(Math.random() * 10); // You can adjust the range as needed
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
    // Get the source and target div elements by their classes
    var sourceDiv1 = $('.owl-stage .owl-item:nth-child(1) .tabs-carousel-item .tabs-title');
    var targetDiv1 = $('.owl-dots .owl-dot:nth-child(1)');
    var sourceDiv2 = $('.owl-stage .owl-item:nth-child(2) .tabs-carousel-item .tabs-title');
    var targetDiv2 = $('.owl-dots .owl-dot:nth-child(2)');
    var sourceDiv3 = $('.owl-stage .owl-item:nth-child(3) .tabs-carousel-item .tabs-title');
    var targetDiv3 = $('.owl-dots .owl-dot:nth-child(3)');
    
    if (sourceDiv1.length > 0 && targetDiv1.length > 0) {
      // Append the text from the source div to the target div
      targetDiv1.html(sourceDiv1.html());
    }
    if (sourceDiv2.length > 0 && targetDiv2.length > 0) {
      // Append the text from the source div to the target div
      targetDiv2.html(sourceDiv2.html());
    }
    if (sourceDiv3.length > 0 && targetDiv3.length > 0) {
      // Append the text from the source div to the target div
      targetDiv3.html(sourceDiv3.html());
    }
    
  });
}
