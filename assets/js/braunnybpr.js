'use strict'

function importar(nun) {
    texto('Se importó tu pelicula con Exito ahora rellena la informacion y envia la palicula a la aplicacion', 'success')
    rellenar(nun);
}


function review(i, id) {
    fetch('https://flicktime.herokuapp.com/api/pelicula?pelicula_id=' + id)
        .then(data => data.json())
        .then(data => {
            const res = data.Flicktime;
            if (res.pelicula_id === id.toString()) {
                texto('ESTA PELICULA YA EXSITE', 'error')
                console.log(id);
            } else {
                importar(i)
            }
        });

}




function texto(texto, tipo) {
    swal({
        allowOutsideClick: false,
        text: texto,
        title: '',
        type: tipo,
        showConfirmButton: false,
        timer: 1500
    });

}


function html() {
    Swal.fire({
        title: '<strong>HTML <u>example</u></strong>',
        icon: 'info',
        html: 'You can use <b>bold text</b>, ' +
            '<a href="//sweetalert2.github.io">links</a> ' +
            'and other HTML tags',
        showCloseButton: true,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText: '<i class="fa fa-thumbs-up"></i> Great!',
        confirmButtonAriaLabel: 'Thumbs up, great!',
        cancelButtonText: '<i class="fa fa-thumbs-down"></i>',
        cancelButtonAriaLabel: 'Thumbs down'
    })
}

function rellenar(i) {

    fetch('https://flicktime.herokuapp.com/api/pelicula/generos')
        .then(data => data.json())
        .then(data => {
            var datos = data.genres

            var flicktime = JSON.parse(localStorage.getItem('flicktime'));
            var imagenposterimg = document.getElementById('imagenposterimg');
            var imagenportadaimg = document.getElementById('imagenportadaimg');
            var imagenposter = document.getElementById('imagenposter');
            var imagenportada = document.getElementById('imagenportada');
            var fecha = document.getElementById('fecha');
            var title = document.getElementById('titulo');
            var genero1 = document.getElementById('genero1');
            var genero2 = document.getElementById('genero2');
            var genero3 = document.getElementById('genero3');
            var sipnosis = document.getElementById('sipnosis');
            var id = document.getElementById('id');
            var URLposter = 'https://image.tmdb.org/t/p/w500' + flicktime[i].poster_path;
            var URLportada = 'https://image.tmdb.org/t/p/w500' + flicktime[i].backdrop_path;
            console.log(flicktime[i])
            document.getElementById('peliculasencontradas').innerHTML = '';

            datos.map(function(generos) {
                if (generos.id == flicktime[i].genre_ids[0]) {
                    genero1.value = generos.name;
                }

                if (generos.id == flicktime[i].genre_ids[1]) {
                    genero2.value = generos.name;
                }

                if (generos.id == flicktime[i].genre_ids[2]) {
                    genero3.value = generos.name;
                }

                return generos;
            });

            title.value = flicktime[i].title;
            imagenposter.value = URLposter;
            imagenportada.value = URLportada;
            id.value = flicktime[i].id;
            fecha.value = flicktime[i].release_date.split('-')[0];
            imagenportadaimg.setAttribute('src', URLportada);
            imagenposterimg.setAttribute('src', URLposter);
            sipnosis.value = flicktime[i].overview;

        })

}

function modal(pelicula) {

    console.log(pelicula)
}
