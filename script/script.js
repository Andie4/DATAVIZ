// Afficher le tableau du graphique

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
