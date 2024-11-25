// Données des ventes de musique par année avec des sources de revenu spécifiques
const data = [
    {"year": 1999, "total": 24.1, "ventes_physiques": 24.1, "droits_execution": 0, "ventes_digitales": 0, "streaming": 0, "synchronisation": 0},
    {"year": 2000, "total": 22.6, "ventes_physiques": 22.6, "droits_execution": 0, "ventes_digitales": 0, "streaming": 0, "synchronisation": 0},
    {"year": 2001, "total": 23.8, "ventes_physiques": 23.3, "droits_execution": 0.6, "ventes_digitales": 0, "streaming": 0, "synchronisation": 0},
    {"year": 2002, "total": 22.4, "ventes_physiques": 21.7, "droits_execution": 0.7, "ventes_digitales": 0, "streaming": 0, "synchronisation": 0},
    {"year": 2003, "total": 20.8, "ventes_physiques": 20, "droits_execution": 0.8, "ventes_digitales": 0, "streaming": 0, "synchronisation": 0},
    {"year": 2004, "total": 20.7, "ventes_physiques": 19.4, "droits_execution": 0.9, "ventes_digitales": 0.4, "streaming": 0, "synchronisation": 0},
    {"year": 2005, "total": 20.1, "ventes_physiques": 18.4, "droits_execution": 0.9, "ventes_digitales": 1, "streaming": 0.1, "synchronisation": 0},
    {"year": 2006, "total": 19.7, "ventes_physiques": 16.5, "droits_execution": 1, "ventes_digitales": 2, "streaming": 0.2, "synchronisation": 0},
    {"year": 2007, "total": 18.3, "ventes_physiques": 14.2, "droits_execution": 1.2, "ventes_digitales": 2.7, "streaming": 0.2, "synchronisation": 0},
    {"year": 2008, "total": 17, "ventes_physiques": 12, "droits_execution": 1.3, "ventes_digitales": 3.4, "streaming": 0.3, "synchronisation": 0},
    {"year": 2009, "total": 16, "ventes_physiques": 10.2, "droits_execution": 1.3, "ventes_digitales": 3.9, "streaming": 0.4, "synchronisation": 0},
    {"year": 2010, "total": 15, "ventes_physiques": 8.8, "droits_execution": 1.4, "ventes_digitales": 4.4, "streaming": 0.5, "synchronisation": 0},
    {"year": 2011, "total": 14.8, "ventes_physiques": 7.4, "droits_execution": 1.5, "ventes_digitales": 5.1, "streaming": 0.7, "synchronisation": 0.1},
    {"year": 2012, "total": 14.5, "ventes_physiques": 6.3, "droits_execution": 1.6, "ventes_digitales": 5.7, "streaming": 0.8, "synchronisation": 0.1},
    {"year": 2013, "total": 14.1, "ventes_physiques": 5.6, "droits_execution": 1.7, "ventes_digitales": 5.8, "streaming": 1, "synchronisation": 0.1},
    {"year": 2014, "total": 14.2, "ventes_physiques": 5.1, "droits_execution": 1.8, "ventes_digitales": 5.7, "streaming": 1.5, "synchronisation": 0.1},
    {"year": 2015, "total": 15, "ventes_physiques": 5.2, "droits_execution": 1.9, "ventes_digitales": 5.6, "streaming": 2.2, "synchronisation": 0.1},
    {"year": 2016, "total": 15.7, "ventes_physiques": 5.1, "droits_execution": 2, "ventes_digitales": 5.2, "streaming": 3.3, "synchronisation": 0.1},
    {"year": 2017, "total": 16.2, "ventes_physiques": 5, "droits_execution": 2.2, "ventes_digitales": 4.6, "streaming": 4.3, "synchronisation": 0.1},
    {"year": 2018, "total": 17.3, "ventes_physiques": 4.7, "droits_execution": 2.5, "ventes_digitales": 3.9, "streaming": 6, "synchronisation": 0.2},
    {"year": 2019, "total": 18.8, "ventes_physiques": 4.4, "droits_execution": 2.8, "ventes_digitales": 3.6, "streaming": 7.8, "synchronisation": 0.2},
    {"year": 2020, "total": 21.6, "ventes_physiques": 4.2, "droits_execution": 3.3, "ventes_digitales": 3.3, "streaming": 10.6, "synchronisation": 0.2},
    {"year": 2021, "total": 25.9, "ventes_physiques": 4.5, "droits_execution": 3.7, "ventes_digitales": 3.4, "streaming": 14.1, "synchronisation": 0.2},
    {"year": 2022, "total": 26.2, "ventes_physiques": 4.1, "droits_execution": 3.9, "ventes_digitales": 3.2, "streaming": 15, "synchronisation": 0.2}
];

// Dimensions et marges du graphique
const width = 800;
const height = 500;
const margin = { top: 20, right: 30, bottom: 50, left: 40 };

// Création de l'élément SVG
const svg = d3.select("#chart")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

// Échelles pour les axes X et Y
const x = d3.scaleBand()
    .domain(data.map(d => d.year))
    .range([0, width])
    .padding(0.2);

const y = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.total)])
    .nice()
    .range([height, 0]);

// Définition des couleurs pour chaque source de revenu
const colors = {
    ventes_physiques: "#7a4ba1",
    droits_execution: "#9b6fb1",
    ventes_digitales: "#b890d1",
    streaming: "#d1a9e1",
    synchronisation: "#e5c1f0"
};

// Ajout des axes
svg.append("g")
    .attr("class", "x-axis")
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(x).tickFormat(d3.format("d")));

svg.append("g")
    .attr("class", "y-axis")
    .call(d3.axisLeft(y));

// Conteneur d'information pour afficher les détails au survol
const infoDisplay = document.getElementById("info-display");

// Fonction pour afficher les segments empilés de chaque année
data.forEach(d => {
    let yOffset = height;

    ["ventes_physiques", "droits_execution", "ventes_digitales", "streaming", "synchronisation"].forEach(source => {
        const segmentValue = d[source];
        const segmentHeight = y(0) - y(segmentValue);

        svg.append("rect")
            .attr("x", x(d.year))
            .attr("y", yOffset - segmentHeight)
            .attr("width", x.bandwidth())
            .attr("height", segmentHeight)
            .attr("fill", colors[source])
            .on("mouseover", function() {
                infoDisplay.style.display = "block";
                infoDisplay.innerHTML = `
                    <h3>Année ${d.year}</h3>
                    <p>Total : ${d.total} milliards</p>
                    <p><span style="display:inline-block; width:10px; height:10px; background-color:${colors.ventes_physiques}; margin-right:5px;"></span>Ventes physiques : ${d.ventes_physiques} milliards</p>
                    <p><span style="display:inline-block; width:10px; height:10px; background-color:${colors.droits_execution}; margin-right:5px;"></span>Droits d'exécution : ${d.droits_execution} milliards</p>
                    <p><span style="display:inline-block; width:10px; height:10px; background-color:${colors.ventes_digitales}; margin-right:5px;"></span>Ventes digitales : ${d.ventes_digitales} milliards</p>
                    <p><span style="display:inline-block; width:10px; height:10px; background-color:${colors.streaming}; margin-right:5px;"></span>Streaming : ${d.streaming} milliards</p>
                    <p><span style="display:inline-block; width:10px; height:10px; background-color:${colors.synchronisation}; margin-right:5px;"></span>Synchronisation : ${d.synchronisation} milliards</p>
                `;
            })
            .on("mousemove", function(event) {
                infoDisplay.style.left = (event.pageX + 10) + "px";
                infoDisplay.style.top = (event.pageY + 10) + "px";
            })
            .on("mouseout", function() {
                infoDisplay.style.display = "none";
            });

        yOffset -= segmentHeight;
    });
});

// Script pour positionner les éléments de la frise chronologique
document.addEventListener("DOMContentLoaded", function () {
    const timelineItems = document.querySelectorAll(".timeline-item");
    const startYear = 1960;
    const endYear = 2020;

    timelineItems.forEach(item => {
        const year = parseInt(item.getAttribute("data-year"));
        const positionPercent = ((year - startYear) / (endYear - startYear)) * 100;
        item.style.left = `${positionPercent}%`;

        document.addEventListener("DOMContentLoaded", () => {
            const timeline = document.querySelector(".timeline");
            const timelineItems = document.querySelectorAll(".timeline-item");
            const startYear = 1963;
            const endYear = 2001;
            const yearsRange = endYear - startYear;
            
            // Largeur totale de la frise
            const timelineWidth = timeline.offsetWidth;
        
            // Calcul des pixels par année
            const pixelsPerYear = timelineWidth / yearsRange;
        
            timelineItems.forEach((item) => {
                // Extraire l'année de chaque élément (par exemple depuis un attribut data-year)
                const year = parseInt(item.querySelector(".year").textContent);
                
                // Calculer la position en pixels
                const position = (year - startYear) * pixelsPerYear;
                
                // Appliquer la position calculée
                item.style.position = "absolute";
                item.style.left = `${position}px`;
            });
        });
        document.addEventListener('DOMContentLoaded', () => {
    const options = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.1, // 10% visible pour déclencher
    };

    const handleIntersect = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                observer.unobserve(entry.target); // Stop observer après apparition
            }
        });
    };

    const observer = new IntersectionObserver(handleIntersect, options);

    // Cible les éléments à observer
    const targets = document.querySelectorAll('.chart-container, .text-container');
    targets.forEach(target => observer.observe(target));
});

    });
});
