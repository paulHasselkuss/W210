---
title: Shortcodes
description: The theme bundles a few custom shortcodes (in addition to those [provided natively](https://gohugo.io/content-management/shortcodes/#use-hugos-built-in-shortcodes) by Hugo).
toc: true
---

## Contact

Insert contact details, such as address, e-mail or phone number, from a data file using the proper markup.
The e-mail address will be encrpyted using (simple) javascript.

To use, create a data file `config.yml` and add the data using `address`, `phone` or `mail` as key.

```
{{</* contact <address|phone|mail */>}}`
```

{{< contact address >}}

## Details

Use HTML5's `details` element. The class parameter is optional, the summary can also be specified as a shorthand.

```
{{</* details summary="This is the summary." class="classname" >}}
Contents. Supports **markdown**.
{{< /details */>}}
```

{{< details summary="This is the summary." class="classname" >}}
Contents. Supports **markdown**.
{{< /details >}}

## Forms

Render and insert a form from a data file. See [forms](forms).

```
{{</* form <form-id> */>}}
```

{{< form form >}}