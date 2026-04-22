---
title: Configuration
description: You can configure various aspects through your site's configuration file or individual page front matter.
toc: true
excludeFromSearch: false
date: 2006-01-01
author: Joe Public
sponsors:
  - name: logoipsum
    logo: img/logoipsum-418.svg
    link: https://logoipsum.com
  - name: Logoipsum
    logo: img/logoipsum-337.svg
    link: https://logoipsum.com
  - name: Logoipsum
    logo: img/logoipsum-280.svg
    link: https://logoipsum.com
---

## Site

```YAML
params:
  logo: <path/to/image|path/to/svg|text> # displayed in the header
  matomo: # optional, to use Matomo for analytics
    url: <matomo-url>
    siteId: <matomo's site id>
  style: # optional, provides an easy way to overwrite the default colors
    color: <#00000f>
    color__action: <#030ba5>
    background: <#fffffc>
    color__dark: <#fffffc>
    color__action__dark: <#464ffb>
    background__dark: <#00000f>
```

## Page

```YAML
title: <the page's title>
description: <the page's description> # displayed below the title, optional but recommended
images:  # the first image will be displayed as the page's main image above the content, optional
  - <path/to/image>
toc: <true|false> # whether to display a table of contents, defaults to false
excludeFromSearch: <true|false> # exclude this page from search, defaults to false
date: # displayed below the title, optional
author: # displayed below the title, optional
sponsors: # displayed at the bottom of the page, optional
- name: <name>
  logo: <path/to/image|path/to/svg> #optional
  link: <url>
```

Note that these parameters can be set for multiple (or all) pages via [`cascade`](https://gohugo.io/content-management/front-matter/). This approach is particularly useful for managing sponsors across multiple pages.
