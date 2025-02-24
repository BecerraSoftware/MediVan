document.addEventListener("DOMContentLoaded", function () {
    // Agregar eventos a los radios de tipo de cuenta para mostrar el formulario de médico
    document.getElementById("usuario").addEventListener("change", toggleMedicoForm);
    document.getElementById("medico").addEventListener("change", toggleMedicoForm);
    document.getElementById("crearCuentaBtn").addEventListener("click", crearCuenta);
    document.getElementById("iniciarSesionBtn").addEventListener("click", iniciarSesion);
});

// Función para mostrar el formulario del médico si se selecciona "Médico"
function toggleMedicoForm() {
    const medicoForm = document.getElementById("medicoForm");
    const isMedicoSelected = document.getElementById("medico").checked;
    console.log("Médico seleccionado:", isMedicoSelected); // Depuración
    medicoForm.style.display = isMedicoSelected ? "block" : "none";
}

// Función para crear una cuenta y guardarla en localStorage
function crearCuenta() {
    const nombre = document.getElementById("registroNombre").value;
    const email = document.getElementById("registroEmail").value;
    const password = document.getElementById("registroPassword").value;
    const tipoCuenta = document.querySelector('input[name="tipoCuenta"]:checked').value;

    if (!nombre || !email || !password) {
        alert("Por favor, completa todos los campos.");
        return;
    }

    const nuevoUsuario = { nombre, email, password, tipo: tipoCuenta };

    if (tipoCuenta === "Medico") {
        nuevoUsuario.especialidad = document.getElementById("medicoEspecialidad").value;
        nuevoUsuario.pais = document.getElementById("medicoPais").value;
        nuevoUsuario.ciudad = document.getElementById("medicoCiudad").value;

        if (!nuevoUsuario.especialidad || !nuevoUsuario.pais || !nuevoUsuario.ciudad) {
            alert("Por favor, completa todos los campos del formulario del médico.");
            return;
        }

        let medicos = JSON.parse(localStorage.getItem("medicos")) || [];
        medicos.push(nuevoUsuario);
        localStorage.setItem("medicos", JSON.stringify(medicos));
    }

    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    usuarios.push(nuevoUsuario);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    alert("Cuenta creada exitosamente.");
    document.getElementById("registroForm").reset();
    toggleMedicoForm();
}

function cargarMedicos() {
    const medicos = JSON.parse(localStorage.getItem("medicos")) || [];
    const resultsContainer = document.getElementById("results");
    resultsContainer.innerHTML = '';

    medicos.forEach(medico => agregarMedicoAlDOM(medico));
}

// Función para agregar la tarjeta de un médico al DOM
function agregarMedicoAlDOM(medico) {
    const resultsContainer = document.getElementById("results");
    const doctorCard = `
        <div class="col-md-4 mb-4">
            <div class="card text-center">
                <div class="card-body">
                    <h5 class="card-title">${medico.nombre}</h5>
                    <p class="card-text"><strong>Especialidad:</strong> ${medico.especialidad}</p>
                    <p class="card-text"><strong>Ciudad:</strong> ${medico.ciudad}</p>
                    <p class="card-text"><strong>País:</strong> ${medico.pais}</p>
                    <button class="btn btn-primary btn-sm" onclick="openChat('${medico.nombre}')">Iniciar Chat</button>
                </div>
            </div>
        </div>
    `;
    resultsContainer.insertAdjacentHTML('beforeend', doctorCard);
}

function openChat(nombreMedico) {
    const chatModalLabel = document.getElementById("chatModalLabel");
    const chatContainer = document.getElementById("chatContainer");

    chatModalLabel.innerText = `Chat con ${nombreMedico}`;
    chatContainer.innerHTML = ''; // Limpiar mensajes previos
    const chatModal = new bootstrap.Modal(document.getElementById("chatModal"));
    chatModal.show();
}

// Función para iniciar sesión
function iniciarSesion() {
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    // Verificar si es un administrador
    if (email === "Admin@gmail.com" && password === "Admin123") {
        alert("Bienvenido, Administrador");
        // Aquí se abre la ventana o página de administrador
        window.location.href = "admin.html"; // Cambia "admin.html" por la ruta de la ventana de admin
        return;
    }

    // Verificar otros usuarios
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    const usuario = usuarios.find(user => user.email === email && user.password === password);

    if (usuario) {
        alert(`Bienvenido, ${usuario.nombre}`);
        // Puedes redirigir al usuario a otra página o realizar otra acción aquí
    } else {
        alert("Credenciales incorrectas. Por favor, intenta de nuevo.");
    }
}


