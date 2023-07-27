/*~~~~~~ Variables globales ~~~~~~*/

const gatito = document.getElementById('gatito');
const corazones = document.getElementById('corazones');
const registro = document.getElementById('registro');
const musica = document.getElementById('musica');
const play = document.getElementById("play");
const volumen = document.getElementById("volumen");
const container = document.getElementsByClassName('container')[0];
const audio = document.getElementById("musica");
const shuffle = document.getElementById("shuffle");
const fecha = new Date(new Date().setDate(new Date().getDate() + 7)).toUTCString();
let antesDeMute = 0;
let timeout = null;
let cancionActual = 0;
let cookieCargada = false;
let cambiandoDuracion = false;

/* Lista de emoticonos de las canciones */
const emoticonos = ["☕","💿","🎶","🎧","🎤","📻","🎼","🍵","🍃","🎸","🎹","🎷","🎻","🎺","🎵","🎶","🎨","📚","🎬","🎮","🧘","🏞️"];

/* Lista de emoticonos de los corazones */
const listaCorazones = ["💚", "🤎", "☕", "🌱", "🌿"];

/* Lista de canciones */
const canciones = [
    "music/A Kind Of Magic - Remastered 2011.mp3",
    "music/Accidentally In Love.mp3",
    "music/Africa.mp3",
    "music/Ain't No Mountain High Enough.mp3",
    "music/All That She Wants.mp3",
    "music/Alright.mp3",
    "music/American Pie.mp3",
    "music/Another One Bites The Dust - Remastered 2011.mp3",
    "music/Baby I'm Yours.mp3",
    "music/Back for Good - Radio Mix.mp3",
    "music/Back In Black.mp3",
    "music/Bang Bang.mp3",
    "music/Beat It.mp3",
    "music/Big in Japan - 2019 Remaster.mp3",
    "music/Billie Jean.mp3",
    "music/Black Betty.mp3",
    "music/Blame It on the Boogie.mp3",
    "music/Bones.mp3",
    "music/Boogaloo.mp3",
    "music/Boogie Wonderland.mp3",
    "music/Burning Heart.mp3",
    "music/California Dreamin' - Single Version.mp3",
    "music/Call Me.mp3",
    "music/Candy.mp3",
    "music/Carry On Wayward Son - Single Version.mp3",
    "music/City of Angels.mp3",
    "music/Come On Eileen.mp3",
    "music/Como el Sol 2011.mp3",
    "music/Complicated.mp3",
    "music/Crazy.mp3",
    "music/Dancing in the Moonlight.mp3",
    "music/Dancing Queen.mp3",
    "music/Don't Bring Me Down.mp3",
    "music/Don't Go Breaking My Heart.mp3",
    "music/Don't Stop Believin'.mp3",
    "music/Don't Stop Me Now - Remastered 2011.mp3",
    "music/Don't You Want Me.mp3",
    "music/Down Under.mp3",
    "music/Dream On.mp3",
    "music/Drive By.mp3",
    "music/Enjoy the Silence.mp3",
    "music/Escape (The Piña Colada Song).mp3",
    "music/Faith.mp3",
    "music/Fame.mp3",
    "music/Flashdance What a Feeling - Radio Edit.mp3",
    "music/Forever Young - 2019 Remaster.mp3",
    "music/Friday I'm In Love.mp3",
    "music/Funkytown - Single Version.mp3",
    "music/Gimme! Gimme! Gimme!.mp3",
    "music/Girls Just Want to Have Fun.mp3",
    "music/Give It Up.mp3",
    "music/Gloria.mp3",
    "music/Gold.mp3",
    "music/Good Old-Fashioned Lover Boy - Remastered 2011.mp3",
    "music/Got My Mind Set On You.mp3",
    "music/Grace Kelly.mp3",
    "music/Guess Who's Back.mp3",
    "music/Happy Together.mp3",
    "music/Have You Ever Seen The Rain.mp3",
    "music/Heat Of The Moment.mp3",
    "music/Help!.mp3",
    "music/Heroes - 2017 Remaster.mp3",
    "music/Hey Jude - Remastered 2015.mp3",
    "music/Hip To Be Square.mp3",
    "music/Hit the Road Jack.mp3",
    "music/Hold On, I'm Comin'.mp3",
    "music/Hold the Line.mp3",
    "music/Holding Out for a Hero.mp3",
    "music/Hotel California - 2013 Remaster.mp3",
    "music/Hungry Like the Wolf - 2009 Remaster.mp3",
    "music/I Don't Feel Like Dancin' (Radio Edit).mp3",
    "music/I Get Around (Mono).mp3",
    "music/I Got My Mind Set On You.mp3",
    "music/I Got You (I Feel Good).mp3",
    "music/I Just Called To Say I Love You.mp3",
    "music/I Love Rock 'n' Roll.mp3",
    "music/I Want To Break Free - Single Remix.mp3",
    "music/I Want You Back.mp3",
    "music/I Will Survive.mp3",
    "music/I'll Be There for You - Theme From _Friends_.mp3",
    "music/I'll Supply The Love.mp3",
    "music/I'm A Believer.mp3",
    "music/I'm Gonna Be (500 Miles).mp3",
    "music/I'm Still Standing.mp3",
    "music/Ironic - 2015 Remaster.mp3",
    "music/It Was A Good Day.mp3",
    "music/It's Been A Long Time.mp3",
    "music/It's Not Unusual.mp3",
    "music/Karma Chameleon - Remastered 2002.mp3",
    "music/Kung Fu Fighting.mp3",
    "music/Last Train to London.mp3",
    "music/Lay All Your Love On Me.mp3",
    "music/Lemon Tree.mp3",
    "music/Let It Be - Remastered 2009.mp3",
    "music/Lobo-hombre en París.mp3",
    "music/Lonely Avenue.mp3",
    "music/Losing My Religion.mp3",
    "music/Magic.mp3",
    "music/Man in the Mirror.mp3",
    "music/Maneater.mp3",
    "music/Maniac.mp3",
    "music/Mr Blue Sky.mp3",
    "music/Never Ending Story.mp3",
    "music/Not Into You.mp3",
    "music/Nothin' But A Good Time - Remastered 2006.mp3",
    "music/Our House.mp3",
    "music/Part-Time Lover.mp3",
    "music/Psycho Killer - 2005 Remaster.mp3",
    "music/Que No Hay Alcohol 2011.mp3",
    "music/Ready Teddy.mp3",
    "music/Rock DJ.mp3",
    "music/Rocket Man (I Think It's Going To Be A Long, Long Time).mp3",
    "music/Save Tonight.mp3",
    "music/Self Control.mp3",
    "music/September.mp3",
    "music/Sh Boom Life Could Be a Dream.mp3",
    "music/Sharp Dressed Man - 2008 Remaster.mp3",
    "music/She Drives Me Crazy.mp3",
    "music/Shoot to Thrill.mp3",
    "music/Since You Been Gone.mp3",
    "music/Sleeping In My Car.mp3",
    "music/Smoke On The Water - Remastered 2012.mp3",
    "music/Smooth Criminal - 2012 Remaster.mp3",
    "music/Somebody That I Used To Know - Remix.mp3",
    "music/Soulful Dress.mp3",
    "music/Stand by Me.mp3",
    "music/Starman - 2012 Remaster.mp3",
    "music/Stayin Alive.mp3",
    "music/Stone in Love.mp3",
    "music/Sultans Of Swing.mp3",
    "music/Summer Nights.mp3",
    "music/Superstition.mp3",
    "music/Sweet Soul Music.mp3",
    "music/Tainted Love.mp3",
    "music/Take on Me.mp3",
    "music/The Heat Is On.mp3",
    "music/The Man Who Can't Be Moved.mp3",
    "music/Time After Time.mp3",
    "music/Together Forever.mp3",
    "music/Turn to Stone.mp3",
    "music/Two Hearts.mp3",
    "music/U Can't Touch This.mp3",
    "music/Unchain My Heart.mp3",
    "music/Under Pressure - Remastered 2011.mp3",
    "music/Uptown Girl.mp3",
    "music/Virtual Insanity - Remastered.mp3",
    "music/Voyage voyage.mp3",
    "music/Wake Me Up Before You Go-Go.mp3",
    "music/Walk This Way.mp3",
    "music/Waterloo.mp3",
    "music/We Didn't Start the Fire.mp3",
    "music/What Is Love (7 Mix).mp3",
    "music/Whenever You Need Somebody.mp3",
    "music/Who's Crying Now.mp3",
    "music/Wonderwall.mp3",
    "music/Words - Original Version 1983.mp3",
    "music/World's Smallest Violin.mp3",
    "music/You Can't Hurry Love - 2016 Remaster.mp3",
    "music/You Make My Dreams (Come True).mp3",
    "music/You Shook Me All Night Long.mp3",
    "music/You Spin Me Round (Like a Record).mp3",
    "music/Your Love.mp3"
];

/* Lista de cumplidos */
const cumplidos = [
    "Eres increíblemente amable.",
    "Tienes un corazón de oro.",
    "Eres inteligente y talentoso.",
    "Tu positividad es contagiosa.",
    "Gracias por ser siempre tan atento y considerado.",
    "Eres muy especial.",
    "Tus palabras siempre animan a los demás.",
    "Tu amabilidad no conoce límites.",
    "Eres increíble.",
    "Tienes un espíritu amable y generoso.",
    "Eres una persona única y especial.",
    "Gracias por ser tú mismo, porque eres maravilloso tal como eres.",
    "Tienes una forma única de hacer que todo sea más divertido.",
    "Tus acciones inspiran a los que te rodean.",
    "Siempre encuentras la manera de hacer que las cosas sean mejores.",
    "La amabilidad que demuestras es una inspiración para todos.",
    "Eres un tesoro, alguien verdaderamente especial.",
    "Tu compasión y comprensión son invaluables.",
    "Eres un sol que ilumina la vida de los demás.",
    "Tus acciones hablan más que mil palabras, y siempre son amables.",
    "Eres un ejemplo de humildad y buen corazón.",
    "Gracias por ser siempre tan auténtico y sincero.",
    "Tus palabras siempre tocan los corazones de quienes te escuchan.",
    "Eres una fuente constante de aliento y apoyo para quienes te rodean.",
    "Eres suficiente, tal como eres.",
    "Eres un ejemplo de fortaleza y perseverancia.",
    "Siempre es buen momento para leer un libro sobre café.",
    "El café es la bebida que te hace sentir que todo es posible.",
    "El café es la respuesta, no importa cuál sea la pregunta.",
    "El café es la mejor manera de empezar el día.",
];


/*~~~~~~ Apartado de audio ~~~~~~*/

/* Volumen predeterminado y máximo base*/
audio.volume = 0.1;

/* Gestor de volumen */

/* Permite cambiar el icono del volumen de manera dinámica */
function cambiarIconoVolumen() {
    if (volumen.value == 0) {
        document.getElementById("sonidoIcono").classList.remove("fa-volume-high");
        document.getElementById("sonidoIcono").classList.remove("fa-volume-low");
        document.getElementById("sonidoIcono").classList.add("fa-volume-xmark");
    } else if (volumen.value < 0.07) {
        document.getElementById("sonidoIcono").classList.remove("fa-volume-high");
        document.getElementById("sonidoIcono").classList.remove("fa-volume-xmark");
        document.getElementById("sonidoIcono").classList.add("fa-volume-low");
    } else {
        document.getElementById("sonidoIcono").classList.remove("fa-volume-low");
        document.getElementById("sonidoIcono").classList.remove("fa-volume-xmark");
        document.getElementById("sonidoIcono").classList.add("fa-volume-high");
    }
}

/* Si existe la cookie de volumen modifica volumen para tener ese value */
window.onload = function () {
    if (document.cookie) {
        let cookies = document.cookie.split(";");
        for (let i = 0; i < cookies.length; i++) {
            if (cookies[i].includes("volumen")) {
                volumen.value = cookies[i].split("=")[1];
                musica.volume = volumen.value;
                cambiarIconoVolumen();
            }
        }
    }
}

/* Modifica el volumen en tiempo real */
volumen.addEventListener("input", function () {
    antesDeMute = volumen.value;
    musica.volume = volumen.value;
    cambiarIconoVolumen();
    document.cookie = "volumen=" + volumen.value + "; expires=" + fecha + "; path=/";
});

/* Permite mutear o desmutear */
document.getElementById("sonidoIcono").addEventListener("click", function () {
    if (volumen.value != 0) {
        antesDeMute = volumen.value;
        volumen.value = 0;
        musica.volume = volumen.value;
        cambiarIconoVolumen();
        document.cookie = "volumen=" + volumen.value + "; expires=" + fecha + "; path=/";
    } else {
        volumen.value = antesDeMute;
        musica.volume = volumen.value;
        cambiarIconoVolumen();
        document.cookie = "volumen=" + volumen.value + "; expires=" + fecha + "; path=/";
    }
});


/*~~~~~~ Apartado del control de la pista ~~~~~~*/

/* Empieza a reproducir la canción actual */
function reproducirCancionActual() {
    musica.src = canciones[cancionActual];
    musica.play();
}

/* Permite cambiar la canción  */
function cambiarCancion(direccion, cookie) {

    if (!cookie && !shuffle.classList.contains("shuffle-active")) {
        cancionActual = parseInt(cancionActual);
        if (direccion === "anterior") {
            cancionActual = (cancionActual - 1 + canciones.length) % canciones.length;
        } else if (direccion === "siguiente") {
            cancionActual = (cancionActual + 1) % canciones.length;
        }
    }

    if (shuffle.classList.contains("shuffle-active")) {
        let cancionAleatoria = Math.floor(Math.random() * canciones.length);
        while (cancionAleatoria == cancionActual) {
            cancionAleatoria = Math.floor(Math.random() * canciones.length);
        }
        cancionActual = cancionAleatoria;
    }
    document.getElementById("icono").style.opacity = 0;
    setTimeout(() => {

            let nombre = canciones[cancionActual].split("/")[1].split(".")[0];
            if (nombre.includes("(")) {
                nombre = nombre.split("(")[0] + "<br>(" + nombre.split("(")[1];
            }
            if (nombre.includes("-")) {
                nombre = nombre.split("-")[0] + "<br>" + nombre.split("-")[1];
            }
            if (nombre.includes("_")) {
                nombre = nombre.split("_")[0] + " " + nombre.split("_")[1];
            }
        document.getElementById("icono").innerHTML = "<b>" + nombre + "</b>" + emoticonos[Math.floor(Math.random() * emoticonos.length)];
        document.getElementById("icono").style.opacity = 1;
    }, 1000);
    

    if (!cookie) {
        reproducirCancionActual();
        play.children[0].classList.remove("fa-play");
        play.children[0].classList.add("fa-pause");
    } else {
        musica.src = canciones[cancionActual];
    }
    setTimeout(() => {
        document.getElementById("progreso").max = musica.duration;
        if (!cookie) {
            document.getElementById("progreso").value = 0;
        } else {
            document.getElementById("progreso").value = musica.currentTime;
        }

        let minutos = Math.floor(musica.duration / 60);
        let segundos = Math.floor(musica.duration % 60);
        if (segundos < 10) {
            segundos = "0" + segundos;
        }
        document.getElementById("duracion").innerHTML = minutos + ":" + segundos;
        document.getElementById("info").style.animation = "fadein 2s forwards";
    }, 500);
}

/* Permite cargar la canción que estabas escuchando */
window.addEventListener("load", function () {
    let minutos = Math.floor(musica.duration / 60);
    let segundos = Math.floor(musica.duration % 60);
    if (segundos < 10) {
        segundos = "0" + segundos;
    }
    document.getElementById("duracion").innerHTML = minutos + ":" + segundos;
    if (document.cookie && !cookieCargada) {
        let cookies = document.cookie.split(";");
        for (let i = 0; i < cookies.length; i++) {
            if (cookies[i].includes("track")) {
                cancionActual = cookies[i].split("=")[1];
            } else if (cookies[i].includes("tiempo")) {
                musica.currentTime = cookies[i].split("=")[1];
            }
            cambiarCancion("siguiente", true);
        }
    } else {
        cancionActual = 0;
        cambiarCancion("siguiente", true);
    }
    cookieCargada = true;
});

/* Al cargar la página se establece la duración de la página */
window.addEventListener("load", function () {
    document.getElementById("progreso").max = musica.duration;
    document.getElementById("progreso").min = 0;
});

shuffle.addEventListener("click", function () {
    if (shuffle.classList.contains("shuffle-active")) {
        shuffle.classList.remove("shuffle-active");
        shuffle.classList.add("shuffle");
    } else {
        shuffle.classList.add("shuffle-active");
        shuffle.classList.remove("shuffle");
    }
});

/* Se encarga de la barra de progreso */
musica.addEventListener("timeupdate", function () {
    if (!cambiandoDuracion) {
        const progreso = (musica.currentTime);
        document.getElementById("progreso").value = progreso;
        document.getElementById("progreso").max = musica.duration;
        let minutos = Math.floor(musica.currentTime / 60);
        let segundos = Math.floor(musica.currentTime % 60);
        if (segundos < 10) {
            segundos = "0" + segundos;
        }
        if (minutos + ":" + segundos === document.getElementById("duracion").innerHTML) {
            cambiarCancion("siguiente");
        }
        document.getElementById("tiempo").innerHTML = minutos + ":" + segundos;
    }
    document.cookie = "track=" + cancionActual + "; expires=" + fecha + "; path=/";
    document.cookie = "tiempo=" + musica.currentTime + "; expires=" + fecha + "; path=/";

});

/* Reproducción de la siguiente pista al acabar la actual */
musica.addEventListener("ended", function () {
    cambiarCancion("siguiente");
});

/* Funcionamiento del botón de play */
play.addEventListener("click", function () {
    if (audio.paused) {
        audio.play();
        this.children[0].classList.remove("fa-play");
        this.children[0].classList.add("fa-pause");
    } else {
        audio.pause();
        this.children[0].classList.remove("fa-pause");
        this.children[0].classList.add("fa-play");
    }
});

/* Permite o bloquea que se cambie el progreso de la canción */
document.addEventListener("mousedown", function () {
    cambiandoDuracion = true;
});

document.addEventListener("mouseup", function () {
    cambiandoDuracion = false;
});

/* Permite cambiar el momento de la canción en tiempo real */
document.getElementById("progreso").addEventListener("input", function () {
    musica.currentTime = (this.value);
});

/* Permite cambiar el tiempo de la canción en tiempo real */
document.getElementById("progreso").addEventListener("input", function () {
    let minutos = Math.floor(this.value / 60);
    let segundos = Math.floor(this.value % 60);
    if (segundos < 10) {
        segundos = "0" + segundos;
    }
    document.getElementById("tiempo").innerHTML = minutos + ":" + segundos;
});


/*~~~~~~ Apartado de cumplidos ~~~~~~*/

/* Muestra el primer cumplido */
function mostrarCumplido(event) {
    const x = event.clientX - event.target.offsetLeft;
    const y = event.clientY - event.target.offsetTop;

    /* Crea y añade el cumplido */
    const cumplido = document.createElement('span');
    cumplido.classList.add('cumplido');
    cumplido.style.left = `${x}px`;
    cumplido.style.top = `${y}px`;
    cumplido.innerHTML = cumplidos[Math.floor(Math.random() * cumplidos.length)];

    registro.appendChild(cumplido);

}

/* Agrega el siguiente cumplido */
function agregarCumplido(cumplido) {
    registro.innerHTML = '';
    const cumplidoElement = document.createElement('span');
    cumplidoElement.classList.add('cumplido');
    cumplidoElement.innerHTML = cumplido;
    cumplidoElement.style.transition = 'opacity 0.5s ease-in-out';
    cumplidoElement.style.opacity = 0;
    registro.appendChild(cumplidoElement);
    setInterval(() => {
        cumplidoElement.style.opacity = 1;
    }, 100);
}

/* Temporiza cuando volverá de jugar el gato */
function crearTimeout() {
    /* Si ya se le está dando amor se resetea el contador para jugar */
    if (timeout) {
        clearTimeout(timeout);
    }
    /* Crea el retorno del gatito al acto de jugar */
    timeout = setTimeout(() => {
        /* Cambia el gatito */
        gatito.style.opacity = 0;
        setTimeout(() => {
            gatito.src = "img/gato_jugando.gif";
            gatito.style.opacity = 1;
            container.style.animation = "girar 5s infinite linear , fondoGatito 5s infinite linear";
            corazones.style.opacity = 0;
        }, 1000);
        /* Oculta los corazones y los cumplidos */
        corazones.classList.add('hidden');
        registro.style.opacity = 0;
        registro.style.transition = 'opacity 1s';

        /* Crea un cumplido oculto por mi TOC a que se muevan las cosas */
        setTimeout(() => {
            registro.innerHTML = '';
            registro.style.opacity = 1;
            let span = document.createElement("span");
            span.style.opacity = 0;
            span.innerHTML = "¡Eres muy listo uwu!";
            registro.appendChild(span);
            gatito.style.marginTop = "0px";
            gatito.style.marginLeft = "0px";
        }, 1000);
    }, 5000);
}

/* Crea corazones aleatorios de diferentes formas, posiciones y efectos */
function mostrarCorazones(event) {
    const x = event.clientX - event.target.offsetLeft;
    const y = event.clientY - event.target.offsetTop;

    const corazon = document.createElement('span');
    corazon.classList.add('corazon');
    corazon.style.left = `${x}px`;
    corazon.style.top = `${y}px`;
    corazon.innerHTML = listaCorazones[Math.floor(Math.random() * listaCorazones.length)];
    const size = Math.random() * 35 + 15;
    corazon.style.width = `${size}px`;
    corazones.appendChild(corazon);

    corazon.style.zIndex = 1000;
    corazon.style.opacity = 0.7;
    corazon.style.display = "absolute";
    corazon.style.left = `${x + Math.random() * 100 - 50}px`;
    corazon.style.top = `${y + Math.random() * 100 - 50}px`;

    /* Tiempo después el corazón desaparece de manera aleatoria */
    setTimeout(() => {
        corazon.style.opacity = 0;
        setTimeout(() => {
            corazon.remove();
        }, Math.random() * 4000 + 1000);
    }, Math.random() * 4000 + 1000);

    crearTimeout();

    gatito.style.marginTop = "40px";
    gatito.style.marginLeft = "25px";

    /* Por cada corazón mostrado se actualiza el piropo */
    agregarCumplido(cumplidos[Math.floor(Math.random() * cumplidos.length)]);
}

/* Cuando le das click al gatito se empiezan a mostrar los corazones y el gatito está feliz */
gatito.addEventListener('click', () => {
    if (corazones.classList.contains('hidden')) {
        corazones.classList.remove('hidden');
        gatito.style.opacity = 0;
        setTimeout(() => {
            gatito.src = "img/gato_feliz.gif";
            gatito.style.opacity = 1;
            corazones.style.opacity = 1;
            container.style.animation = "fondoGatito 5s infinite linear";
        }, 1000);
    }

    mostrarCorazones(event);
});