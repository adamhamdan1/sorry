const tinyLine = document.querySelector("#tinyLine");
const questionTitle = document.querySelector("#questionTitle");
const subtitle = document.querySelector("#subtitle");
const yesButton = document.querySelector("#yesButton");
const noButton = document.querySelector("#noButton");
const talkCard = document.querySelector(".talk-card");
const apologyMessage = document.querySelector("#apologyMessage");
const musicButton = document.querySelector("#musicButton");
const musicStatus = document.querySelector("#musicStatus");
const song = document.querySelector("#song");

let noClicks = 0;
let phase = "initial";

const showFinalNudge = () => {
  tinyLine.textContent = "أنا بعرفك";
  questionTitle.textContent = "ما أتوقع، انتي حنونة";
  subtitle.textContent = "زر لا أخذ فرصته كاملة.";
  noButton.classList.add("hidden");
  yesButton.classList.add("big-yes");
  yesButton.textContent = "آه خلينا نحكي";
  phase = "final-nudge";
};

const showApology = () => {
  tinyLine.textContent = "شكرا لأنك وافقتي";
  questionTitle.textContent = "بعرف إني غلطت";
  subtitle.textContent = "هاي الرسالة اللي كنت بدي أوصلها.";
  noButton.classList.add("hidden");
  yesButton.classList.add("big-yes");
  yesButton.textContent = "سامحيني";
  apologyMessage.classList.add("show");
  phase = "apology";
};

noButton.addEventListener("click", () => {
  tinyLine.textContent = "لحظة تفاوض";
  questionTitle.textContent = noClicks === 0 ? "متأكدة؟" : "لسه لا؟";
  subtitle.textContent =
    noClicks === 0
      ? "يعني ولا حتى دقيقتين؟"
      : "آخر محاولة قبل ما زر لا يتقاعد.";
  talkCard.classList.remove("teasing");
  void talkCard.offsetWidth;
  talkCard.classList.add("teasing");
  phase = "confirm";
  noClicks += 1;

  if (noClicks >= 2) {
    showFinalNudge();
  }
});

yesButton.addEventListener("click", () => {
  if (phase === "confirm") {
    showFinalNudge();
    return;
  }

  showApology();
});

musicButton.addEventListener("click", async () => {
  if (!song.currentSrc) {
    musicStatus.textContent = "حط ملف الأغنية باسم assets/song.mp3.";
    return;
  }

  if (song.paused) {
    try {
      await song.play();
      musicButton.textContent = "وقفي الأغنية";
      musicButton.classList.add("playing");
      musicStatus.textContent = "اشتغلت. هيك الاعتذار صار له موسيقى.";
    } catch {
      musicStatus.textContent = "المتصفح رفض التشغيل. جربي ضغطة ثانية.";
    }
    return;
  }

  song.pause();
  musicButton.textContent = "شغلي الأغنية";
  musicButton.classList.remove("playing");
  musicStatus.textContent = "توقفت الأغنية.";
});
