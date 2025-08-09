// game.js
const playerNameSpan = document.getElementById("playerName");
const matchStatusDiv = document.getElementById("matchStatus");
const alternativeDiv = document.getElementById("alternativeOptions");

firebase.auth().onAuthStateChanged(user => {
  if (user) {
    playerNameSpan.textContent = user.displayName || user.email || "لاعب";
  }
});

document.getElementById("onlineBtn").onclick = () => {
  matchStatusDiv.textContent = "جارٍ البحث عن خصم...";
  alternativeDiv.style.display = "none";

  // هنا نبحث في قاعدة بيانات Firebase
  const waitingRef = firebase.database().ref("waitingPlayers");

  waitingRef.once("value").then(snapshot => {
    const players = snapshot.val();

    if (players) {
      // وجدنا لاعب، نبدأ الماتش
      matchStatusDiv.textContent = "✅ تم العثور على خصم! جاري بدء اللعبة...";
      // هنا يمكن بدء الماتش الفعلي...
    } else {
      // لا يوجد لاعب
      matchStatusDiv.textContent = "❌ لم يتم العثور على خصم.";
      alternativeDiv.style.display = "block";
    }
  });
};

function retryMatch() {
  matchStatusDiv.textContent = "🔁 إعادة البحث عن خصم...";
  alternativeDiv.style.display = "none";
  document.getElementById("onlineBtn").click();
}

function playLocal() {
  matchStatusDiv.textContent = "🎮 تم اختيار اللعب ضد الكمبيوتر.";
  // توجه إلى نمط لعب آخر...
}

