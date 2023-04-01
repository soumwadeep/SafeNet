chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "checkUrl") {
    var xhr = new XMLHttpRequest();
    xhr.open(
      "POST",
      "https://safebrowsing.googleapis.com/v4/threatMatches:find?key=AIzaSyDUlKo3pK2TkjCnYIqE9THre-QQJbJAlx0",
      true
    );
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        var response = JSON.parse(xhr.responseText);
        if (response.matches) {
          sendResponse({ isSafe: false });
        } else {
          sendResponse({ isSafe: true });
        }
      }
    };

    var requestBody = {
      client: {
        clientId: "YourCompany",
        clientVersion: "1.0.0",
      },
      threatInfo: {
        threatTypes: ["MALWARE", "SOCIAL_ENGINEERING", "UNWANTED_SOFTWARE"],
        platformTypes: ["ANY_PLATFORM"],
        threatEntryTypes: ["URL"],
        threatEntries: [{ url: request.url }],
      },
    };

    xhr.send(JSON.stringify(requestBody));
    return true;
  }
});
