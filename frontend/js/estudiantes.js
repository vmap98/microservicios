const URL_ENDPOINT = "http://127.0.0.1:8000/api/app";
const table = document.getElementById("tabla-estudiantes");
const estudianteForm = document.forms["estudianteForm"];
let estudiantes = [];

// Función para leer los estudiantes desde la API
const leerEstudiantes = () => {
  fetch(URL_ENDPOINT + "/estudiantes")
    .then((response) => response.json())
    .then((body) => {
      estudiantes = body.data;
      const tbody = table.getElementsByTagName("tbody")[0];
      tbody.innerHTML = "";

      estudiantes.forEach((estudiante) => {
        const tr = document.createElement("tr");

        const codigoTd = document.createElement("td");
        codigoTd.textContent = estudiante.codigo;

        const nombreTd = document.createElement("td");
        nombreTd.textContent = estudiante.nombre;

        const emailTd = document.createElement("td");
        emailTd.textContent = estudiante.email;

        const accionesTd = document.createElement("td");
        const btnEliminar = document.createElement("button");
        btnEliminar.textContent = "Eliminar";
        btnEliminar.onclick = () => eliminarEstudiante(estudiante.codigo);
        accionesTd.appendChild(btnEliminar);

        tr.appendChild(codigoTd);
        tr.appendChild(nombreTd);
        tr.appendChild(emailTd);
        tr.appendChild(accionesTd);

        tbody.appendChild(tr);
      });
    });
};

// Llamar la función para cargar los estudiantes al inicio
leerEstudiantes();

// Función para agregar un nuevo estudiante
estudianteForm.addEventListener("submit", (ev) => {
  ev.preventDefault();
  fetch(URL_ENDPOINT + "/estudiante", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      codigo: estudianteForm["codigo"].value,
      nombre: estudianteForm["nombre"].value,
      email: estudianteForm["email"].value,
    }),
  })
    .then((response) => response.json())
    .then(() => {
      leerEstudiantes();
    });
});

// Función para eliminar un estudiante
const eliminarEstudiante = (codigo) => {
  fetch(`${URL_ENDPOINT}/estudiantes/${codigo}`, {
    method: "DELETE",
  })
    .then(() => {
      leerEstudiantes();
    });
};