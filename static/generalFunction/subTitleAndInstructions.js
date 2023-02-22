// Handles updating and changing the title and instructions for each page:

function changeSubTitleAndInstructions(title, instructions) {
    changeSubTitle(title);
    changeSubInstructions(instructions);

}

function changeSubTitle(title) {
    document.getElementById(subtitleName).innerHTML = title;
}

function changeSubInstructions(instructions) {
    document.getElementById(instructionsName).innerHTML = instructions;
}
