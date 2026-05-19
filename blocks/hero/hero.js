export default function decorate(block) {
  // Find the image in the block (could be in any row/column)
  const pic = block.querySelector('picture');
  const img = block.querySelector('img');

  if (pic || img) {
    const src = img?.src || img?.dataset?.src;
    if (src) {
      block.style.cssText += `background-image: url('${src}'); background-size: cover; background-position: center top;`;
    }
    // Remove the picture element so it doesn't render twice
    pic?.closest('div')?.remove() || img?.closest('div')?.remove();
  }

  // Add hero-content class to the remaining content div
  const contentDiv = block.querySelector(':scope > div > div');
  if (contentDiv) {
    contentDiv.closest('div').classList.add('hero-content-wrapper');
    contentDiv.classList.add('hero-content');
  }
}
