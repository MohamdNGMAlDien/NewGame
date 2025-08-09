// emojis.js
const emojis = ["😂", "👍", "🔥", "🤔", "🥱"];
const emojiBox = document.getElementById("emojiBox");

emojis.forEach(emoji => {
  const btn = document.createElement("button");
  btn.textContent = emoji;
  btn.onclick = () => sendMessage(emoji);
  emojiBox.appendChild(btn);
});
