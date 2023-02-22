function safeAppendElementToContainer(newElement, container, menuTitle) {
    if(document.getElementsByTagName('h1')[0].innerHTML != menuTitle){
        return false;
    }
    const elementId = newElement.id;
    const oldElement = document.getElementById(elementId);
    if (document.body.contains(oldElement)) {
        console.log(elementId, "Element exists");
        oldElement.onclick = newElement.onclick;
        return false;
    }
    else {
        container.appendChild(newElement);
        return true;
    }
}
