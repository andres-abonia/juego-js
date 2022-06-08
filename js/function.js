let INDEX_PREGUNTA = 0;
let puntaje = 0;
let incorrecta = 0;

cargarPregunta(INDEX_PREGUNTA);

function cargarPregunta(index) {
  objetoPregunta = baseDePreguntas[index];

  opciones = [...objetoPregunta.incorrectas];
  opciones.push(objetoPregunta.respuesta);
  for (let i = 0; i < 4; i++) {
    opciones.sort(() => Math.random() - 0.5);
  }
  document.getElementById("question").innerHTML = objetoPregunta.pregunta;
  document.getElementById("btn1").innerHTML = opciones[0];
  document.getElementById("btn2").innerHTML = opciones[1];
  document.getElementById("btn3").innerHTML = opciones[2];
  document.getElementById("btn4").innerHTML = opciones[3];
  document.getElementById("number").innerHTML = index;

}

async function select_btn(index) {
  let validezRespuesta = opciones[index] == objetoPregunta.respuesta;
  if (validezRespuesta) {
    var audio = document.getElementById("audio");
    audio.play();
    await Swal.fire({
      title: "Respuesta correcta",
      text: "La respuesta ha sido correcta",
      icon: "success",
    });
    puntaje++;
   
  } else {
    var i_audio= document.getElementById("i_audio");
    i_audio.play();
    await Swal.fire({
      title: "Respuesta Incorrecta",
      html: `La respuesta correcta es ${objetoPregunta.respuesta}`,
      icon: "error",
    });
    incorrecta++;
  }
  if (incorrecta >= 3) {
    await Swal.fire({
      title: "Juego terminado",
      text: `Tres intentos fallidos: ${puntaje}/${3}`,
    });
    INDEX_PREGUNTA = 0;
    puntaje = 0;
    cargarPregunta(INDEX_PREGUNTA);
  }  
  INDEX_PREGUNTA++;
  if (INDEX_PREGUNTA >= baseDePreguntas.length) {
    await Swal.fire({
      title: "Juego terminado",
      text: `Tu puntaje fue de: ${puntaje}/${baseDePreguntas.length}`,
    });
    INDEX_PREGUNTA = 0;
    puntaje = 0;
  }
  cargarPregunta(INDEX_PREGUNTA);
}


// function ayuda() {
//   Swal.fire({
//     title: "Ayuda",
//     text: objetoPregunta.ayuda,
//   });
// }