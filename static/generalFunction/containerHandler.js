// Cleaning up main divs that are reused:
function clearContainer(container) {
  const div = document.getElementById(container);

  while (div.firstChild) {
    div.removeChild(div.firstChild);
  }
}

function clearMainContainer() {
  clearContainer(mainContainerName);
}

function clearChartContainer() {
  clearContainer(chartContainerName);
}

function clearButtonContainer() {
  clearContainer(buttonContainerName);
}

function clearAllContainers() {
  clearMainContainer();
  clearChartContainer();
  clearButtonContainer();
}

// clear spiner
function clearSpinerContainer() {
  clearContainer(spinerContainerName);
}


// Getting main divs that are reused:
function getContainer(container) {
  const div = document.getElementById(container);
  return div;
}


function getMainContainer() {
  return getContainer(mainContainerName);
}

function getChartContainer() {
  return getContainer(chartContainerName);
}

function getButtonContainer() {
  return getContainer(buttonContainerName);
}







