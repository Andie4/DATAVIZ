
document.querySelector('.accordion').addEventListener('click', function () {
    const panel = document.querySelector('.panel');
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null; // Ferme l'accordéon
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px"; // Ouvre l'accordéon
    }
  });