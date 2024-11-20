const URL_ENDPOINT_NOTAS = "http://127.0.0.1:8000/api/notas";
let notas = [];

const tablaNotas = document.getElementById("tablaNotas").getElementsByTagName("tbody")[0];
const formNota = document.getElementById("formNota");

const leerNotas = () => {
    fetch(URL_ENDPOINT_NOTAS)
        .then((response) => response.json())
        .then((body) => {
            notas = body;
            actualizarTablaNotas();
        })
        .catch((error) => alert("Error al cargar las notas: " + error));
};

const actualizarTablaNotas = () => {
    tablaNotas.innerHTML = "";
    notas.forEach((nota) => {
        const tr = document.createElement("tr");

        const actividadTd = document.createElement("td");
        actividadTd.textContent = nota.actividad;
        const notaTd = document.createElement("td");
        notaTd.textContent = nota.nota;
        const codEstudianteTd = document.createElement("td");
        codEstudianteTd.textContent = nota.codEstudiante;

        const accionesTd = document.createElement("td");
        const eliminarBtn = document.createElement("button");
        eliminarBtn.textContent = "Eliminar";
        eliminarBtn.onclick = () => eliminarNota(nota.id);

        accionesTd.appendChild(eliminarBtn);

        tr.appendChild(actividadTd);
        tr.appendChild(notaTd);
        tr.appendChild(codEstudianteTd);
        tr.appendChild(accionesTd);

        tablaNotas.appendChild(tr);
    });
};

const registrarNota = (event) => {
    event.preventDefault();

    const notaData = {
        actividad: formNota["actividad"].value,
        nota: formNota["nota"].value,
        codEstudiante: formNota["codigoEstudiante"].value
    };

    fetch(URL_ENDPOINT_NOTAS, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(notaData)
    })
    .then(() => {
        formNota.reset();
        leerNotas();
    })
    .catch((error) => alert("Error al registrar la nota: " + error));
};

const eliminarNota = (id) => {
    if (confirm("¿Seguro que deseas eliminar esta nota?")) {
        fetch(`${URL_ENDPOINT_NOTAS}/${id}`, {
            method: "DELETE"
        })
        .then(() => leerNotas())
        .catch((error) => alert("Error al eliminar la nota: " + error));
};

formNota.addEventListener("submit", registrarNota);

// Cargar las notas al iniciar
leerNotas();
}