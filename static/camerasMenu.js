document.addEventListener("DOMContentLoaded", () => {

    // main function. create all Cameras menu:
    async function drawAllCamerasButton() {
        const title = camerasMenuTitle;
        const instructions = camerasMenuInstructions;
        changeSubTitleAndInstructions(title, instructions)
        clearAllContainers();
        drawSpiner();

        try {
            var camerasArr = await postRequestToServer(getCamerasOfUser_path);
        } catch (err) {
            console.log(err);
            alert(error_alert);
            return;
        }
        deletSpiner();



        camerasArr.forEach((cameraId) => {
            const showTravelsCard = createCardWithButton(cameraId, cameraId, showTravelsButton_text, async () => {
                drawAllTittleTravelsButton(cameraId)
                    .catch((err) => {
                        console.log(err.message)
                    });
            });

            const mainContainer = getMainContainer();
            safeAppendElementToContainer(showTravelsCard, mainContainer, title);
        });

    }

    document.getElementById("CamerasMenu").addEventListener("click", drawAllCamerasButton);


    async function drawAllTittleTravelsButton(cameraId) {
        const title = camerasMenuTitle + " " + cameraId;
        const instructions = singleCamerasMenuInstructions;
        changeSubTitleAndInstructions(title, instructions);
        clearMainContainer();
        clearChartContainer();
        drawSpiner();


        try {
            var tittleTravelsArr = await postRequestToServer(getTittleTravels_path, JSON.stringify({ cameraId: cameraId }));
        } catch (err) {
            console.log(err.message);
            return;
        }


        if ((tittleTravelsArr.length) < 1) {
            drawAllCamerasButton();
            alert(cameraId + cameraHasNoTravels_alert);
            return;
        }
        const travelIdArr = [];
        const buttonsArr = [];

        const scrollDiv = createScrollDiv();


        tittleTravelsArr.forEach(async (infoTravel) => {
            const travelId = infoTravel.numberOfTravel
            travelIdArr.push(travelId)

            const travelMenuButton = await createTravelMenuButton(infoTravel, cameraId);
            scrollDiv.appendChild(travelMenuButton);
            buttonsArr.push(travelMenuButton);



        });
        deletSpiner();

        const div = document.createElement("div")
        div.setAttribute("class", "overflow-auto")
        div.appendChild(scrollDiv);
        div.id = "travel Menu " + cameraId;

        const mainContainer = getMainContainer();
        safeAppendElementToContainer(div, mainContainer, title);

        // // ///////////////////////////////////////////////////////////////

        generateMenuButtons(cameraId, buttonsArr, travelIdArr, title);

    }


    async function createTravelMenuButton(infoTravel, cameraId) {
        const travelId = infoTravel.numberOfTravel
        const travelTime = infoTravel.time;
        const travelLocations = infoTravel.locations;

        const dropdownButtonText = travelId + ": " + travelTime + " " + travelLocations;
        const dropdownButton = createDropdownButton(travelId, dropdownButtonText);
        dropdownButton.setAttribute("data-toggle", "dropdown");

        const checkbox = createCheckbox(checkboxElementName, travelId);
        const menuDiv = createMenuDivDropdown(cameraId, infoTravel);


        const travelMenuButton = document.createElement('div');
        travelMenuButton.appendChild(checkbox);
        travelMenuButton.appendChild(dropdownButton);
        travelMenuButton.appendChild(menuDiv);

        return travelMenuButton;

    }

    function createMenuDivDropdown(cameraId, infoTravel) {

        const menuDiv = document.createElement('div');
        menuDiv.className = "dropdown-menu";



        const dropdownPieItem = createDropdownItem(pieButton_Id, pieButton_text, async () => {
            drawPieOneTravel(cameraId, infoTravel)
                .catch((err) => {
                    console.log(err.message)
                });
        });
        menuDiv.appendChild(dropdownPieItem);

        const dropdownOnTimeItem = createDropdownItem(onTimeButton_Id, onTimeButton_text, async () => {
            drawTarvelsOnTime(cameraId, infoTravel)
                .catch((err) => {
                    console.log(err.message)
                });
        });
        menuDiv.appendChild(dropdownOnTimeItem);

        return menuDiv;

    }



    async function generateMenuButtons(cameraId, buttonsArr, travelIdArr, title) {
        const buttonContainer = getButtonContainer();

        // Back To All Cameras:
        const backToAllCamerasButton = createButtonInDiv(backToAllCameras_Id, backToAllCameras_text
            , drawAllCamerasButton, "warning");

        safeAppendElementToContainer(backToAllCamerasButton, buttonContainer, title);

        // Compare All Travels:
        const compareAllButton = createCompareAllButton(cameraId);
        safeAppendElementToContainer(compareAllButton, buttonContainer, title);

        // Compare Marked Travels:
        const compareMarkedButton = createCompareMarkedButton(cameraId);
        safeAppendElementToContainer(compareMarkedButton, buttonContainer, title);


        // Send Email To User:
        const sendEmailHref = createSendEmailHref(cameraId);
        safeAppendElementToContainer(sendEmailHref, buttonContainer, title);

        // Draw the worst travel Pie and travel On Time:
        createAndAppendWorstTravelButtons(cameraId, buttonsArr, travelIdArr, buttonContainer, title);


    }



    async function getWorstTravelDiv(camera, buttonsArr, travelIdArr) {
        const travelIdArrClone = structuredClone(travelIdArr);

        const res = await postRequestToServer(getWorstTravelIndex_path, JSON.stringify({ 'camera': camera, 'travelIdArr': travelIdArrClone }));

        worstTravelIndex = res[0];
        const worstButton = buttonsArr[worstTravelIndex];
        worstButton.getElementsByTagName('button')[0].className += " btn-outline-danger";
        return worstButton;

    }

    function createCompareAllButton(cameraId) {

        async function compareAllFunc() {
            const checkboxes = document.querySelectorAll(`input[name=${checkboxElementName}]`);
            const traveslId = [];

            checkboxes.forEach((checkbox) => {
                traveslId.push(checkbox.value);
            });
            if (traveslId.length <= 0) {
                alert(cameraId + cameraHasNoTravels_alert);
                return;
            }
            drawCompareMarkedTravels(cameraId, traveslId);

        }

        const compareAllButton = createButtonInDiv(compareAllButton_Id, compareAllButton_text
            , compareAllFunc, "primary");
        return compareAllButton;
    }



    function createCompareMarkedButton(cameraId) {
        async function compareMarkedFunc() {
            const checkboxes = document.querySelectorAll(`input[name=${checkboxElementName}]:checked`);
            const traveslId = [];

            checkboxes.forEach((checkbox) => {
                traveslId.push(checkbox.value);
            });
            if (traveslId.length <= 0) {
                alert(needToMark_alert);
                return;
            }
            drawCompareMarkedTravels(cameraId, traveslId);
        }

        const compareMarkedButton = createButtonInDiv(compareMarkedButton_Id, compareMarkedButton_text
            , compareMarkedFunc, "primary");

        return compareMarkedButton;

    }

    async function createAndAppendWorstTravelButtons(cameraId, buttonsArr, travelIdArr, buttonContainer, title) {


        try {
            var worstTravelDiv = await getWorstTravelDiv(cameraId, buttonsArr, travelIdArr);
        } catch (err) {
            console.log(err.message);
            return;
        }


        async function worstTravelPieFunc() {
            const dropdownItem = worstTravelDiv.querySelector("#" + pieButton_Id)
            dropdownItem.onclick()
        }

        const worstTravelPieButton = createButtonInDiv(worstTravelPieButton_Id, worstTravelPieButton_text
            , worstTravelPieFunc, "danger");
        safeAppendElementToContainer(worstTravelPieButton, buttonContainer, title);


        async function worstTravelOnTimeFunc() {
            const dropdownItem = worstTravelDiv.querySelector("#" + onTimeButton_Id)
            dropdownItem.onclick()
        }

        const worstTravelOnTimeButton = createButtonInDiv(worstTravelOnTimeButton_Id,worstTravelOnTimeButton_text
            , worstTravelOnTimeFunc, "danger");
        safeAppendElementToContainer(worstTravelOnTimeButton, buttonContainer, title);


    }

})