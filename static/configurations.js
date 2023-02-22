document.addEventListener("DOMContentLoaded", () => {



    async function drawCamerasConfButton() {
        const title = configurationsTitle;
        const instructions = configurationsInstructions;
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

        const confAllCamerasCard = await createConfAllCamerasCard(camerasArr);

        // mainContainer.appendChild(confAllCamerasCard);
        safeAppendElementToContainer(confAllCamerasCard, mainContainer, title);
        deletSpiner();

        camerasArr.forEach(async (camera) => {
            drawSpiner();

            createConfCameraCard(camera)
                .then((confCameraCard) => {
                    safeAppendElementToContainer(confCameraCard, mainContainer, title);
                    deletSpiner();
                })

        })



    }
    document.getElementById("configurations").addEventListener("click", drawCamerasConfButton);

    async function createConfCameraCard(camera) {

        const form = await createConfCameraForm([camera]);
        const confCameraCard = createCard("confCameraCard" + camera, camera, form);
        return confCameraCard;

    }
    async function createConfCameraForm(camerasArr) {
        const form = document.createElement('form')
        form.className = "form-group"

        if (camerasArr.length == 1) {
            const cameraId = camerasArr[0];
            try {
                var cameraConf = await postRequestToServer(getConf_path, JSON.stringify({ cameraId: cameraId }));
            } catch (err) {
                console.log(err.message);
                return;
            }

        }
       
        configurations_Args.forEach((val, index) => {
            const div = document.createElement('div')
            div.className = "form-group";



            const label = createLabel("Enter " + configurations_names[index], configurations_names[index]);
           

            if (camerasArr.length == 1) {
                var inputText = "current: " + cameraConf[val];
            }
            else {
                var inputText = configurations_names[index];
            }

           
            const input = createInput(val, inputText);
            input.pattern = "([1-9][\.][0-9])|[1-9]|([1-9][0-9][\.][0-9])|[1-9][0-9]";
            div.appendChild(label);
            div.appendChild(input);
            form.appendChild(div);
        });


        if (camerasArr.length == 1) {
            const div = document.createElement('div')
            div.className = "form-group";

            const currentMail = cameraConf["mail"];

            const label = createLabel("Enter email", "email")

            if (currentMail != undefined) {
                var inputText = "" + cameraConf["mail"];
            }
            else {
                var inputText = "current: no email";
            }


            
            const input = createInput("email", inputText)
            input.type = "email";
            div.appendChild(label);
            div.appendChild(input);
            form.appendChild(div);
        }



        var div = document.createElement('div')
        div.className = "form-group";

        
        if (camerasArr.length == 1) {
            labelText = " Yawning Alert. current: " + cameraConf["yawningAlert"];
        }
        else {
            labelText = " Yawning Alert";
        }
        const label = createLabel(labelText, "yawningAlert");


        const input = createCheckedInput("yawningAlert")
        div.appendChild(input);
        div.appendChild(label);
        form.appendChild(div);


        var div = document.createElement('div');
        div.className = "form-group";
        
        const submitButton = createSubmitButton("Set configurations");
        div.appendChild(submitButton);
        div.className = "pb-3 pt-1"

        
        form.appendChild(div);


        form.addEventListener("submit", async (event) => {
            event.preventDefault();
            // drawSpiner();
            // const camerasArr = camerasArr;
            const eyes = event.target.eyes.value;
            const phone = event.target.phone.value;
            const yawning = event.target.yawning.value;
            const yawningAlert = event.target.yawningAlert.checked;
           

            // var eyes = null;
            // if (event.target.eyes != undefined) {
            //     eyes = event.target.eyes.value;
            // }
            // var phone = null;
            // if (event.target.phone != undefined) {
            //     phone = event.target.phone.value;
            // }
            // var yawning = null;
            // if (event.target.yawning != undefined) {
            //     yawning = event.target.yawning.value;
            // }
            // var yawningAlert = null;
            // if (event.target.yawningAlert != undefined) {
            //     yawningAlert = event.target.yawningAlert.value;
            // }
            var email = null;
            if (event.target.email != undefined) {
                email = event.target.email.value;
            }


            try {
                await postRequestToServer(setConfOfArrCamera_path, JSON.stringify({ camerasArr: camerasArr, eyes: eyes, phone: phone, yawning: yawning, yawningAlert: yawningAlert, email: email }));
                drawCamerasConfButton();
            } catch (err) {
                console.log(err.message);
                return;

            }
            // drawCamerasConfButton()
        });
        var div = document.createElement('div');
        div.className = "form-group ";

        
        var button = createSubmitButton("Set to default configurations");
        div.appendChild(button);
      

        
        form.appendChild(div);

        button.addEventListener("click", async () => {
            const eyes = defaultEyes;
            const phone = defaultPhone;
            const yawning = defaultYawning;
            const yawningAlert = defaultYawningAlert;
            try {
                await postRequestToServer(setConfOfArrCamera_path, JSON.stringify({ camerasArr: camerasArr, eyes: eyes, phone: phone, yawning: yawning, yawningAlert: yawningAlert }));
                drawCamerasConfButton();
            } catch (err) {
                console.log(err.message);
                return;

            }
            drawCamerasConfButton()
        })


        return form;

    }

    async function createConfAllCamerasCard(camerasArr) {
        const form = await createConfCameraForm(camerasArr);
        const confAllCamerasCard = createCard("confAllCamerasCard", "Set configurations for all cameras", form, "danger");
        return confAllCamerasCard;

    }

    

    

})