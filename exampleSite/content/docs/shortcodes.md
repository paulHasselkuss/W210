---
title: Shortcodes
description: The theme bundles a few custom shortcodes (in addition to those [provided natively](https://gohugo.io/content-management/shortcodes/#use-hugos-built-in-shortcodes) by Hugo).
toc: true
---

## Figure

Insert an HTML figure element into your content using the figure shortcode.

{{< figure
src="/img/pexels-birgitboellinger-31158460.jpg"
alt="AEntry of the Bauhaus school in Dessau, Germany (photo by Birgit Böllinger, Pexels)"
link="https://www.pexels.com/de-de/foto/31158460/"
title="Figure 1"
caption="Entry of the Bauhaus school in Dessau, Germany (photo by Birgit Böllinger, Pexels)">}}

## Aside

Create an aside element displayed directly to the right of the last paragraph on desktop, while stacking neatly underneath that paragraph on smaller mobile screens.
{{< aside >}}
This text is displayed aside. **Markdown** is supported.
{{< /aside >}}

## Contact

Insert contact details, such as address, e-mail or phone number, from a data file using the proper markup.
The e-mail address will be encrpyted using (simple) javascript.

To use, create a data file `config.yml` and add the data using `address`, `phone` or `mail` as key.

{{< contact address >}}

Or mail:

{{< contact contact >}}

## Forms

Render and insert a form from a data file or the page's frontmatter.

{{< form form >}}

### Specification

If you use the page's frontmatter, add these underneath the identifer of the form. If you use a datafile, use the identifer as file name.

```YAML
name: "name"
attributes: 'method="POST" netlify' #mapps directly to HTML attributes, optional
fields:
- id: "name"
  type: "text" #optional
  label: "Label text, supports __markdown__."
  attributes: 'required' #mapps directly to HTML attributes, optional
```
