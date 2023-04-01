function blockFraudulentSites(details) {
  // Check the details of the request to see if it matches any known phishing or scamming sites
  if (
    details.url.includes("phishing.com") ||
    details.url.includes("scamming.net")
  ) {
    // Cancel the request if it matches a known fraudulent site
    return { cancel: true };
  }
}

// Add a listener for webRequest events and call the blockFraudulentSites function
chrome.webRequest.onBeforeRequest.addListener(
  blockFraudulentSites,
  { urls: ["<all_urls>"] },
  ["blocking"]
);
