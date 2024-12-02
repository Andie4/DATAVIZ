

const timelineContainer = document.createElement("div");
timelineContainer.className = "timeline";

timelineData.timeline.forEach(item => {
  const timelineItem = document.createElement("div");
  timelineItem.className = `timeline-item year-${item.year}`;
  
  const yearElement = document.createElement("p");
  yearElement.className = "year";
  yearElement.textContent = item.year;
  
  const squareElement = document.createElement("div");
  squareElement.className = "year-square";
  
  const descriptionElement = document.createElement("p");
  descriptionElement.className = "description";
  descriptionElement.textContent = item.description;
  
  timelineItem.appendChild(yearElement);
  timelineItem.appendChild(squareElement);
  timelineItem.appendChild(descriptionElement);
  timelineContainer.appendChild(timelineItem);
});

document.body.appendChild(timelineContainer);
