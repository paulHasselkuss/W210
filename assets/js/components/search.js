'use strict';

import Document from 'js/vendor/flexsearch/document.js';

const searchToggle = document.getElementById('searchToggle');
const searchCancel = document.getElementById('searchCancel');
const searchForm = document.getElementById('searchForm');
const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');

const flexsearchOptions = {
  preset: 'match',
  context: 'true',
  tokenize: 'full',
  document: {
    id: 'id',
    field: ['title', 'desc', 'content'],
    store: ['title', 'href'],
  },
};
let flexsearch;

let hasFocus = false;
let hasResults = false;
let hasInitFlexsearch = false;

function searchToggleFocus() {
  //console.log(e); // DEBUG
  // order of operations is very important to keep focus where it should stay
  if (!hasFocus) {
    document.body.classList.add('search-active');
    searchToggle.classList.add('is-active');
    searchInput.focus(); // move focus to search box
    hasFocus = true;
  } else {
    document.body.classList.remove('search-active');
    searchToggle.classList.remove('is-active');
    document.activeElement.blur(); // remove focus from search box
    hasFocus = false;
  }
}

function searchInit() {
  if (!hasInitFlexsearch) {
    hasInitFlexsearch = true; // let's never do this again
    fetch(searchForm.getAttribute('data-base-url') + searchForm.getAttribute('data-language-prefix') + '/index.json')
      .then(data => data.json())
      .then(data => {
        flexsearch = new Document(flexsearchOptions);
        data.forEach(data => flexsearch.add(data));
        searchInput.addEventListener('keyup', function () { // execute search as each character is typed
          searchExec(this.value);
        });
        //console.log('index.json loaded'); // DEBUG
      });
  }
}

function searchExec(term) {
  hasResults = false;
  if (term.length > 3) {
    let results = flexsearch.search(term, { enrich: true });
    if (results.length !== 0) {
      hasResults = true;
    }
    printResults(term, results);
  }
}

function printResults(term, results) {
  let title_text = '';
  if (results.length === 0) {
    title_text = 'No results.'
  } else if (results[0].result.length === 1) {
    title_text = '1 result'
  } else {
    title_text = `${results[0].result.length} results`
  }

  let results_text = '';
  let regex = new RegExp(term.split(/\s+/).filter(Boolean).join('|'), 'gi');
  results[0].result.forEach(item => results_text += itemToHtml(item, regex));

  searchResults.innerHTML = `
    <h2 class="search-list__title bigtext">${title_text}</h2>
    <ul id="searchResultsList" class="search-list__items unstyled">${results_text}</ul>
    `;
}

function itemToHtml(item, regex) {
  let item_title = item.doc.title.replace(regex, match => `<mark>${match}</mark>`);
  return `
    <li class='search-result'>
      <a class='unstyled' href='${item.doc.href}' tabindex = '0'>
        <h3 class='search-result__title'>${item_title}</h3>
        <p class='search-result__path'>${item.doc.href}</p>
      </a>
    </li>
    `;
}

function getFirstResult() {
  return document.querySelector('#searchResults ul').firstElementChild.firstElementChild;
}

function getLastResult() {
  return document.querySelector('#searchResults ul').lastElementChild.firstElementChild;
}

document.addEventListener('keydown', e => {
  // console.log(event); // DEBUG
  // Ctrl + / to show or hide Search
  // if (event.metaKey && event.which === 191) {
  if (event.ctrlKey && event.which === 191) {
    searchToggleFocus(e); // toggle visibility of search box
  }

  if (!hasFocus) {
    return;
  }
  // Use Enter (13) to move to the first result
  if (e.keyCode == 13) {
    if (document.activeElement == searchInput) {
      e.preventDefault(); // stop form from being submitted
      if (hasResults) {
        getFirstResult().focus();
      }
    }
  }
  // DOWN (40) arrow
  if (e.keyCode == 40) {
    if (hasResults) {
      e.preventDefault(); // stop window from scrolling
      if (document.activeElement == searchInput) {
        // if the currently focused element is the main input --> focus the first <li>
        getFirstResult().focus();
      } else if (document.activeElement == getLastResult()) {
        // if we're at the bottom, loop to the start
        getFirstResult().focus();
      } else {
        // otherwise select the next search result
        document.activeElement.parentElement.nextElementSibling.firstElementChild.focus();
      }
    }
  }
  // UP (38) arrow
  if (e.keyCode == 38) {
    if (hasResults) {
      e.preventDefault(); // stop window from scrolling
      if (document.activeElement == searchInput) {
        // If we're in the input box, do nothing
        searchInput.focus();
      } else if (document.activeElement == getFirstResult()) {
        // If we're at the first item, go to input box
        searchInput.focus();
      } else {
        // Otherwise, select the search result above the current active one
        document.activeElement.parentElement.previousElementSibling.firstElementChild.focus();
      }
    }
  }
  // Use Backspace (8) to switch back to the search input
  if (e.keyCode == 8) {
    if (document.activeElement != searchInput) {
      e.preventDefault(); // stop browser from going back in history
      searchInput.focus();
    }
  }
});

//toogle search visibility
searchToggle.addEventListener('click', e => searchToggleFocus(e));
searchCancel.addEventListener('click', e => searchToggleFocus(e));

//init when the form is in focus
searchForm.addEventListener('focusin', e => searchInit(e));

// Allow ESC (27) to close search box
searchForm.addEventListener('keydown', e => {
  if (e.keyCode == 27) {
    hasFocus = true; // make sure toggle removes focus
    searchToggleFocus(e);
  }
});
