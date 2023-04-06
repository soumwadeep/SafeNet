// background.js

// Initialize Safe Browsing API
chrome.safeBrowsing
  .isEnabled()
  .then(function(enabled) {
    if (enabled) {
      console.log("Safe Browsing API is enabled");
    } else {
      console.log("Safe Browsing API is disabled");
    }
  })
  .catch(function(error) {
    console.error("Error initializing Safe Browsing API", error);
  });

// Load Google Safe Browsing API configuration
fetch(chrome.runtime.getURL("google_safe_browsing.json"))
  .then(function(response) {
    return response.json();
  })
  .then(function(config) {
    chrome.safeBrowsing
      .setApiKey(config.apiKey)
      .then(function() {
        console.log("API key is set");
      })
      .catch(function(error) {
        console.error("Error setting API key", error);
      });

    chrome.safeBrowsing
      .setClient(config.client)
      .then(function() {
        console.log("Client is set");
      })
      .catch(function(error) {
        console.error("Error setting client", error);
      });

    chrome.safeBrowsing
      .update(config.threatInfo)
      .then(function() {
        console.log("Threat info is updated");
      })
      .catch(function(error) {
        console.error("Error updating threat info", error);
      });
  })
  .catch(function(error) {
    console.error("Error loading Safe Browsing API configuration", error);
  });

// Listen for webRequest events and check URLs against Safe Browsing API
chrome.webRequest.onBeforeRequest.addListener(
  function(details) {
    chrome.safeBrowsing.checkUrl(details.url, function(result) {
      if (result == "malicious") {
        chrome.tabs.update(details.tabId, { url: "https://www.google.com/" });
      }
    });
  },
  { urls: ["<all_urls>"] },
  ["blocking"]
);
