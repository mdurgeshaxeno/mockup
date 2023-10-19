export default function decorate(block) {
  /* change to div with class names */
  const tabSection = document.createElement('div');
  tabSection.className = 'tab-section';
  
  [...block.children].forEach((row) => {
    const tabItem = document.createElement('div');
    tabItem.className = 'tab-item';
    while (row.firstElementChild) tabItem.append(row.firstElementChild);
    
    const divs = [...tabItem.children];
    
    // Check the number of divs and assign classes accordingly
    if (divs.length === 2) {
      divs[0].className = 'tab-head';
      divs[1].className = 'tab-body';
    }

    tabSection.append(tabItem);
  });
  
  tabSection.querySelectorAll('img').forEach((img) => img.closest('picture').replaceWith(createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]));
  
  block.textContent = '';
  block.append(tabSection);
}
