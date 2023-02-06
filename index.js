const wrapper = document.querySelector(".wrapper");
const mainHeading = document.querySelector(".heading-main");
const allCases = document.querySelectorAll("#cases");

// global
let devopsQuiz = false;
let softEngQuiz = false;
let financeQuiz = false;

let devopsResult = { atemps: [], state: [] };
let softEngResult = { atemps: [], state: [] };
let financeResult = { atemps: [], state: [] };

const finalResult = { devopsResult, softEngResult, financeResult };

// screens utilties
let screen = 1;

const screenShow = (num) => {
  screen = num;
  modulesHandler();
};
const showRooms = (value) => {
  if (value === 3) screenShow(3);
  else if (value === 4) screenShow(4);
  else if (value === 5) screenShow(5);
  else if (value === 6) screenShow(6);
};
const allCasesFn = (caseNo) => {
  if (caseNo === 0) allCases.forEach((el) => (el.style.opacity = ".8"));
};
const popUpOffical = (heading, message) => {
  const body = document.querySelector(".body");
  const popupTemp = `
<div class="fixed top-0 left-0 w-full   min-h-screen z-10 flex justify-center items-center popup-container">
    <div class="w-2/5 m-r-auto -mt-10  border rounded-lg popUp opacity-100 slide-bottom">
        <div class="flex items-center justify-between py-3 px-5  border-b">
            <h2 class="text-2xl font-bold">${heading}</h2>
            <i class="fa-solid fa-xmark cursor-pointer text-2xl opacity-60 hover:opacity-100 popup-close"></i>
        </div>
        <div class="flex items-center flex-col justify-center">
            <p class="px-5 py-4 font-bold">${message}</p>
        </div>
    </div>
</div>
    `;
  wrapper.style.opacity = ".8";
  body.insertAdjacentHTML("afterbegin", popupTemp);

  const popContainer = document.querySelector(".popup-container");
  const closeBtn = document.querySelector(".popup-close");

  popContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("popup-container")) {
      wrapper.style.opacity = "1";
      popContainer.remove();
    }
  });
  closeBtn.addEventListener("click", (e) => {
    wrapper.style.opacity = "1";
    popContainer.remove();
  });
};
const questionare = {
  DevOps: [
    {
      stage: 1,
      question:
        "The website will be accessible from all over the world - Shall we deploy all the infrastructure on our premises or go for cloud services?",
      prompts: ["On-Premises", "Cloud"],
      answer: "Cloud",
      image: "dev",
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
    },
  ],
  softEngineering: [
    {
      stage: false,
      question:
        "The software engineering team mentioned that the complete team is housed in   California (USA). Therefore they need a high-availability server in that region. In case AWS is selected as a cloud service provider, what would be the naming  convention for that region?",
      prompts: ["af", "eu", "us"],
      answer: "us",
      image: "softEng",
    },
    {
      stage: false,
      question:
        "Which of the following service will be used to route traffic based on users’ geolocation?",
      prompts: ["EC2", "Route 53", "RDS"],
      answer: "Route 53",
      image: "softEng",
    },
    {
      stage: false,
      question:
        "In line with Jeff Bezos's model at Amazon, each developer of our software team will expose the data to other members through a service interface called?",
      prompts: ["USB", "API", "Email"],
      answer: "API",
      image: "softEng",
    },
  ],
  finance: [
    {
      stage: false,
      question:
        "The payment will be made to cloud service providers on a pay-as-you-go model, and the infrastructure will be expanded per the needs. Which of the following expense is optimally used in this case?",
      prompts: ["Operational", "Optional"],
      answer: "Optional",
      image: "finance",
    },
  ],
};
const showQuizQuestion = (arr) => {
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
const questionPopUpTemps = (obj) => {
  // if (!obj?.image) return;
  return `
<div class="absolute top-2 left-2 btn-container-2 w-32 z-10 ">

  <button onclick="screenShow(2)" class="w-9 flex gap-2 items-center justify-center">
    <i class="fa-solid fa-chevron-left"></i> <b>Home</b>
  </button>
</div>
<div class='room-back-image'>
<img src="./assests/images/rooms/${obj?.image}.png"/>
</div>

<div class="flex-1 absolute top-0 left-0 w-full h-full flex items-center justify-center mt-2">

  <div class="m-auto rounded-lg slide-bottom quiz__container opacity-0 -z-10">
  ${
    obj?.stage
      ? `<span class="absolute bg-green-light -top-3 -right-2 px-2 py-1 rounded-lg font-normal z-30" >Stage : <b> ${obj.stage}</b></span >`
      : ""
  }
    <div class="quiz">
      <div class="quiz__question">
        <h5 class="font-heading">${obj.question}</h5>
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
const progressBar = () => {
  const percentage =
    finalResult.devopsResult.atemps.length +
    finalResult.financeResult.atemps.length +
    finalResult.softEngResult.atemps.length;

  if (document.querySelector(".custom-progress-bar")) {
    document.querySelector(".custom-progress-bar").remove();
  }
  console.log(percentage);
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
    .querySelector(".special-section")
    .insertAdjacentHTML("afterbegin", html);
  document.querySelector(".progress-container").style.width = `${(
    (percentage / 6) *
    100
  ).toFixed(2)}%`;
};

// first screen templates and handler
const firstScreenTemp = () => {
  return `
    <div class="w-5/6 m-auto  h-full flex flex-col flex-1 pt-12">
    <h2 class="font-heading green-light">Instructions</h2>
    <ul class="mt-4 px-8 list-disc">
        <li class="mb-3 leading-6">You have been tasked to develop a social media interaction website
            where users can communicate with each other (More or fewer features of Twitter and
            Facebook. You are tasked to get input from all the teams, prepare a feasibility report,
            and present it to the CEO. You will visit each department and will be asking certain
            questions.
        </li>
        <li>
            We can show the questions as popups to the user and the user will select one of the correct
            answers
        </li>

    </ul>
    <div class="btn-container mt-8">
        <button>Start</button>
    </div>
</div>
    `;
};

const firstScreenHandler = () => {
  // generating templates
  const temp = firstScreenTemp();
  allCasesFn(0);

  // adding templates to container
  const container = document.querySelector("#main-content");
  container.insertAdjacentHTML("afterbegin", temp);

  // adding listener to Start button
  const btn = document.querySelector(".btn-container");
  btn.addEventListener("click", (e) => {
    screenShow(2);
    popUpOffical(
      "Introduction",
      "In this level, Solved all the questions, to open CEO Office."
    );
  });
};

// Second screen templates and handler
const secondScreenTemp = () => {
  return `
<div class="absolute top-2/4 left-2/4 -translate-x-1/2 -translate-y-1/2 w-full overflow-auto">
    <div class="main-image-container" 
      onmousemove="perimeterMouseover(event)">
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
  progressBar();

  const rooms = document.querySelectorAll(".overlay-image");
  rooms.forEach((element, i) =>
    element.addEventListener("click", () => showRooms(i + 3))
  );
  const logContainer = document.querySelector(".image-container");
  logContainer.innerHTML = `
          <img
            src="https://assets.tryhackme.com/img/logo/tryhackme_logo_full.svg"
            alt="image-logo"
            class="w-full h-16"
          />
  `;
};

// devops screen templates and handler
let devopsQuestionNo = 1;
const devOpsScreenHandler = () => {
  if (devopsQuiz) return;
  let question = questionare.DevOps[devopsQuestionNo - 1];
  const temp = questionPopUpTemps(question);

  const container = document.querySelector("#main-content");

  container.innerHTML = "";
  mainHeading.innerHTML = "Dev Ops";
  container.insertAdjacentHTML("afterbegin", temp);
  progressBar();

  const quizShow = document.querySelector(".quiz__container");
  setTimeout(() => {
    quizShow.style.opacity = "1";
    quizShow.style.zIndex = "1";
  }, 500);
  const options = document.querySelectorAll(".quiz__options");
  options.forEach((el) => {
    el.addEventListener("click", () => {
      if (question.answer === el.dataset.id) {
        devopsResult.atemps.push(question);
        devopsResult.state.push("correct");
        devopsQuestionNo = devopsQuestionNo + 1;

        if (devopsQuestionNo > questionare.DevOps.length) {
          devopsQuiz = true;
          screenShow(2);
          return;
        }
        devOpsScreenHandler();
      } else {
        devopsResult.atemps.push(question);
        devopsResult.state.push("wrong");
        devopsQuestionNo = devopsQuestionNo + 1;

        if (devopsQuestionNo > questionare.DevOps.length) {
          devopsQuiz = true;
          screenShow(2);
          return;
        }
        devOpsScreenHandler();
      }
    });
  });
};

// software Engineer screen templates and handler
let softEngQuestionNo = 1;
const softEngScreenHandler = () => {
  if (softEngQuiz) return;
  let question = questionare.softEngineering[softEngQuestionNo - 1];
  const temp = questionPopUpTemps(question);

  const container = document.querySelector("#main-content");
  container.innerHTML = "";
  mainHeading.innerHTML = "Software Engineering";
  container.insertAdjacentHTML("afterbegin", temp);
  progressBar();

  const quizShow = document.querySelector(".quiz__container");
  setTimeout(() => {
    quizShow.style.opacity = "1";
    quizShow.style.zIndex = "1";
  }, 500);

  const options = document.querySelectorAll(".quiz__options");

  options.forEach((el) => {
    el.addEventListener("click", () => {
      if (question.answer === el.dataset.id) {
        softEngResult.atemps.push(question);
        softEngResult.state.push("correct");
        softEngQuestionNo = softEngQuestionNo + 1;

        if (softEngQuestionNo > questionare.softEngineering.length) {
          softEngQuiz = true;
          screenShow(2);
          return;
        }
        softEngScreenHandler();
      } else {
        softEngResult.atemps.push(question);
        softEngResult.state.push("wrong");
        softEngQuestionNo = softEngQuestionNo + 1;

        if (softEngQuestionNo > questionare.softEngineering.length) {
          softEngQuiz = true;
          screenShow(2);
          return;
        }
        softEngScreenHandler();
      }
    });
  });
};

// finance screen templates and handler
let financeQuestionNo = 1;
const financeScreenHandler = () => {
  // generating templates
  if (financeQuiz) return;
  let question = questionare.finance[financeQuestionNo - 1];
  const temp = questionPopUpTemps(question, "Finance");
  // adding templates to container
  const container = document.querySelector("#main-content");
  container.innerHTML = "";
  mainHeading.innerHTML = "Finance Team";
  container.insertAdjacentHTML("afterbegin", temp);
  progressBar();

  const quizShow = document.querySelector(".quiz__container");
  setTimeout(() => {
    quizShow.style.opacity = "1";
    quizShow.style.zIndex = "1";
  }, 500);

  const options = document.querySelectorAll(".quiz__options");
  options.forEach((el) => {
    el.addEventListener("click", () => {
      if (question.answer === el.dataset.id) {
        financeResult.atemps.push(question);
        financeResult.state.push("correct");
        financeQuiz = true;
        screenShow(2);
      } else {
        financeResult.atemps.push(question);
        financeResult.state.push("wrong");
        financeQuestionNo = financeQuestionNo + 1;
        financeQuiz = true;
        screenShow(2);
      }
    });
  });
};
const ceoCoords = [{ x: [76, 250], y: [168, 239] }];
const seCoords = [{ x: [212, 470], y: [106, 148] }];
const financeCoords = [{ x: [182, 450], y: [288, 340] }];
const devCoords = [{ x: [424, 586], y: [150, 276] }];

const toggleZIndex = (elem, value = false) => {
  let zIndex = "-1";
  if (value) {
    zIndex = "1";
  }
  if (elem.style.zIndex !== zIndex) {
    elem.style.zIndex = zIndex;
  }
};

const perimeterMouseover = (event) => {
  const { offsetX, offsetY } = event;
  const base = { offsetX, offsetY };

  const ceoRoom = document.getElementById("ceoRoom");
  const seRoom = document.getElementById("seRoom");
  const financeRoom = document.getElementById("financeRoom");
  const devRoom = document.getElementById("devRoom");

  if (isWithin(base, ceoCoords)) {
    toggleZIndex(ceoRoom, true);
    return;
  } else {
    toggleZIndex(ceoRoom, false);
  }

  if (isWithin(base, seCoords)) {
    toggleZIndex(seRoom, true);
    return;
  } else {
    toggleZIndex(seRoom, false);
  }

  if (isWithin(base, financeCoords)) {
    toggleZIndex(financeRoom, true);
    return;
  } else {
    toggleZIndex(financeRoom, false);
  }

  if (isWithin(base, devCoords)) {
    toggleZIndex(devRoom, true);
    return;
  } else {
    toggleZIndex(devRoom, false);
  }

  return;

  /* if (isWithin(base, coordinates.ceo)) {
    console.log("Area visbale position Ceo");
    showImage(0);
    // popUpOffical(
    //   "Warning",
    //   "The CEO room is closed. First complete the questionare."
    // );
  }

  if (isWithin(base, coordinates.softEng)) {
    // screenShow(4);
    showImage(3);
    console.log("Area visbale position SoftEng");
  }
  if (isWithin(base, coordinates.finance)) {
    // screenShow(5);
    showImage(2);
    console.log("Area visbale position finance");
  }
  if (isWithin(base, coordinates.dev)) {
    // screenShow(3);
    showImage(1);
    console.log("Area visbale position dev");
  } */
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

// ceo screen handler and templates

const ceoScreenTemp = () => {
  console.log(finalResult);
  return "<h1>ceo room opend<h1/>";
};
const ceoScreenHandler = () => {
  // generating templates
  if (devopsQuiz && softEngQuiz && financeQuiz) {
    const temp = ceoScreenTemp();
    const container = document.querySelector("#main-content");
    container.innerHTML = "";
    container.insertAdjacentHTML("afterbegin", temp);
  } else {
    popUpOffical(
      "Warning",
      "The CEO room is closed. First complete the questionare."
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

// mockup for second screen
// const secondScreenTemp = () => {
//   return `
//   <div class="absolute top-2/4 left-2/4 -translate-x-1/2 -translate-y-1/2 w-full" >
//     <div class="w-1/2 grid grid-cols-2 m-auto bg-red-500">

//       <div  class="w-full flex items-center flex-col justify-center relative">
//         <img id="room-ceo" class="rooms bg-green-500" src="./assests/aws-imgs/use/ceo-2.jpeg" />
//       </div>

//       <div  class="w-full flex flex-col items-center justify-center relative">
//         <img class="rooms" id="room-softengineer" src="./assests/aws-imgs/use/softEng.jpeg" />
//       </div>

//       <div  class="w-full flex flex-col items-center justify-center relative">
//         <img class="rooms" id="room-finance" src="./assests/aws-imgs/use/finance.jpeg" />
//       </div>

//       <div  class="w-full flex items-center justify-center flex-col relative">
//         <img class="rooms" id="room-devops" src="./assests/aws-imgs/use/dev.jpeg" />
//       </div>

//     </div>

//     <div class="w-1/2 mr-auto ml-auto mt-4">
//       <div class="w-full bg-gray-200 rounded-full dark:bg-gray-700">
//         <div class="text-xs font-medium progress-container text-center p-0.5 leading-none rounded-full" style="width: 45%">
//           45%
//         </div>
//       </div>
//     </div>
// </div>
//   `;
// };
