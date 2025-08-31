let fileData = "";
const fileInput = document.getElementById("file-input");


// Reads and stores data from file input
fileInput.addEventListener("change", function(e){
    const file = e.target.files[0];

    if (file){
        const reader = new FileReader();

        // On load, the store the result in a variable and display "Begin"
        reader.onload = function(e){
            fileData = e.target.result;
            document.getElementById("next-btn").innerHTML = "Begin";
        };

        // On error, alert the user
        reader.onerror = function(){
            alert("Error: Your file input can not be properly read. Try again.");
        };

        reader.readAsText(file);
    }
});


// Converts raw csv file data into an array of organized fields and returns it
export function parseCsvData(){
    let organizedData = [];

    // Converts data into an array of entries
    let lines = fileData.split("\n");

    // Iterates the array and converts each entry into an object with the attributes: hanzi-pinyin-translation
    lines.forEach(line => {
       line = line.split(",");

       // Exits current iteration if an entry has too little or too many fields
       if (line.length !== 3){
           return;
       }

       organizedData.push({
          hanzi: line[0],
          pinyin: line[1],
          translation: line[2]
       });
    });

    // Error 0: No data = No file was input yet or the format of the file doesn't give any data
    if (organizedData.length < 1){
        return "Error 0";
    }
    // Error 1: There is data, but not enough to properly generate the quiz
    else if (organizedData.length < 4){
        return "Error 1";
    }

    return organizedData;
}

