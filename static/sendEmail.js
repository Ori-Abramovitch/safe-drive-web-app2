document.addEventListener("DOMContentLoaded", () => {


    async function drawCamerasSendEmailButton() {
        const title = sendEmailTitle;
        const instructions = sendEmailInstructions;
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



        camerasArr.forEach(async (camera) => {
            createAddCameraCard(camera).then((sendEmailCard) => {

                safeAppendElementToContainer(sendEmailCard, mainContainer, title);
            }).catch((err) => {
                console.log(err.message)
            });


        });
        deletSpiner();
    }
    document.getElementById("sendEmail").addEventListener("click", drawCamerasSendEmailButton);



    async function createAddCameraCard(camera) {
        const cardBody = document.createElement('div')
        const sendEmailCard = createCard("sendEmailCard" + camera, camera, cardBody)
        const myHref = createSendEmailHref(camera);


        try {
            var currentEmail = await postRequestToServer(getEmail_path, JSON.stringify({ cameraId: camera }));
        } catch (err) {
            console.log(err.message);
            return;
        }



        const label = createLabel("User email address: " + currentEmail)
        var div = document.createElement('div');
        div.appendChild(label);
        div.appendChild(myHref);
        div.className = "pb-3"

        cardBody.appendChild(div);


        const form = document.createElement('form')
        form.className = "form-group"
        cardBody.appendChild(form);



        const input = createInput("email", "Enter new email to update");
        input.type = "email";
        var div = document.createElement('div');
        div.appendChild(input);
        form.appendChild(div);
        div.className = "pb-3"


        const button = createSubmitButton("Set email")
        form.appendChild(button);

        const cardText = document.createElement('p');
        cardText.className = "card-text"



        form.addEventListener("submit", async (event) => {
            drawSpiner();
            event.preventDefault();
            const email = event.target.email.value;


            try {
                var isSuccess = await postRequestToServer(setEmail_path, JSON.stringify({ cameraId: camera, email: email }));
            } catch (err) {
                console.log(err.message);
                return;
            }
            deletSpiner();
            drawCamerasSendEmailButton()
        })
        cardBody.appendChild(cardText);
        return sendEmailCard;
    }
})