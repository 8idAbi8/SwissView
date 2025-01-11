// Global references to static DOM elements
const timeElement = document.getElementById("time");
const dateElement = document.getElementById("date");

let showSeconds = false; // Track whether seconds should be displayed

// Function to format and display the current time and date
function updateTimeAndDate() {  
  const currentDateTime = new Date();
  updateTime(currentDateTime);
  updateDate(currentDateTime);  
}

// Function to update the displayed time only
function updateTime(currentDateTime) {
  // Format time and updating
  const hours = String(currentDateTime.getHours()).padStart(2, "0");
  const minutes = String(currentDateTime.getMinutes()).padStart(2, "0");
  const seconds = String(currentDateTime.getSeconds()).padStart(2, "0");  
  // Display time with or without seconds based on the showSeconds flag
  timeElement.textContent = showSeconds ? `${hours}:${minutes}:${seconds}` : `${hours}:${minutes}`; 
}

function updateDate(currentDateTime) {
  // Format date and updating
  dateElement.textContent = currentDateTime.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "2-digit",
    year: "numeric",
  });
}

// Toggle the visibility of seconds when the time element is clicked
function toggleSeconds() {
  showSeconds = !showSeconds;   // Toggle the state
  updateTimeAndDate();        
}

// Function to determine the greeting based on the current hour
function updateGreeting() {
  const greetingElement = document.getElementById("greeting");  
  const hour = new Date().getHours(); // Extract the hour
  let greeting = "Hello";
  if (hour >= 5 && hour < 12) {
    greeting = "Good morning";
  } else if (hour >= 12 && hour < 18) {
    greeting = "Good afternoon";
  } else {
    greeting = "Good evening";
  }
  greetingElement.textContent = greeting;
}

document.addEventListener("DOMContentLoaded", () => {
  updateTimeAndDate();   // Initial call to set the time and date immediately
  setInterval(updateTimeAndDate, 1000);   // Refresh every second

  updateGreeting();  // Initial call to set greeting
  setInterval(updateGreeting, 60000);  // Update greeting every minute

  // Adds a click event to toggle seconds display on the time element
  timeElement.addEventListener("click", toggleSeconds); 
});


  