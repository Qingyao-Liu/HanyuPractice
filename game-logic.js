// TESTING
let sample1 = "八,bā,eight\n" +
    "爸爸,bàba,father\n" +
    "百,bǎi,hundred\n" +
    "杯,bēi,measure word for drinks\n" +
    "杯子,bēizi,cup/mug\n" +
    "本,běn,measure word for reading material\n" +
    "不,bù,not\n" +
    "菜,cài,cuisine\n" +
    "茶,chá,tea\n" +
    "茶杯,chábēi,tea cup\n" +
    "吃,chī,to eat";

let sample2 = "菜,cài,cuisine\n" +
    "茶,chá,tea\n" + "爸爸,bàba,father\n" +
    "吃,chī,to eat";
// TESTING

const nextButton = document.getElementById("next-btn");
const answerButtons = document.getElementById("answer-buttons");
const scoreMessage = document.getElementById("score");

let vocabularyData = [];
let score = 0;
let highScore = 0;
let continueGame = true;


// Take a string input and organizes the input
function organizeData(data){
    let lines = data.split("\n");

    lines.forEach(line => {
        line = line.split(",");

        vocabularyData.push({
            hanzi: line[0],
            pinyin: line[1],
            translation: line[2]
        });
    });
}


// Starts the game
function startNewGame(){
    score = 0;
    scoreMessage.innerHTML = "Score: " + score;
    nextButton.innerHTML = "Next";
    continueGame = true;
    generateQuestion();
}


function generateQuestion(){
    // Remove previous answer buttons, and pick four new options as well as the true answer
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
        // Hanzi - Pinyin
        case 0:
            questionMessage = `The pinyin of ${vocabularyData[index].hanzi} is:`;
            break;
        // Hanzi - English Translation
        case 1:
            questionMessage = `The english translation of ${vocabularyData[index].hanzi} is:`
            break;
        // Pinyin - Hanzi
        case 2:
            questionMessage = `${vocabularyData[index].pinyin} is the pinyin of which Chinese character:`
            break;
        // Pinyin - English Translation
        case 3:
            questionMessage = `${vocabularyData[index].pinyin} is the pinyin of a Chinese character, which in English is:`
            break;
        // English Translation - Hanzi
        case 4:
            questionMessage = `${vocabularyData[index].translation} is most accurately written as:`;
            break;
        // English Translation - Pinyin
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


function optionSelected(event){
    const selectedButton = event.target;

    // Determines if the pressed button is "correct" or "incorrect" and adds that as a corresponding class to the button
    if (selectedButton.dataset.correct === "true"){
        selectedButton.classList.add("correct");
        // Update score message
        score++;
        scoreMessage.innerHTML = "Score: " + score;
    }
    else {
        selectedButton.classList.add("incorrect");
        // Update high score, display high score message
        if (score > highScore){
            highScore = score;
        }
        scoreMessage.innerHTML = "High Score: " + highScore;

        continueGame = false;
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


// Returns four different numbers from range (0, length of data from csv input)
function generateFourRandomUniqueIndices(){
    const numbers = new Set();

    if (vocabularyData.length < 4){
        // Temporary debug solution if not enough lines
        return;
    }

    while (numbers.size < 4){
        numbers.add(Math.floor(Math.random() * vocabularyData.length));
    }

    return Array.from(numbers);
}


nextButton.addEventListener("click", ()=>{
    // Continue the game
    if (continueGame){
        generateQuestion();
    }
    // Restart the game
    else {
        startNewGame();
    }
})


// Run logic
organizeData(sample1);
startNewGame();