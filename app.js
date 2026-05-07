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
const sparkleLayer = document.querySelector("#sparkleLayer");
const typedApology = document.querySelector("#typedApology");
const finalLine = document.querySelector("#finalLine");
const loveNote = document.querySelector("#loveNote");
const blockNote = document.querySelector("#blockNote");

let noClicks = 0;
let phase = "initial";
let typingStarted = false;

const apologyText =
  "بعرف إني زعلتك، وبعرف إن المزح ما بيمسح الغلط. حقك علي، ومش جاي أبرر. جاي أقول إني مهتم فيك، بزعلِك، وبكل كلمة بيننا. هون ليش تنامي زعلانة، حتى لو شو ما صار بيننا قبل، بس بتضلي قطعة مني. بحبك.";

const releaseHearts = () => {
  const pieces = ["♥", "♡", "✦", "♥", "♡", "✧"];

  pieces.forEach((piece, index) => {
    const sparkle = document.createElement("span");
    sparkle.className = "sparkle";
    sparkle.textContent = piece;
    sparkle.style.setProperty("--x", `${18 + Math.random() * 64}%`);
    sparkle.style.setProperty("--size", `${18 + Math.random() * 16}px`);
    sparkle.style.setProperty("--rotate", `${Math.random() > 0.5 ? "" : "-"}${18 + Math.random() * 26}deg`);
    sparkle.style.animationDelay = `${index * 90}ms`;
    sparkleLayer.append(sparkle);
    sparkle.addEventListener("animationend", () => sparkle.remove());
  });
};

const typeApology = () => {
  if (typingStarted) {
    return;
  }

  typingStarted = true;
  typedApology.textContent = "";
  loveNote.classList.remove("show");
  finalLine.classList.remove("show");
  blockNote.classList.remove("show");

  let index = 0;
  const typeNext = () => {
    typedApology.textContent = apologyText.slice(0, index);
    index += 1;

    if (index <= apologyText.length) {
      window.setTimeout(typeNext, 22);
      return;
    }

    loveNote.classList.add("show");
    window.setTimeout(() => finalLine.classList.add("show"), 350);
    releaseHearts();
  };

  typeNext();
};

const showFinalNudge = () => {
  releaseHearts();
  tinyLine.textContent = "أنا بعرفك";
  questionTitle.textContent = "ما أتوقع، انتي حنونة";
  subtitle.textContent = "زر لا أخذ فرصته كاملة.";
  noButton.classList.add("hidden");
  yesButton.classList.add("big-yes");
  yesButton.textContent = "آه خلينا نحكي";
  phase = "final-nudge";
};

const showApology = () => {
  releaseHearts();
  talkCard.classList.add("apology-mode");
  tinyLine.textContent = "شكرا لأنك وافقتي";
  questionTitle.textContent = "بعرف إني غلطت";
  subtitle.textContent = "هاي الرسالة اللي كنت بدي أوصلها.";
  noButton.classList.add("hidden");
  yesButton.classList.add("big-yes");
  yesButton.textContent = "سامحيني";
  musicStatus.textContent = "هاي اللحظة إلها أغنيتها.";
  apologyMessage.classList.add("show");
  typeApology();
  phase = "apology";
};

const showBlockNote = () => {
  releaseHearts();
  blockNote.classList.add("show");
  yesButton.textContent = "خلص وعد";
  musicStatus.textContent = "المصالحة الرسمية بانتظار فك البلوك.";
  phase = "done";
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
  releaseHearts();
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

  if (phase === "apology") {
    showBlockNote();
    return;
  }

  if (phase === "done") {
    releaseHearts();
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
