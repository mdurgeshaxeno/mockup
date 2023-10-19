import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  /* change to div with class names */
  const tabSection = document.createElement('div');
  tabSection.className = 'tab-section';
  
  [...block.children].forEach((row) => {
    const tabItem = document.createElement('div');
    tabItem.className = 'tab-item';
    while (row.firstElementChild) {
      const div = document.createElement('div');
      div.className = 'tab-content';
      div.appendChild(row.firstElementChild);
      tabItem.append(div);
    }
    
    tabSection.append(tabItem);
  });
  
  tabSection.querySelectorAll('img').forEach((img) => img.closest('picture').replaceWith(createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]));
  
  block.textContent = '';
  block.append(tabSection);
}
