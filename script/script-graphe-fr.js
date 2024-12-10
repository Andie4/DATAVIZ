const dataByYear = [
    { year: '2012', data: [74, 7, 3, 13, 2] },
    { year: '2017', data: [51, 35, 7, 6, 1] },
    { year: '2021', data: [31, 52, 15, 1, 1] }
];

let currentYearIndex = 0;

const ctx = document.getElementById('pie').getContext('2d');

const pieChart = new Chart(ctx, {
    type: 'pie',
    data: {
        labels: ['Ventes physiques (1)', 'Streaming / Abonnements (2)', 'Streaming / Publicité et Vidéo (3)', 'Téléchargement (4)', 'Téléphone mobile (5)'],
        datasets: [{
            data: dataByYear[currentYearIndex].data,
            backgroundColor: [
                '#5F2992',
                '#D9D9D9',
                '#7C188D',
                '#A575D2',
                '#A854B1',
            ],
            hoverOffset: 5,
            borderColor: 'transparent',
            borderWidth: 2,
        }]
    },
    options: {
        plugins: {
            legend: {
                display: false 
            },
            tooltip: {
                callbacks: {
                    label: ({ raw }) => `${raw} %`
                }
            }
        }
    }
});

function updateChart() {
    // remise à zéro des données
    pieChart.data.datasets[0].data = dataByYear[currentYearIndex].data;

    // changement en fonction  de la date
    const dateDisplay = document.getElementById('dateDisplay');
    dateDisplay.textContent = dataByYear[currentYearIndex].year;


    pieChart.update();
}

function prevSlide() {
    currentYearIndex = (currentYearIndex > 0) ? currentYearIndex - 1 : dataByYear.length - 1;
    updateChart();
}

function nextSlide() {
    currentYearIndex = (currentYearIndex < dataByYear.length - 1) ? currentYearIndex + 1 : 0;
    updateChart();
}

document.getElementById('dateDisplay').textContent = dataByYear[currentYearIndex].year;
