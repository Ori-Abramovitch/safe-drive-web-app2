// Creating elements with style using mainly bootstrap:

function createButtonInDiv(buttonId, buttonText, onclickFunck, buttonColor = "primary") {
    const button = createButton(buttonId, buttonText, onclickFunck, buttonColor);
    const div = document.createElement('div');
    div.appendChild(button);
    div.className = "p-2"
    div.id = buttonId + "Div";

    return div;

}
function createButton(buttonId, buttonText, onclickFunck, buttonColor = "primary") {
    const button = document.createElement('input');
    button.type = 'button';
    button.className = "rounded-pill btn btn-" + buttonColor;
    button.id = buttonId + "Button";
    button.value = buttonText;
    button.onclick = onclickFunck;
    return button;
}

function createCardWithButton(cardId, cardTitle, buttonText, onclickFunck, buttonColor = "primary", titleColor = "dark") {
    const button = createButton(cardId + "button", buttonText, onclickFunck, buttonColor);
    const cardDiv = createCard(cardId, cardTitle, button, titleColor);
    return cardDiv;
}

function createCard(cardId, cardTitle, childElement, titleColor = "dark") {
    const cardDiv = document.createElement('div');
    cardDiv.className = "card text-white bg-dark mb-3"
    cardDiv.style = "width: 18rem;"
    cardDiv.id = cardId + "Card";

    const cardHeader = document.createElement('div')
    cardHeader.className = "card-header bg-" + titleColor
    cardHeader.innerHTML = cardTitle
    cardDiv.appendChild(cardHeader)


    const cardBody = document.createElement('div')
    cardBody.className = "card-body"
    cardDiv.appendChild(cardBody);
    cardBody.appendChild(childElement);

    const cardText = document.createElement('p');
    cardText.className = "card-text"
    cardText.id = "card-text" + cardId
    cardBody.appendChild(cardText);
    return cardDiv;
}



function createSendEmailHref(cameraId) {
    const sendEmailHref = document.createElement('a');
    sendEmailHref.setAttribute("href", `/sendEmail?cameraId=${cameraId}`)
    sendEmailHref.setAttribute("value", "send email")
    sendEmailHref.innerHTML = "Send email"
    sendEmailHref.className = "rounded-pill btn btn-primary"
    sendEmailHref.setAttribute("target", "_blank")
    sendEmailHref.setAttribute("rel", "noopener noreferrer")

    const div = document.createElement('div');
    div.appendChild(sendEmailHref);
    div.className = "p-2";
    div.id = "sendEmailDiv";

    return div;
}



function createCheckbox(name, value) {
    const checkbox = document.createElement('INPUT');
    checkbox.setAttribute("type", "checkbox");
    checkbox.name = name;
    checkbox.value = value;
    checkbox.className = "form-check-input me-2"

    return checkbox;
}



function createDropdownItem(itemId, buttonText, onclickFunck) {
    const dropdownItem = document.createElement('a');
    dropdownItem.type = "button";
    dropdownItem.className = "dropdown-item";
    dropdownItem.innerHTML = buttonText;
    dropdownItem.value = "action";
    dropdownItem.id = itemId;
    dropdownItem.onclick = onclickFunck;

    return dropdownItem;

}

function createDropdownButton(buttonId, buttonText) {
    const button = document.createElement('button');
    button.type = 'button';
    button.id = 'dropdownMenuButton' + buttonId;
    button.innerHTML = "travel " + buttonText;
    button.setAttribute("style", "width: 500px;border-color: white; border-bottom: solid; border-bottom-width: thin;")
    button.className = "btn btn-outline-primary dropdown-toggle rounded-0";
    // button.setAttribute("data-toggle", "dropdown");
    button.setAttribute("aria-haspopup", "true");
    button.setAttribute("aria-expanded", "false");

    return button;
}


function createScrollDiv() {
    var scrollDiv = document.createElement('div');
    scrollDiv.setAttribute("class", "border border-primary rounded overflow-auto p-3 mb-3 mb-md-0 me-md-3");
    scrollDiv.setAttribute("style", "max-height: 500px");

    return scrollDiv;
}


function createSubmitButton(buttonText){
    const button = document.createElement('input');
    button.type = 'submit';
    button.value = buttonText;
    button.className = 'rounded-pill btn btn-primary';
    return button;
}


function createLabel(labelText, htmlFor="") {
    const label = document.createElement('label');
    label.innerHTML = labelText;
    label.htmlFor = htmlFor
    label.className = "pb-2 pt-1";
    label.type = "label"

    return label;
}

function createCheckedInput(inputId) {
    const input = document.createElement('input')
    input.type = "checkbox";
    input.id = inputId;
    input.className = "form-check-input me-2";
    input.value = true;
    input.checked = true

    return input;
}

function createInput(inputId, inputText) {
    const input = document.createElement('input');
    input.placeholder = inputText;
    input.className = "form-control rounded-pill bg-dark text-light ";
    input.style = "opacity:0.6;"
    input.required = true;
    input.id = inputId;

    return input;
}