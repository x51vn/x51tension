// popup.js
document.addEventListener("DOMContentLoaded", function () {
    var openYouTubeStudioButton = document.getElementById("openYouTubeStudio");

    openYouTubeStudioButton.addEventListener("click", function () {
        chrome.tabs.create({ url: "https://studio.youtube.com/" }, function (tab) {
            // After opening YouTube Studio, wait for the page to load, then execute your action
            chrome.tabs.onUpdated.addListener(function listener(tabId, changeInfo, updatedTab) {
                if (tabId === tab.id && changeInfo.status === "complete") {
                    // Remove the listener to avoid multiple executions
                    chrome.tabs.onUpdated.removeListener(listener);

                    // Execute your action, e.g., click on a button
                    chrome.scripting.executeScript({
                        target: { tabId: tab.id },
                        function: function () {
                            // Find and click on the button by its selector or attributes
                            var button = document.querySelector('ytcp-button[id="create-icon"]');
                            if (button) {
                                button.click();
                            } else {
                                console.log("Button not found on YouTube Studio page.");
                            }
                        },
                    });
                }
            });
        });
    });

    clickUploadButton.addEventListener("click", function () {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.scripting.executeScript({
                target: { tabId: tabs[0].id },
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
                }/* , function () {
                    // Step 2: Wait for the 'text-item-0' element to load
                    var targetElementId = "text-item-0";
                    var maxAttempts = 30; // Adjust the number of attempts as needed
                    var pollInterval = 1000; // Adjust the polling interval as needed (in milliseconds)
                    var attempts = 0;

                    var observer = new MutationObserver(function () {
                        var textItem = document.getElementById(targetElementId);
                        if (textItem) {
                            // Step 3: Once the element is found, click it
                            textItem.click();
                            observer.disconnect(); // Stop observing
                        } else if (attempts >= maxAttempts) {
                            console.log("Timeout: Element with ID '" + targetElementId + "' not found.");
                            observer.disconnect(); // Stop observing
                        }
                        attempts++;
                        console.log("Step[2]" + attempts);
                    });

                    // Start observing mutations in the DOM
                    observer.observe(document.body, { childList: true, subtree: true });
                    // You can add additional logic or error handling here
                    
                }, function () {
                    console.log("Step [3]");
                    // Step 4: Wait for the '<div class="label style-scope ytcp-button">Chọn tệp</div>' element to appear
                    var targetElementSelector = 'div.label.style-scope.ytcp-button';
                    var maxAttempts = 30; // Adjust the number of attempts as needed
                    var pollInterval = 1000; // Adjust the polling interval as needed (in milliseconds)
                    var attempts = 0;

                    var labelObserver = new MutationObserver(function () {
                        // query

                        var labelElements = document.querySelectorAll(targetElementSelector);
                        console.log(labelElements);
                        labelElements.forEach(function (labelElement) {

                        if (labelElement.outerText === "Chọn tệp") {
                            // Step 5: Once the element is found, click it
                            labelElement.click();
                            labelObserver.disconnect(); // Stop observing
                            return;
                        }
                        });

                        if (attempts >= maxAttempts) {
                            console.log("Timeout: Element with selector '" + targetElementSelector + "' not found.");
                            labelObserver.disconnect(); // Stop observing
                        }
                        attempts++;
                    });

                    // Start observing mutations in the DOM for Step 4
                    labelObserver.observe(document.body, { childList: true, subtree: true });
                }*/
            }); 
        });
    });
});
