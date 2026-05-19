export default function decorate(block) {
  const section = block.closest('.section');
  if (!section) return;

  // Walk all divs inside the block looking for key/value pairs
  block.querySelectorAll(':scope > div').forEach((row) => {
    const cells = [...row.children];
    if (cells.length >= 2) {
      const key = cells[0]?.textContent?.trim().toLowerCase();
      const value = cells[1]?.textContent?.trim().toLowerCase();
      if (key && value) {
        section.classList.add(value);
      }
    }
  });

  section.classList.add('section-metadata-applied');
  block.remove();
}
