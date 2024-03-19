'use strict';
import Document from 'js/vendor/flexsearch/document.js';

const search_toggle = document.getElementById('searchToggle');
const search_cancel = document.getElementById('searchCancel');
const search_form = document.getElementById('searchForm');
const search_input = document.getElementById('searchInput');
const search_results = document.getElementById('searchResults');

const flexsearch_options = {
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

let has_focus = false;
let has_results = false;
let has_init_flexsearch = false;

function search_toggle_focus() {
  //console.log(e); // DEBUG
  // order of operations is very important to keep focus where it should stay
  if (!has_focus) {
    document.body.classList.add('search-active');
    search_toggle.classList.add('is-active');
    search_input.focus(); // move focus to search box
    has_focus = true;
  } else {
    document.body.classList.remove('search-active');
    search_toggle.classList.remove('is-active');
    document.activeElement.blur(); // remove focus from search box
    has_focus = false;
  }
}

function search_init() {
  if (!has_init_flexsearch) {
    has_init_flexsearch = true; // let's never do this again
    fetch(search_form.getAttribute('data-base-url') + search_form.getAttribute('data-language-prefix') + '/index.json')
      .then(data => data.json())
      .then(data => {
        flexsearch = new Document(flexsearch_options);
        data.forEach(data => flexsearch.add(data));
        search_input.addEventListener('keyup', function () { // execute search as each character is typed
          search_exec(this.value);
        });
        //console.log('index.json loaded'); // DEBUG
      });
  }
}

function search_exec(term) {
  has_results = false;
  if (term.length > 3) {
    let results = flexsearch.search(term, { enrich: true });
    if (results.length !== 0) {
      has_results = true;
    }
    print_results(term, results);
  }
}

function print_results(term, results) {
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
  results[0].result.forEach(item => results_text += item_to_html(item, regex));

  search_results.innerHTML = `
    <h2 class="search-list__title bigtext">${title_text}</h2>
    <ul id="searchResultsList" class="search-list__items unstyled">${results_text}</ul>
    `;
}

function item_to_html(item, regex) {
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

function get_first_result() {
  return document.querySelector('#searchResults ul').firstElementChild.firstElementChild;
}

function get_last_result() {
  return document.querySelector('#searchResults ul').lastElementChild.firstElementChild;
}

document.addEventListener('keydown', e => {
  // console.log(event); // DEBUG
  // Ctrl + / to show or hide Search
  // if (event.metaKey && event.which === 191) {
  if (event.ctrlKey && event.which === 191) {
    search_toggle_focus(e); // toggle visibility of search box
  }

  if (!has_focus) {
    return;
  }
  // Use Enter (13) to move to the first result
  if (e.keyCode == 13) {
    if (document.activeElement == search_input) {
      e.preventDefault(); // stop form from being submitted
      if (has_results) {
        get_first_result().focus();
      }
    }
  }
  // DOWN (40) arrow
  if (e.keyCode == 40) {
    if (has_results) {
      e.preventDefault(); // stop window from scrolling
      if (document.activeElement == search_input) {
        // if the currently focused element is the main input --> focus the first <li>
        get_first_result().focus();
      } else if (document.activeElement == get_last_result()) {
        // if we're at the bottom, loop to the start
        get_first_result().focus();
      } else {
        // otherwise select the next search result
        document.activeElement.parentElement.nextElementSibling.firstElementChild.focus();
      }
    }
  }
  // UP (38) arrow
  if (e.keyCode == 38) {
    if (has_results) {
      e.preventDefault(); // stop window from scrolling
      if (document.activeElement == search_input) {
        // If we're in the input box, do nothing
        search_input.focus();
      } else if (document.activeElement == get_first_result()) {
        // If we're at the first item, go to input box
        search_input.focus();
      } else {
        // Otherwise, select the search result above the current active one
        document.activeElement.parentElement.previousElementSibling.firstElementChild.focus();
      }
    }
  }
  // Use Backspace (8) to switch back to the search input
  if (e.keyCode == 8) {
    if (document.activeElement != search_input) {
      e.preventDefault(); // stop browser from going back in history
      search_input.focus();
    }
  }
});

//toogle search visibility
search_toggle.addEventListener('click', e => search_toggle_focus(e));
search_cancel.addEventListener('click', e => search_toggle_focus(e));

//init when the form is in focus
search_form.addEventListener('focusin', e => search_init(e));

// Allow ESC (27) to close search box
search_form.addEventListener('keydown', e => {
  if (e.keyCode == 27) {
    has_focus = false; // make sure toggle removes focus
    search_toggle_focus(e);
  }
});
