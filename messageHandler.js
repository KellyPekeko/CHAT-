



  function displayMessage(data) {
    const messageContainer = document.getElementById("messages");
    const date = new Date(data.timestamp || data.Date);

    // Affiche le message dans le format désiré
    const formattedDate = `[${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}]`;
    const messageElement = document.createElement("p");
    messageElement.innerHTML = `<span class="date">${formattedDate}</span> <span class="name">(${data.nom || data.From})</span> ${data.Text || data.contenu}`;
    messageContainer.appendChild(messageElement);

    messageContainer.scrollTop = messageContainer.scrollHeight;

    // Mise à jour du statut de connexion
    Statusdesutilisateurs(data.nom || data.From, date);
}

