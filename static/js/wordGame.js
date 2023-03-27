
const options = {
  Ābols: "Sarkans vai zaļš auglis, aug koku zaros!",
  Ceļš: "Vieta, kur brauc mašīnas!",
  Debesis: "Skatoties augšup, lielas un zilas!",
  Sēnes: "Mežā, rudenī aug zem kokiem paslēpušies!",
  Skola: "Vieta, kur bērni mācās lasīt, rakstīt, skaitīt!",

};

//Initial References
const message = document.getElementById("message");
const hintRef = document.querySelector(".hint-ref");
const controls = document.querySelector(".controls-container");
const wrapper = document.querySelector(".wrapper")
const startBtn = document.getElementById("start");
const letterContainer = document.getElementById("letter-container");
const userInpSection = document.getElementById("user-input-section");
const resultText = document.getElementById("result");
const word = document.getElementById("word");
const words = Object.keys(options);
let randomWord = "",
  randomHint = "";
let winCount = 0,
  lossCount = 0;

//Generate random value
const generateRandomValue = (array) => Math.floor(Math.random() * array.length);

//Block all the buttons
const blocker = () => {
  let lettersButtons = document.querySelectorAll(".letters");
  stopGame();
};

//Start Game
startBtn.addEventListener("click", () => {
  controls.classList.add("hide");
  wrapper.style.visibility = "visible"
  controls.style.visibility = 'visible'
  letterContainer.style.visibility = 'visible'
  hintRef.style.visibility = 'visible'
  userInpSection.style.visibility = 'visible'
  message.style.visibility = 'visible'
  init();
});

//Stop Game
const stopGame = () => {
  controls.classList.remove("hide");
  // wrapper.style.visibility = "hidden"
};

//Generate Word Function
const generateWord = () => {
  letterContainer.classList.remove("hide");
  userInpSection.innerText = "";
  randomWord = words[generateRandomValue(words)];
  randomHint = options[randomWord];
  hintRef.innerHTML = `<div id="wordHint">
  <span>Padoms: </span>${randomHint}</div>`;
  let displayItem = "";
  randomWord.split("").forEach((value) => {
    displayItem += '<span class="inputSpace">_ </span>';
  });

  //Display each element as span
  userInpSection.innerHTML = displayItem;
  userInpSection.innerHTML += `<div id='chanceCount'>Atlikušie Mēģinājumi: ${lossCount}</div>`;
};

//Initial Function
const init = () => {
  winCount = 0;
  lossCount = 5;
  randomWord = "";
  word.innerText = "";
  randomHint = "";
  message.innerText = "";
  userInpSection.innerHTML = "";
  letterContainer.classList.add("hide");
  letterContainer.innerHTML = "";

  generateWord();

  //For creating letter buttons
  for (let i = 0; i < 33; i++) {
    let button = document.createElement("button");
    button.classList.add("letters");

    let abc = ['A','Ā','B','C','Č','D','E','Ē','F','G','Ģ','H','I','Ī','J','K','Ķ','L','Ļ','M','N','Ņ','O','P','R','S','Š','T','U','Ū','V','Z','Ž']
    //Number to ASCII[A-Z]
    button.innerText = abc[i];

    //Character button onclick
    button.addEventListener("click", () => {
      message.innerText = `Pareizais Burts!`;
      message.style.color = "#008000";
      let charArray = randomWord.toUpperCase().split("");
      let inputSpace = document.getElementsByClassName("inputSpace");

      //If array contains clicked value replace the matched Dash with Letter
      if (charArray.includes(button.innerText)) {
        charArray.forEach((char, index) => {
          //If character in array is same as clicked button
          if (char === button.innerText) {
            button.classList.add("correct");
            //Replace dash with letter
            inputSpace[index].innerText = char;
            //increment counter
            winCount += 1;
            //If winCount equals word length
            if (winCount == charArray.length) {
              letterContainer.style.visibility = 'hidden'
              hintRef.style.visibility = 'hidden'
              userInpSection.style.visibility = 'hidden'
              message.style.visibility = 'hidden'
              resultText.innerHTML = "Tu Uzvarēji!";
              startBtn.innerText = "Vēlreiz";
              //block all buttons
              blocker();
            }
          }
        });
      } else {
        //lose count
        button.classList.add("incorrect");
        lossCount -= 1;
        document.getElementById(
          "chanceCount"
        ).innerText = `Atlikušie gājieni: ${lossCount}`;
        message.innerText = `Nepareizs Burts`;
        message.style.color = "#ff0000";
        if (lossCount == 0) {
          letterContainer.style.visibility = 'hidden'
          hintRef.style.visibility = 'hidden'
          userInpSection.style.visibility = 'hidden'
          message.style.visibility = 'hidden'
          word.innerHTML = `Atbilde ir: <span>${randomWord}</span>`;
          resultText.innerHTML = "Spēle Beigusies."; 
          blocker();
        }
      }

      //Disable clicked buttons
      button.disabled = true;
    });

    //Append generated buttons to the letters container
    letterContainer.appendChild(button);
  }
};

window.onload = () => {
  init();
};