
"use strict"


var indexPod = 0;



fetch('data/franceAlbum.json').then(function (response) {
    response.json().then(function (dataPod) {
        const dataYear = Object.keys(dataPod)
        var year =dataYear[indexPod];

        function affichePodium(year) {
            var albumAnnee = dataPod[year]
            document.querySelector("#topAlbumFr .year").innerHTML = year
            document.querySelector("#topAlbumFr .podium").innerHTML = ""
            albumAnnee.forEach((album) => document.querySelector("#topAlbumFr .podium").innerHTML += `
            <div class="divAlbum top${album.top}">
                <p class="TopTxt"># ${album.top}</p>
                <img class="img-album" src="${album.imgAlbum}" alt="">
                <div class="detail">
                    <p class="name-album">${album.album}</p>
                    <p>${album.artist}</p>
                </div>
                <div class="lien-album">
                    <a class="icon-lien-album" href="${album.URLDeezer}" alt="">
                        <img src="img/logo_deezer.png" alt="lien vers l\'album sur Deezer">
                    </a>
                    <a class="icon-lien-album" href="${album.URLSpotify}" alt="">
                        <img src="img/logo_spotify.png" alt="lien vers l\'album sur Spotify">
                    </a>
                    <a class="icon-lien-album" href="${album.URLYoutube}" alt="">
                        <img src="img/logo_youtube.png" alt="lien vers l\'album sur Youtube">
                    </a>
                </div>
            </div>
            `
            );

            var annee = document.querySelector("#topAlbumFr .year").innerHTML


        }

        affichePodium(year)

        var buttonPrev = document.querySelector("#topAlbumFr .prevYear");
        buttonPrev.addEventListener("click", function () {
            if ((indexPod - 1) >= 0) {
                indexPod--
                year = dataYear[indexPod]
                affichePodium(year)
            } else {
                indexPod = dataYear.length - 1
                year = dataYear[indexPod]               
                affichePodium(year)
            }

        });

        var buttonNext = document.querySelector("#topAlbumFr .nextYear");
        buttonNext.addEventListener("click", function () {
            if ((indexPod + 1) < dataYear.length) {
                indexPod++
                year = dataYear[indexPod]
                affichePodium(year)
            } else {
                indexPod = 0
                year = dataYear[indexPod]
                    affichePodium(year)

            }
        });

        function addIndex(index) {
            if ((index + 1) < dataTAM.length) {
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
                index = dataTAM.length - 1
            }
            return index
        }



    });
});




