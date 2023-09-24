// background.js

// Function to perform your task
function performTask() {
  console.log("Task executed.");
}

// Create an alarm to run the task periodically
chrome.alarms.create("periodicTask", {
  periodInMinutes: 1 // Adjust the interval as needed (in minutes)
});

// Add an event listener to handle alarm triggers
chrome.alarms.onAlarm.addListener(function (alarm) {
  if (alarm.name === "periodicTask") {
    performTask();
  }
});
