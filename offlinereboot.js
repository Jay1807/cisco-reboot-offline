import xapi from 'xapi';


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


function rebootSystem() {
    console.log('Rebooting system...');
    xapi.Command.SystemUnit.Boot(
    { Action: "Restart", Force: "True" });
}


async function main() {
    const hasActivity = await checkNetworkActivity();
    if (!hasActivity) {
        rebootSystem();
    }
}


setInterval(main, 21600000)
