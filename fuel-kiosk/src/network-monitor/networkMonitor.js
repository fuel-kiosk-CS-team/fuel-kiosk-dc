const ping = require('ping');

let isOnline = false; // This will be updated periodically

// Ping googles public DNS server to determine if network is active
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

// Initial network connectivity check and regular testing
function startMonitoring(interval = 10000) {
  checkNetwork(); // Initial check
  setInterval(checkNetwork, interval); // Regular tests at set intervals
}

// Determine network status 
function getNetworkStatus() {
  return isOnline;
}

// Export functions
module.exports = {
  startMonitoring,
  getNetworkStatus
};