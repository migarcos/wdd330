// alertModule.js
import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

// Function to load alerts from JSON file
function loadAlerts(callback) {
    fetch("../json/alerts.json")
      .then((response) => response.json())
      .then((data) => {
        callback(data);
      })
      .catch((error) => {
        console.error("Error loading alerts:", error);
      });
  }
  
  // Function to create alert elements and add them to the page
  function createAlertElements(alerts) {
    const alertSection = document.createElement("section");
    alertSection.classList.add("alert-list");
  
    for (const alert of alerts) {
      const alertParagraph = document.createElement("p");
      alertParagraph.textContent = alert.message;
      alertParagraph.style.backgroundColor = alert.background;
      alertParagraph.style.color = alert.color;
      alertParagraph.style.height = "80px";
      alertParagraph.style.width = "120px";
      (alertParagraph.style.padding = "10px"), "20px";
      alertParagraph.style.border = "2px";
  
      alertSection.appendChild(alertParagraph);
    }
  
    document.body.appendChild(alertSection);
  
    // Remove alert after 5 seconds
    setTimeout(() => {
      document.body.removeChild(alertSection);
    }, 5000);
  
    document.body.appendChild(alertSection);
  }
  
  // Load alerts and create elements when the page loads
  window.addEventListener("load", () => {
    loadAlerts((alerts) => {
      if (alerts.length > 0) {
        createAlertElements(alerts);
      }
    });
  });