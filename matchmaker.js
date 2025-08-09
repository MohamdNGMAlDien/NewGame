// matchmaker.js
// يفترض أن Firebase تم تهيئته مسبقًا وأن auth جاهز (firebase.auth())

const db = firebase.database();
const auth = firebase.auth();

let lookingListenerAttached = false;
let myLookingRef = null;

function myUid() {
  const user = auth.currentUser;
  if (!user) throw new Error("لم يتم تسجيل الدخول.");
  return user.uid;
}

// وضع نفسي في قائمة الانتظار
async function findMatch() {
  const uid = myUid();
  myLookingRef = db.ref("matchmaking/looking/" + uid);

  // أكتب إني أبحث عن خصم
  await myLookingRef.set({
    ts: firebase.database.ServerValue.TIMESTAMP
  });

  // راقب قائمة الانتظار للعثور على خصم
  attachLookingListener();
  // راقب الماتشات الخاصة بي
  watchMyMatches();

  updateMatchmakingUI("جارٍ البحث عن خصم...");
}

// إلغاء البحث
async function cancelFinding() {
  const uid = myUid();
  if (myLookingRef) await myLookingRef.remove();
  detachLookingListener();
  updateMatchmakingUI("تم إلغاء البحث.");
}

// الاستماع للاعبين الآخرين في قائمة الانتظار
function attachLookingListener() {
  if (lookingListenerAttached) return;
  lookingListenerAttached = true;

  const uid = myUid();
  db.ref("matchmaking/looking").on("child_added", async (snap) => {
    const otherUid = snap.key;
    if (!otherUid || otherUid === uid) return;

    // تحديد من ينشئ الماتش: صاحب الـ UID الأصغر
    const [a, b] = [uid, otherUid].sort();
    if (uid !== a) return; // لست أنا المُنشئ

    try {
      await tryCreateMatch(a, b);
    } catch (e) {
      // ممكن تكون اننشأت بالفعل بواسطة الطرف الآخر
      // تجاهل الخطأ واستمر في الاستماع
    }
  });
}

function detachLookingListener() {
  if (!lookingListenerAttached) return;
  lookingListenerAttached = false;
  db.ref("matchmaking/looking").off();
}

// محاولة إنشاء ماتش باستخدام Transaction لمنع التكرار
async function tryCreateMatch(a, b) {
  const matchId = `${a}_${b}`;
  const matchRef = db.ref("matches/" + matchId);

  const res = await matchRef.transaction((curr) => {
    if (curr) return; // موجود بالفعل
    return {
      players: { [a]: true, [b]: true },
      status: "active",
      createdAt: firebase.database.ServerValue.TIMESTAMP
    };
  });

  // لو تم الإنشاء الآن (committed == true && snapshot.exists())
  if (res.committed) {
    // اربط الماتش بكل لاعب لسهولة الاستماع
    const updates = {};
    updates[`userMatches/${a}/${matchId}`] = true;
    updates[`userMatches/${b}/${matchId}`] = true;
    updates[`matchmaking/looking/${a}`] = null;
    updates[`matchmaking/looking/${b}`] = null;
    await db.ref().update(updates);
  }
}

// الاستماع لأي ماتش جديد يخصني
function watchMyMatches() {
  const uid = myUid();
  db.ref("userMatches/" + uid).off();
  db.ref("userMatches/" + uid).on("child_added", (snap) => {
    const matchId = snap.key;
    if (!matchId) return;
    updateMatchmakingUI("تم العثور على خصم! جاري الدخول للمباراة...");
    if (typeof window.initGame === "function") {
      window.initGame(matchId);
    }
  });
}

// عنصر واجهة اختياري لتحديث الحالة
function updateMatchmakingUI(text) {
  const el = document.getElementById("matchStatus");
  if (el) el.textContent = text;
}

// APIs بسيطة للأزرار
window.findMatch = findMatch;
window.cancelFinding = cancelFinding;
