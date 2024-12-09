"use strict"


fetch('data/mondialAlbum.json').then(function (response) {
    response.json().then(function (dataVentes) {

        const labels = dataVentes.map(item => item.year);
        const ventes = dataVentes.map(item => parseFloat(item.ventes));
        const artists = dataVentes.map(item => item.artist);
        const albums = dataVentes.map(item => item.album);

        const canvas = document.getElementById('BestSellingAlbumGraph');
        var ctx = canvas.getContext("2d");

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
                maintainAspectRatio: false, // S'adapte aux dimensions définies
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
                },
                scales: {
                    x: {
                        ticks: {
                            color: '#FFFFFF', // Couleur des labels de l'axe X (blanc)
                            font: {
                                size: 14, // Taille de la police des labels
                            }
                        },

                        title: {
                            display: true,
                            text: 'Années',
                            color: '#FFFFFF', // Couleur du titre de l'axe X (blanc)
                            font: {
                                size: 16,
                                weight: 'bold'
                            }
                        }
                    },
                    y: {
                        ticks: {
                            color: '#FFFFFF', // Couleur des labels de l'axe Y (blanc)
                            font: {
                                size: 14, // Taille de la police des labels
                            }
                        },
                        grid: {
                            color: 'rgba(255, 255, 255, 0.2)' // Couleur des lignes de la grille (translucide)
                        },
                        title: {
                            display: true,
                            text: 'Ventes (millions)',
                            color: '#FFFFFF', // Couleur du titre de l'axe Y (blanc)
                            font: {
                                size: 16,
                                weight: 'bold'
                            }
                        }
                    }
                }
            }
        });



        // Tableau

        // Génération du tableau
        const tableContainer = document.getElementById('tableContainerAlbum');
        const table = document.createElement('table');
        table.setAttribute('border', '1');
        table.style.width = '100%';
        table.style.borderCollapse = 'collapse';

        // En-tête du tableau
        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');
        const headers = ['Année', 'Album', 'Artiste', 'Ventes (millions)'];
        headers.forEach(headerText => {
            const th = document.createElement('th');
            th.textContent = headerText;
            th.style.backgroundColor = '#A575D2';
            th.style.color = 'white';
            th.style.padding = '8px';
            headerRow.appendChild(th);
        });
        thead.appendChild(headerRow);
        table.appendChild(thead);

        // Corps du tableau
        const tbody = document.createElement('tbody');
        dataVentes.forEach(item => {
            const row = document.createElement('tr');

            // Colonnes
            const yearCell = document.createElement('td');
            yearCell.textContent = item.year;
            yearCell.style.padding = '8px';

            const albumCell = document.createElement('td');
            albumCell.textContent = item.album;
            albumCell.style.padding = '8px';

            const artistCell = document.createElement('td');
            artistCell.textContent = item.artist;
            artistCell.style.padding = '8px';

            const salesCell = document.createElement('td');
            salesCell.textContent = item.ventes;
            salesCell.style.padding = '8px';

            // Ajout des cellules à la ligne
            row.appendChild(yearCell);
            row.appendChild(albumCell);
            row.appendChild(artistCell);
            row.appendChild(salesCell);

            // Ajout de la ligne au corps du tableau
            tbody.appendChild(row);
        });
        table.appendChild(tbody);

        // Ajout du tableau au conteneur
        tableContainer.appendChild(table);



        const tabAlbum = document.querySelector("#tableContainerAlbum")
        tabAlbum.style.display="none"

        document.querySelector(".data-graph").addEventListener("click",function(){
            if(tabAlbum.style.display=="none"){
                tabAlbum.style.display="block"
            }else{
                tabAlbum.style.display="none"
            }
        })






    });
});
