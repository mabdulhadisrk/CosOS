// 1) Global Selectors

//Grabs layers of HTML

const bootButton = document.getElementById('bootbutton');
const welcomePage = document.getElementById('welcScreen');
const desktopPage = document.getElementById('DesktopScreen');

// Grabs the interactive control centre elements

const controlCentre = document.getElementById('control-centre');
const startMenuBtn = document.getElementById('StartMenuButton');
const closePanelButton = document.getElementById('close-panel-btn');

// Grabs existing in-HTML app-container elements

const WindowAPP = document.querySelector('.appWindow');
const AppViewport = document.getElementById('app-viewport');
const appTitle = document.getElementById('app-title');
const CloseAppCoreButton = document.getElementById('Close-appcore-button');

// Grabs desktop app shortcut icon launchers

const TerminalButton = document.getElementById('terminal-Button');
const StoreButton = document.getElementById('LarOS-store-button');
const backgroundImageSelect = document.getElementById('bgImage');
const MusicButton = document.getElementById('Music-button');

// Grabs terminal window and its close button;
const terminalWindow = document.getElementById('terminal-window');
const closeTerminalButton = document.getElementById('close-terminal-btn');

// Grabs terminal Input line and body for Input processing and printing 

const terminalInput = document.getElementById('terminal-input');
const terminalBody = document.querySelector('.terminal-body');

// Grabs minimize button in bottom taskbar

const MinimizeButton = document.getElementById('minimizeButton');

// 2) Booting sequence Initialization
 
    // hides welcome screen and reveals the desktop screen

    bootButton.onclick = function(){
    welcomePage.style.opacity = '0';
    welcomePage.style.visibility = 'hidden';
    desktopPage.style.opacity ="1";
    desktopPage.style.visibility = "visible";
    initializeHardwareMonitoring();
    getSystemLocation();
};

// 3) Control Centre Logic

    // Clicking "🛰️LarOS Forces Control" will inject the active panel to trigger the smooth CSS transition.

startMenuBtn.onclick = function(){
    controlCentre.classList.add('Active-Panel');
}
closePanelButton.onclick = function(){
    controlCentre.classList.remove('Active-Panel');
}

    // Click the "✕" in the panel force the active panel to shut back with the smooth css transition

// 4) Desktop Interactions and Alerts
     
    // Click Behaviours

    TerminalButton.onclick = function(){
    terminalWindow.style.display = 'flex';
    terminalInput.focus();
};
    closeTerminalButton.onclick = function(){
    terminalWindow.style.display = 'none';
};
StoreButton.onclick = function(){
    let choice = prompt(
        "Welcome to LarOS Store!\nType a number to execute a protocol:\n\n1 - Open Friv ( Nostalgic Games website )\n2 - Open Wallpapers Selection"
    );
    if (choice ==="1") {
        alert("🛰️ Connecting Friv!");
        window.open("https://www.friv.com/old/", "_blank");
        } 
    else if (choice === "2"){
        alert("Please select an image file from your computer to change the current background image!");
        backgroundImageSelect.click();
    }
};

    // Taskbar Drawer 

    MinimizeButton.onclick =function(){
        const taskbar = document.getElementById('BottomTaskbar');
        if (taskbar.classList.contains('Hidden-Taskbar')){
            // bring it back up
            taskbar.classList.remove('Hidden-Taskbar');
            MinimizeButton.innerText = "⌄"
        } else {
            taskbar.classList.add('Hidden-Taskbar');
            MinimizeButton.innerText ="⌃";
        }
    };

// listens for user to select the image file for LarOS Store

    backgroundImageSelect.onchange = function(){
        if (backgroundImageSelect.files && backgroundImageSelect.files[0]){
            let reader = new FileReader();
            reader.onload = function(e){
                document.body.style.backgroundImage = "url('" + e.target.result + "')";
            };
            reader.readAsDataURL(backgroundImageSelect.files[0]);
        }
};
// 5) Live Clock System

    // runs automated background timer that runs every 1000 milliseconds (1s)

    setInterval(function(){
        let now = new Date();       // captures the exact modern time of the device
        let timeText = now.toLocaleTimeString();         // formats into clean readable string
        document.querySelector('.ClockSystem').innerText = timeText;        // creates in TopBar span
     }, 1000);

// 6) Real-time Battery and Network system

     setInterval(function(){
        if (navigator.onLine==true){
            document.getElementById('real-network').innerText = "SECURE CHANNEL";
        } else{
            document.getElementById('real-network').innerText = "OFFLINE SIGNAL";
        }
     navigator.getBattery().then(function(battery){
        let level = Math.round(battery.level*100);
        let statusText = "";
        if (battery.charging ==true){
            statusText = "(Charging)";
        }
        document.getElementById('real-battery').innerText = level + "%" + statusText;
    });
},1000);


 // 7) Weather forecast logic :)

 const weatherApiKey = "YOUR_OPENWEATHERMAP_API_KEY";
 const tempElement = document.getElementById("TempL");
 const statusElement = document.getElementById("statusL");
 const resfreshWeatherButton = document.getElementById("refreshWL");

    async function fetchWeather(lat, lon) {
        statusElement.textContent = "Updating settlements...";
        try {
            const response = await fetch('https://openweathermap.org{lat}&lon=$(lon)&units=metric&appid=${weatherApiKey}');
            if (!response.ok) throw new Error('Grid offline');

            const data = await response.json();

            tempElement.textContent = '${Math.round(data.main.temp)}°C';
            statusElement.textContent = '$(data.name): ${data.weather.description}';
        } catch (error) {
            console.error("Weather Error", error);
            statusElement.textContent = "Grid connection failed";
            tempElement.textContent = "---°C";
        }
    }
    
    function getSystemLocation (){
        if (navigator.geolocation) {
            statusElement.textContent = "Locating grid...";
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    fetchWeather(position.coords.latitude, position.coords.longitude);
                },
                (error) => {
                    console.error("Geolocation Error", error );
                    statusElement.textContect = "Location access denied";
                }
            );
        } else {
            statusElement.textContent = "Geolocation unsupported";
        }
    }
    resfreshWeatherButton.onclick = function() {
        getSystemLocation();
    };

    
