let showSeconds = false; // Track whether seconds should be displayed

// Function to format and display the current time and date
function updateTimeAndDate() {
    const timeElement = document.getElementById("time");
    const dateElement = document.getElementById("date");

    // Get the current date and time
    const now = new Date();

    // Format time
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");

    // Display time with or without seconds based on the showSeconds flag
    timeElement.textContent = showSeconds ? `${hours}:${minutes}:${seconds}` : `${hours}:${minutes}`;

    // Format date
    const options = { weekday: "long", month: "long", day: "2-digit", year: "numeric" };
    const formattedDate = now.toLocaleDateString("en-US", options);
    dateElement.textContent = formattedDate;
}

// Set up a timer to refresh the time and date every second
function startClock() {
  updateTimeAndDate();                    // Initial call to set the time and date immediately
  setInterval(updateTimeAndDate, 1000);   // Refresh every second
}

// Toggle the visibility of seconds when the time element is clicked
function toggleSeconds() {
  showSeconds = !showSeconds;   // Toggle the state
  updateTimeAndDate();          // Update the display immediately
}

// Start the clock when the page loads and Attach the toggle event to the time element
document.addEventListener("DOMContentLoaded", () => {
  startClock(); // Start the clock

  const timeElement = document.getElementById("time");
  timeElement.addEventListener("click", toggleSeconds); // Attach the click event
});


  