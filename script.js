// ================================
// PERSONALIZA TU REGALO AQUÍ
// ================================
const nombrePareja = "Mi bebé";                 // ← el nombre de tu pareja
const tuNombre = "Pedro";                       // ← tu nombre (firma de la carta)
const fecha = "04 de octubre de 2026";

const fraseBienvenida = "Preparé algo especial para ti mi niña hermosa";
const fraseCancion = "Elegí estas canciones porque siempre me hacen pensar en ti mi amor ..";

// Canciones: pon tus MP3 en la carpeta /musica/ y escribe aquí sus nombres.
// Para agregar otra, copia una línea { ... } y cámbiale los datos.
const canciones = [
  { titulo: "POR ESO TE AMO", artista: "Río Roma", archivo: "Río Roma - Por Eso Te Amo.mp3", portada: "pinguino.jpg" },
  { titulo: "AMOR COMPLETO", artista: "Mon Laferte", archivo: "Mon Laferte - Amor Completo.mp3", portada: "2.jpg" },
  { titulo: "TE VI VENIR", artista: "Sin Bandera", archivo: "Sin Bandera - Te Vi Venir.mp3", portada: "3.1.jpg" }
];

const saludoCarta = "Para ti mi amor,";
const carta = `
Abre la carta mi ricurita hermosha...
`;
const firmaCarta = "Con mucho amor,\n" + tuNombre + " ❤️";

// Imagen de fondo de la carta (opcional). Ej: "imagenes/fondo.jpg". Vacío = degradado.
const fondoCarta = "";

// Cada línea es un párrafo del mensaje final
const mensajeFinal = [
  "Quizás hoy no pueda estar a tu lado para darte esta carta en persona, pero quise encontrar la manera de hacertelo llegar.",
  "Quizás puedas llegar a creer que la distancia puede separarnos... pero no... la distancia nunca cambiará lo importante que eres para mí, lo mucho que te amo, lo mucho que te deseo, lo mucho que te extraño... hoy, y siempre...acá, o en China, yo siempre te amaré mi bebé, nunca lo olvides mi niña hermosa, nunca lo olvides mi ricurita, nunca lo olvides, mi Mildreth."
];
const fraseFinal = "Te amo ❤️";

// ================================
// A PARTIR DE AQUÍ NO ES NECESARIO TOCAR
// ================================

// Atajo para buscar elementos del HTML por   su id
const $ = (id) => document.getElementById(id);

// ---------- 1. Rellenar textos personalizables ----------
document.querySelectorAll(".js-nombre").forEach((el) => (el.textContent = nombrePareja));
$("fraseBienvenida").textContent = fraseBienvenida;
$("fraseCancion").textContent = fraseCancion;
$("cartaFecha").textContent = fecha;
$("cartaSaludo").textContent = saludoCarta;regalo
$("teAmo").textContent = fraseFinal;
if (fondoCarta) $("pantalla3").style.setProperty("--fondo-carta", `url("${fondoCarta}")`);
mensajeFinal.forEach((texto) => {
  const p = document.createElement("p");
  p.textContent = texto;
  $("mensajeFinal").appendChild(p);
});

// ---------- 2. Partículas suaves de fondo ----------
const simbolos = ["🌸", "♡", "✿", "🌷"];
for (let i = 0; i < 14; i++) {
  const s = document.createElement("span");
  s.textContent = simbolos[i % simbolos.length];
  s.style.left = Math.random() * 100 + "%";
  s.style.fontSize = 10 + Math.random() * 14 + "px";
  s.style.animationDuration = 16 + Math.random() * 14 + "s";
  s.style.animationDelay = -Math.random() * 20 + "s";
  $("particulas").appendChild(s);
}

// ---------- 3. Cambiar de pantalla con fade ----------
function irAPantalla(id, alMostrar) {
  const actual = document.querySelector(".pantalla.activa");
  actual.classList.add("saliendo");
  setTimeout(() => {
    actual.classList.remove("activa", "saliendo");
    $(id).classList.add("activa");
    window.scrollTo(0, 0);
    if (alMostrar) alMostrar();
  }, 500);
}
$("btnComenzar").onclick = () => irAPantalla("pantalla2");
$("btnACarta").onclick = () => irAPantalla("pantalla3", escribirCarta);
$("btnASorpresa").onclick = () => irAPantalla("pantalla4");

// ---------- 4. Reproductor de música ----------
const audio = new Audio();       // NO se reproduce solo: espera al botón Play
audio.volume = 0.8;
let indice = 0;
let repetir = false;

function formatear(seg) {        // 75 → "1:15"
  if (!isFinite(seg)) return "0:00";
  return Math.floor(seg / 60) + ":" + String(Math.floor(seg % 60)).padStart(2, "0");
}

function cargarCancion(i, reproducir) {
  indice = (i + canciones.length) % canciones.length;
  const c = canciones[indice];
  audio.src = c.archivo;
  $("cancionTitulo").textContent = c.titulo;
  $("cancionArtista").textContent = c.artista;
  $("portada").style.display = "";
  $("portada").src = c.portada;
  $("avisoAudio").textContent = "";
  $("barra").value = 0;
  $("tActual").textContent = "0:00";
  $("tTotal").textContent = "0:00";
  document.querySelectorAll(".lista button").forEach((b, n) => b.classList.toggle("actual", n === indice));
  if (reproducir) audio.play();
}

// Botones para elegir canción (solo si hay más de una)
if (canciones.length > 1) {
  canciones.forEach((c, n) => {
    const b = document.createElement("button");
    b.textContent = c.titulo;
    b.onclick = () => cargarCancion(n, !audio.paused);
    $("lista").appendChild(b);
  });
}

$("btnPlay").onclick = () => (audio.paused ? audio.play() : audio.pause());
$("btnSiguiente").onclick = () => cargarCancion(indice + 1, !audio.paused);
$("btnAnterior").onclick = () => cargarCancion(indice - 1, !audio.paused);
$("btnRepetir").onclick = () => {
  repetir = !repetir;
  $("btnRepetir").classList.toggle("activo", repetir);
};
$("volumen").oninput = (e) => (audio.volume = e.target.value);
$("barra").oninput = (e) => (audio.currentTime = (e.target.value / 100) * audio.duration);

audio.onplay = () => ($("btnPlay").textContent = "⏸");
audio.onpause = () => ($("btnPlay").textContent = "▶");
audio.onloadedmetadata = () => ($("tTotal").textContent = formatear(audio.duration));
audio.ontimeupdate = () => {
  $("tActual").textContent = formatear(audio.currentTime);
  if (audio.duration) $("barra").value = (audio.currentTime / audio.duration) * 100;
};
audio.onended = () => {          // reproducción continua
  if (repetir) { audio.currentTime = 0; audio.play(); }
  else cargarCancion(indice + 1, true);
};
audio.onerror = () => ($("avisoAudio").textContent = "Falta el archivo: " + canciones[indice].archivo);

cargarCancion(0, false);

// ---------- 5. Carta con efecto máquina de escribir ----------
let temporizador;
function escribirCarta() {
  const texto = carta.trim();
  const firma = firmaCarta;
  let i = 0;
  $("cartaTexto").textContent = "";
  $("cartaFirma").textContent = "";
  $("btnASorpresa").classList.add("oculto");

  function terminar() {
    clearInterval(temporizador);
    $("cartaTexto").textContent = texto;
    $("cartaFirma").textContent = firma;
    $("pistaCarta").classList.add("oculto");
    $("btnASorpresa").classList.remove("oculto");
  }
  temporizador = setInterval(() => {
    $("cartaTexto").textContent += texto[i++];
    $("cartaPapel").scrollTop = $("cartaPapel").scrollHeight;
    if (i >= texto.length) terminar();
  }, 40);
  $("cartaPapel").onclick = terminar;   // tocar la carta = verla completa
}

// ---------- 6. Sorpresa final ----------
$("btnAbrir").onclick = abrirRegalo;
$("caja").onclick = abrirRegalo;
function abrirRegalo() {
  $("btnAbrir").classList.add("oculto");
  $("caja").classList.add("abriendo");
  setTimeout(() => {
    $("regalo").classList.add("oculto");
    $("final").classList.remove("oculto");
    lanzarConfeti();
    setTimeout(() => $("distanciaFinal").classList.add("juntos"), 600); // los corazones se acercan
  }, 1000);
}

function lanzarConfeti() {        // confeti ligero
  const colores = ["#f9c6d4", "#e8dcf6", "#c9a46a", "#fff0c9", "#e59ab3"];
  for (let i = 0; i < 36; i++) {
    const c = document.createElement("div");
    c.className = "confeti";
    c.style.left = Math.random() * 100 + "vw";
    c.style.background = colores[i % colores.length];
    c.style.animationDuration = 3 + Math.random() * 3 + "s";
    c.style.animationDelay = Math.random() * 1.5 + "s";
    document.body.appendChild(c);
    setTimeout(() => c.remove(), 8000);
  }
}
