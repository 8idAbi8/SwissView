## Manifest
The extension's manifest is the only required file that must have a specific file name: manifest.json. It also has to be located in the extension's root directory. The manifest records important metadata, defines resources, declares permissions, and identifies which files to run in the background and on the page.

## Service worker
A service worker is a special type of script that runs separately from a web page in the background of the browser.
It’s designed to handle various browser events, such as network requests (for offline functionality) and interactions that happen outside of the user’s direct view, like closing tabs or managing bookmarks.

The service worker cannot interact directly with the DOM because it operates in a separate thread and is not part of the user interface of the webpage. This means it can’t change or update visible elements on the webpage itself.

However, you can use an offscreen document to perform tasks related to the DOM indirectly, even though the service worker itself doesn’t have direct access to it. An offscreen document is a type of document (or web page) that exists in memory but is not rendered on the screen. It can still interact with the DOM in the background, so you can use it to manipulate the DOM indirectly without violating the service worker’s restrictions. For example, you can manipulate data or perform background tasks using an offscreen document and then synchronize or update the visible content on the webpage.

## RSS (Really Simple Syndication) 
is a type of web feed that allows users and applications to access updates to websites in a standardized, computer-readable format. It is commonly used for news websites, blogs, and other online publishers to share their latest content automatically. An RSS feed typically includes headlines, summaries, and links to the full content.\
To fetch an RSS feed, you need to access the XML file provided by the source website. Once you have the RSS feed, you need to parse it to extract the desired information. Then you can display the data.    

## CORS (Cross-Origin Resource Sharing)
is a security feature implemented by browsers that restricts web pages from making requests to a different domain than the one that served the web page. This prevents potentially malicious websites from reading sensitive data from other sites without permission.\
For example, if you're on https://example.com, the browser will typically block any attempt to fetch data from https://another-domain.com unless the server at another-domain.com explicitly allows it through CORS headers.

Substack's RSS feed doesn't include CORS headers, which means you can’t directly fetch it from your browser extension due to these restrictions.\
cors-anywhere is a service that acts as a proxy to bypass this restriction. It makes the request on your behalf, adds the required CORS headers, and then sends the response back to your extension.

More about CORS [here](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS). 

## CORS Proxy Services
A CORS proxy service acts as an intermediary between your website or extension and the server you're trying to access. It bypasses the CORS restrictions by making the request from a different domain (usually the proxy's domain) and then relays the response to you, making it appear as though the request originated from the same origin.\
In essence, a CORS proxy is a middleman that allows you to fetch resources from a server that might not otherwise allow cross-origin requests.

CORS Anywhere is a popular service that allows you to bypass CORS restrictions by providing a proxy URL. When you make a request to a resource through CORS Anywhere, it forwards the request to the destination server (e.g., a REST API or RSS feed) and returns the response to you, with the correct CORS headers added so that your browser allows it.\
**To use it, request temporary access to the demo server https://cors-anywhere.herokuapp.com/.**

## Summary of fetch, async, and await:
- fetch is a function that makes HTTP requests and returns a Promise.
- async is a keyword that turns a function into an asynchronous function, meaning it returns a Promise.
- await is used inside async functions to pause execution until a Promise is resolved and retrieve its result.

## fetch
fetch is a modern JavaScript function that allows you to make HTTP requests from your web pages or web applications. It is built into modern browsers and returns a Promise that resolves with the response from the request. It replaces older methods like XMLHttpRequest.

Features of fetch:
- It returns a Promise, which makes it easier to handle asynchronous operations.
You can pass options like HTTP method, headers, body, etc.
- Unlike XMLHttpRequest, fetch does not automatically reject on HTTP errors (like 404 or 500), so you need to check response.ok or handle the error yourself.

## async
async is a keyword that you can use to define a function that will return a Promise.\
The async function allows you to use the await keyword inside of it, making asynchronous code look more like synchronous code, which is easier to read and maintain.\
A function marked with async will always return a Promise. If the function returns a value, that value will be wrapped in a resolved Promise. If it throws an error, the Promise will be rejected.

## await
await is used inside an async function to pause execution of the code until a Promise resolves or rejects.\
When await is used, it pauses the function's execution and waits for the promise to resolve, after which it proceeds to parse the response as JSON.\
If the fetch request or the JSON parsing fails, the catch block catches the error.

## permissions
The "permissions" section in a Chrome extension's manifest.json file specifies which permissions the extension needs in order to function properly.
```
"permissions": [
    "tabs",
    "https://*/"
]
```
- "tabs":

    This permission allows the extension to interact with the browser tabs. It lets your extension query information about the currently opened tabs, modify them, or listen for events like tab creation or tab updates.

- "https://*/":

    This is a pattern that allows the extension to make network requests to any URL that starts with https://.
    The * is a wildcard, meaning it matches any domain.    
