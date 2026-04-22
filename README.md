# W210

[![Deploy](https://github.com/paulHasselkuss/W210/actions/workflows/deploy.yml/badge.svg)](https://github.com/paulHasselkuss/W210/actions/workflows/deploy.yml)

The goal of this project is to create a Hugo theme for small but text-heavy websites, such as academic events or research groups.

## Features

- A fast, lightweight theme with a minimalist aesthetic for small but text-heavy websites.
- Four menus: `primary`, `home`, `footer`, `social`
- Two list styles: `list` and `landing`
- Images are optimized and resized automatically.
- Client-side search via [FlexSearch](https://nextapps-de.github.io/flexsearch/).
- Support for mathematical equations via Hugo's [`transform.toMath`](https://gohugo.io/functions/transform/tomath/).
- SEO tags and featured images are added or created automatically.

See [exampleSite/content/docs](exampleSite/content/docs) for more information.

## Usage

The theme should be added as a [module](https://gohugo.io/hugo-modules/). To use it, create a new Hugo site (`hugo new site`) and add the following to your `hugo.yml`:

```YAML
module:
  imports:
  - path: github.com/paulHasselkuss/W210
```

Also, you need to configure `markup`. The easiest way to do this is by adding the following to your `hugo.yml`:

```YAML
# Required, ToC and Markup config
markup:
  _merge: shallow
```

Lastly, make sure that [Dart Sass](https://gohugo.io/functions/resources/tocss/#dart-sass) is installed and available on your `PATH`.

## License

W210 is copyright © 2021-2026 Paul Hasselkuß. It is free software, and may be redistributed under the terms specified in the [license](LICENSE.md).

W210 uses the [General Sans](https://www.fontshare.com/fonts/general-sans) font under the [Fontshare EULA](static/fonts/Fontshare-EULA.txt).
