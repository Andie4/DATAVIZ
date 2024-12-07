const labels = dataVentes.map(item => item.year);
const ventes = dataVentes.map(item => parseFloat(item.ventes));


const ctx = document.getElementById('BestSellingAlbumGraph');

new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
            label: '# de ventes',
            data: [12, 19, 3, 5, 2, 3],
            borderWidth: 1
        }]
    },
});