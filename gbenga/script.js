let words = [
    {en: "watermelon", es: "la sandía"}, 
    {en: "peach", es: "el melocotón"},
    {en: "grapes", es: "las uvas"},
    {en: "apple", es: "la manzana"},
    {en: "orange", es: "la naranja"},
    {en: "cauliflower", es: "el cauliflor"},
    {en: "potato", es: "la patata"},
    {en: "pepper", es: "el pimiento"},
    {en: "sweetcorn", es: "la maíz"},
    {en: "carrot", es: "la zanahoria"}
]
const usedWords = [];
let numberOfQuestionsAsked = 0;
let correctSoFar = 0;
let currentWord = null;
let lastQuestionCorrect = false;

// Elements on the page
const character = document.getElementById('character');
const block = document.getElementById('block');
const timer = document.getElementById('timer');
const questionList = document.getElementById("questions-list");
const answerForm = document.getElementById("answer-form");
const resultDiv = document.querySelector('.result')

// Positions
const characterLeftPosition = "0px";
const characterRightPosition = "200px";
const blockStep = 10;

// Timer
const startingMinutes = 2;
let time = startingMinutes * 60;

// MAIN

const blockBottomPosition = block.offsetTop + block.offsetHeight;
const characterTopPosition = character.offsetTop;


getWord();
askAQuestion(currentWord);

answerForm.addEventListener("submit", function(e) {
    e.preventDefault();
    form = e.target;
    // const input = e.target.userAnswer.value

    lastQuestionCorrect = checkTheAnswer(form,currentWord);
    if (lastQuestionCorrect) {
        // input.classList.add('right');
        rightAnswer();
        getWord()
        askAQuestion(currentWord);
    } else {
        // input.classList.add('wrong');
        wrongAnswer();
    }
});

//   Finish line
if (blockBottomPosition > characterTopPosition ) {
    const finalScore = time 
    alert(`¡Qué bien! Puntos = ${finalScore}`)
}

// User input functions
function moveCharacterLeft() {
    character.style.left = characterLeftPosition;
}
function moveCharacterRight() {
    character.style.left = characterRightPosition;
}
function blockFall() {
    const current = block.offsetTop;
    const newOne = `${current + blockStep}px`;
    block.style.top = newOne;
}
function getWord() {
    if (words.length === 0) return { status: "words array is empty" };
    const word = words[Math.floor(Math.random() * words.length)];
    const wordIndex = words.findIndex((e) => e === word);
    delete words[wordIndex];
    words = words.filter((w) => w);
    usedWords.push(word);
    currentWord = word
    return word;
  }

function askAQuestion(word) {
    questionList.innerHTML = ""
    const questionHeader = document.createElement("h2");
    questionHeader.textContent = `¿Cómo se dice "${word.en}" en español?`;

    questionList.appendChild(questionHeader);
    numberOfQuestionsAsked++;
}
function checkTheAnswer(form,word) {

    const userAnswer = form.userAnswer.value;
    const correctAnswer = word.es;
    let result = null;

    if (userAnswer === correctAnswer) {
        result = true;
    } else {
        result = false;
    }
    return result;
}
function rightAnswer() {
    console.log("right");
    blockFall();
    if (numberOfQuestionsAsked % 2 == 0) {
        moveCharacterLeft();
    } else {
        moveCharacterRight();
    }
    form.userAnswer.value = ""
    correctSoFar++;
}
function wrongAnswer() {
    console.error("wrong");
    const wrongInput = document.createElement("p");
    wrongInput.innerText = "Wrong answer - try again"

    resultDiv.appendChild(wrongInput);
    // How to make this limit 1 so it doesnt print multiple times 
    // Also move it below the answer div
}

// Non-user input functions
setInterval(updateCountdown, 1000);
    
function updateCountdown() {
    const minutes = Math.floor(time/60);
    let seconds = time % 60;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    timer.innerHTML = `${minutes}:${seconds}`
    time--;
    time = time < 0 ? 0 : time; 
}