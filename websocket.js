

const apiUrlWebSocket = "ws://kevin-chapron.fr:8080/ws";  
let socket;

// Fonction pour établir la connexion WebSocket
function connectionAuWebSocket() {
    socket = new WebSocket(apiUrlWebSocket);

  

      
        socket.onopen = () => {
            const token = sessionStorage.getItem("authToken");
            if (token) {
                
                socket.send(JSON.stringify({ auth: token }));
                console.log("Token envoyé pour authentification");
            } else {
                console.error("Token manquant !");
            }
        };

   
    socket.addEventListener('message', (event) => {
        const data = JSON.parse(event.data);
        displayMessage(data);
    });

   
    socket.addEventListener('error', (error) => {
        console.error("Erreur WebSocket:", error);
    });

    
    socket.addEventListener('close', () => {
        console.log("Connexion WebSocket fermée, reconnexion dans 3 secondes...");
        setTimeout(connectionAuWebSocket, 3000);  
    });
}




/****************************/
//Envoi de messsage via web soket et ajout d'evernement lorsqu'on clic sur la touche entrer du clavier et sur le bouton envoyer

function envoiMessage() {
  const inputField = document.getElementById("input-message");
  const messageContent = inputField.value.trim();
  if ( socket && messageContent && socket.readyState === WebSocket.OPEN) {
    
    socket.send(JSON.stringify({ message : messageContent }));
      inputField.value = "";
     console.log('Bonjour tu as envoye un message ')
  }
  
}



document.addEventListener("DOMContentLoaded", () => {
  const inputField = document.getElementById("input-message");
  const sendButton = document.getElementById("send-button");

  sendButton.addEventListener("click", envoiMessage);
  inputField.addEventListener("keypress", (event) => {
      if (event.key === "Enter") envoiMessage();
  });

  
});


//fonction permettant d'afficher le statut de connection

function Statusdesutilisateurs(username, lastMessageTime) {
  const currentTime = new Date();
  const elapsedTimeMinutes = (currentTime - new Date(lastMessageTime)) / 1000 / 60; 

  let statusText, statusClass;
  if (elapsedTimeMinutes < 5) {
      statusText = 'connecté';
      statusClass = 'connecté';
  } else if (elapsedTimeMinutes < 720) {
      const hours = Math.floor(elapsedTimeMinutes / 60);
      const minutes = Math.floor(elapsedTimeMinutes % 60);
      if (hours > 0) {
          statusText = `en ligne il y a ${hours} ${hours === 1 ? 'heure' : 'heures'}`;
      } else {
          statusText = `en ligne il y a ${minutes} ${minutes === 1 ? 'minute' : 'minutes'}`;
      }
      statusClass = 'absent';
  } else {
      statusText = 'déconnecté';
      statusClass = 'déconnecté';
  }
  

  // Mise à jour du statut dans le panneau latéral
  const userStatus = document.getElementById("status-list");
  let userStatusItem = document.getElementById(`status-${username}`);

  if (!userStatusItem) {
      userStatusItem = document.createElement("li");
      userStatusItem.id = `status-${username}`;
      userStatusItem.innerHTML = `<span class="username">${username}</span> <span class="status"></span>`;
      userStatus.appendChild(userStatusItem);
  }

  const statusSpan = userStatusItem.querySelector('.status');
  statusSpan.textContent = statusText;
  statusSpan.className = `status ${statusClass}`;
  
}



