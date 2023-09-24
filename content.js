// ------------------------------
function clickButtonInTab() {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        var ytTab = tabs.find(function (tab) {
            console.log(tab.url);
            return tab.url.startsWith("https://studio.youtube.com");
        }); // Find the YouTube Studio tab
        if (!ytTab) {
            console.log("YouTube Studio tab not found.");
            return;
        }

        chrome.scripting.executeScript({
            target: { tabId: ytTab.id },
            function: function () {
                // Step 1: Click the 'ytcp-button' element
                var ytcpElementSelector = 'ytcp-button[id="create-icon"]';
                var maxAttempts = 30; // Adjust the number of attempts as needed
                var pollInterval = 1000; // Adjust the polling interval as needed (in milliseconds)
                var attempts = 0;
                var ytcpObserver = new MutationObserver(function () {
                    var ytcpButton = document.querySelector(ytcpElementSelector);
                    if (ytcpButton) {
                        // Step 2: Once the element is found, click it
                        ytcpButton.click();
                        ytcpObserver.disconnect(); // Stop observing
                    } else if (attempts >= maxAttempts) {
                        console.log("Timeout: Element with selector '" + ytcpElementSelector + "' not found.");
                        ytcpObserver.disconnect(); // Stop observing
                    }
                    attempts++;
                });
                ytcpObserver.observe(document.body, { childList: true, subtree: true });
            }
        }); 
    });
}