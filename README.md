# W210
[![Deploy](https://github.com/paulHasselkuss/W210/actions/workflows/deploy.yml/badge.svg)](https://github.com/paulHasselkuss/W210/actions/workflows/deploy.yml)

The goal of this project is to create a theme for Hugo usable for small, but text-heavy websites such as academic events or research groups.

The overall structure is based on [Atlas](https://github.com/indigotree/atlas) and [Hyas](https://gethyas.com), SASS is based on [Bourbon](https://github.com/thoughtbot/bourbon/).

While the project is usuable, some things still need to be done:
- Add documentation
- Improve flexibility (analytics, custom CSS etc.)

## Usage

The theme should be added as a [module](https://gohugo.io/hugo-modules/). To use it, create a new hugo site (`hugo new site`) and add the following to your `config.yaml`:

```
module:
  imports:
  - path: github.com/paulHasselkuss/W210
```

Then you need to install the required NPM dependencies:
```
hugo mod npm pack
npm install
```
Some usefull scripts can be found in this project's `package.json`.

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

We use Atlas' default headers: [X-Frame-Options](https://scotthelme.co.uk/hardening-your-http-response-headers/#x-frame-options), [X-XSS-Protection](https://scotthelme.co.uk/hardening-your-http-response-headers/#x-xss-protection), [X-Content-Type-Options](https://scotthelme.co.uk/hardening-your-http-response-headers/#x-content-type-options), [Referrer-Policy](https://scotthelme.co.uk/a-new-security-header-referrer-policy/).

### Redirects

Redirect rules can be appended to `/layouts/index.redirects`, which is then built to `/public/_redirects`.

This is a Netlify feature. Learn more about [Netlify Redirects](https://www.netlify.com/docs/redirects/).

### Aliases

Hugo [Aliases](https://gohugo.io/content-management/urls/#aliases) are usually handled by `<meta http-equiv="refresh" ...>` tags. These have been disabled within `config.toml` with `disableAliases = true`, and instead are handled by [Netlify Redirects](https://www.netlify.com/docs/redirects/). This is handled automatically and one should continue to add aliases as described in the Hugo documentation.

## License

W210 is copyright © 2021-2022 Paul Hasselkuß. It is free software, and may be redistributed under the terms specified in the [license](LICENSE.md).

W210 is using the [General Sans](https://www.fontshare.com/fonts/general-sans) font under the [Fontshare EULA](static/fonts/Fontshare-EULA.txt).

