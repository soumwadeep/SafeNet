chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.message === "get_current_tab_url") {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      var url = tabs[0].url;
      sendResponse({ url: url });
    });
    return true;
  }
});
