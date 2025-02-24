document.addEventListener("DOMContentLoaded", function () {
    loadDoctors();
    loadMessages();
    loadUsers();
});

// Función para cargar los médicos desde localStorage
function loadDoctors() {
    const doctorsList = document.getElementById("doctorsList");
    const doctors = JSON.parse(localStorage.getItem("doctors")) || [];
    doctorsList.innerHTML = ''; // Limpiar la lista actual
    doctors.forEach((doc, index) => {
        const doctorCard = document.createElement("div");
        doctorCard.className = "col-md-4";
        doctorCard.innerHTML = `
            <div class="card mb-3">
                <div class="card-body">
                    <h5 class="card-title">${doc.name}</h5>
                    <p class="card-text">${doc.specialty}</p>
                    <button class="btn btn-edit" onclick="editDoctor(${index})">Editar Info</button>
                    <button class="btn btn-delete" onclick="deleteDoctor(${index})">Eliminar</button>
                </div>
            </div>
        `;
        doctorsList.appendChild(doctorCard);
    });
}

// Función para cargar mensajes de contacto desde localStorage
function loadMessages() {
    const messagesList = document.getElementById("contactMessages");
    const messages = JSON.parse(localStorage.getItem("contactMessages")) || [];
    let tableHtml = `<table class="table">
        <thead>
            <tr>
                <th>Nombre</th>
                <th>Correo</th>
                <th>Mensaje</th>
            </tr>
        </thead>
        <tbody>`;
    messages.forEach(msg => {
        tableHtml += `
            <tr>
                <td>${msg.name}</td>
                <td>${msg.email}</td>
                <td>${msg.message}</td>
            </tr>
        `;
    });
    tableHtml += `</tbody></table>`;
    messagesList.innerHTML = tableHtml;
}

// Función para cargar los usuarios desde localStorage
function loadUsers() {
    const userList = document.getElementById("userList");
    const users = JSON.parse(localStorage.getItem("users")) || [];
    userList.innerHTML = ''; // Limpiar la lista actual
    users.forEach((user, index) => {
        const userCard = document.createElement("div");
        userCard.className = "col-md-4";
        userCard.innerHTML = `
            <div class="card mb-3">
                <div class="card-body">
                    <h5 class="card-title">${user.name}</h5>
                    <p class="card-text">${user.email}</p>
                    <button class="btn btn-edit" onclick="editUser(${index})">Editar Info</button>
                    <button class="btn btn-delete" onclick="deleteUser(${index})">Eliminar</button>
                </div>
            </div>
        `;
        userList.appendChild(userCard);
    });
}

// Funciones para editar y eliminar médicos
function editDoctor(index) {
    // Simular la función de editar; abrir un formulario de edición
    alert("Editar médico: " + index);
}

function deleteDoctor(index) {
    let doctors = JSON.parse(localStorage.getItem("doctors")) || [];
    doctors.splice(index, 1);
    localStorage.setItem("doctors", JSON.stringify(doctors));
    loadDoctors(); // Recargar la lista de médicos
}

// Funciones para editar y eliminar usuarios
function editUser(index) {
    // Simular la función de editar; abrir un formulario de edición
    alert("Editar usuario: " + index);
}

function deleteUser(index) {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    users.splice(index, 1);
    localStorage.setItem("users", JSON.stringify(users));
    loadUsers(); // Recargar la lista de usuarios
}
