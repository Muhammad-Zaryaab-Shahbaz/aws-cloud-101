const wrapper = document.querySelector(".wrapper");
const mainHeading = document.querySelector(".heading-main");
const allCases = document.querySelectorAll("#cases");
const header = document.querySelector(".header-content");
const officalHeader = document.querySelector(".offical-header");
const body = document.querySelector(".body");

// global
let devopsQuiz = false;
let softEngQuiz = false;
let financeQuiz = false;

let devopsResult = { atemps: [], state: [] };
let softEngResult = { atemps: [], state: [] };
let financeResult = { atemps: [], state: [] };

let finalResult = { devopsResult, softEngResult, financeResult };

let questionare = {
  DevOps: [
    {
      stage: 1,
      question:
        "The website will be accessible from all over the world - Shall we deploy all the infrastructure on our premises or go for cloud services?",
      prompts: ["On-Premises", "Cloud"],
      answer: "Cloud",
      image: "dev",
      height: "auto",
    },
    {
      stage: 2,
      question:
        "What is the most practical reason for selecting the cloud services model?",
      prompts: [
        "Lesser latency rate for website users and easy scalability as the userbase grows.",
        "On-premises infrastructure cannot host a website.",
        "On-premises solutions have security risks.",
      ],
      answer:
        "Lesser latency rate for website users and easy scalability as the userbase grows.",
      image: "dev",
      height: "75%",
    },
  ],
  softEngineering: [
    {
      stage: false,
      question:
        "The software engineering team mentioned that the complete team is housed in California (USA). Therefore they need a high-availability server in that region. In case AWS is selected as a cloud service provider, what would be the naming  convention for that region?",
      prompts: ["af", "eu", "us"],
      answer: "us",
      image: "softEng",
      height: "75%",
    },
    {
      stage: false,
      question:
        "Which of the following service will be used to route traffic based on users??? geolocation?",
      prompts: ["EC2", "Route 53", "RDS"],
      answer: "Route 53",
      image: "softEng",
      height: "75%",
    },
    {
      stage: false,
      question:
        "In line with Jeff Bezos's model at Amazon, each developer of our software team will expose the data to other members through a service interface called?",
      prompts: ["USB", "API", "Email"],
      answer: "API",
      image: "softEng",
      height: "75%",
    },
  ],
  finance: [
    {
      stage: false,
      question:
        "The payment will be made to cloud service providers on a pay-as-you-go model, and the infrastructure will be expanded per the needs. Which of the following expenses is optimally used in this case?",
      prompts: ["Operational", "Optional"],
      answer: "Optional",
      image: "finance",
      height: "auto",
    },
  ],
};

// valid actually used to check each second that there is no flag ?
let valid = false;
let shaffle = false;

// screens utilties
let screen = 1;

const screenShow = num => {
  screen = num;
  modulesHandler();
};
const showRooms = value => {
  if (value === 3) screenShow(3);
  else if (value === 4) screenShow(4);
  else if (value === 5) screenShow(5);
  else if (value === 6) screenShow(6);
};

// popup message
const messagePopup = (lost, message) => {
  if (lost) {
    return `
  <div class="flex items-center flex-col justify-center">
      <p class="px-5 py-4 font-bold">${message}</p>
      <div class="btn-container-2" style="width: 96%; margin: 0.5rem; margin-top:0%">
          <button onClick="goToHomePageAfterLosing(true)" class="text-2xl" style="border-radius:6px">Restart</button>
      </div>
  </div>
      `;
  } else {
    return `
  <div class="flex items-center flex-col justify-center">
      <p class="px-5 py-4 font-bold">${message}</p>
  </div>
      `;
  }
};
const popUpOffical = (heading, message, lost, timer) => {
  if (document.querySelector(".popup-container")) {
    document.querySelector(".popup-container").remove();
  }
  const body = document.querySelector(".body");
  const popupTemp = `
<div class="fixed top-0 left-0  w-full  min-h-screen z-10 flex justify-center items-center popup-container">
    <div class="w-[580px]  md:w-2/5 m-r-auto -mt-10  border rounded-lg popUp opacity-100 slide-bottom">
        <div class="flex items-center justify-between py-3 px-5  border-b">
            <h2 class="text-2xl font-bold">${heading}</h2>
            <i class="fa-solid fa-xmark cursor-pointer text-2xl opacity-60 hover:opacity-100 popup-close"></i>
        </div>
        ${messagePopup(lost, message)}
    </div>
</div>
    `;
  wrapper.style.opacity = ".8";
  body.insertAdjacentHTML("afterbegin", popupTemp);
  valid = false;

  const popContainer = document.querySelector(".popup-container");
  const closeBtn = document.querySelector(".popup-close");

  closeBtn.addEventListener("click", e => {
    wrapper.style.opacity = "1";

    if (lost) {
      goToHomePageAfterLosing();
      wrapper.style.opacity = "1";
    } else {
      if (timer) {
        const options = document.querySelectorAll(".quiz__options");
        defaultOptions(options);
        valid = true;
      }
    }

    totalSeconds = 30;
    popContainer.remove();

    if (currPopupMsg === 4 || currPopupMsg > 3) {
      location.reload();
    }
  });
};
const popUpOfficalIntroduction = message => {
  if (document.querySelector(".popup-container")) {
    document.querySelector(".popup-container").remove();
  }
  const body = document.querySelector(".body");
  const popupTemp = `
<div class="fixed top-0 left-0  w-full  min-h-screen z-10 flex justify-center items-center popup-container">
    <div class="w-[500px] md:w-[600px] m-r-auto mt-[-14rem]  md:mt-[-22rem] border rounded-lg popUp opacity-100 slide-bottom">
        <div class="flex items-center justify-between py-3 px-5">
            <p class="px-5 py-4 font-bold flex-1 text-center">${message}</p>
            <i class="fa-solid fa-xmark cursor-pointer text-2xl opacity-60 hover:opacity-100 popup-close"></i>
            </div>

    </div>
</div>
    `;
  wrapper.style.opacity = ".8";
  body.insertAdjacentHTML("afterbegin", popupTemp);

  const popContainer = document.querySelector(".popup-container");
  const closeBtn = document.querySelector(".popup-close");

  closeBtn.addEventListener("click", e => {
    wrapper.style.opacity = "1";
    popContainer.remove();
  });
};

// popup Quiz question
const showQuizQuestion = arr => {
  if (arr.length === 2) {
    return `
    <div class="quiz__options-container ">
        
    <div class="quiz__options" data-id="${arr[0]}">
    <p>${arr[0]}</p>
    <div class="quiz__options__slides"></div>
    <div class="quiz__options__slides"></div>
    <div class="line-show-2 line-no-1"></div>
    </div>
    <div class="quiz__options" data-id="${arr[1]}">
    <p>${arr[1]}</p>
    <div class="quiz__options__slides"></div>
    <div class="quiz__options__slides"></div>
    <div class="line-show-2 line-no-2"></div>
    </div>
    </div>
  `;
  }
  if (arr.length === 3) {
    return `
<div class="quiz__options-container">
    <div class="quiz__options" data-id="${arr[0]}">
        <p>${arr[0]}</p>
        <div class="quiz__options__slides"></div>
        <div class="quiz__options__slides"></div>
        <div class="line-show-2 line-no-1"></div>
    </div>
    <div class="quiz__options" data-id="${arr[1]}">
        <p>${arr[1]}</p>
        <div class="quiz__options__slides"></div>
        <div class="quiz__options__slides"></div>
        <div class="line-show-2 line-no-2"></div>
    </div>
 </div>
  <div class="quiz__options-container special-quiz__options-container">
  <div class="quiz__options" data-id="${arr[2]}">
  <p>${arr[2]}</p>
  <div class="quiz__options__slides"></div>
  <div class="quiz__options__slides"></div>
  <div class="line-show-2 special-line-no-3"></div>
</div>
  </div>

  `;
  }
  if (arr.length === 4) {
    return `
    <div class="quiz__options-container">        
      <div class="quiz__options" data-id="${arr[0]}">
          <p>${arr[0]}</p>
          <div class="quiz__options__slides"></div>
          <div class="quiz__options__slides"></div>
          <div class="line-show-2 line-no-1"></div>
      </div>
      <div class="quiz__options" data-id="${arr[1]}">
          <p>${arr[1]}</p>
          <div class="quiz__options__slides"></div>
          <div class="quiz__options__slides"></div>
          <div class="line-show-2 line-no-2"></div>
      </div>
  <div class="quiz__options" data-id="${arr[2]}">
      <p>${arr[2]}</p>
      <div class="quiz__options__slides"></div>
      <div class="quiz__options__slides"></div>
      <div class="line-show-2 line-no-3"></div>
  </div>
  <div class="quiz__options" data-id="${arr[4]}">
      <p>${arr[4]}</p>
      <div class="quiz__options__slides"></div>
      <div class="quiz__options__slides"></div>
      <div class="line-show-2 line-no-4"></div>
  </div>
    </div>
  `;
  }
};
const questionPopUpTemps = (obj, option) => {
  return `
<div class='room-back-image'>
<img   class="w-[620px] ${
    option === 1 ? "room-image" : ""
  } room-image-responsive" style="height:${
    obj.height
  }" src="./assests/images/rooms/${obj?.image}.png"/>
</div>

<div class="flex-1 absolute top-0 left-0 w-full h-full flex items-center justify-center mt-2">

  <div class="m-auto w-[620px]  rounded-lg slide-bottom quiz__container opacity-0 -z-10">
  ${
    obj?.stage
      ? `<span class="absolute bg-green-light text-black -top-3 right-0 md:-right-2 px-2 py-1 rounded-lg font-normal z-30" ><b> Stage :  ${obj.stage}</b></span >`
      : ""
  }
  <span class="absolute bg-green-light text-black -top-3 left-0 md:-left-2 px-2  py-1 rounded-lg font-normal z-30" >
  <i class="fa-solid fa-clock mr-1"></i> <b class="timer-container">15s</b>
  </span >
    <div class="quiz">
      <div class="quiz__question">
        <h5 class="font-heading-2">${obj.question}</h5>
        <div class="quiz__slides"></div>
        <div class="quiz__slides"></div>
        <div class="line-show"></div>
      </div>

      ${showQuizQuestion(obj.prompts)}
    
    </div>
  </div>
</div>
    `;
};

// Progress-Bar
const progressBar = () => {
  const percentage =
    finalResult.devopsResult.atemps.length +
    finalResult.financeResult.atemps.length +
    finalResult.softEngResult.atemps.length;

  if (document.querySelector(".custom-progress-bar")) {
    document.querySelector(".custom-progress-bar").remove();
  }
  const html = `
  <div class="w-1/2 mr-auto ml-auto mt-4 custom-progress-bar">
      <div class="w-full  rounded-full  relative py-4 bg-white">
        <h3 class="text-2xl green-light  text-center font-medium w-full h-full z-10 absolute top-0 left-0 w-full h-full">
        ${((percentage / 6) * 100).toFixed(0)}%
        </h3>
        <div class="absolute top-0 left-0 h-full progress-container text-center p-0.5 leading-none rounded-full" style=display:${
          percentage === 0 ? "none !important" : "block"
        }
       >
        </div>
      </div>
    </div>
  
  `;

  document
    .querySelector("#main-content")
    .insertAdjacentHTML("afterbegin", html);
  document.querySelector(".progress-container").style.width = `${(
    (percentage / 6) *
    100
  ).toFixed(2)}%`;
};

// Mark Strikes and show remaing strikes
const addingStrikes = () => {
  if (document.querySelector(".timerContainer"))
    document.querySelector(".timerContainer").remove();

  const html = `
  <div class="w-full timerContainer flex  items-center justify-center relative">
    <div class="strikeRemaining px-3 flex  items-center justify-center gap-4 text-3xl font-bold">
        <i class="fas fa-times strike" aria-hidden="true"></i>
        <i class="fas fa-times strike" aria-hidden="true"></i>
        <i class="fas fa-times strike" aria-hidden="true"></i>
    </div>
    <div id="tooltip">Remaining  Attempts  (3/3)</div>
  </div>
  `;

  const doc = document.querySelector(".header-content");
  doc.insertAdjacentHTML("afterend", html);
  officalHeader.style.padding = ".3rem";

  const strikeRemaining = document.querySelector(".strikeRemaining");
  const tooltip = document.querySelector("#tooltip");

  strikeRemaining.addEventListener("mouseenter", function() {
    tooltip.style.display = "block";
  });

  strikeRemaining.addEventListener("mouseleave", function() {
    tooltip.style.display = "none";
  });
};
const showRemainingAttemps = () => {
  const atempsDoc = document.querySelectorAll(".strike");

  const tooltip = document.querySelector("#tooltip");
  tooltip.innerHTML = `Remaining Attempts (${3 - totalAtemps}/3)`;
  atempsDoc.forEach((el, i) => {
    if (totalAtemps === 0) return;
    if (i < totalAtemps) {
      el.style.color = "#7A1123";
    }
  });
};

// after losing all the strikes reseting the states of varaible&structure
const goToHomePageAfterLosing = modal => {
  valid = false;
  totalAtemps = 0;
  const ui = document.querySelector("#main-content");
  wrapper.style.opacity = "1";
  ui.style.filter = "blur(0px)";
  devopsQuiz = false;
  softEngQuiz = false;
  financeQuiz = false;
  shaffle = true;

  devopsResult = { atemps: [], state: [] };
  softEngResult = { atemps: [], state: [] };
  financeResult = { atemps: [], state: [] };

  finalResult = { devopsResult, softEngResult, financeResult };
  softEngQuestionNo = 1;
  devopsQuestionNo = 1;
  financeQuestionNo = 1;

  if (shaffle) {
    shaffleQuizQuestions();
  }

  if (modal) {
    document.querySelector(".popup-container").remove();
  }
  screenShow(1);
};

// When user in Quiz page and want to go back to screen 2
const goToFromQuiz = () => {
  valid = false;
  totalSeconds = 30;
  screenShow(2);
};

// shaffle the question after checking shaffle varaible is true
const shaffleQuizQuestions = () => {
  const devPrompts = questionare.DevOps.map((object, i) => {
    return object.prompts.sort(() => Math.random() - 0.5);
  });
  const softPrompts = questionare.softEngineering.map((object, i) => {
    return object.prompts.sort(() => Math.random() - 0.5);
  });
  questionare.DevOps.forEach((el, i) => (el.prompts = devPrompts[i]));
  questionare.softEngineering.forEach((el, i) => (el.prompts = softPrompts[i]));
};

// authentication of quiz seconds and attemps checking on each second
setInterval(() => {
  authAtempsSeconds(valid);
}, 1000);

let totalSeconds = 30;
let totalAtemps = 0;
function authAtempsSeconds(valid) {
  // console.log(valid);
  if (!valid) return;
  const timerDoc = document.querySelector(".timer-container");
  if (!timerDoc) return;
  if (totalSeconds <= 10) timerDoc.style.color = "#f1685e";
  else timerDoc.style.color = "black";

  if (totalSeconds == 0) {
    totalAtemps = totalAtemps + 1;
    totalSeconds = 30;
    timerDoc.innerHTML = `${totalSeconds}s`;

    if (totalAtemps !== 3) {
      popUpOffical(
        "Warning",
        `You have ${3 - totalAtemps} ${
          3 - totalAtemps == 1 ? "attempt" : "attempts"
        } remaining.`,
        false,
        true
      );
    }
  }

  if (totalAtemps === 3 || totalAtemps > 3) {
    const ui = document.querySelector("#main-content");
    ui.style.filter = "blur(2px)";
    valid = false;
    popUpOffical("Game Over", `You are out of attempts.`, true, false);
    return;
  } else {
    showRemainingAttemps();
    timerDoc.innerHTML = `${totalSeconds}s`;
    totalSeconds = totalSeconds - 1;

    return;
  }
}

// after clicking the quiz question option check it true&false
const correctWrongChecker = (el, correct) => {
  if (correct) {
    el.style.background = "#a3ea2a";
    el.children[0].style.background = "#a3ea2a";
    el.children[1].style.background = "#a3ea2a";
    el.children[2].style.background = "#a3ea2a";
  } else {
    el.style.background = "#7A1123";
    el.children[0].style.background = "#7A1123";
    el.children[1].style.background = "#7A1123";
    el.children[2].style.background = "#7A1123";

    totalAtemps = totalAtemps + 1;
    showRemainingAttemps();
    if (totalAtemps == 3) {
      popUpOffical("Game Over", `You are out of attempts.`, true, false);
      return;
    }
    popUpOffical(
      "Warning",
      `You have ${3 - totalAtemps} ${
        3 - totalAtemps == 1 ? "attempt" : "attempts"
      } remaining.`,
      false,
      true
    );
  }
};

// setting the default color to question option
const defaultOptions = options => {
  options.forEach(el => {
    el.style.background = "#525a6a";
    el.children[0].style.background = "#525a6a";
    el.children[1].style.background = "#525a6a";
    el.children[2].style.background = "#525a6a";
  });
};

// first screen templates and handler
const firstScreenTemp = () => {
  return `
    <div class="w-5/6 m-auto  h-full flex flex-col flex-1 pt-12">
    <h2 class="font-heading green-light">Instructions</h2>
    <ul class="mt-4 px-8 list-disc">
        <li class="mb-3 leading-6">You have been tasked to develop a social media interaction website
            where users can communicate with each other (with features more or less equivalent to those on Twitter or Facebook). You are tasked to get input from all the teams, prepare a feasibility report,
            and present it to the CEO.
        </li>
        <li class="mb-3 leading-6">You will visit each department and will be asking certain questions.
        </li>
        <li class="mb-3 leading-6">You will only be given 30 seconds to answer each question.
        </li>
        <li class="mb-3 leading-6">In case of running out of time, you get a penalty. Your game will be over after three penalties.
        </li>
    </ul>
    <div class="btn-container mt-8">
        <button class="start-btn">Start</button>
    </div>
</div>
    `;
};
const firstScreenHandler = () => {
  // generating templates
  const temp = firstScreenTemp();

  // adding templates to container
  const container = document.querySelector("#main-content");
  container.innerHTML = "";
  container.insertAdjacentHTML("afterbegin", temp);
  // addingStrikes();
  mainHeading.innerHTML = "AWS Cloud 101";
  if (document.querySelector(".timerContainer")) {
    document.querySelector(".timerContainer").remove();
    header.style.padding = "1rem 0";
  }

  // adding listener to Start button
  const btn = document.querySelector(".start-btn");
  btn.addEventListener("click", e => {
    screenShow(2);
    popUpOfficalIntroduction(
      "Click on the Department to visit it.",
      false,
      false
    );
  });
};

// Second screen templates and handler
const secondScreenTemp = () => {
  return `
<div class="w-full overflow-auto relative">
   
    <div class="main-image-container" 
      onmousemove="perimeterMouseover(event)">
      <div class="sides side-ceo">
            <b>CEO Room</b>
      </div>
      <div class="sides side-softeng">
         <b>Software Engineering room</b>
      </div>
      <div class="sides side-finance">
         <b>Finance room</b>
      </div>
      <div class="sides side-devops">
         <b>DevOps room</b>
      </div>
      <div class="confirm-completion confirm-completion-devops">
         <i class="fa-solid fa-circle-check"></i>
      </div>

      <div class="confirm-completion confirm-completion-softeng">
        <i class="fa-solid fa-circle-check"></i>
      </div>
      <div class="confirm-completion confirm-completion-finance">
        <i class="fa-solid fa-circle-check"></i>
      </div>
      <img
        src="./assests/images/full_office.png"
        class="main-image-container__bg"
        alt="full_office"
      />
      <img
        id="ceoRoom"
        src="./assests/images/highlighted_ceo.png"
        class="main-image-container__overlay overlay-image"
        alt="highlighted_ceo"
        />
        <img
          id="devRoom"
          src="./assests/images/highlighted_dev.png"
          class="main-image-container__overlay overlay-image"
          alt="highlighted_dev"
        />
        <img
        id="seRoom"
        src="./assests/images/highlighted_software_engineering.png"
        class="main-image-container__overlay overlay-image"
        alt="highlighted_software_engineering"
        />
        <img
        id="financeRoom"
        src="./assests/images/highlighted_finance.png"
        class="main-image-container__overlay overlay-image"
        alt="highlighted_finance"
        />
        </div>
  </div>
    `;
};
const secondScreenHandler = () => {
  // generating templates
  const temp = secondScreenTemp();

  // adding templates to container
  const container = document.querySelector("#main-content");
  container.innerHTML = "";
  mainHeading.innerHTML = "AWS Cloud 101";
  container.insertAdjacentHTML("afterbegin", temp);
  addingStrikes();
  progressBar();
  showRemainingAttemps();
  showTickToCompletedRoomQuiz();
  header.style.padding = "0rem 0";

  const rooms = document.querySelectorAll(".overlay-image");
  rooms.forEach((element, i) => {
    element.addEventListener("click", () => showRooms(i + 3));
  });
  const logContainer = document.querySelector(".image-container");
  logContainer.innerHTML = `
          <img
            src="https://assets.tryhackme.com/img/logo/tryhackme_logo_full.svg"
            alt="image-logo"
            class="w-full h-16"
          />
  `;
};
// Temporary Coordinates for maping area of image
const ceoCoords = [{ x: [76, 250], y: [168, 239] }];
const seCoords = [{ x: [212, 470], y: [106, 148] }];
const financeCoords = [{ x: [182, 450], y: [288, 340] }];
const devCoords = [{ x: [424, 586], y: [150, 276] }];

const toggleZIndex = (elem, elem2, value = false) => {
  let zIndex = "-1";
  let display = "none";
  if (value) {
    zIndex = "1";
  }

  if (value) {
    display = "block";
  }
  if (elem.style.zIndex !== zIndex) {
    elem.style.zIndex = zIndex;
    elem2.style.display = "block";
  }
  if (elem2.style.display !== display) {
    elem2.style.display = display;
  }
};

const perimeterMouseover = event => {
  const { offsetX, offsetY } = event;
  const base = { offsetX, offsetY };

  const ceoRoom = document.getElementById("ceoRoom");
  const seRoom = document.getElementById("seRoom");
  const financeRoom = document.getElementById("financeRoom");
  const devRoom = document.getElementById("devRoom");

  const ceoMessage = document.querySelector(".side-ceo");
  const softMessage = document.querySelector(".side-softeng");
  const financeMessage = document.querySelector(".side-finance");
  const devopsMessage = document.querySelector(".side-devops");

  if (isWithin(base, ceoCoords)) {
    toggleZIndex(ceoRoom, ceoMessage, true);
    return;
  } else {
    toggleZIndex(ceoRoom, ceoMessage, false);
  }

  if (isWithin(base, seCoords)) {
    toggleZIndex(seRoom, softMessage, true);
    return;
  } else {
    toggleZIndex(seRoom, softMessage, false);
  }

  if (isWithin(base, financeCoords)) {
    toggleZIndex(financeRoom, financeMessage, true);
    return;
  } else {
    toggleZIndex(financeRoom, financeMessage, false);
  }

  if (isWithin(base, devCoords)) {
    toggleZIndex(devRoom, devopsMessage, true);
    return;
  } else {
    toggleZIndex(devRoom, devopsMessage, false);
  }

  return;
};

const isWithin = (event, coords) => {
  const { offsetX, offsetY } = event;
  if (typeof coords[0] === "number") {
    // [x1, x2, y1, y2]
    return (
      offsetX >= coords[0] &&
      offsetX <= coords[1] &&
      offsetY >= coords[2] &&
      offsetY <= coords[3]
    );
  }

  let within = false;
  for (let coord of coords) {
    const x = coord.x;
    const y = coord.y;
    if (
      offsetX >= x[0] &&
      offsetX <= x[1] &&
      offsetY >= y[0] &&
      offsetY <= y[1]
    ) {
      within = true;
      break;
    }
  }

  return within;
};

const showTickToCompletedRoomQuiz = () => {
  const elemSoft = document.querySelector(".confirm-completion-softeng");
  const elemFinance = document.querySelector(".confirm-completion-finance");
  const elemDevops = document.querySelector(".confirm-completion-devops");
  if (devopsQuiz) {
    elemDevops.style.display = "block";
  }

  if (softEngQuiz) {
    elemSoft.style.display = "block";
  }
  if (financeQuiz) {
    elemFinance.style.display = "block";
  }
};
// devops screen templates and handler
let devopsQuestionNo = 1;
const devOpsScreenHandler = () => {
  if (devopsQuiz) return;
  valid = true;

  let question = questionare.DevOps[devopsQuestionNo - 1];
  // if (!question) location.reload();

  const temp = questionPopUpTemps(question, devopsQuestionNo);

  const container = document.querySelector("#main-content");

  container.innerHTML = "";
  mainHeading.innerHTML = "Dev Ops";
  container.insertAdjacentHTML("afterbegin", temp);
  addingStrikes();
  progressBar();
  showRemainingAttemps();
  const quizShow = document.querySelector(".quiz__container");
  setTimeout(() => {
    quizShow.style.opacity = ".9";
    quizShow.style.zIndex = "1";
  }, 500);
  const options = document.querySelectorAll(".quiz__options");

  options.forEach(el => {
    el.addEventListener("click", () => {
      defaultOptions(options);

      if (question.answer === el.dataset.id) {
        correctWrongChecker(el, true);
        devopsResult.atemps.push(question);
        devopsResult.state.push("correct");
        devopsQuestionNo = devopsQuestionNo + 1;
        totalSeconds = 30;

        if (devopsQuestionNo > questionare.DevOps.length) {
          devopsQuiz = true;
          setTimeout(() => {
            screenShow(2);
          }, 500);
          return;
        }
        setTimeout(() => {
          devOpsScreenHandler();
        }, 500);
      } else {
        correctWrongChecker(el, false);

        if (devopsQuestionNo > questionare.DevOps.length) {
          devopsQuiz = true;
          setTimeout(() => {
            screenShow(2);
          }, 500);
          return;
        }
      }
    });
  });
};

// software Engineer screen templates and handler
let softEngQuestionNo = 1;
const softEngScreenHandler = () => {
  if (softEngQuiz) return;
  valid = true;
  let question = questionare.softEngineering[softEngQuestionNo - 1];
  const temp = questionPopUpTemps(question, softEngQuestionNo);

  const container = document.querySelector("#main-content");
  container.innerHTML = "";
  mainHeading.innerHTML = "Software Engineering";
  container.insertAdjacentHTML("afterbegin", temp);
  addingStrikes();
  progressBar();
  showRemainingAttemps();
  const quizShow = document.querySelector(".quiz__container");
  setTimeout(() => {
    quizShow.style.opacity = ".9";
    quizShow.style.zIndex = "1";
  }, 500);

  const options = document.querySelectorAll(".quiz__options");

  options.forEach(el => {
    el.addEventListener("click", () => {
      defaultOptions(options);

      if (question.answer === el.dataset.id) {
        correctWrongChecker(el, true);
        softEngResult.atemps.push(question);
        softEngResult.state.push("correct");
        softEngQuestionNo = softEngQuestionNo + 1;
        totalSeconds = 30;

        if (softEngQuestionNo > questionare.softEngineering.length) {
          softEngQuiz = true;
          setTimeout(() => {
            screenShow(2);
          }, 500);
          return;
        }
        setTimeout(() => {
          softEngScreenHandler();
        }, 500);
      } else {
        correctWrongChecker(el, false);

        if (softEngQuestionNo > questionare.softEngineering.length) {
          softEngQuiz = true;
          setTimeout(() => {
            screenShow(2);
          }, 500);
          return;
        }
        return;
      }
    });
  });
};

// finance screen templates and handler
let financeQuestionNo = 1;
const financeScreenHandler = () => {
  // generating templates
  if (financeQuiz) return;
  valid = true;
  let question = questionare.finance[financeQuestionNo - 1];
  const temp = questionPopUpTemps(question, financeQuestionNo);
  // adding templates to container
  const container = document.querySelector("#main-content");
  container.innerHTML = "";
  mainHeading.innerHTML = "Finance Team";
  container.insertAdjacentHTML("afterbegin", temp);
  addingStrikes();
  progressBar();
  showRemainingAttemps();
  const quizShow = document.querySelector(".quiz__container");
  setTimeout(() => {
    quizShow.style.opacity = ".9";
    quizShow.style.zIndex = "1";
  }, 500);

  const options = document.querySelectorAll(".quiz__options");
  options.forEach(el => {
    el.addEventListener("click", () => {
      if (question.answer === el.dataset.id) {
        financeResult.atemps.push(question);
        financeResult.state.push("correct");
        financeQuiz = true;
        totalSeconds = 30;
        defaultOptions(options);
        correctWrongChecker(el, true);
        setTimeout(() => {
          screenShow(2);
        }, 500);
      } else {
        correctWrongChecker(el, false);
      }
    });
  });
};

// ceo screen handler and templates
let questionNo = 0;
const questionAnswerReport = questions => {
  return questions.map((el, i) => {
    questionNo = questionNo + 1;
    return `
      <div class=" block mb-5">
      <b class="text-xl">Question No ${questionNo}</b>
      <span class="block typing-slider">
        <h4 class="text-xl">
          ${el.question}
        </h4>
        <b class="green-light">${el.answer}</b>
      </span>
    </div>
      `;
  });
};

const ceoScreenTemp = (data, heading, option) => {
  return `
<div class="ceo-container w-full flex items-center justify-center flex-1" >
  <img src="./assests/images/rooms/ceo.png" alt="ceo-room-image" class="mt-8 ${
    option === 1 ? "room-image" : ""
  }"/>
</div>

<div class="absolute top-2/4 -translate-y-2/4	 -translate-x-2/4		left-2/4	 w-full  flex justify-center items-center popup-container ceoroom-popup-container opacity-90">
  <div class="w-4/5 m-r-auto -mt-10 border rounded-lg popUp opacity-100 slide-bottom p-8">
    <div class="feasibility-report">
      <h2 class="text-3xl font-bold text-center green-light mb-6">
        Feasibility Report
      </h2>
    </div>
    <div class="">
    <span class="absolute bg-green-light  top-3 right-2 lg:-top-3 lg:-right-2 px-2 py-1 font-bold text-2xl rounded-lg font-normal z-30" >${currPopupMsg}/3</span >
    <h2 class="text-3xl mb-3 font-bold text-center">${heading}</h2>
    ${questionAnswerReport(data).join("")}
    </div>

    <div class="btn-container-2 w-1/2 m-auto mt-4">
        <button class="next-btn">Next</button>
    </div>

  </div>
</div>
  `;
};
const goToNextStep = () => {
  const btn = document.querySelector(".next-btn");
  btn.addEventListener("click", () => {
    currPopupMsg = currPopupMsg + 1;
    ceoScreenHandler();
  });
};

let currPopupMsg = 1;
const ceoScreenHandler = () => {
  // generating templates
  if (devopsQuiz && softEngQuiz && financeQuiz) {
    if (currPopupMsg === 1) {
      const temp = ceoScreenTemp(questionare.DevOps, "DevOps", 1);
      const container = document.querySelector("#main-content");
      container.innerHTML = "";
      container.insertAdjacentHTML("afterbegin", temp);
      goToNextStep();
      return;
    } else if (currPopupMsg === 2) {
      const temp = ceoScreenTemp(
        questionare.softEngineering,
        "Software Engineer"
      );
      const container = document.querySelector("#main-content");
      container.innerHTML = "";
      container.insertAdjacentHTML("afterbegin", temp);
      goToNextStep();
      return;
    } else if (currPopupMsg === 3) {
      const temp = ceoScreenTemp(questionare.finance, "Finance");
      const container = document.querySelector("#main-content");
      container.innerHTML = "";
      container.insertAdjacentHTML("afterbegin", temp);
      goToNextStep();
      // setTimeout(() => {
      //   currPopupMsg = 4;
      //   ceoScreenHandler();
      // }, 3000);
    } else {
      const html = `
      <div class="ceo-container w-full flex items-center justify-center flex-1" >
        <img src="./assests/images/rooms/ceo.png" alt="ceo-room-image" class="mt-8"/>
      </div>
      `;
      const container = document.querySelector("#main-content");
      container.innerHTML = "";
      container.insertAdjacentHTML("afterbegin", html);
      popUpOffical("Flag", "THM{AWS_CLOUD__00100}");
      return;
    }
  } else {
    popUpOffical(
      "Warning",
      "Please visit the other departments and visit the CEO once this has been completed."
    );
  }
};

// main handler for all modules
function modulesHandler() {
  if (screen === 1) firstScreenHandler();
  else if (screen === 2) secondScreenHandler();
  else if (screen === 3) ceoScreenHandler();
  else if (screen === 4) devOpsScreenHandler();
  else if (screen === 5) softEngScreenHandler();
  else if (screen === 6) financeScreenHandler();
  else return;
}

modulesHandler();
