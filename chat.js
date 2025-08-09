// chat.js
const chatRef = firebase.database().ref("gameChat");

function sendMessage(msg) {
  chatRef.push({
    sender: firebase.auth().currentUser.uid,
    message: msg,
    timestamp: Date.now()
  });
}

// استماع للرسائل الواردة
chatRef.on("child_added", snapshot => {
  const data = snapshot.val();
  showMessage(data.message);
});

function showMessage(msg) {
  const messageBox = document.createElement("div");
  messageBox.className = "chat-popup";
  messageBox.textContent = msg;
  document.body.appendChild(messageBox);

  setTimeout(() => {
    messageBox.remove();
  }, 3000);
}
