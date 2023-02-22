document.addEventListener("DOMContentLoaded", () => {

    async function drawCamerasEditButton() {
        const title = editCamerasTitle;
        const instructions = editCamerasInstructions;
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
        const addCameraCard = createAddCameraCard();
        safeAppendElementToContainer(addCameraCard, mainContainer, title);

        camerasArr.forEach((cameraId) => {

            const onclickFunck = (async function () {
                drawSpiner();

                try {
                    await postRequestToServer(deleteCamera_path, JSON.stringify({ cameraId: cameraId }));
                } catch (err) {
                    console.log(err.message);
                    return;

                }
                deletSpiner();
                drawCamerasEditButton()
            });
            const deleteCameraCard = createCardWithButton(cameraId, cameraId, "Delete camera", onclickFunck, "danger");

            safeAppendElementToContainer(deleteCameraCard, mainContainer, title);

        });
        deletSpiner();
    }
    document.getElementById("editCameras").addEventListener("click", drawCamerasEditButton);



    function createAddCameraCard() {


        const form = document.createElement('form')
        form.className = "form-group"
        form.setAttribute("autocomplete", "off")


        var input = createInput("camera", "Enter camera ID", "text")
        input.pattern = "camera_[0-9]{1,}";
        form.appendChild(input);


        var input = createInput("pass", "Enter password", "password")
        form.appendChild(input);


        var div = document.createElement('div');
        const button = createSubmitButton("Add camera")
        div.appendChild(button);
        div.className = "pt-3";



        form.appendChild(div);





        form.addEventListener("submit", async (event) => {
            drawSpiner();
            event.preventDefault();
            const camera = event.target.camera.value;
            const pass = event.target.pass.value;


            try {
                var isSuccess = await postRequestToServer(updateCamera_path, JSON.stringify({ cameraId: camera, pass: pass }));
                console.log(isSuccess);
                if (!isSuccess) {
                    alert(unsuccessAddCamera_alert);
                }
            } catch (err) {
                console.log(err.message);
                return;

            }
            deletSpiner();
            drawCamerasEditButton();
        })


        CameraCard = createCard("AddNewCamera", "Adding a new camera", form, "primary");
        return CameraCard;

    }




    function createInput(inputId, inputText, type) {
        const input = document.createElement('input')
        input.id = inputId
        input.placeholder = inputText
        input.className = "form-control rounded-pill bg-dark text-light";
        input.style = "opacity:0.6;"
        input.required = true;
        input.type = type;

        return input;
    }
})