document.addEventListener("DOMContentLoaded", function () {
  var checkButton = document.getElementById("check-button");
  var urlInput = document.getElementById("url-input");
  var resultParagraph = document.getElementById("result");

  checkButton.addEventListener("click", function () {
    chrome.runtime.sendMessage(
      { action: "checkUrl", url: urlInput.value },
      function (response) {
        if (response.isSafe) {
          resultParagraph.innerText = "This URL is safe!";
        } else {
          resultParagraph.innerText = "This URL is unsafe!";
        }
      }
    );
  });
});
