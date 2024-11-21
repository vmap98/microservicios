const URL_ENDPOINT_NOTAS = "http://127.0.0.1:8000/api/notas";
const tableNotas = document.getElementById("tabla-notas");
const notaForm = document.forms["notaForm"];
let notas = [];

// Función para leer las notas desde la API
const leerNotas = () => {
  fetch(URL_ENDPOINT_NOTAS)
    .then((response) => response.json())
    .then((body) => {
      notas = body;
      const tbody = tableNotas.getElementsByTagName("tbody")[0];
      tbody.innerHTML = "";

      notas.forEach((nota) => {
        const tr = document.createElement("tr");

        const actividadTd = document.createElement("td");
        actividadTd.textContent = nota.actividad;

        const notaTd = document.createElement("td");
        notaTd.textContent = nota.nota;

        const codEstudianteTd = document.createElement("td");
        codEstudianteTd.textContent = nota.codEstudiante;

        const accionesTd = document.createElement("td");
        const btnEliminar = document.createElement("button");
        btnEliminar.textContent = "Eliminar";
        btnEliminar.onclick = () => eliminarNota(nota.id);
        accionesTd.appendChild(btnEliminar);

        tr.appendChild(actividadTd);
        tr.appendChild(notaTd);
        tr.appendChild(codEstudianteTd);
        tr.appendChild(accionesTd);

        tbody.appendChild(tr);
      });
    });
};

// Llamar la función para cargar las notas al inicio
leerNotas();

// Función para agregar una nueva nota
notaForm.addEventListener("submit", (ev) => {
  ev.preventDefault();
  fetch(URL_ENDPOINT_NOTAS, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      actividad: notaForm["actividad"].value,
      nota: notaForm["nota"].value,
      codEstudiante: notaForm["codEstudiante"].value,
    }),
  })
    .then((response) => response.json())
    .then(() => {
      leerNotas();
    });
});

// Función para eliminar una nota
const eliminarNota = (id) => {
  fetch(`${URL_ENDPOINT_NOTAS}/${id}`, {
    method: "DELETE",
  })
    .then(() => {
      leerNotas();
    });
};
