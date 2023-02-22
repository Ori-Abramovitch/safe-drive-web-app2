

function drawSpiner() {
    deletSpiner();
    const container = document.getElementById('spinerContainer');
    const loadingP = document.createElement('p');
    loadingP.className = "btn btn-primary";
    const loadingSpan = document.createElement('span');
    loadingSpan.className = "spinner-border spinner-border-sm";
    loadingP.innerHTML = "Loading...";

    loadingP.appendChild(loadingSpan);
    container.appendChild(loadingP)

}
function deletSpiner() {
    clearSpinerContainer();
}