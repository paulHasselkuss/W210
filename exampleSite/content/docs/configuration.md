---
title: Configuration
description: Some aspects can be configures in your site's configuration file or using a pages frontmatter.
toc: true
---

## Site Config

```YAML
params:
  logo: <path/to/image|path/to/svg|text>
  disallowSearchEngines: <true|false> #disallowed search engines in robots.txt
  matomo: #Matomo can be used for analytics
    url: <matomo-url>
    siteId: <matomo's site id>
```

## Frontmatter

```YAML
title: <the page's title> #mandatory
describtion: <the page's description> #recommended
images:
  - <image> #the first image will be displayed as the page's main image above or beneath the contents
toc: <true|false> #whether to display a table of contents, defaults to false
hideBorder: <true|false> #whether to hide the header's border, defaults to false
excludeFromSearch: <true|false> #whether to exclude this page from search reuslts, defaults to false
sponsors: #sponsors to be shown on the page
- name: <name> #mandatory
  logo: <path/to/image|path/to/svg> #optional
  link: <url> #optional
math: <true|false> #whether to load mathjax for this page
```

Note that these parameters can be set for multiple (or all) pages via [`cascade`](https://gohugo.io/content-management/front-matter/).