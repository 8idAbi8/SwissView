[codingChallanges](https://codingchallenges.fyi/challenges/challenge-chrome-extension)

# SwissView
A Chrome extension that will customise the look and functionality of each new tab you open in Chrome. It’s drawing on inspiration from the popular extension Bonjourr and the more complicated Momentum.

## Manifest
The extension's manifest is the only required file that must have a specific file name: manifest.json. It also has to be located in the extension's root directory. The manifest records important metadata, defines resources, declares permissions, and identifies which files to run in the background and on the page.

## Service worker
A service worker is a special type of script that runs separately from a web page in the background of the browser.
It’s designed to handle various browser events, such as network requests (for offline functionality) and interactions that happen outside of the user’s direct view, like closing tabs or managing bookmarks.

The service worker cannot interact directly with the DOM because it operates in a separate thread and is not part of the user interface of the webpage. This means it can’t change or update visible elements on the webpage itself.

However, you can use an offscreen document to perform tasks related to the DOM indirectly, even though the service worker itself doesn’t have direct access to it. An offscreen document is a type of document (or web page) that exists in memory but is not rendered on the screen. It can still interact with the DOM in the background, so you can use it to manipulate the DOM indirectly without violating the service worker’s restrictions. For example, you can manipulate data or perform background tasks using an offscreen document and then synchronize or update the visible content on the webpage.

