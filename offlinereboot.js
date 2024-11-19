import xapi from 'xapi';

// Function to check network activity
async function checkNetworkActivity() {
    try {
      const value = await xapi.Status.Webex.Status.get()
      console.log(value)
        if (value === "Registered") {
            console.log('Network activity detected.');
            return true;
        } else {
            console.log('No network activity detected.');
            return false;
        }
    } catch (error) {
        console.log('Error checking network activity:', error.message);
        return false;
    }
}

// Function to reboot the system
function rebootSystem() {
    console.log('Rebooting system...');
    xapi.Command.SystemUnit.Boot(
    { Action: "Restart", Force: "True" });
}

// Main function to run the check every hour
async function main() {
    const hasActivity = await checkNetworkActivity();
    if (!hasActivity) {
        rebootSystem();
    }
}

// Schedule the check every hour
setInterval(main, 21600000); // 21600000 ms = 30 seconds
