"use strict"

var index = 0;

fetch('data/mondialAlbum.json').then(function (response) {
    response.json().then(function (dataVentes) {

        function afficheAlbum(index) {
            var album = dataVentes[index]
            document.querySelector("#topAlbumMonde .year").innerHTML = album.year
            document.querySelector('#topAlbumMonde .album').innerHTML = `
            <div class="divAlbum">
            <p class="TopTxt">${album.year}</p>
            <img class="hide" src="${dataVentes[removeIndex(index)].imgAlbum}" alt="">
            <img class="img-album" src="${album.imgAlbum}" alt="">
            <img class="hide" src="${dataVentes[addIndex(index)].imgAlbum}" alt="">
                <div class="detail">
                    <p class="name-album">${album.album}</p>
                    <p>${album.artist}</p>
                </div>
                <div class="lien-album">
                    <a class="icon-lien-album" href="${album.URLDeezer}" alt="">
                        <img src="img/logo_deezer.png" alt="lien vers l'album sur Deezer">
                    </a>
                    <a class="icon-lien-album" href="${album.URLSpotify}" alt="">
                        <img src="img/logo_spotify.png" alt="lien vers l'album sur Spotify">
                    </a>
                    <a class="icon-lien-album" href="${album.URLYoutube}" alt="">
                        <img src="img/logo_youtube.png" alt="lien vers l'album sur Youtube">
                    </a>
                </div>
            </div>
            `;

        }

        afficheAlbum(index);

        var buttonPrev = document.querySelector("#topAlbumMonde .prevYear");
        var buttonNext = document.querySelector("#topAlbumMonde .nextYear");

        buttonPrev.addEventListener("click", function () {
            index = removeIndex(index);
            activeBarIndex = index; 
            afficheAlbum(index);
            updateBarColors(chart, activeBarIndex); 
            chart.update(); 
        });

        buttonNext.addEventListener("click", function () {
            index = addIndex(index); 
            activeBarIndex = index; 
            afficheAlbum(index); 
            updateBarColors(chart, activeBarIndex); 
            chart.update(); 
        });


        function addIndex(index) {
            if ((index + 1) < dataVentes.length) {
                index++
            } else {
                index = 0
            }
            return index
        }

        function removeIndex(index) {
            if ((index - 1) >= 0) {
                index--
            } else {
                index = dataVentes.length - 1
            }
            return index
        }
        // ===============================================================

        const labels = dataVentes.map(item => item.year);
        const ventes = dataVentes.map(item => parseFloat(item.ventes));
        const artists = dataVentes.map(item => item.artist);
        const albums = dataVentes.map(item => item.album);

        const canvas = document.getElementById('BestSellingAlbumGraph');
        var ctx = canvas.getContext("2d");

        let activeBarIndex = null;

        function updateBarColors(chart, activeIndex) {
            chart.data.datasets[0].backgroundColor = chart.data.labels.map((_, index) =>
                index === activeIndex ? '#5F2992' : '#A575D2'
            );
        }

        const chart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: '# de ventes en millions',
                    data: ventes,
                    borderWidth: 1,
                    backgroundColor: labels.map(() => '#A575D2') // Couleur par défaut
                }]
            },
            options: {
                onClick: (event, elements) => {
                    if (elements.length > 0) {
                        activeBarIndex = elements[0].index;
                        index = activeBarIndex;
                        afficheAlbum(index);
                        updateBarColors(chart, activeBarIndex);
                        chart.update();
                    }
                },
                responsive: true,
                maintainAspectRatio: false,
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
                            color: '#FFFFFF',
                            font: {
                                size: 14
                            }
                        },
                        title: {
                            display: true,
                            text: 'Années',
                            color: '#FFFFFF',
                            font: {
                                size: 16,
                                weight: 'bold'
                            }
                        }
                    },
                    y: {
                        ticks: {
                            color: '#FFFFFF',
                            font: {
                                size: 14
                            }
                        },
                        grid: {
                            color: 'rgba(255, 255, 255, 0.2)'
                        },
                        title: {
                            display: true,
                            text: 'Ventes (millions)',
                            color: '#FFFFFF',
                            font: {
                                size: 16,
                                weight: 'bold'
                            }
                        }
                    }
                }
            }
        });

        // Initialisation des couleurs
        updateBarColors(chart, activeBarIndex);
        chart.update();




        // ================================================= Tableau ==================================================

        // Génération du tableau
        const tableContainer = document.getElementById('tableContainerAlbum');
        const table = document.createElement('table');
        table.style.width = '100%';

        // En-tête du tableau
        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');
        const headers = ['Année', 'Album', 'Artiste', 'Ventes (millions)'];
        headers.forEach(headerText => {
            const th = document.createElement('th');
            th.textContent = headerText;
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

            const albumCell = document.createElement('td');
            albumCell.textContent = item.album;

            const artistCell = document.createElement('td');
            artistCell.textContent = item.artist;

            const salesCell = document.createElement('td');
            salesCell.textContent = item.ventes;

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
        tabAlbum.style.display = "none"

        document.querySelector(".data-graph").addEventListener("click", function () {
            if (tabAlbum.style.display == "none") {
                tabAlbum.style.display = "block"
                document.querySelector(".data-graph").innerHTML = "Cacher les données"
            } else {
                tabAlbum.style.display = "none"
                document.querySelector(".data-graph").innerHTML = "Voir les données"
            }
        })






    });
});
