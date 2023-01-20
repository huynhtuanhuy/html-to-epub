[![npm version](https://badge.fury.io/js/@lesjoursfr%2Fhtml-to-epub.svg)](https://badge.fury.io/js/@lesjoursfr%2Fhtml-to-epub)
[![QC Checks](https://github.com/lesjoursfr/html-to-epub/actions/workflows/quality-control.yml/badge.svg)](https://github.com/lesjoursfr/html-to-epub/actions/workflows/quality-control.yml)

# @dimitrilahaye/html-to-epub

Generate EPUB books from HTML with simple API in Node.js.
Inspired by [cyrilis/epub-gen](https://github.com/cyrilis/epub-gen/)

# What is this library?

This epub library will generate temp html and download images in your DOMs, then generate the epub book you want.

## Usage

Install the lib and add it as a dependency :

```
    npm install @lesjoursfr/html-to-epub
```

Then put this in your code:

```javascript
const { EPub } = require("@lesjoursfr/html-to-epub");

const epub = new EPub(option, output);
epub.render()
	.then(() => {
		console.log("Ebook Generated Successfully!");
	})
	.catch((err) => {
		console.error("Failed to generate Ebook because of ", err);
	});
```

#### Options

-   `title`:
    Title of the book
-   `author`:
    Name of the author for the book, string or array, eg. `"Alice"` or `["Alice", "Bob"]`
-   `publisher`:
    Publisher name (optional)
-   `cover`:
    Book cover image (optional), File path (absolute path) or web url, eg. `"http://abc.com/book-cover.jpg"` or `"/User/Alice/images/book-cover.jpg"`
-   `output`
    Out put path (absolute path), you can also path output as the second argument when use `new` , eg: `new Epub(options, output)`
-   `version`:
    You can specify the version of the generated EPUB, `3` the latest version (http://idpf.org/epub/30) or `2` the previous version (http://idpf.org/epub/201, for better compatibility with older readers). If not specified, will fallback to `3`.
-   `css`:
    If you really hate our css, you can pass css string to replace our default style. eg: `"body{background: #000}"`
-   `fonts`:
    Array of (absolute) paths to custom fonts to include on the book so they can be used on custom css. Ex: if you configure the array to `fonts: ['/path/to/Merriweather.ttf']` you can use the following on the custom CSS:

    ```
    @font-face {
        font-family: "Merriweather";
        font-style: normal;
        font-weight: normal;
        src : url("./fonts/Merriweather.ttf");
    }
    ```

-   `lang`:
    Language of the book in 2 letters code (optional). If not specified, will fallback to `en`.
-   `skipImageNotFound`:
    If setted to `true`, ignores images or cover loaded from url when the response has a 404 code. If setted to `false`, falls on error. Default is `false` (optional).
-   `rejectUnauthorized`:
    If setted to `false`, certificate validation is disabled for TLS connections.

    :warning: This makes TLS, and HTTPS by extension, insecure. The use of this environment variable is strongly discouraged. Default is `true` (optional)

-   `retries`:
    On images downloads, ask to retry `n` times each request which falls on 500-599 range of status code. Default is `0`. (optional)
-   `retryDelay`:
    On images downloads, the amount of time (in ms) to initially delay the retry. Default is `100`. Not taken into account if `retries` has been setted at `0`. (optional)
-   `concurrency`:
    Process in parallel `n` html contents from urls and files. By default, this option is setted to `1`, which means contents will be processed sequentially. (optional)
-   `tocTitle`:
    Title of the table of contents. If not specified, will fallback to `Table Of Contents`.
-   `appendChapterTitles`:
    Automatically append the chapter title at the beginning of each contents. You can disable that by specifying `false`.
-   `customOpfTemplatePath`:
    Optional. For advanced customizations: absolute path to an OPF template.
-   `customNcxTocTemplatePath`:
    Optional. For advanced customizations: absolute path to a NCX toc template.
-   `customHtmlTocTemplatePath`:
    Optional. For advanced customizations: absolute path to a HTML toc template.
-   `content`:
    Book Chapters content. It's should be an array of objects. eg. `[{title: "Chapter 1",data: "<div>..."}, {data: ""},...]`

    **Within each chapter object:**

    -   `title`:
        optional, Chapter title
    -   `author`:
        optional, if each book author is different, you can fill it.
    -   `data`:
        required, HTML String of the chapter content. image paths should be absolute path (should start with "http" or "https"), so that they could be downloaded. With the upgrade is possible to use local images (for this the path must start with file: //)
    -   `excludeFromToc`:
        optional, if is not shown on Table of content, default: false;
    -   `beforeToc`:
        optional, if is shown before Table of content, such like copyright pages. default: false;
    -   `filename`:
        optional, specify filename for each chapter, default: undefined;

-   `verbose`:
    specify whether or not to console.log progress messages, default: false.

#### Output

If you don't want pass the output pass the output path as the second argument, you should specify output path as `option.output`.
