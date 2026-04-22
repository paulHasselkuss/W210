"use strict";

// If not compact, js.build needs "externals" (slice "worker_threads") to avoid esbuild failure due to node dependencies
import FlexSearch from "js/vendor/flexsearch/flexsearch.compact.module.min.js";
const Document = FlexSearch.Document;

const DOM = {
  exit: document.getElementById("search-cancel"),
  popover: document.getElementById("search"),
  form: document.getElementById("search-form"),
  input: document.getElementById("search-input"),
  results: document.getElementById("search-results"),
};

const State = {
  flexsearch: null,
  hasResults: false,
  isInitialized: false,
};

const flexsearchOptions = {
  preset: "match",
  context: true,
  tokenize: "full",
  document: {
    id: "id",
    field: ["title", "desc", "content"],
    store: ["title", "href"],
  },
};

async function initSearch() {
  if (State.isInitialized) return;
  State.isInitialized = true; // Set early to prevent duplicate fetches

  try {
    const baseUrl = DOM.form.getAttribute("data-base-url") || "";
    const prefix = DOM.form.getAttribute("data-language-prefix") || "";
    const response = await fetch(`${baseUrl}${prefix}/index.json`);
    const data = await response.json();

    State.flexsearch = new Document(flexsearchOptions);
    data.forEach((item) => State.flexsearch.add(item));

    DOM.input.addEventListener("input", (e) => executeSearch(e.target.value));
  } catch (error) {
    console.error("Failed to load search index:", error);
    State.isInitialized = false; // Allow retry if fetch failed
  }
}

function executeSearch(term) {
  State.hasResults = false;

  // Wait until user types more than 3 characters
  if (term.length <= 2) return;

  const results = State.flexsearch.search(term, { enrich: true });

  // Update state if we have valid matches
  if (results.length > 0 && results[0].result.length > 0) {
    State.hasResults = true;
  }

  renderResults(term, results);
}

function renderResults(term, results) {
  let titleText = "No results.";
  let resultsHtml = "";

  if (State.hasResults) {
    const matches = results[0].result;
    titleText = matches.length === 1 ? "1 result" : `${matches.length} results`;

    const regex = new RegExp(term.split(/\s+/).filter(Boolean).join("|"), "gi");

    // Map over results to create a single HTML string cleanly
    resultsHtml = matches
      .map((item) => createResultItemHtml(item, regex))
      .join("");
  }

  DOM.results.innerHTML = `
    <h2 class="results__title">${titleText}</h2>
    <ul id="search-results" class="results__list grid grid__full">
      ${resultsHtml}
    </ul>
  `;
}

function createResultItemHtml(item, regex) {
  const highlightedTitle = item.doc.title.replace(
    regex,
    (match) => `<mark>${match}</mark>`,
  );
  return `
    <li class="results__item">
      <a class="results__link link link--plain" href="${item.doc.href}" tabindex="0">
        <h3 class="results__heading">${highlightedTitle}</h3>
        <p class="results__url">${item.doc.href}</p>
      </a>
    </li>
  `;
}

// Dynamically fetches current links to avoid brittle DOM traversal
function getResultLinks() {
  return Array.from(DOM.results.querySelectorAll(".results__link"));
}

function handleKeyNavigation(e) {
  // Ctrl + / to show search popover
  if (e.ctrlKey && e.key === "/") {
    e.preventDefault();
    DOM.popover.showPopover();
    return;
  }

  // Abort if popover isn't open (using standard Popover API pseudo-class)
  if (!DOM.popover.matches(":popover-open")) return;

  const links = getResultLinks();
  const activeEl = document.activeElement;
  const currentIndex = links.indexOf(activeEl);

  switch (e.key) {
    case "Enter":
      if (activeEl === DOM.input && State.hasResults) {
        e.preventDefault(); // Stop form submission
        links[0]?.focus();
      }
      break;

    case "ArrowDown":
      if (!State.hasResults) break;
      e.preventDefault(); // Stop window scrolling

      if (activeEl === DOM.input || currentIndex === links.length - 1) {
        links[0]?.focus(); // Jump to first from input, or loop from bottom to top
      } else if (currentIndex >= 0) {
        links[currentIndex + 1]?.focus(); // Go to next
      }
      break;

    case "ArrowUp":
      if (!State.hasResults) break;
      e.preventDefault();

      if (activeEl === DOM.input || currentIndex === 0) {
        DOM.input.focus(); // Jump back to input from first item
      } else if (currentIndex > 0) {
        links[currentIndex - 1]?.focus(); // Go to previous
      }
      break;

    case "Backspace":
      if (activeEl !== DOM.input) {
        e.preventDefault();
        DOM.input.focus();
      }
      break;

    case "Escape":
      DOM.popover.hidePopover();
      break;
  }
}

DOM.popover.addEventListener("toggle", (e) => {
  if (e.newState === "open") DOM.input.focus();
});

DOM.form.addEventListener("focusin", initSearch);

DOM.exit.addEventListener("click", (e) => {
  e.preventDefault();
  DOM.popover.hidePopover();
});

document.addEventListener("keydown", handleKeyNavigation);
