# DOMDOMDOM

DOMDOMDOM is a JavaScript DOM interaction library inspired by jQuery.  Using DOMDOMDOM `$l` global function, users can:
  * Traverse and manipulate DOM elements
  * Build DOM elements
  * Create `DOMNodeCollection` objects from `HTMLElement`s
  * Queue functions until DOM is fully loaded

## Getting Started

The best way to get started with DOMDOMDOM is to download this library into your project and include the DOMDOMDOM library in your source code.

```
<head>
  <meta charset="utf-8">
  <link rel="stylesheet" href="./css/reset.css">
  <script type="text/javascript" src="../lib/dom_dom_dom.js"></script>
  ...
</head>

```

## API

[`$l`](#`$l`)

### `$l`

The DOMDOMDOM library utilizes the global variable of `$l` as a wrapper for all of the methods in the DOMDOMDOM library.  

`$l` is most commonly used to select elements with CSS selectors.  `$l("div")` returns a `DOMNodeCollection` object which is an object custom to the DOMDOMDOM library that is an array of `HTMLElement`s.  

`$l` can also be used to create `DOMNodeCollection` objects from unwrapped `HTMLElement`s giving these elements access to DOMDOMDOM methods.  

The third use of `$l` takes in a string of HTML code, builds `HTMLElement`(s) from the code, and then wraps the `HTMLElement`(s) in a `DOMNodeCollection` object.

The final use of `$l` is as tool to queue functions to run once the COM is fully loaded.

```
// Wrapped in $l, this function will only run once the DOM is fully loaded
$l(() => {

  // The element variable is a DOMNodeCollection object, an array-like structure, with all the div elements, so DOMNodeCollection such as `each` may be used
  const elements = $l("div");

  elements.each((element) => {

    // This use of $l takes the string of HTML code, creates a HTMLElement, and wraps the HTMLElement in a DOMNodeCollection object
    const paragraph = $l("<p></p>");

    // Because the elements contained by the DOMNodeCollection are still HTMLElements, they must be wrapped in an DOMNodeCollection before using DOMNodeCollection methods such as `append`
    const $lelement = $l(element);
    $lelement.append(paragraph);

  });

});
```

### DOM Manipulation

[]

####
