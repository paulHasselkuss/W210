---
title: Docs
description: The documentation is a work in progress. You might want to look at the markdown files on GitHub.
menu:
  - primary
layout: listSimple
---

## Menus

The theme supports three menus:
1. `primary` - primary navigation on the top
2. `home` - navigation on the homepage
3. `footer` - navigation in the footer

## Lists

Lists can have two styles (see [lists](/lists/)):
1. `default` - displays subpages in an extended paginated format.
2. `listSimple` - displays subpages below the site's describtion without pagination.

## Search

Search is handled client site via [FlexSearch](https://nextapps-de.github.io/flexsearch/), using a JSON file created at build time.
To exclude a page from the search, set `excludeFromSearch` to `true` in the page's frontmatter.

## SEO

For all pages, SEO meta tags are automatically added (Schema, OpenGraph, Twitter Cards). 

You can add a featured image by adding an image with `cover` or `thumbnail` in its name to a page's bundle. If no featured image is specified, one is created automatically by writing the page's title on a base image.

To use a different base image, overwrite `assets/social/card-base.png`.

## Netlify Features

Headers can be configured within `/layouts/index.headers`. See [Netlify](https://www.netlify.com/docs/headers-and-basic-auth/).

Redirect rules can be appended to `/layouts/index.redirects`. See [Netlify](https://www.netlify.com/docs/redirects/).

Hugo's [Aliases](https://gohugo.io/content-management/urls/#aliases) have been disabled within `config.toml` with `disableAliases = true`, and instead are handled by [Netlify Redirects](https://www.netlify.com/docs/redirects/). This is handled automatically and one should continue to add aliases as described in the Hugo documentation.