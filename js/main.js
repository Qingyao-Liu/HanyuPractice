import {parseCsvData} from "./csv-parser.js";
import {startNewGame, generateQuestion} from "./game-logic.js";

const nextButton = document.getElementById("next-btn")
let isStartOfNewGame = true;

const questionText = document.getElementById("question");
questionText.style.display = "none";


// Behavior for the next button, which also doubles as a new game/restart button
nextButton.addEventListener("click", function(){
    let result = parseCsvData();

    if (isStartOfNewGame){
        if (result === "Error 0"){
            nextButton.innerHTML = "No file input found"
        }
        else if (result === "Error 1"){
            nextButton.innerHTML = "File is too short"
        }
        else {
            // If a new game properly starts, hide the introduction text and file input
            isStartOfNewGame = false;
            questionText.style.display = "block";
            document.getElementById("introduction-text").style.display = "none";
            document.getElementById("file-input").style.display = "none";
            startNewGame(result);
        }
    }
    else {
        generateQuestion();
    }
});