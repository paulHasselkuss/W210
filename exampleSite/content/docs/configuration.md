---
title: Configuration
description: Some aspects can be configures in your site's configuration file or using a pages frontmatter.
toc: true
---


## Site Config

```YAML
params:
  logo: <path/to/image|path/to/svg|text>
  disallow_search_engines: <true|false> #disallowed search engines
  matomo: #Matomo can be used for analytics
    url: <matomo-url>
    siteId: <matomo's site id>
  sponsors: #configure sponsors to be shown per-page
  	- name: <name> #mandatory
      logo: <path/to/image|path/to/svg> #optional
      link: <url> #optional
```

## Frontmatter

```YAML
title: <the page's title> #mandatory
describtion: <the page's description> #recommended
images:
  - <image> #the first image will be displayed as the page's main image above or beneath the contents
toc: <true|false> #whether to display a table of contents, defaults to false
showSponsors: <true|false> #whether to show the site's sponsors below the page, defaults to false
hideBorder: <true|false> #whether to hide the header's border, defaults to false
excludeFromSearch: <true|false> #whether to excldue this page from search reuslts, defaults to false
```
