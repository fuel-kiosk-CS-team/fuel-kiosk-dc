const ping = require('ping');

let isOnline = false; // This will be updated periodically

// Ping googles public DNS server to determine if network is active
// Could set this to OSU server if wanted but Google should work since this is just a internet connectivity test

/**
 * 
 * @param {*} host 
 */
async function checkNetwork(host = '8.8.8.8') {
  try {
    const res = await ping.promise.probe(host, { timeout: 3 });
    isOnline = res.alive;
    const time = new Date().toLocaleTimeString();
    console.log(`[${time}] Network status: ${isOnline ? "ONLINE" : "OFFLINE"}`);
  } catch (err) {
    isOnline = false;
    console.error(`[${new Date().toLocaleTimeString()}] Ping error:`, err);
  }
}

/**
 * This functions purpose is to monitor the connectivity to the internet
 * 
 * Given an interval value this function intially checks the current status of the network, then sets up recurring checks based on the given interval
 * @param {int} interval 
 */
function startMonitoring(interval = 10000) {
  checkNetwork(); // Initial check
  setInterval(checkNetwork, interval); // Regular tests at set intervals
}

/**
 * This function can be called to retreive the stored value that denotes if the kiosk is online
 * @returns {boolean} isOnline which is either true or false
 */
function getNetworkStatus() {
  return isOnline;
}

// Export functions
module.exports = {
  startMonitoring,
  getNetworkStatus
};