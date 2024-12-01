const accordion = document.querySelector('.accordion');
const panel = document.querySelector('.panel');

accordion.addEventListener('click', () => {
  panel.style.maxHeight = panel.style.maxHeight ? null : panel.scrollHeight + "px";
});

const timelineData = {
  timeline: [
    { year: 1963, description: "Cassette" },
    { year: 1970, description: "Vinyles" },
    { year: 1979, description: "Baladeur cassette" },
    { year: 1983, description: "CD" },
    { year: 1984, description: "Baladeur CD" },
    { year: 1998, description: "Baladeur MP3" },
    { year: 2001, description: "Ipod" }
  ]
};

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
