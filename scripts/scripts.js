/**
 * Amtrak EDS - scripts.js
 * Standard Franklin/EDS boilerplate
 */

/*
 * ------------------------------------------------------------
 * Edit below at your own risk
 * ------------------------------------------------------------
 */

const LCP_BLOCKS = ['hero', 'booking-widget'];

window.hlx = window.hlx || {};
window.hlx.RUM_MASK_URL = 'full';
window.hlx.codeBasePath = '';
window.hlx.lighthouse = new URLSearchParams(window.location.search).get('lighthouse') === 'on';

/**
 * Builds a block DOM element from a two-dimensional array.
 */
function buildBlock(blockName, content) {
  const table = Array.isArray(content) ? content : [[content]];
  const blockEl = document.createElement('div');
  blockEl.classList.add(blockName);
  table.forEach((row) => {
    const rowEl = document.createElement('div');
    (Array.isArray(row) ? row : [row]).forEach((col) => {
      const colEl = document.createElement('div');
      colEl.append(...(Array.isArray(col) ? col : [col]));
      rowEl.append(colEl);
    });
    blockEl.append(rowEl);
  });
  return blockEl;
}

/**
 * Loads JS and CSS for a module.
 */
async function loadModule(name, cssPath, jsPath) {
  const cssLoaded = cssPath
    ? new Promise((resolve) => {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = cssPath;
        link.onload = resolve;
        link.onerror = resolve;
        document.head.append(link);
      })
    : Promise.resolve();

  const jsLoaded = jsPath
    ? import(jsPath)
    : Promise.resolve();

  return Promise.all([cssLoaded, jsLoaded]);
}

/**
 * Decorates all sections in the document.
 */
function decorateSections(main) {
  main.querySelectorAll(':scope > div').forEach((section) => {
    const wrappers = [];
    let defaultContent = false;
    [...section.children].forEach((e) => {
      if (e.tagName === 'DIV' || !defaultContent) {
        const wrapper = document.createElement('div');
        wrappers.push(wrapper);
        defaultContent = e.tagName !== 'DIV';
        if (defaultContent) wrapper.classList.add('default-content-wrapper');
      }
      wrappers[wrappers.length - 1].append(e);
    });
    wrappers.forEach((wrapper) => section.append(wrapper));
    section.classList.add('section');
    section.dataset.sectionStatus = 'initialized';
    section.style.display = 'none';
  });
}

/**
 * Updates all section status.
 */
function updateSectionsStatus(main) {
  const sections = [...main.querySelectorAll(':scope > .section')];
  for (let i = 0; i < sections.length; i += 1) {
    const section = sections[i];
    const status = section.dataset.sectionStatus;
    if (status !== 'loaded') {
      const loadingBlock = section.querySelector('.block[data-block-status="initialized"],.block[data-block-status="loading"]');
      if (loadingBlock) break;
      section.dataset.sectionStatus = 'loaded';
      section.style.removeProperty('display');
    }
  }
}

/**
 * Gets the configuration for a block.
 */
function getBlockConfig(block) {
  const classes = [...block.classList];
  const name = classes[0];
  const options = classes.slice(1).filter((c) => c !== name);
  return { name, options };
}

/**
 * Decorates a block by adding proper class names.
 */
function decorateBlock(block) {
  const { name, options } = getBlockConfig(block);
  block.classList.add(name, ...options);
  block.classList.add('block');
  block.dataset.blockName = name;
  block.dataset.blockStatus = 'initialized';
  const section = block.closest('.section');
  if (section) section.classList.add(`${name}-container`);
}

/**
 * Decorates all blocks in the document.
 */
function decorateBlocks(main) {
  main.querySelectorAll('div.section > div > div').forEach(decorateBlock);
}

/**
 * Decorates buttons in the document.
 */
function decorateButtons(main) {
  main.querySelectorAll('a').forEach((a) => {
    a.title = a.title || a.textContent;
    if (a.href !== a.textContent) {
      const up = a.parentElement;
      const twoup = a.parentElement.parentElement;
      if (!a.querySelector('img')) {
        if (up.childElementCount === 1 && (up.tagName === 'P' || up.tagName === 'DIV')) {
          a.className = 'button';
          up.classList.add('button-container');
        }
        if (
          up.childElementCount === 1
          && up.tagName === 'STRONG'
          && twoup.childElementCount === 1
          && twoup.tagName === 'P'
        ) {
          a.className = 'button primary';
          twoup.classList.add('button-container');
        }
        if (
          up.childElementCount === 1
          && up.tagName === 'EM'
          && twoup.childElementCount === 1
          && twoup.tagName === 'P'
        ) {
          a.className = 'button secondary';
          twoup.classList.add('button-container');
        }
      }
    }
  });
}

/**
 * Decorates icons in the document.
 */
function decorateIcons(main) {
  main.querySelectorAll('span.icon').forEach(async (span) => {
    if (span.classList.length < 2 || !span.classList[1].startsWith('icon-')) return;
    const icon = span.classList[1].substring(5);
    const resp = await fetch(`${window.hlx.codeBasePath}/icons/${icon}.svg`);
    if (resp.ok) {
      const iconHTML = await resp.text();
      if (iconHTML.includes('<svg')) {
        span.innerHTML = iconHTML;
      }
    }
  });
}

/**
 * Loads a block's JS and CSS.
 */
async function loadBlock(block) {
  const status = block.dataset.blockStatus;
  if (status !== 'loading' && status !== 'loaded') {
    block.dataset.blockStatus = 'loading';
    const { blockName } = block.dataset;
    try {
      const cssPath = `${window.hlx.codeBasePath}/blocks/${blockName}/${blockName}.css`;
      const jsPath = `${window.hlx.codeBasePath}/blocks/${blockName}/${blockName}.js`;
      const [, mod] = await loadModule(blockName, cssPath, jsPath);
      if (mod && mod.default) {
        await mod.default(block);
      }
    } catch (error) {
      console.error(`Failed loading ${blockName}`, error);
    }
    block.dataset.blockStatus = 'loaded';
  }
  return block;
}

/**
 * Loads all blocks in the document.
 */
async function loadBlocks(main) {
  updateSectionsStatus(main);
  const blocks = [...main.querySelectorAll('.block')];
  for (let i = 0; i < blocks.length; i += 1) {
    // eslint-disable-next-line no-await-in-loop
    await loadBlock(blocks[i]);
    updateSectionsStatus(main);
  }
}

/**
 * Loads the header block.
 */
async function loadHeader(header) {
  const headerBlock = buildBlock('header', '');
  header.append(headerBlock);
  decorateBlock(headerBlock);
  return loadBlock(headerBlock);
}

/**
 * Loads the footer block.
 */
async function loadFooter(footer) {
  const footerBlock = buildBlock('footer', '');
  footer.append(footerBlock);
  decorateBlock(footerBlock);
  return loadBlock(footerBlock);
}

/**
 * Setup block utils.
 */
function setup() {
  window.hlx = window.hlx || {};
  window.hlx.RUM_MASK_URL = 'full';
  window.hlx.codeBasePath = '';
}

/**
 * Decorates the main element.
 */
function decorateMain(main) {
  decorateButtons(main);
  decorateIcons(main);
  decorateSections(main);
  decorateBlocks(main);
}

/**
 * Loads everything needed to display the first above the fold.
 */
async function loadEager(doc) {
  document.documentElement.lang = 'en';
  const main = doc.querySelector('main');
  if (main) {
    decorateMain(main);
    document.body.classList.add('appear');
    await Promise.all(
      [...main.querySelectorAll('.section')].map(async (section) => {
        const block = section.querySelector(`.${LCP_BLOCKS.join(', .')}`);
        if (block) {
          await loadBlock(block);
        }
      }),
    );
  }
}

/**
 * Loads everything that doesn't need to be delayed.
 */
async function loadLazy(doc) {
  const main = doc.querySelector('main');
  await loadBlocks(main);

  const { hash } = window.location;
  const element = hash ? doc.getElementById(hash.substring(1)) : false;
  if (hash && element) element.scrollIntoView();

  const header = doc.querySelector('header');
  loadHeader(header);
  const footer = doc.querySelector('footer');
  loadFooter(footer);
}

/**
 * Loads everything that happens a lot later, without impacting the user experience.
 */
function loadDelayed() {
  window.setTimeout(() => import('./delayed.js').catch(() => {}), 3000);
}

async function loadPage() {
  setup();
  await loadEager(document);
  await loadLazy(document);
  loadDelayed();
}

loadPage();
