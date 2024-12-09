
<<<<<<< Updated upstream
document.querySelector('.accordion').addEventListener('click', function () {
    const panel = document.querySelector('.panel');
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null; // Ferme l'accordéon
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px"; // Ouvre l'accordéon
    }
  });
=======

// const timelineContainer = document.createElement("div");
// timelineContainer.className = "timeline";

// timelineData.timeline.forEach(item => {
//   const timelineItem = document.createElement("div");
//   timelineItem.className = `timeline-item year-${item.year}`;
  
//   const yearElement = document.createElement("p");
//   yearElement.className = "year";
//   yearElement.textContent = item.year;
  
//   const squareElement = document.createElement("div");
//   squareElement.className = "year-square";
  
//   const descriptionElement = document.createElement("p");
//   descriptionElement.className = "description";
//   descriptionElement.textContent = item.description;
  
//   timelineItem.appendChild(yearElement);
//   timelineItem.appendChild(squareElement);
//   timelineItem.appendChild(descriptionElement);
//   timelineContainer.appendChild(timelineItem);
// });

// document.body.appendChild(timelineContainer);


document.addEventListener("DOMContentLoaded", () => {
  const accordion = document.querySelector(".accordion");
  const panel = document.querySelector(".panel");

  accordion.addEventListener("click", () => {
      // Toggle le display
      if (panel.style.display === "block") {
          panel.style.display = "none";
      } else {
          panel.style.display = "block";
      }
  });
});
>>>>>>> Stashed changes
