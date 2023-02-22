// Composite REST queries to the server, using CSRF-Token:

function postRequestToServer(path, body = "") {

  return new Promise((resolve, reject) => {
    fetch(path, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "CSRF-Token": Cookies.get("XSRF-TOKEN"),
      },
      body: body,
    }).then((response) => {
      if (response.status == ERROR_CODE) {
        console.log(response.status)
        throw new Error("error occurred!")
      }
      return response.json();
    })

      .then(json => {
        resolve(json);
      })
      .catch(err => {
        console.log(err.message)
        reject(err);
      });
  })
}



async function downloadPostRequest(path, body, fileName) {

  // var body = JSON.stringify({ cameraId: camera, travelId: travelId })
  return fetch(path, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "CSRF-Token": Cookies.get("XSRF-TOKEN"),
    },
    body: body,
  })
    .then((res) => {
      return res.blob();
    })
    .then((data) => {
      const a = document.createElement("a");
      a.href = window.URL.createObjectURL(data);
      a.download = fileName;
      a.click();
    });
}
