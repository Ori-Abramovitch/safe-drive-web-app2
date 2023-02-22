document.addEventListener("DOMContentLoaded", () => {

    function generateAboutUs() {
        const title = aboutUsTitle;
        const instructions = aboutUsInstructions;
        changeSubTitleAndInstructions(title, instructions);
        clearAllContainers()

    }



    document.getElementById("aboutUs").addEventListener("click", generateAboutUs);
})