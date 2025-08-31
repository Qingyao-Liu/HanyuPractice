const nextButton = document.getElementById("next-btn");
const answerButtons = document.getElementById("answer-btns");
const scoreMessage = document.getElementById("score");

let vocabularyData = [];
let score = 0;
let highScore = 0;
export var continueGame = true;


// Starts a new game
export function startNewGame(inData){
    vocabularyData = inData;
    score = 0;
    document.getElementById("score").style.display = "block";
    scoreMessage.innerHTML = "Score: " + score;
    nextButton.style.display = "none";
    nextButton.innerHTML = "Next";
    continueGame = true;
    generateQuestion();
}


// Generates a new question.
export function generateQuestion(){
    // Remove previous answer buttons, and pick four new options, one of which is the answer
    resetState();
    let numbers = generateFourRandomUniqueIndices();
    let trueAnswerIndex = Math.floor(Math.random() * 3);
    let questionType = Math.floor(Math.random() * 6);

    displayQuestion(questionType, numbers[trueAnswerIndex]);

    // Add a button and its properties for each random answer selected
    numbers.forEach((answer, index) => {
        const button = document.createElement("button");
        displayAnswerOptions(button, questionType, answer);
        button.classList.add("btn");
        answerButtons.appendChild(button);

        if (index === trueAnswerIndex){
            button.dataset.correct = "true";
        }
        else {
            button.dataset.correct = "false";
        }

        button.addEventListener("click", optionSelected);
    })
}


// Helper function for generateQuestion, displays what question it currently be based on inputs
function displayQuestion(questionType, index){
    let questionMessage;

    switch (questionType){
        // Hanzi to Pinyin
        case 0:
            questionMessage = `The pinyin of ${vocabularyData[index].hanzi} is:`;
            break;
        // Hanzi to English Translation
        case 1:
            questionMessage = `The english translation of ${vocabularyData[index].hanzi} is:`
            break;
        // Pinyin to Hanzi
        case 2:
            questionMessage = `${vocabularyData[index].pinyin} is the pinyin of which Chinese character:`
            break;
        // Pinyin to English Translation
        case 3:
            questionMessage = `${vocabularyData[index].pinyin} is the pinyin of a Chinese character, which in English is:`
            break;
        // English Translation to Hanzi
        case 4:
            questionMessage = `${vocabularyData[index].translation} is most accurately written as:`;
            break;
        // English Translation to Pinyin
        case 5:
            questionMessage = `The pinyin of the Chinese word for ${vocabularyData[index].translation} is:`;
            break;
    }

    document.getElementById("question").innerHTML = questionMessage;
}


// Helper function for generateQuestion, displays the text on the answer options
function displayAnswerOptions(button, questionType, index){
    let answerOptionMessage;

    switch (questionType){
        // Display Hanzi
        case 2:
        case 4:
            answerOptionMessage = vocabularyData[index].hanzi;
            break;
        // Display Pinyin
        case 0:
        case 5:
            answerOptionMessage = vocabularyData[index].pinyin;
            break;
        // Display English Translation
        case 1:
        case 3:
            answerOptionMessage = vocabularyData[index].translation;
    }

    button.innerHTML = answerOptionMessage;
}


// Once a button is selected...
function optionSelected(e){
    const selectedButton = e.target;

    // Determines if the pressed button is "correct" or "incorrect" and adds that as a corresponding class to the button
    if (selectedButton.dataset.correct === "true"){
        selectedButton.classList.add("correct");
        // Update score message
        score++;
        scoreMessage.innerHTML = "Score: " + score;
    }
    else {
        selectedButton.classList.add("incorrect");
        // Update high score, display high score message and ask if the user wants to restart
        if (score > highScore){
            highScore = score;
        }
        scoreMessage.innerHTML = "High Score: " + highScore;
        continueGame = false;
        nextButton.innerHTML = "Restart?";
    }

    // Highlights the correct answer and user answer based on their classes, blocks pressing any other button
    Array.from(answerButtons.children).forEach((button) => {
       if (button.dataset.correct === "true"){
           button.classList.add("correct");
       }
       button.disabled = true;
    });
    nextButton.style.display = "block";
}


// Removes all answer buttons and hide the "next" button
function resetState(){
    nextButton.style.display = "none";

    while (answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}


// Returns four different numbers from range [0, x), where x is the length of the data from the parsed file
function generateFourRandomUniqueIndices(){
    const numbers = new Set();

    while (numbers.size < 4){
        numbers.add(Math.floor(Math.random() * vocabularyData.length));
    }

    return Array.from(numbers);
}