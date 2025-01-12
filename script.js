// Global references to static DOM elements
const timeElement = document.getElementById("time");
const dateElement = document.getElementById("date");

// Constants for URLs
const PROXY_URL = "https://cors-anywhere.herokuapp.com/";
const FEED_URL = "https://codingchallenges.substack.com/feed";

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

// Function to fetch and display the latest coding challenges
async function fetchCodingChallenges() {
  /* 
  This is a public CORS proxy service that allows your extension to fetch resources from servers that block cross-origin requests, like Substack's RSS feed, which does not include the necessary CORS headers.
  */
  try {
    const response = await fetch(PROXY_URL + FEED_URL);    
    const data = await response.text();
    const parser = new DOMParser();  // Create a parser for XML data
    const xmlDoc = parser.parseFromString(data, "text/xml");  // Parse the RSS XML string into a DOM object
    const items = xmlDoc.querySelectorAll("item");  // Get all the "item" elements from the feed (each challenge)
    let challengesHtml = "";

    // Loop through the first n challenges and create HTML list items for them
    items.forEach((item, index) => {
      if (index < 4) { // Display the latest 4 challenges
        const title = item.querySelector("title").textContent; // Get the title of the challenge
        const link = item.querySelector("link").textContent;  // Get the URL to the challenge
        challengesHtml += `<li><a href="${link}" target="_blank">${title}</a></li>`;
      }
    });
     // Update the webpage with the list of challenges
    document.getElementById("challenge-list").innerHTML = `<ul>${challengesHtml}</ul>`;

  } catch (error) {
    console.error("Error fetching the feed:", error);
    document.getElementById("coding-challenges").innerHTML = `<p>Error loading challenges. Please try again later.</p>`;
  }
}


document.addEventListener("DOMContentLoaded", () => {
  updateTimeAndDate();   // Initial call to set the time and date immediately
  setInterval(updateTimeAndDate, 1000);   // Refresh every second

  updateGreeting();  // Initial call to set greeting
  setInterval(updateGreeting, 60000);  // Update greeting every minute

  // Adds a click event to toggle seconds display on the time element
  timeElement.addEventListener("click", toggleSeconds); 

  fetchCodingChallenges(); // Fetch challenges once on new tab load
});


  