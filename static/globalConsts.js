// names of containers
const mainContainerName = "mainContainer";
const buttonContainerName = "buttonContainer";
const chartContainerName = "chartContainer";
const spinerContainerName = "spinerContainer";

const subtitleName = "subtitle";
const instructionsName = "instructions";

const checkboxElementName = "checkboxElement";

///////////////////// names and instructions of menus  /////////////////////
// Cameras Menu:
const camerasMenuTitle = "Cameras Menu";
const camerasMenuInstructions = "Select a camera and compare travels";
const singleCamerasMenuInstructions = "See information about a single travel or compare several together";

// Configurations:
const configurationsTitle = "Configurations";
const configurationsInstructions = "Set up camera configurations, or set them all together";

// Edit Cameras:
const editCamerasTitle = "Edit Cameras";
const editCamerasInstructions = "Add a new camera to the user or delete an existing camera"

// Export To Exel:
const exportToExelTitle = "Export To Exel";
const exportToExelInstructions = "Export information about a single travel or several together"

// Send Email:
const sendEmailTitle = "Send Email";
const sendEmailInstructions = "Send an email to the user of the camera, or update the user's email"

// About Us:
const aboutUsTitle = "About Us";
const aboutUsInstructions =
    "SafeDrive - in-cabin driver monitoring solution - enables automakers to create safer cars today, and transition into the autonomous vehicles of tomorrow.<br><br>"
    + "Our mission is to reduce road accidents caused by driver distraction, saving countless lives each year.<br>"
    + "safeDrive is a final project of 3 students in the Department of Computer Science at Bar Ilan:<br><br>"
    + "Ori Cohen: ori.kohen123@gmail.com.<br>"
    + "Ori Abramovich: Ori532@gmail.com.<br>"
    + "Yosef Natan Barbie: yosefnatanb@gmail.com.<br><br>"
    + "Hope you enjoy our product.";

// Default values for camera configurations
const defaultEyes = 6;
const defaultPhone = 13;
const defaultYawning = 50;
const defaultYawningAlert = true;


// Button texts:
const pieButton_text = "Draw Pie travel";
const pieButton_Id = "DrawPietravel";

const onTimeButton_text = "Draw tarvel On Time"
const onTimeButton_Id = "DrawtarvelOnTime"

const showTravelsButton_text = "Show travels";

const backToAllCameras_Id = "BackToAllCameras";
const backToAllCameras_text = "Back to all cameras";

const compareAllButton_Id="compareAllButton";
const compareAllButton_text= "Compare all travels";


const compareMarkedButton_Id = "compareMarkedButton";
const compareMarkedButton_text ="Compare marked travels";

const worstTravelPieButton_Id="worstTravelPieButton";
const worstTravelPieButton_text="Draw the worst travel Pie";

const worstTravelOnTimeButton_Id="worstTravelOnTimeButton";
const worstTravelOnTimeButton_text="Draw the worst travel On Time";

// Configuration attributes:
const configurations_names = ["Distractions", "Fell asleep", "Tiredness indications"];
const configurations_Args = ["eyes", "phone", "yawning"];

// error:
const ERROR_CODE = 400;

// alerts:
const error_alert = "error occurred!";
const cameraHasNoTravels_alert = " has no travels!";
const needToMark_alert = "You need to mark the travels you want to compare";
const unsuccessAddCamera_alert = "camera name or password incorrect";

const loginFailed_alert = "The password is invalid or there is no user record corresponding to this identifier";
const passwordResetSuccess_alert = "Password reset email sent!";
const PasswordsDontMatch_alert = "Passwords Don't Match!";


// post Request To Server Path:
const getCamerasOfUser_path = "/dbServer/getCamerasOfUser";
const getTittleTravels_path = "/dbServer/getTittleTravels";
const getWorstTravelIndex_path = '/queries/getWorstTravelIndex';
const getConf_path = "/dbServer/getConf";

const setConfOfArrCamera_path = "/dbServer/setConfOfArrCamera";

const deleteCamera_path = "/dbServer/deleteCamera";
const updateCamera_path = "/dbServer/updateCamera";
const getEmail_path = "/dbServer/getEmail";
const setEmail_path = "/dbServer/setEmail";
const viewOnAmountTravels_path = "/queries/viewOnAmountTravels";
const numberOfEventsInDrive_path = "/queries/numberOfEventsInDrive";
const travelOnTime_path = "/queries/travelOnTime";
// const _path = "";



