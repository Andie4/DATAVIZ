"use strict"


fetch('data/mondialAlbum.json').then(function (response) {
    response.json().then(function (dataVentes) {

        const labels = dataVentes.map(item => item.year);
        const ventes = dataVentes.map(item => parseFloat(item.ventes));
        const artists = dataVentes.map(item => item.artist);
        const albums = dataVentes.map(item => item.album);

        const ctx = document.getElementById('BestSellingAlbumGraph');

        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: '# de ventes en millions',
                    data: ventes,
                    borderWidth: 1,
                    backgroundColor: '#A575D2'
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: function (context) {
                                const index = context.dataIndex;
                                const value = context.raw;
                                const artist = artists[index];
                                const album = albums[index];
                                return [
                                    `Ventes: ${value} millions`,
                                    `Artiste: ${artist}`,
                                    `Album: ${album}`
                                ];
                            },
                            title: function (context) {
                                return `Année : ${context[0].label}`;
                            }
                        }
                    }
                }
            }
        });
    });
});
