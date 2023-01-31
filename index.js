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
    },
  ],
  softEngineering: [
    {
      stage: false,
      question:
        "The software engineering team mentioned that the complete team is housed in   California (USA). Therefore they need a high-availability server in that region. In case AWS is selected as a cloud service provider, what would be the naming  convention for that region?",
      prompts: ["af", "eu", "us"],
      answer: "us",
    },
    {
      stage: false,
      question:
        "Which of the following service will be used to route traffic based on users’ geolocation?",
      prompts: ["EC2", "Route 53", "RDS"],
      answer: "Route 53",
    },
    {
      stage: false,
      question:
        "In line with Jeff Bezos's model at Amazon, each developer of our software team will expose the data to other members through a service interface called?",
      prompts: ["USB", "API", "Email"],
      answer: "API",
    },
  ],
  finance: [
    {
      stage: false,
      question:
        "The payment will be made to cloud service providers on a pay-as-you-go model, and the infrastructure will be expanded per the needs. Which of the following expense is optimally used in this case?",
      prompts: ["Operational", "Optional"],
      answer: "Optional",
    },
  ],
};
const questionPopUpTemps = (obj) => {
  return `
<div class="absolute top-2 left-2 btn-container-2 w-32 z-10">

  <button onclick="screenShow(2)" class="w-9 flex gap-2 items-center justify-center"><i class="fa-solid fa-chevron-left"></i> <b>Home</b></button>
</div>
<div class="flex-1 absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center">
  <div class="w-1/2 m-r-auto border rounded-lg popUp opacity-100 slide-bottom p-2 relative">
    ${
      obj?.stage
        ? `<span class="absolute bg-green-light -top-3 -right-2 px-2 py-1 rounded-lg font-normal" >Stage : <b> ${obj.stage}</b></span >`
        : ""
    }
    <div class="flex items-start gap-4 py-4 px-6 border-b">
      <p>Question:</p>
      <h2 class="text-xl">${obj.question}</h2>
    </div>
    <div
      class="grid grid-cols-1 gap-4 p-2 items-center justify-center"
    >
      ${obj.prompts
        .map((el) => {
          return `
      <div class="btn-container-2 options-quiz px-1  w-full" data-id="${el}">
        <button class="">${el}</button>
      </div>
      `;
        })
        .join("")}
    </div>
  </div>
</div>
    `;
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
      "In this level, Santas security is focused on the perimeter. Given that, we can expect that there may be complete trust within the compound."
    );
  });
};

// Second screen templates and handler
const secondScreenTemp = () => {
  return `
    <div class=" absolute top-2/4 left-2/4 -translate-x-1/2 -translate-y-1/2 w-full">
       <div class="w-1/2 grid grid-cols-2 gap-8  m-auto">
           <div id="room-ceo" class="rooms w-full h-20 flex items-center flex-col justify-center bg-black">
              <i class="fa-solid fa-${
                devopsQuiz && financeQuiz && softEngQuiz
                  ? "lock-open green-light"
                  : "lock red-light"
              } mb-2"></i>
              <h3>CEOs room</h3>
           </div>
           <div id="room-devops" class="rooms w-full h-20  flex items-center justify-center flex-col bg-black relative">
              ${
                devopsQuiz
                  ? `<i class="fa-sharp fa-solid fa-square-check absolute  top-0 right-0 rounded-lg font-normal checked-icons"></i>`
                  : ""
              }
              
              <i class="fa-solid  fa-${
                devopsQuiz ? "lock red-light" : "lock-open green-light"
              } mb-2"></i>
              <h3>DevOps Team</h3>
           </div>
           <div id="room-softengineer" class="rooms w-full h-20 flex flex-col items-center justify-center bg-black relative">
              ${
                softEngQuiz
                  ? `<i class="fa-sharp fa-solid fa-square-check absolute  top-0 right-0 rounded-lg font-normal checked-icons"></i>`
                  : ""
              }
              <i class="fa-solid  fa-${
                softEngQuiz ? "lock red-light" : "lock-open green-light"
              } mb-2"></i>
              <h3>Software Engineering Team</h3>
           </div>
           <div id="room-finance" class="rooms w-full h-20 flex flex-col items-center justify-center bg-black relative">
              ${
                financeQuiz
                  ? `<i class="fa-sharp fa-solid fa-square-check absolute  top-0 right-0 rounded-lg font-normal checked-icons"></i>`
                  : ""
              }
              <i class="fa-solid  fa-${
                financeQuiz ? "lock red-light" : "lock-open green-light"
              } mb-2"></i>
              <h3>Finance Team</h3>
           </div>
       </div>

      <div class="w-1/2 mr-auto ml-auto mt-4 ">
        <div class="w-full bg-gray-200 rounded-full dark:bg-gray-700">
              <div class=" text-xs font-medium progress-container text-center p-0.5 leading-none rounded-full" style="width: 45%"> 45%</div>
        </div>
      </div>
   
   </div>
`;
};

const showRooms = (e) => {
  if (e.target.id == "room-ceo")
    popUpOffical(
      "Room",
      "The CEO room is closed. First complete the questionare."
    );
  else if (e.target.id == "room-devops" && devopsQuiz === false) {
    screenShow(3);
  } else if (e.target.id == "room-softengineer" && softEngQuiz === false) {
    screenShow(4);
  } else if (e.target.id == "room-finance" && financeQuiz === false) {
    screenShow(5);
  }
};

const secondScreenHandler = () => {
  // generating templates
  const temp = secondScreenTemp();

  // adding templates to container
  const container = document.querySelector("#main-content");
  container.innerHTML = "";
  mainHeading.innerHTML = "AWS Cloud";
  container.insertAdjacentHTML("afterbegin", temp);

  const rooms = document.querySelectorAll(".rooms");
  rooms.forEach((element) => element.addEventListener("click", showRooms));
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
  let question = questionare.DevOps[devopsQuestionNo - 1];
  const temp = questionPopUpTemps(question);

  const container = document.querySelector("#main-content");
  container.innerHTML = "";
  mainHeading.innerHTML = "DevOps";
  container.insertAdjacentHTML("afterbegin", temp);

  const options = document.querySelectorAll(".options-quiz");
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
  let question = questionare.softEngineering[softEngQuestionNo - 1];
  const temp = questionPopUpTemps(question);

  const container = document.querySelector("#main-content");
  container.innerHTML = "";
  mainHeading.innerHTML = "Software Engineering";
  container.insertAdjacentHTML("afterbegin", temp);

  const options = document.querySelectorAll(".options-quiz");
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
  let question = questionare.finance[financeQuestionNo - 1];
  const temp = questionPopUpTemps(question, "Finance");
  // adding templates to container
  const container = document.querySelector("#main-content");
  container.innerHTML = "";
  mainHeading.innerHTML = "Finance";
  container.insertAdjacentHTML("afterbegin", temp);

  const options = document.querySelectorAll(".options-quiz");
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

// main handler for all modules
function modulesHandler() {
  if (screen === 1) firstScreenHandler();
  else if (screen === 2) secondScreenHandler();
  else if (screen === 3) devOpsScreenHandler();
  else if (screen === 4) softEngScreenHandler();
  else if (screen === 5) financeScreenHandler();
  else return;
}
modulesHandler();
