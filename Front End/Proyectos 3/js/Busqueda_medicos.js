// Responsividad del chat modal
let currentDoctor = '';

function openChat(nombreMedico) {
    currentDoctor = nombreMedico;
    document.getElementById("chatModalLabel").innerText = `Chat con ${nombreMedico}`;
    document.getElementById("chatContainer").innerHTML = ''; // Limpiar mensajes previos
    const chatModal = new bootstrap.Modal(document.getElementById("chatModal"));
    chatModal.show();
}

// Enviar mensaje en el chat
function sendMessage(event) {
    event.preventDefault();
    const messageInput = document.getElementById("messageInput");
    const message = messageInput.value.trim();

    if (message) {
        addMessage("Tú", message, "user");

        // Respuesta automática
        setTimeout(() => {
            addMessage(currentDoctor, "Gracias por tu mensaje. ¿En qué puedo ayudarte?", "doctor");
        }, 1000);

        messageInput.value = '';
    }
}

function addMessage(sender, text, senderType) {
    const chatContainer = document.getElementById("chatContainer");
    const messageElement = document.createElement("div");

    messageElement.classList.add("message", senderType);
    messageElement.innerHTML = `<strong>${sender}:</strong> ${text}`;
    messageElement.style.padding = "8px";
    messageElement.style.marginBottom = "5px";
    messageElement.style.borderRadius = "8px";
    messageElement.style.maxWidth = "80%";

    if (senderType === "user") {
        messageElement.style.backgroundColor = "#DCF8C6";
        messageElement.style.alignSelf = "flex-end";
        messageElement.style.textAlign = "right";
    } else {
        messageElement.style.backgroundColor = "#FFF";
        messageElement.style.border = "1px solid #ddd";
    }

    chatContainer.appendChild(messageElement);
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

// Filtros y lógica adicional para buscar médicos
function filterDoctors() {
    const searchBar = document.getElementById("searchBar").value.toLowerCase();
    const name = document.getElementById("name").value.toLowerCase();
    const specialty = document.getElementById("specialty").value.toLowerCase();
    const city = document.getElementById("city").value.toLowerCase();
    const country = document.getElementById("country").value.toLowerCase();

    const medicos = JSON.parse(localStorage.getItem("medicos")) || [];

    const filteredDoctors = medicos.filter(medico =>
        (searchBar === '' || medico.nombre.toLowerCase().includes(searchBar) || medico.especialidad.toLowerCase().includes(searchBar)) &&
        (name === '' || medico.nombre.toLowerCase().includes(name)) &&
        (specialty === '' || medico.especialidad.toLowerCase().includes(specialty)) &&
        (city === '' || medico.ciudad.toLowerCase().includes(city)) &&
        (country === '' || medico.pais.toLowerCase().includes(country))
    );

    displayDoctors(filteredDoctors);
}

// Función para mostrar resultados filtrados en la página
function displayDoctors(doctorsList) {
    const resultsContainer = document.getElementById("results");
    resultsContainer.innerHTML = '';

    if (doctorsList.length === 0) {
        resultsContainer.innerHTML = '<p class="text-center text-muted">No se encontraron médicos.</p>';
        return;
    }

    doctorsList.forEach(medico => agregarMedicoAlDOM(medico));
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
                    <button class="btn btn-primary" onclick="openChat('${medico.nombre}')">Iniciar Chat</button>
                </div>
            </div>
        </div>
    `;
    resultsContainer.insertAdjacentHTML('beforeend', doctorCard);
}