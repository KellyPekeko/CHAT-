
const apiUrlLogin = "http://kevin-chapron.fr:8080/login";
const apiUrlMessages = "http://kevin-chapron.fr:8080/messages";
const codePermanent = "MAPK22510200";

async function authentionDesUser() {
    await requeteAjax("POST", apiUrlLogin, { Code: codePermanent }, {}, (data) => {
        const userToken = data.Token;
        document.getElementById("user-name").textContent = data.Name;
        sessionStorage.setItem("authToken", userToken);
        console.log("Authentification réussie. Token reçu:", userToken);
    });
}

async function recuperationDesMessages() {
    const token = sessionStorage.getItem("authToken");
    if (!token) {
        console.error("Token manquant !");
        return;
    }

    await requeteAjax("GET", apiUrlMessages, null,
      
      { "Authorization": `Basic ${token}` }, (messages) => {
        document.getElementById("messages").innerHTML = "";  

        messages.slice(-50).forEach(messageData => {
          displayMessage({
                Date: messageData.Date,
                From: messageData.From,
                Text: messageData.Text
            });
        });
    });
}





async function main() {
  await authentionDesUser();

  const token = sessionStorage.getItem("authToken");

  if (token) {
      recuperationDesMessages();  // Charger les messages existants
      connectionAuWebSocket();  // Établir la connexion WebSocket
  } else {
      console.error("Token manquant !");
  }
}

window.addEventListener("load", main);