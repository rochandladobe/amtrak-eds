export default function decorate(block) {
  const tabList = document.createElement('div');
  tabList.setAttribute('role', 'tablist');
  tabList.classList.add('tabs-list');

  const panels = [];

  [...block.children].forEach((row, i) => {
    const [labelCell, contentCell] = [...row.children];
    const label = labelCell?.textContent?.trim() || `Tab ${i + 1}`;
    const id = label.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

    // Tab button
    const tab = document.createElement('button');
    tab.setAttribute('role', 'tab');
    tab.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
    tab.setAttribute('aria-controls', `panel-${id}`);
    tab.id = `tab-${id}`;
    tab.className = 'tabs-tab';
    tab.textContent = label;
    tabList.append(tab);

    // Panel
    const panel = document.createElement('div');
    panel.setAttribute('role', 'tabpanel');
    panel.setAttribute('aria-labelledby', `tab-${id}`);
    panel.id = `panel-${id}`;
    panel.className = 'tabs-panel';
    panel.hidden = i !== 0;
    if (contentCell) panel.append(...contentCell.children);
    panels.push(panel);
  });

  block.innerHTML = '';
  block.append(tabList);
  panels.forEach((p) => block.append(p));

  // Interaction
  tabList.addEventListener('click', (e) => {
    const tab = e.target.closest('[role=tab]');
    if (!tab) return;
    tabList.querySelectorAll('[role=tab]').forEach((t) => {
      t.setAttribute('aria-selected', 'false');
    });
    tab.setAttribute('aria-selected', 'true');
    block.querySelectorAll('[role=tabpanel]').forEach((p) => {
      p.hidden = p.id !== tab.getAttribute('aria-controls');
    });
  });
}
