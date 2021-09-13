/* beautify ignore:start */
{{ $flexsearch := resources.Get "js/flexsearch.js" }}
{{ $mark := resources.Get "js/mark.js" }}
{{ $vendor := slice $mark $flexsearch | resources.Concat "js/vendor.js" }}
const vendor_link = '{{ $vendor.Permalink}}';
/* beautify ignore:end */
const search_wrapper = document.getElementById('searchWrapper');
const search_form = document.getElementById('searchForm'); // search form
const search_input = document.getElementById('searchInput'); // input box for search
const search_results = document.getElementById('searchListItems'); // targets the <ul>
const search_results_title = document.getElementById('searchListTitle');
const search_toggle = document.getElementById('searchToggle');
const options = {
  preset: "match",
  context: 'true',
  tokenize: "full",
  document: {
    id: 'id',
    field: ['title', 'desc', 'content'],
    store: ['title', 'href']
  }
};
let index; // holds our search engine
let mark; // holds markjs
let search__focus = false; // check to true to make visible by default
let results_available = false;
let first_run = true; // allow us to delay loading json data unless search activated
search_toggle.addEventListener('click', function(e) {
  search_toggle_focus(e);
});
document.addEventListener('keydown', function(e) {
  // console.log(event); // DEBUG
  // Ctrl + / to show or hide Search
  // if (event.metaKey && event.which === 191) {
  if (event.ctrlKey && event.which === 191) {
    search_toggle_focus(e); // toggle visibility of search box
  }
  // Use Enter (13) to move to the first result
  if (e.keyCode == 13) {
    if (document.activeElement == search_input) {
      e.preventDefault(); // stop form from being submitted
      if (results_available) {
        get_first_result().focus();
      }
    }
  }
  // DOWN (40) arrow
  if (e.keyCode == 40) {
    if (results_available) {
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
    if (results_available) {
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
//init when the form is in focus
search_form.addEventListener('focusin', function(e) {
  search_init();
});
search_form.addEventListener('keydown', function(e) {
  // Allow ESC (27) to close search box
  if (e.keyCode == 27) {
    search__focus = true; // make sure toggle removes focus
    search_toggle_focus(e);
  }
});

function search_toggle_focus(e) {
  //console.log(e); // DEBUG
  // order of operations is very important to keep focus where it should stay
  if (!search__focus) {
    search_wrapper.classList.add('is-active');
    search_toggle.classList.add('is-active');
    document.body.classList.add('noscroll');
    search_input.focus(); // move focus to search box
    search__focus = true;
  } else {
    search_wrapper.classList.remove('is-active');
    search_toggle.classList.remove('is-active');
    document.body.classList.remove('noscroll');
    document.activeElement.blur(); // remove focus from search box
    search__focus = false;
  }
}
//see https://stackoverflow.com/a/55451823
function load_script(url) {
  return new Promise(function(resolve, reject) {
    let script = document.createElement("script");
    script.onerror = reject;
    script.onload = resolve;
    if (document.currentScript) {
      document.currentScript.parentNode.insertBefore(script, document.currentScript);
    } else {
      document.head.appendChild(script);
    }
    script.src = url;
  });
}

function search_init() {
  if (first_run) {
    load_script(vendor_link).then(() => {
      first_run = false; // let's never do this again
      fetch(search_form.getAttribute('data-language-prefix') + '/index.json')
        .then(data => data.json())
        .then(data => {
          index = new FlexSearch.Document(options);
          data.forEach(data => index.add(data));
          search_input.addEventListener('keyup', function(e) { // execute search as each character is typed
            search_exec(this.value);
          });
          mark = new Mark(search_results);
          //console.log("index.json loaded"); // DEBUG
        });
    }).catch((error) => {
      console.log(`Vendor scripts failed to load: ${error}.`);
    });
  }
}

function search_exec(term) {
  let results_html = ''; // our results bucket
  let results_title_html = ''
  results_available = false;
  if (term.length > 3) {
    let results = index.search(term, { enrich: true });
    if (results.length === 0) { // no results based on what was typed into the input box
      results_title_html = 'No results match.';
    } else { // build our html
      results_available = true;
      results[0].result.forEach(item => { results_html += result_html(item) });
      results_title_html = maybePluralize(results[0].result.length, ' result');
    }
  }
  search_results_title.innerHTML = results_title_html;
  search_results.innerHTML = results_html;
  mark.mark(term);
}

function result_html(item) {
  return `<li class="search-result"><a class="unstyled" href="${item.doc.href}" tabindex = "0">
    <h2 class="search-result__title">${item.doc.title}</h2>
    <p class="search-result__path">${item.doc.href}</p>
    </a></li>`;
}

function get_first_result() {
  return search_results.firstChild.firstElementChild;
}

function get_last_result() {
  return search_results.lastChild.firstElementChild;
}
const maybePluralize = (count, noun, suffix = 's') =>
  `${count} ${noun}${count !== 1 ? suffix : ''}`;