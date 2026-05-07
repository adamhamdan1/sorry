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

let noClicks = 0;
let phase = "initial";
let typingStarted = false;

const apologyText =
  "بعرف إني زعلتك، وبعرف إن المزح ما بيمسح الغلط. حقك علي، ومش جاي أبرر. جاي أقول إني مهتم فيك، بزعلِك، وبكل كلمة بيننا. أوعدك أسمعك أهدأ، وأنتبه أكتر، وما أخلي كبريائي يغلب محبتي إلك.";

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
  finalLine.classList.remove("show");

  let index = 0;
  const typeNext = () => {
    typedApology.textContent = apologyText.slice(0, index);
    index += 1;

    if (index <= apologyText.length) {
      window.setTimeout(typeNext, 22);
      return;
    }

    finalLine.classList.add("show");
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
  tinyLine.textContent = "شكرا لأنك وافقتي";
  questionTitle.textContent = "بعرف إني غلطت";
  subtitle.textContent = "هاي الرسالة اللي كنت بدي أوصلها.";
  noButton.classList.add("hidden");
  yesButton.classList.add("big-yes");
  yesButton.textContent = "سامحيني";
  apologyMessage.classList.add("show");
  typeApology();
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
