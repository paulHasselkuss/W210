# [DGWP](https://www.dgwp.org)
[![Netlify Status](https://api.netlify.com/api/v1/badges/4d033c2d-096f-4121-b6ec-3f5368aae8fd/deploy-status)](https://app.netlify.com/sites/boring-brattain-3ff500/deploys)

The goal of this project is to create a theme for Hugo that can be used for small, but text-heavy websites such as academic events or reserach groups.

The overall structure is based on [Atlas](https://github.com/indigotree/atlas) and [Hyas](https://gethyas.com), SASS is based on [Bourbon](https://github.com/thoughtbot/bourbon/).

While the project is usuable, some things still need to be done:
- Move the theme to its own repo and add a license

## Build

Install [Hugo](https://gohugo.io/getting-started/installing/) and [Node](https://nodejs.dev), including NPM. Then:

```
npm install
npm run build
```

On macOS, you may use `npm run dev` to start the development server and open Safari and SublimeText. For all available commands, see `package.json`. 

## Features

Atlas provides the following features out of the box:

* Pre configured support for Hugo Pipes, with SASS and Autoprefixer
* Environment driven `robots.txt` file (disallows robots on everything other than production)
* Base HTML templates with easy customisation/extension
* [Configuration](/netlify.toml) for Netlify deployments
* [Better defaults](#security-headers) for configuring HTTPS
* [Better redirects](#redirects) with Netlify instead of `<meta http-equiv="refresh">`

Note: Atlas' support for Netlify functions has been removed.

### Robots.txt

A default robots.txt can be found at `/layouts/robots.txt` which is configured to disallow crawlers when the `HUGO_ENV` environment variable is **not** set to `"production"`.

The default behaviour is to disallow search engines on "branch" deployments.

### Headers

Headers can be configured within `/layouts/index.headers`, which is then built to `/public/_headers`.

This is a Netlify feature. Learn more about [Headers with Netlify](https://www.netlify.com/docs/headers-and-basic-auth/).

We use Atlas' default headers to help you better protect your site. The default headers we include are: [X-Frame-Options](https://scotthelme.co.uk/hardening-your-http-response-headers/#x-frame-options), [X-XSS-Protection](https://scotthelme.co.uk/hardening-your-http-response-headers/#x-xss-protection), [X-Content-Type-Options](https://scotthelme.co.uk/hardening-your-http-response-headers/#x-content-type-options), [Referrer-Policy](https://scotthelme.co.uk/a-new-security-header-referrer-policy/).

### Redirects

Redirect rules can be appended to `/layouts/index.redirects`, which is then built to `/public/_redirects`.

This is a Netlify feature. Learn more about [Netlify Redirects](https://www.netlify.com/docs/redirects/).

### Aliases

Hugo [Aliases](https://gohugo.io/content-management/urls/#aliases) are usually handled by `<meta http-equiv="refresh" ...>` tags. These have been disabled within `config.toml` with `disableAliases = true`, and instead are handled by [Netlify Redirects](https://www.netlify.com/docs/redirects/). This is handled automatically and you should continue to add aliases as described in the Hugo documentation.
