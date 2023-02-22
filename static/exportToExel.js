document.addEventListener("DOMContentLoaded", () => {

    const title = exportToExelTitle;
    const instructions = exportToExelInstructions;
    async function drawAllCamerasButton() {

        changeSubTitleAndInstructions(title, instructions);
        clearAllContainers()
        drawSpiner();

        try {
            var camerasArr = await postRequestToServer(getCamerasOfUser_path);
        } catch (err) {
            console.log(err);
            alert(error_alert);
            return;
        }
        const mainContainer = getMainContainer();

        deletSpiner();


        camerasArr.forEach((cameraId) => {


            const onclickFunck = (function () { return drawAllTittleTravelsButton(cameraId) });
            const exportCard = createCardWithButton(cameraId, cameraId, "Show travels", onclickFunck);

            safeAppendElementToContainer(exportCard, mainContainer, title);
        });

    }


    document.getElementById("exportToExel").addEventListener("click", drawAllCamerasButton);

    async function drawAllTittleTravelsButton(camera) {
        const title = exportToExelTitle + " " + camera;
        changeSubTitle(title)
        clearMainContainer();
        clearChartContainer();
        drawSpiner();

        const mainContainer = getMainContainer();
        const buttonContainer = getButtonContainer();



        try {
            var tittleTravelsArr = await postRequestToServer(getTittleTravels_path, JSON.stringify({ cameraId: camera }));
        } catch (err) {
            console.log(err.message);
            return;

        }


        if ((tittleTravelsArr.length) < 1) {
            drawAllCamerasButton();
            alert(camera + cameraHasNoTravels_alert);
            return;
        }
        const travelIdArr = [];
        const buttonsArr = [];

        const scrollDiv = createScrollDiv();


        tittleTravelsArr.forEach((infoTravel) => {
            const travelId = infoTravel.numberOfTravel
            const travelTime = infoTravel.time;
            const travelLocations = infoTravel.locations;
            travelIdArr.push(travelId)



            const dropdownButtonText = travelId + ": " + travelTime + " " + travelLocations;
            const dropdownButton = createDropdownButton(travelId, dropdownButtonText);
            dropdownButton.onclick = (async function () {
                drawSpiner();
                try {
                    const body = JSON.stringify({ cameraId: camera, travelId: travelId });
                    const fileName = `${camera}Travel${travelId}`
                    const res = await downloadPostRequest("/jsonToCsv/saveOneTravelToCsv", body, fileName);

                } catch (err) {
                    console.log(err.message);
                    return;

                }
                deletSpiner();
            });

            const checkbox = createCheckbox(checkboxElementName, travelId);






            const div = document.createElement('div');
            div.appendChild(checkbox);
            div.appendChild(dropdownButton);
            scrollDiv.appendChild(div);
            buttonsArr.push(dropdownButton);



        });
        deletSpiner();
        const div = document.createElement("div")
        div.setAttribute("class", "overflow-auto")
        div.appendChild(scrollDiv);
        mainContainer.appendChild(div)



        const backToAllCamerasButton = createButtonInDiv("BackToAllCameras", "Back to all cameras"
            , drawAllCamerasButton, "warning");

        safeAppendElementToContainer(backToAllCamerasButton, buttonContainer, title);


        async function compareAllTravelsFunc() {
            drawSpiner();
            const checkboxes = document.querySelectorAll(`input[name=${checkboxElementName}]`);
            const values = [];
            checkboxes.forEach((checkbox) => {
                values.push(checkbox.value);
            });
            if (values.length <= 0) {
                alert(camera + cameraHasNoTravels_alert);
                return;
            }
            var cameraId = camera;
            var travelArrId = values;

            const body = JSON.stringify({ cameraId: camera, travelArrId: travelArrId });
            const fileName = `${camera}allTravelS`;
            const res = await downloadPostRequest("/jsonToCsv/saveAllTravelToCsv", body, fileName);

            deletSpiner();
        }

        var exporAllTravelsButton = createButtonInDiv("exporAllTravelsButton", "Export all travels"
            , compareAllTravelsFunc);

        safeAppendElementToContainer(exporAllTravelsButton, buttonContainer, title);


        // ///////////////////////////////////////////////////////////////


        async function compareMarkedTravelsFunc() {
            drawSpiner();
            const checkboxes = document.querySelectorAll(`input[name=${checkboxElementName}]:checked`);
            const values = [];
            checkboxes.forEach((checkbox) => {
                values.push(checkbox.value);
            });
            if (values.length <= 0) {
                alert(needToMark_alert);
                deletSpiner();
                return;
            }

            var cameraId = camera;
            var travelArrId = values;
            const body = JSON.stringify({ cameraId: camera, travelArrId: travelArrId });
            const fileName = `${camera}allTravelS`;
            const res = await downloadPostRequest("/jsonToCsv/saveAllTravelToCsv", body, fileName);
            deletSpiner();
        }

        const exporMarkedTravelsButton = createButtonInDiv("exporMarkedTravelsButton", "Export marked travels"
            , compareMarkedTravelsFunc);

        safeAppendElementToContainer(exporMarkedTravelsButton, buttonContainer, title);





        // ///////////////////////////////////////////////////////////////

        const worstTravelbutton = await getWorstTravelButton(buttonsArr, camera, travelIdArr);
        async function ExportTheWorstTravelFunc() {
            worstTravelbutton.onclick();
        }

        const ExportTheWorstTravelButton = createButtonInDiv("ExportTheWorstTravelButton", "Export the worst travel"
            , ExportTheWorstTravelFunc, "danger");

        safeAppendElementToContainer(ExportTheWorstTravelButton, buttonContainer, title);



    }

    async function getWorstTravelButton(buttonsArr, camera, travelIdArr) {

        const res = await postRequestToServer(getWorstTravelIndex_path, JSON.stringify({ 'camera': camera, 'travelIdArr': travelIdArr }))

        worstTravelIndex = res[0];
        const worstButton = buttonsArr[worstTravelIndex];
        worstButton.className += " btn-outline-danger";
        return worstButton;

    }




})




