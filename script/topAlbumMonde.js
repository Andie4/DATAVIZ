//  DataTAM = data Top Album Monde


"use strict"

var index = 0;


fetch('data/mondialAlbum.json').then(function (response) {
    response.json().then(function (dataTAM) {


        function afficheAlbum(index) {
            var album = dataTAM[index]
            document.querySelector("#topAlbumMonde .year").innerHTML = album.year
            document.querySelector("#topAlbumMonde .album").innerHTML = '<div class="divAlbum">'
                + '<p class="TopTxt">'
                + album.year
                + ' </p>'
                + '<img class="img-album" src="'
                + album.imgAlbum
                + ' " alt=""><div>'
                + '<p class="name-album">'
                + album.album
                + ' </p>'
                + '<p>'
                + album.artist
                + ' </p>'
                + '</div><div class="lien-album">'
                + '<a class="icon-lien-album" href="' + album.URLDeezer + '" alt=""><img src="img/logo_deezer.png" alt="lien vers l\'album sur Deezer"></a>'
                + '<a class="icon-lien-album" href="' + album.URLSpotify + '" alt=""><img src="img/logo_spotify.png" alt="lien vers l\'album sur Spotify"></a>'
                + '<a class="icon-lien-album" href="' + album.URLYoutube + '" alt=""><img src="img/logo_youtube.png" alt="lien vers l\'album sur Youtube"></a>'
                + ' </div>'
                + ' </div>'

        }

        afficheAlbum(index)

        var buttonPrev = document.querySelector("#topAlbumMonde .prevYear");
        buttonPrev.addEventListener("click", function () {
            // console.log("previous year");
            if ((index - 1) >= 0) {
                index--
                afficheAlbum(index)
            } else {
                index = dataTAM.length - 1
                afficheAlbum(index)
            }

        });

        var buttonNext = document.querySelector("#topAlbumMonde .nextYear");
        buttonNext.addEventListener("click", function () {
            // console.log("next year");
            if ((index + 1) < dataTAM.length) {
                index++
                afficheAlbum(index)
            } else {
                index = 0
                afficheAlbum(index)

            }
        });


    });
});




