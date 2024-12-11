// Afficher le tableau du graphique

document.addEventListener("DOMContentLoaded", () => {
  const accordion = document.querySelector(".accordion");
  const panel = document.querySelector(".panel");
  panel.style.display="none";

  accordion.addEventListener("click", () => {
      // Toggle le display
      if (panel.style.display === "block") {
          panel.style.display = "none";
          accordion.innerHTML="Afficher les données";
      } else {
          panel.style.display = "block";
          accordion.innerHTML="Cacher les données";
      }
  });
});
