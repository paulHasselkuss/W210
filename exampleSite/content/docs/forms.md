---
title: Forms
description: Forms can be added via the `forms` partial or shortcode. The form's fields are specified as data, either in a page's frontmatter or in a data file.
toc: true
simpleform:
  name: "simple-form"
  attributes: 'method="POST" netlify'
  fields:
  - name: "name"
    label: "Your name"
  - name: "mail"
    type: "email"
    label: "Your Mail Adress"
  - name: "message"
    type: "textarea"
    label: "Your message"
---

## Example using the page's frontmatter

The fields of the form below are specified in this page's frontmatter.

{{< form "simpleform" >}}

## Example using data files

The fields of the form below are specified in a data file. If both a data file and a frontmatter entry exists, the latter is used.

{{< form "form" >}}

## Specification

```YAML
name: "name"
class: "my-custom-class" #optional
attributes: 'method="POST" netlify' #mapps directly to HTML attributes
fields:
- name: "fieldName"
  class: "element-grid__full"  #optional
  type: "text" #optional
  describtion: "This is a describtion that supports **markdown**." #optional
  label: "This is a label that supports __markdown__:" #optional
  attributes: 'required' #mapps directly to HTML attributes, optional
```