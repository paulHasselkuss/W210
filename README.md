# W210

[![Deploy](https://github.com/paulHasselkuss/W210/actions/workflows/deploy.yml/badge.svg)](https://github.com/paulHasselkuss/W210/actions/workflows/deploy.yml)

The goal of this project is to create a theme for Hugo usable for small, but text-heavy websites such as academic events or research groups.

The overall structure is stringly inspired by [Atlas](https://github.com/indigotree/atlas) and [Hyas](https://gethyas.com).

## Features

* Fast, lightweight theme with a minimalist aesthetic for small, but text-heavy websites.
* Four menus: `primary`, `home`, `footer`, `social`
* Two list styles: `default` and `listSimple`
* Images are optimized and resized automatically.
* Client-side search via [FlexSearch](https://nextapps-de.github.io/flexsearch/).
* Support for mathematical equations via [MathJax](https://www.mathjax.org).
* SEO tags and featured images are added/created automatically.
* Support for Netlify's headers and redirects.

See [exampleSite/content/docs](exampleSite/content/docs) for more information.

## Usage

The theme should be added as a [module](https://gohugo.io/hugo-modules/). To use it, create a new hugo site (`hugo new site`) and add the following to your `hugo.yml`:

```YAML
module:
  imports:
  - path: github.com/paulHasselkuss/W210
```

Also, you need to disable Hugo's aliases and add configurations for `markup` and `outputs`. The easiest way to do this is by adding the following to your `hugo.yml`:

```YAML
# To use build-in support for Netlify's redirects
disableAliases: true

# Required, ToC and Markup config
markup:
  _merge: shallow

# Required, adds support for Netlify's headers and redirects
outputs:
  _merge: shallow
```

Lastly, make sure that [Dart Sass](https://gohugo.io/functions/resources/tocss/#dart-sass) is installed and available on your `PATH`.
To use the theme, NPM is **not** needed. However, some usefull scripts may be found in this project's `package.json`.

## License

W210 is copyright © 2021-2024 Paul Hasselkuß. It is free software, and may be redistributed under the terms specified in the [license](LICENSE.md).

W210 is using the [General Sans](https://www.fontshare.com/fonts/general-sans) font under the [Fontshare EULA](static/fonts/Fontshare-EULA.txt).
