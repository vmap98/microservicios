const URL_ENDPOINT = "http://127.0.0.1:8000/api/app";
let estudiantes = [];

const tablaEstudiantes = document.getElementById("tablaEstudiantes").getElementsByTagName("tbody")[0];
const formEstudiante = document.getElementById("formEstudiante");

const leerEstudiantes = () => {
    fetch(`${URL_ENDPOINT}/estudiantes`)
        .then((response) => response.json())
        .then((body) => {
            estudiantes = body.data || [];
            actualizarTabla();
        })
        .catch((error) => alert("Error al cargar los estudiantes: " + error));
};

const actualizarTabla = () => {
    tablaEstudiantes.innerHTML = "";
    estudiantes.forEach((estudiante) => {
        const tr = document.createElement("tr");

        const codigoTd = document.createElement("td");
        codigoTd.textContent = estudiante.codigo;
        const nombresTd = document.createElement("td");
        nombresTd.textContent = estudiante.nombres;
        const emailTd = document.createElement("td");
        emailTd.textContent = estudiante.email;
        const notaTd = document.createElement("td");
        notaTd.textContent = estudiante.nota_definitiva || "No hay nota";
        const estadoTd = document.createElement("td");
        estadoTd.textContent = estudiante.estado || "No hay estado";

        const accionesTd = document.createElement("td");
        const editarBtn = document.createElement("button");
        editarBtn.textContent = "Editar";
        editarBtn.onclick = () => editarEstudiante(estudiante.codigo);

        const eliminarBtn = document.createElement("button");
        eliminarBtn.textContent = "Eliminar";
        eliminarBtn.onclick = () => eliminarEstudiante(estudiante.codigo);

        accionesTd.appendChild(editarBtn);
        accionesTd.appendChild(eliminarBtn);

        tr.appendChild(codigoTd);
        tr.appendChild(nombresTd);
        tr.appendChild(emailTd);
        tr.appendChild(notaTd);
        tr.appendChild(estadoTd);
        tr.appendChild(accionesTd);

        tablaEstudiantes.appendChild(tr);
    });
};

const registrarEstudiante = (event) => {
    event.preventDefault();

    const estudianteData = {
        codigo: formEstudiante["codigo"].value,
        nombres: formEstudiante["nombres"].value,
        email: formEstudiante["email"].value
    };

    fetch(`${URL_ENDPOINT}/estudiante`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(estudianteData)
    })
    .then((response) => response.json())
    .then(() => {
        formEstudiante.reset();
        leerEstudiantes();
    })
    .catch((error) => alert("Error al registrar el estudiante: " + error));
};

const editarEstudiante = (codigo) => {
    const estudiante = estudiantes.find(e => e.codigo === codigo);
    if (estudiante) {
        formEstudiante["codigo"].value = estudiante.codigo;
        formEstudiante["nombres"].value = estudiante.nombres;
        formEstudiante["email"].value = estudiante.email;
    }
};

const eliminarEstudiante = (codigo) => {
    if (confirm("¿Seguro que deseas eliminar este estudiante?")) {
        fetch(`${URL_ENDPOINT}/estudiantes/${codigo}`, {
            method: "DELETE"
        })
        .then(() => leerEstudiantes())
        .catch((error) => alert("Error al eliminar el estudiante: " + error));
};

formEstudiante.addEventListener("submit", registrarEstudiante);

// Cargar los estudiantes al iniciar
leerEstudiantes();
}