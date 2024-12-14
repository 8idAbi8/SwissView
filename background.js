/* 
chrome.action.onClicked.addListener: This event is triggered when the extension icon is clicked.

chrome.tabs.create: Opens a new tab. The url parameter specifies the location to load in the new tab. Here, we load the default new tab (which your extension overrides).
*/

chrome.action.onClicked.addListener(() => {
    // Open a new tab with the custom new tab page
    chrome.tabs.create({ url: "chrome://newtab" });
});
  