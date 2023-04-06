// popup.js

document.addEventListener("DOMContentLoaded", function () {
  var blockButton = document.getElementById("block-button");
  blockButton.addEventListener("click", function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.update(tabs[0].id, { url: "https://www.google.com/" });
    });
  });
});
